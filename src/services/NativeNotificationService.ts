/**
 * ============================================================================
 * CAPACITOR NATIVE NOTIFICATION SERVICE
 * ============================================================================
 *
 * This service handles native Android/iOS notifications for prayer alarms.
 * Integrated from: https://github.com/talha-171219/native-notifier
 *
 * IMPORTANT ANDROID LIMITATIONS:
 * - Android kills background apps aggressively to save battery
 * - Users MUST disable battery optimization for reliable alarms
 * - Alarms may be delayed on Doze mode (Android 6+)
 * - Some manufacturers (Xiaomi, Huawei, Samsung) have extra restrictions
 *
 * REQUIRED PERMISSIONS (set in AndroidManifest.xml):
 * - RECEIVE_BOOT_COMPLETED: Reschedule alarms after device reboot
 * - WAKE_LOCK: Keep device awake briefly to show notification
 * - POST_NOTIFICATIONS: Required for Android 13+ (API 33+)
 * - SCHEDULE_EXACT_ALARM: For precise alarm timing (Android 12+)
 * - USE_EXACT_ALARM: Alternative for exact alarms
 *
 * ============================================================================
 */

import { LocalNotifications, ScheduleOptions, Channel } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AlarmSchedule {
  id: number;
  title: string;
  body: string;
  hour: number;
  minute: number;
  sound?: string;
  repeats?: boolean;
}

export interface PrayerTimes {
  fajr: { hour: number; minute: number };
  dhuhr: { hour: number; minute: number };
  asr: { hour: number; minute: number };
  maghrib: { hour: number; minute: number };
  isha: { hour: number; minute: number };
}

export interface NotificationLog {
  timestamp: Date;
  action: string;
  details: string;
  success: boolean;
}

// ============================================================================
// NOTIFICATION SERVICE CLASS
// ============================================================================

export class NativeNotificationService {

  // Store logs for debugging
  private static logs: NotificationLog[] = [];

  // ============================================================================
  // LOGGING UTILITIES
  // ============================================================================

  /**
   * Log an action with timestamp for debugging
   */
  private static log(action: string, details: string, success: boolean = true): void {
    const logEntry: NotificationLog = {
      timestamp: new Date(),
      action,
      details,
      success
    };
    this.logs.push(logEntry);

    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    const prefix = success ? '✅' : '❌';
    console.log(`${prefix} [NativeNotificationService] ${action}: ${details}`);
  }

  /**
   * Get all logs for debugging
   */
  static getLogs(): NotificationLog[] {
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  static clearLogs(): void {
    this.logs = [];
  }

  // ============================================================================
  // PLATFORM DETECTION
  // ============================================================================

  /**
   * Check if running on native platform (Android/iOS)
   * Web platform does NOT support reliable background notifications
   */
  static isNativePlatform(): boolean {
    const platform = Capacitor.getPlatform();
    return platform === 'android' || platform === 'ios';
  }

  /**
   * Check if running on Android specifically
   */
  static isAndroid(): boolean {
    return Capacitor.getPlatform() === 'android';
  }

  /**
   * Check if running on iOS
   */
  static isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }

  /**
   * Check if running on web (for showing warnings)
   */
  static isWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
  }

  // ============================================================================
  // PERMISSION MANAGEMENT
  // ============================================================================

  /**
   * Request notification permission from user
   */
  static async requestPermission(): Promise<boolean> {
    try {
      this.log('requestPermission', 'Requesting notification permission...');

      const permission = await LocalNotifications.requestPermissions();
      const granted = permission.display === 'granted';

      this.log(
        'requestPermission',
        `Permission ${granted ? 'GRANTED' : 'DENIED'} (status: ${permission.display})`,
        granted
      );

      return granted;
    } catch (error) {
      this.log('requestPermission', `Error: ${error}`, false);
      return false;
    }
  }

  /**
   * Check current permission status without prompting
   */
  static async checkPermission(): Promise<boolean> {
    try {
      const permission = await LocalNotifications.checkPermissions();
      const granted = permission.display === 'granted';

      this.log('checkPermission', `Status: ${permission.display}`, granted);
      return granted;
    } catch (error) {
      this.log('checkPermission', `Error: ${error}`, false);
      return false;
    }
  }

  // ============================================================================
  // NOTIFICATION CHANNEL (ANDROID ONLY)
  // ============================================================================

  /**
   * Create notification channel for Android
   * Android 8+ REQUIRES notification channels
   */
  static async createNotificationChannel(): Promise<void> {
    // Only needed on Android
    if (!this.isAndroid()) {
      this.log('createNotificationChannel', 'Skipping - not Android');
      return;
    }

    try {
      const channel: Channel = {
        id: 'adhan-channel',
        name: 'আযান ও নামাজের এলার্ম',
        description: 'নামাজের সময় আযান শুনুন। নির্ভরযোগ্য এলার্মের জন্য এটি চালু রাখুন।',
        importance: 5, // MAX importance for prayer alarms
        visibility: 1, // PUBLIC on lock screen
        sound: 'adhan', // Must exist at: android/app/src/main/res/raw/adhan.wav
        vibration: true,
        lights: true,
        lightColor: '#10B981' // Green color
      };

      await LocalNotifications.createChannel(channel);

      this.log('createNotificationChannel',
        `Channel created: ${channel.id} with importance=${channel.importance}`);

    } catch (error) {
      this.log('createNotificationChannel', `Error: ${error}`, false);
    }
  }

  /**
   * Delete notification channel (useful for testing)
   */
  static async deleteNotificationChannel(): Promise<void> {
    if (!this.isAndroid()) return;

    try {
      await LocalNotifications.deleteChannel({ id: 'adhan-channel' });
      this.log('deleteNotificationChannel', 'Channel deleted');
    } catch (error) {
      this.log('deleteNotificationChannel', `Error: ${error}`, false);
    }
  }

  // ============================================================================
  // ALARM SCHEDULING
  // ============================================================================

  /**
   * Schedule a single alarm
   */
  static async scheduleAlarm(alarm: AlarmSchedule): Promise<void> {
    try {
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(alarm.hour, alarm.minute, 0, 0);

      // If time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const options: ScheduleOptions = {
        notifications: [
          {
            id: alarm.id,
            title: alarm.title,
            body: alarm.body,
            schedule: {
              at: scheduledTime,
              allowWhileIdle: true, // CRITICAL for Doze mode
              repeats: alarm.repeats ?? false,
              every: alarm.repeats ? 'day' : undefined,
            },
            channelId: 'adhan-channel',
            sound: alarm.sound || 'adhan',
            smallIcon: 'ic_notification',
            autoCancel: true,
            group: 'prayer-alarms',
            extra: {
              alarmType: 'prayer',
              alarmId: alarm.id,
              prayerName: alarm.title
            }
          }
        ]
      };

      await LocalNotifications.schedule(options);

      this.log('scheduleAlarm',
        `ID:${alarm.id} \"${alarm.title}\" scheduled for ${scheduledTime.toLocaleString()} (repeats: ${alarm.repeats})`);

    } catch (error) {
      this.log('scheduleAlarm', `Error scheduling ${alarm.title}: ${error}`, false);
      throw error;
    }
  }

  /**
   * Schedule all 5 daily prayer alarms
   */
  static async schedulePrayerAlarms(prayerTimes: PrayerTimes): Promise<void> {
    this.log('schedulePrayerAlarms', 'Scheduling all 5 prayer alarms...');

    const prayers: AlarmSchedule[] = [
      {
        id: 1,
        title: '🕌 ফজরের আযান',
        body: 'ফজরের নামাজের সময় হয়েছে। আস-সালাতু খাইরুম মিনান-নাওম।',
        hour: prayerTimes.fajr.hour,
        minute: prayerTimes.fajr.minute,
        sound: 'adhan',
        repeats: true
      },
      {
        id: 2,
        title: '🕌 যোহরের আযান',
        body: 'যোহরের নামাজের সময় হয়েছে। হাইয়া আলাস সালাহ।',
        hour: prayerTimes.dhuhr.hour,
        minute: prayerTimes.dhuhr.minute,
        sound: 'adhan',
        repeats: true
      },
      {
        id: 3,
        title: '🕌 আসরের আযান',
        body: 'আসরের নামাজের সময় হয়েছে। হাইয়া আলাস সালাহ।',
        hour: prayerTimes.asr.hour,
        minute: prayerTimes.asr.minute,
        sound: 'adhan',
        repeats: true
      },
      {
        id: 4,
        title: '🕌 মাগরিবের আযান',
        body: 'মাগরিবের নামাজের সময় হয়েছে। হাইয়া আলাল ফালাহ।',
        hour: prayerTimes.maghrib.hour,
        minute: prayerTimes.maghrib.minute,
        sound: 'adhan',
        repeats: true
      },
      {
        id: 5,
        title: '🕌 ইশার আযান',
        body: 'ইশার নামাজের সময় হয়েছে। হাইয়া আলাল ফালাহ।',
        hour: prayerTimes.isha.hour,
        minute: prayerTimes.isha.minute,
        sound: 'adhan',
        repeats: true
      }
    ];

    // Schedule all prayers
    for (const prayer of prayers) {
      await this.scheduleAlarm(prayer);
    }

    this.log('schedulePrayerAlarms', `All ${prayers.length} prayer alarms scheduled successfully`);
  }

  // ============================================================================
  // ALARM CANCELLATION
  // ============================================================================

  /**
   * Cancel a specific alarm by ID
   */
  static async cancelAlarm(id: number): Promise<void> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
      this.log('cancelAlarm', `Alarm ID:${id} cancelled`);
    } catch (error) {
      this.log('cancelAlarm', `Error cancelling ID:${id}: ${error}`, false);
    }
  }

  /**
   * Cancel all scheduled alarms
   */
  static async cancelAllAlarms(): Promise<void> {
    try {
      const pending = await LocalNotifications.getPending();

      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: pending.notifications });
        this.log('cancelAllAlarms', `Cancelled ${pending.notifications.length} alarms`);
      } else {
        this.log('cancelAllAlarms', 'No alarms to cancel');
      }
    } catch (error) {
      this.log('cancelAllAlarms', `Error: ${error}`, false);
    }
  }

  /**
   * Get list of pending (scheduled) alarms
   */
  static async getPendingAlarms(): Promise<any[]> {
    try {
      const pending = await LocalNotifications.getPending();
      this.log('getPendingAlarms', `Found ${pending.notifications.length} pending alarms`);
      return pending.notifications;
    } catch (error) {
      this.log('getPendingAlarms', `Error: ${error}`, false);
      return [];
    }
  }

  // ============================================================================
  // TESTING UTILITIES
  // ============================================================================

  /**
   * Send a test notification after specified delay
   * Default: 1 minute (60 seconds)
   */
  static async sendTestNotification(delaySeconds: number = 60): Promise<Date> {
    const triggerTime = new Date(Date.now() + delaySeconds * 1000);

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 9999, // Test notification ID
            title: '🔔 টেস্ট আযান',
            body: `এটি একটি টেস্ট নোটিফিকেশন। ${delaySeconds} সেকেন্ড পর এলার্ম বাজবে!`,
            schedule: {
              at: triggerTime,
              allowWhileIdle: true
            },
            channelId: 'adhan-channel',
            sound: 'adhan',
            autoCancel: true,
            extra: {
              alarmType: 'test'
            }
          }
        ]
      });

      this.log('sendTestNotification',
        `Test notification scheduled for ${triggerTime.toLocaleTimeString()} (${delaySeconds}s delay)`);

      return triggerTime;
    } catch (error) {
      this.log('sendTestNotification', `Error: ${error}`, false);
      throw error;
    }
  }

  /**
   * Send an immediate notification (for testing sound)
   */
  static async sendImmediateNotification(): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 9998,
            title: '🎵 আযান সাউন্ড টেস্ট',
            body: 'আযান সাউন্ড চেক করা হচ্ছে...',
            schedule: {
              at: new Date(Date.now() + 1000) // 1 second later
            },
            channelId: 'adhan-channel',
            sound: 'adhan',
            autoCancel: true
          }
        ]
      });

      this.log('sendImmediateNotification', 'Immediate test notification sent');
    } catch (error) {
      this.log('sendImmediateNotification', `Error: ${error}`, false);
      throw error;
    }
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  /**
   * Setup notification event listeners
   */
  static async setupListeners(): Promise<void> {
    try {
      // When notification is received (app in foreground)
      await LocalNotifications.addListener('localNotificationReceived', (notification) => {
        this.log('RECEIVED', `Notification: ${notification.title} (ID: ${notification.id})`);
        console.log('📥 Notification received:', notification);
      });

      // When user taps on notification
      await LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
        this.log('ACTION', `User tapped: ${action.notification.title} (ID: ${action.notification.id})`);
        console.log('👆 Notification action:', action);
      });

      this.log('setupListeners', 'Notification listeners registered');
    } catch (error) {
      this.log('setupListeners', `Error: ${error}`, false);
    }
  }

  /**
   * Remove all listeners (cleanup)
   */
  static async removeListeners(): Promise<void> {
    try {
      await LocalNotifications.removeAllListeners();
      this.log('removeListeners', 'All listeners removed');
    } catch (error) {
      this.log('removeListeners', `Error: ${error}`, false);
    }
  }
}

// ============================================================================
// HELPER: Parse prayer time string to hour/minute
// ============================================================================

export function parsePrayerTimeString(timeStr: string): { hour: number; minute: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hour: hours, minute: minutes };
}

/**
 * Convert prayer times from string format to PrayerTimes interface
 */
export function convertPrayerTimesToSchedule(timings: {
  Fajr?: string;
  Dhuhr?: string;
  Asr?: string;
  Maghrib?: string;
  Isha?: string;
}): PrayerTimes {
  return {
    fajr: parsePrayerTimeString(timings.Fajr || '05:00'),
    dhuhr: parsePrayerTimeString(timings.Dhuhr || '12:30'),
    asr: parsePrayerTimeString(timings.Asr || '15:45'),
    maghrib: parsePrayerTimeString(timings.Maghrib || '17:30'),
    isha: parsePrayerTimeString(timings.Isha || '19:00'),
  };
}
