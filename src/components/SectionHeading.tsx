import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  desc?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ badge, title, desc, light = false }) => {
  return (
    <div className="flex flex-col gap-4 mb-16 select-none">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#B59A68] uppercase font-bold">
          {badge}
        </span>
        {/* Technical line divider with C-channel cross-section profile outline */}
        <div className={`h-[1px] flex-1 ${light ? 'bg-[#F5F4EF]/15' : 'bg-[#34383B]/10'} flex items-center justify-end relative`}>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5 bg-inherit px-2">
            {/* C-channel profile silhouette */}
            <svg 
              className={`w-3.5 h-3.5 ${light ? 'stroke-[#F5F4EF]/40' : 'stroke-[#34383B]/40'} fill-none`} 
              strokeWidth="2" 
              viewBox="0 0 20 20"
            >
              <path d="M4 6 h8 v2.5 h-5 v3 h5 v2.5 h-8 Z" />
            </svg>
            <span className={`text-[7px] font-mono tracking-widest ${light ? 'text-[#F5F4EF]/40' : 'text-[#34383B]/40'}`}>
              SECTION REFERENCE // CS-FP
            </span>
          </div>
        </div>
      </div>

      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase font-sans ${light ? 'text-[#F5F4EF]' : 'text-[#17191B]'}`}>
        {title}
      </h2>

      {desc && (
        <p className={`text-sm max-w-xl font-light font-sans leading-relaxed ${light ? 'text-[#F5F4EF]/75' : 'text-[#34383B]/80'}`}>
          {desc}
        </p>
      )}
    </div>
  );
};
