import React from 'react';

interface DuaCardProps {
  dua: {
    id: number;
    arabic: string;
    bengaliTranslation: string;
    transliteration?: string;
    reference?: string;
  };
  index: number;
}

const DuaCard: React.FC<DuaCardProps> = ({ dua, index }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm mb-6 border">
      <h3 className="text-xl font-semibold mb-4 text-primary">
        {index + 1}. {dua.bengaliTranslation.split('.')[0]} {/* Displaying the first sentence of the meaning as title */}
      </h3>
      <div className="text-right text-3xl font-arabic mb-4 leading-relaxed">
        {dua.arabic}
      </div>
      {dua.transliteration && (
        <div className="mb-4">
          <p className="font-semibold text-muted-foreground">উচ্চারণঃ</p>
          <p className="text-lg">{dua.transliteration}</p>
        </div>
      )}
      <div className="mb-4">
        <p className="font-semibold text-muted-foreground">অর্থঃ</p>
        <p className="text-lg">{dua.bengaliTranslation}</p>
      </div>
      {dua.reference && (
        <div className="text-sm text-muted-foreground">
          Reference: {dua.reference}
        </div>
      )}
    </div>
  );
};

export default DuaCard;
