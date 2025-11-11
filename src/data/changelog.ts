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
      'হাদিস persistent caching - refresh এ instant load',
      '✅ সম্পূর্ণ offline mode support',
    ],
    improvements: [
      'হাদিস IndexedDB cache থেকে তাৎক্ষণিক load',
      'Offline mode ERR_FAILED issue সমাধান',
      'Service Worker optimization',
      'Network error handling উন্নত',
    ],
    bugFixes: [
      'Page refresh এ hadith reload issue ঠিক',
      'Offline navigation issue সমাধান',
      'Service worker conflict সমাধান',
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
