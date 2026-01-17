/**
 * ============================================================================
 * useNativeNotifications Hook
 * ============================================================================
 *
 * React hook for managing native Capacitor notifications for prayer alarms.
 * Wraps NativeNotificationService with React state management.
 *
 * WEB LIMITATION:
 * - On web, this hook will show a warning that native features are disabled
 * - Background alarms ONLY work on Android/iOS native builds
 *
 * ============================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  NativeNotificationService, 
  AlarmSchedule, 
  PrayerTimes, 
  NotificationLog,
  convertPrayerTimesToSchedule 
} from '@/services/NativeNotificationService';

interface UseNativeNotificationsReturn {
  // State
  hasPermission: boolean;
  isNative: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
  pendingAlarms: any[];
  loading: boolean;
  logs: NotificationLog[];
  initialized: boolean;

  // Permission
  requestPermission: () => Promise<boolean>;
  checkPermission: () => Promise<boolean>;

  // Scheduling
  scheduleAlarm: (alarm: AlarmSchedule) => Promise<void>;
  schedulePrayerTimes: (prayerTimes: PrayerTimes) => Promise<void>;
  schedulePrayerTimesFromStrings: (timings: {
    Fajr?: string;
    Dhuhr?: string;
    Asr?: string;
    Maghrib?: string;
    Isha?: string;
  }) => Promise<void>;

  // Cancellation
  cancelAlarm: (id: number) => Promise<void>;
  cancelAllAlarms: () => Promise<void>;

  // Testing
  sendTestNotification: (delaySeconds?: number) => Promise<Date | null>;
  sendImmediateNotification: () => Promise<void>;

  // Utilities
  refreshPendingAlarms: () => Promise<void>;
  refreshLogs: () => void;
  clearLogs: () => void;
}

export const useNativeNotifications = (): UseNativeNotificationsReturn => {
  // State
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isNative, setIsNative] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isWeb, setIsWeb] = useState<boolean>(true);
  const [pendingAlarms, setPendingAlarms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  // Detect platform on mount
  useEffect(() => {
    const native = NativeNotificationService.isNativePlatform();
    const android = NativeNotificationService.isAndroid();
    const ios = NativeNotificationService.isIOS();
    const web = NativeNotificationService.isWeb();

    setIsNative(native);
    setIsAndroid(android);
    setIsIOS(ios);
    setIsWeb(web);

    console.log(`📱 Platform detected: native=${native}, android=${android}, ios=${ios}, web=${web}`);
  }, []);

  // Initialize notification system
  useEffect(() => {
    const initialize = async () => {
      if (!isNative) {
        console.log('⚠️ [useNativeNotifications] Web platform - native alarms disabled');
        setLoading(false);
        setInitialized(true);
        return;
      }

      try {
        console.log('🚀 [useNativeNotifications] Initializing native notification system...');

        // Step 1: Create notification channel (Android only)
        await NativeNotificationService.createNotificationChannel();

        // Step 2: Setup event listeners
        await NativeNotificationService.setupListeners();

        // Step 3: Check current permission status
        const permission = await NativeNotificationService.checkPermission();
        setHasPermission(permission);

        // Step 4: Get any pending alarms
        const pending = await NativeNotificationService.getPendingAlarms();
        setPendingAlarms(pending);

        // Step 5: Load logs
        setLogs(NativeNotificationService.getLogs());

        console.log('✅ [useNativeNotifications] Native notification system initialized');
        setInitialized(true);
      } catch (error) {
        console.error('❌ [useNativeNotifications] Initialization error:', error);
        setInitialized(true);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [isNative]);

  // ============================================================================
  // PERMISSION HANDLERS
  // ============================================================================

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot request permission - web platform');
      return false;
    }

    const granted = await NativeNotificationService.requestPermission();
    setHasPermission(granted);
    setLogs(NativeNotificationService.getLogs());
    return granted;
  }, [isNative]);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    const granted = await NativeNotificationService.checkPermission();
    setHasPermission(granted);
    setLogs(NativeNotificationService.getLogs());
    return granted;
  }, [isNative]);

  // ============================================================================
  // SCHEDULING HANDLERS
  // ============================================================================

  const scheduleAlarm = useCallback(async (alarm: AlarmSchedule): Promise<void> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot schedule alarm - web platform');
      return;
    }

    await NativeNotificationService.scheduleAlarm(alarm);

    const pending = await NativeNotificationService.getPendingAlarms();
    setPendingAlarms(pending);
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  const schedulePrayerTimes = useCallback(async (prayerTimes: PrayerTimes): Promise<void> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot schedule prayer times - web platform');
      return;
    }

    await NativeNotificationService.schedulePrayerAlarms(prayerTimes);

    const pending = await NativeNotificationService.getPendingAlarms();
    setPendingAlarms(pending);
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  /**
   * Convenience method: Schedule prayer times from string format (e.g., "05:23")
   * This is the format commonly used in the Quran app
   */
  const schedulePrayerTimesFromStrings = useCallback(async (timings: {
    Fajr?: string;
    Dhuhr?: string;
    Asr?: string;
    Maghrib?: string;
    Isha?: string;
  }): Promise<void> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot schedule - web platform');
      return;
    }

    const prayerTimes = convertPrayerTimesToSchedule(timings);
    await schedulePrayerTimes(prayerTimes);
  }, [isNative, schedulePrayerTimes]);

  // ============================================================================
  // CANCELLATION HANDLERS
  // ============================================================================

  const cancelAlarm = useCallback(async (id: number): Promise<void> => {
    if (!isNative) return;

    await NativeNotificationService.cancelAlarm(id);

    const pending = await NativeNotificationService.getPendingAlarms();
    setPendingAlarms(pending);
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  const cancelAllAlarms = useCallback(async (): Promise<void> => {
    if (!isNative) return;

    await NativeNotificationService.cancelAllAlarms();
    setPendingAlarms([]);
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  // ============================================================================
  // TESTING HANDLERS
  // ============================================================================

  const sendTestNotification = useCallback(async (delaySeconds: number = 60): Promise<Date | null> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot send test - web platform');
      return null;
    }

    const triggerTime = await NativeNotificationService.sendTestNotification(delaySeconds);

    const pending = await NativeNotificationService.getPendingAlarms();
    setPendingAlarms(pending);
    setLogs(NativeNotificationService.getLogs());

    return triggerTime;
  }, [isNative]);

  const sendImmediateNotification = useCallback(async (): Promise<void> => {
    if (!isNative) {
      console.warn('[useNativeNotifications] Cannot send immediate - web platform');
      return;
    }

    await NativeNotificationService.sendImmediateNotification();
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  // ============================================================================
  // UTILITY HANDLERS
  // ============================================================================

  const refreshPendingAlarms = useCallback(async (): Promise<void> => {
    if (!isNative) return;

    const pending = await NativeNotificationService.getPendingAlarms();
    setPendingAlarms(pending);
    setLogs(NativeNotificationService.getLogs());
  }, [isNative]);

  const refreshLogs = useCallback((): void => {
    setLogs(NativeNotificationService.getLogs());
  }, []);

  const clearLogs = useCallback((): void => {
    NativeNotificationService.clearLogs();
    setLogs([]);
  }, []);

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // State
    hasPermission,
    isNative,
    isAndroid,
    isIOS,
    isWeb,
    pendingAlarms,
    loading,
    logs,
    initialized,

    // Permission
    requestPermission,
    checkPermission,

    // Scheduling
    scheduleAlarm,
    schedulePrayerTimes,
    schedulePrayerTimesFromStrings,

    // Cancellation
    cancelAlarm,
    cancelAllAlarms,

    // Testing
    sendTestNotification,
    sendImmediateNotification,

    // Utilities
    refreshPendingAlarms,
    refreshLogs,
    clearLogs
  };
};

export default useNativeNotifications;
