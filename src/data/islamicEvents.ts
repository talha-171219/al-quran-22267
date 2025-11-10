// Islamic events and important dates

export interface IslamicEvent {
  name: string;
  nameBn: string;
  hijriDate: string;
  gregorianDate?: string;
  type: 'eid' | 'religious' | 'friday';
}

export const islamicEvents: IslamicEvent[] = [
  {
    name: "Eid-ul-Fitr",
    nameBn: "ঈদুল ফিতর",
    hijriDate: "1 Shawwal",
    type: "eid"
  },
  {
    name: "Eid-ul-Adha",
    nameBn: "ঈদুল আযহা",
    hijriDate: "10 Dhul Hijjah",
    type: "eid"
  },
  {
    name: "Shab-e-Barat",
    nameBn: "শবে বরাত",
    hijriDate: "15 Sha'ban",
    type: "religious"
  },
  {
    name: "Shab-e-Qadr",
    nameBn: "শবে কদর",
    hijriDate: "27 Ramadan",
    type: "religious"
  },
  {
    name: "Ashura",
    nameBn: "আশুরা",
    hijriDate: "10 Muharram",
    type: "religious"
  },
  {
    name: "Isra and Mi'raj",
    nameBn: "মিরাজ",
    hijriDate: "27 Rajab",
    type: "religious"
  },
  {
    name: "Jummah",
    nameBn: "জুম্মা",
    hijriDate: "Every Friday",
    type: "friday"
  }
];

export const getUpcomingEvents = (count: number = 3): IslamicEvent[] => {
  return islamicEvents.slice(0, count);
};
