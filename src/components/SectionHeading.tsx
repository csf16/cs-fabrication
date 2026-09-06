import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  desc?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  badge, 
  title, 
  desc, 
  light = false,
  align = 'left' 
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col gap-3.5 mb-14 ${isCenter ? 'items-center text-center' : 'items-start'}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
        light 
          ? 'bg-white/10 text-white/90 border border-white/20' 
          : 'bg-[#0049CA]/10 text-[#0049CA] border border-[#0049CA]/20'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-white' : 'bg-[#0049CA]'}`} />
        <span>{badge}</span>
      </div>

      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.1] ${
        light ? 'text-white' : 'text-[#0F2130]'
      }`}>
        {title}
      </h2>

      {desc && (
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${
          light ? 'text-white/75' : 'text-[#647488]'
        }`}>
          {desc}
        </p>
      )}
    </div>
  );
};
