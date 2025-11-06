# Al-Quran - Islamic Companion PWA

A beautiful, modern Progressive Web App (PWA) built with React, TypeScript, and Tailwind CSS. Features Android Material Design with emerald green Islamic theming.

## 🌟 Features

- **Al-Quran Reader**: Browse all 114 Surahs with search functionality
- **Audio Recitations**: Listen to beautiful Quran recitations with player controls
- **Duas Collection**: Daily supplications and prayers in Arabic with translations
- **Zakat Calculator**: Calculate your Zakat obligations easily
- **Islamic Calendar**: Hijri dates and important Islamic events
- **Digital Tasbih**: Count your dhikr and remembrance
- **Tafsir**: Quran commentary and explanations
- **Qibla Finder**: Find prayer direction using device location
- **Bookmarks**: Save your favorite verses and pages
- **Settings**: Customize app experience

## 🎨 Design

- **Android Material Design** with bottom navigation and top app bar
- **Islamic Color Palette**: Emerald green (#0f766e) with gold accents
- **Responsive**: Mobile-first, optimized for Android devices
- **Beautiful Typography**: Arabic Amiri Quran font for authentic text
- **Smooth Animations**: Elegant transitions and hover effects
- **Dark Mode Support**: Auto-switching based on system preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd al-quran-pwa

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Local Testing

```bash
# Serve production build
npx http-server dist -p 8080

# Or with Python
python3 -m http.server 8080 --directory dist
```

## 📱 PWA Installation

The app is installable on Android Chrome:

1. Open the app in Chrome on Android
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. The app will appear as a native app icon

## 🔧 Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icons
- **Service Worker** - Offline support and caching

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/          # BottomNav, TopBar
│   ├── features/        # FeatureCard and feature-specific components
│   └── ui/              # shadcn UI components
├── pages/               # All route pages
│   ├── Home.tsx
│   ├── Surahs.tsx
│   ├── Audio.tsx
│   ├── Dua.tsx
│   ├── Zakat.tsx
│   ├── Calendar.tsx
│   ├── Tasbih.tsx
│   ├── Tafsir.tsx
│   ├── Qibla.tsx
│   ├── Bookmarks.tsx
│   └── Settings.tsx
├── lib/                 # Utilities
└── App.tsx             # Root component

public/
├── manifest.json        # PWA manifest
├── service-worker.js    # Service worker for offline support
├── icon-192.png        # App icon
└── icon-512.png        # App icon
```

## 🔄 Service Worker & Offline Support

The app includes a service worker that:
- Caches app shell for instant loading
- Enables offline browsing of visited pages
- Implements cache-first strategy for static assets
- Auto-updates when new version is deployed

## 🌐 Deployment

### GitHub Pages

1. Update `base` in `vite.config.ts` if needed
2. Build and deploy:

```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Vercel / Netlify

Simply connect your repository - they auto-detect Vite projects.

### Custom Server

Upload `dist/` folder contents to any static hosting.

## 🎯 Roadmap

- [ ] Complete Quran text integration with translations
- [ ] Audio streaming with offline caching
- [ ] Background audio playback (Media Session API)
- [ ] Prayer times calculator
- [ ] Advanced bookmark management
- [ ] Multiple translation options
- [ ] Verse-by-verse audio synchronization
- [ ] Share verses feature
- [ ] Reading progress tracking
- [ ] Cloud sync for bookmarks

## 📝 Original Repo Integration

This app is based on the [quran-v2](https://github.com/talha-171219/quran-v2) repository. To integrate existing data:

1. Copy Quran JSON data from original repo
2. Integrate audio files (see Audio Strategy below)
3. Import existing HTML/JS logic as needed

### Audio Strategy

For optimal performance:
- Use streaming with HTTP Range requests
- Implement progressive audio caching
- Generate low-bitrate previews (32-64 kbps) for instant playback
- Background download full-quality files

```bash
# Generate preview audio files
ffmpeg -i audio/original.mp3 -b:a 64k audio/preview.mp3
```

## 🧪 Testing Checklist

- [ ] App loads in <2s on 4G throttle
- [ ] Audio plays within 2s
- [ ] Offline mode works for visited pages
- [ ] Install prompt appears on Android Chrome
- [ ] Bottom navigation works correctly
- [ ] All routes navigate properly
- [ ] Dark mode switches correctly
- [ ] No console errors

## 📄 License

This project is open source and available for use.

## 🤲 Credits

Built with ❤️ for the Muslim community
