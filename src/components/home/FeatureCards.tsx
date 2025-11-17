import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  link?: string;
}

import mosque3d from '@/assets/icons/mosque.jpg';
import moreDuas3d from '@/assets/icons/more-duas-3d.png';
import store3d from '@/assets/icons/store-3d.png';

const defaultItems: CardItem[] = [
  {
    id: 'mosque_finder',
    title: 'Mosque Finder',
    subtitle: 'Locate nearby mosques',
    icon: mosque3d,
    link: '/mosque-finder',
  },
  {
    id: 'more_duas',
    title: 'More Duas',
    subtitle: 'Explore additional supplications',
    icon: moreDuas3d,
    link: '/more-duas',
  },
  {
    id: 'store',
    title: 'Store',
    subtitle: 'Shop Islamic products',
    icon: store3d,
    link: '/store',
  },
];

export const FeatureCards: React.FC<{ items?: CardItem[] }> = ({ items = defaultItems }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[480px] grid grid-cols-[1.5fr_1fr] gap-4">
        {/* Left large card */}
        <div className="h-[180px]">
          <Link to={items[0].link || '#'} className="h-full block">
            <div className="h-full relative rounded-xl overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 shadow-xl hover:scale-[1.01] transition-transform duration-200">
              <div className="h-full flex items-start">
                <div className="pr-4 flex-1">
                  <h3 className="text-white text-2xl font-semibold leading-tight">{items[0].title}</h3>
                  <p className="text-emerald-100/90 mt-1">{items[0].subtitle}</p>
                  <div className="mt-4">
                    <Link to={items[0].link || '#'}>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-800/20 border border-emerald-700 text-emerald-100/90 text-sm">
                        Go
                        <span className="ml-2 text-emerald-200">›</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* large decorative icon bottom-right */}
                <div className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 rounded-lg">
                  <div className="w-full h-full flex items-center justify-center">
                    {typeof items[0].icon === 'string' ? (
                      <img src={items[0].icon} alt="mosque" className="w-full h-full object-contain rounded-lg p-1" />
                    ) : (
                      items[0].icon
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right stacked cards (two rows) */}
        <div className="grid grid-rows-2 gap-4 h-[180px]">
          {[items[1], items[2]].map((it) => (
            <Link key={it.id} to={it.link || '#'} className="h-full block">
              <div className="h-full relative rounded-xl overflow-hidden bg-emerald-900/40 p-4 shadow-lg hover:translate-x-0 hover:scale-[1.01] transition-transform duration-200">
                <div className="flex h-full items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{it.title}</h4>
                    <p className="text-emerald-100/80 text-sm mt-1">{it.subtitle}</p>
                  </div>

                  <div className={cn('p-3 rounded-md bg-emerald-800/30')}>
                    {typeof it.icon === 'string' ? (
                      <img src={it.icon} alt={it.title} className="w-12 h-12 object-contain" />
                    ) : (
                      it.icon
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
