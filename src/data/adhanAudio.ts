// Adhan audio sources with different styles

export interface AdhanStyle {
  id: string;
  name: string;
  nameBn: string;
  audioUrl: string;
  muezzin?: string;
}

export const adhanStyles: AdhanStyle[] = [
  {
    id: "makkah",
    name: "Makkah",
    nameBn: "মক্কা",
    audioUrl: "https://www.islamcan.com/audio/adhan/adhan-makkah-fajr.mp3",
    muezzin: "Ali Ahmed Mulla"
  },
  {
    id: "madinah",
    name: "Madinah",
    nameBn: "মদিনা",
    audioUrl: "https://islamicfinder.us/audio/adhan/Azan-Madinah.mp3",
    muezzin: "Sheikh Abdulbaset"
  },
  {
    id: "cairo",
    name: "Cairo",
    nameBn: "কায়রো",
    audioUrl: "https://download.quranicaudio.com/quran/azan/azan.mp3",
    muezzin: "Sheikh Mishary"
  },
  {
    id: "istanbul",
    name: "Istanbul",
    nameBn: "ইস্তাম্বুল",
    audioUrl: "https://www.islamcan.com/audio/adhan/adhan-turkey.mp3",
    muezzin: "Hafiz Aziz Alili"
  },
  {
    id: "egypt",
    name: "Egypt",
    nameBn: "মিশর",
    audioUrl: "https://everyayah.com/data/azan/azan.mp3",
    muezzin: "Traditional Egyptian"
  }
];

export const getAdhanStyle = (id: string): AdhanStyle | undefined => {
  return adhanStyles.find(style => style.id === id);
};

export const getDefaultAdhanStyle = (): AdhanStyle => {
  return adhanStyles[0]; // Makkah as default
};
