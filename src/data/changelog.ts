// App changelog - define what's new in each version
export interface ReleaseNote {
  version: string;
  date: string;
  features: string[];
  improvements?: string[];
  bugFixes?: string[];
}

export const changelog: ReleaseNote[] = [
  {
    version: '3.2',
    date: '২০২৫-১১-১১',
    features: [
      'নতুন version management system',
      'স্বয়ংক্রিয় update notification',
      'Update changelog display',
    ],
    improvements: [
      'User progress data সংরক্ষণ উন্নত করা হয়েছে',
      'Offline functionality আরও ভালো করা হয়েছে',
    ],
  },
  {
    version: '3.1',
    date: '২০২৫-১১-১১',
    features: [
      'Version tracking system চালু করা হয়েছে',
      'Manual update check button',
      'PWA update control',
    ],
  },
];

// Get release notes for a specific version
export const getReleaseNotes = (version: string): ReleaseNote | undefined => {
  return changelog.find(note => note.version === version);
};

// Get all versions newer than a given version
export const getNewVersions = (fromVersion: string): ReleaseNote[] => {
  const fromIndex = changelog.findIndex(note => note.version === fromVersion);
  if (fromIndex === -1) return changelog;
  return changelog.slice(0, fromIndex);
};
