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
    id: "custom",
    name: "Custom",
    nameBn: "কাস্টম",
    audioUrl: "/azan1.mp3",
    muezzin: "Custom Adhan"
  }
];

export const getAdhanStyle = (id: string): AdhanStyle | undefined => {
  return adhanStyles.find(style => style.id === id);
};

export const getDefaultAdhanStyle = (): AdhanStyle => {
  return adhanStyles[0]; // Custom as default
};
