import React from 'react';
import { WifiOff, Globe } from 'lucide-react';

export const Features: React.FC = () => {
  const tags = [
    'Taco Bell', '@liluzivert', 'Figma', 'PostgreSQL', 'GIF (Pronounced JIF)', 'JIRA', 
    'SAFE (Secure Access For Everyone)', 'Linear', 'Notion', 'Raycast'
  ];

  // Duplicate tags for seamless scrolling
  const marqueeTags = [...tags, ...tags];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 max-w-[880px] mx-auto">
      <div className="flex justify-center mb-12">
        <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-400 font-medium">
          Features
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* 100+ Languages */}
        <div className="relative h-64 w-full rounded-3xl border border-zinc-800 bg-[#0c0c0c] overflow-hidden group p-8 md:p-10 flex flex-col justify-center">
          <div className="relative z-10 max-w-md">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">100+ Languages</h3>
            <p className="text-zinc-400 text-lg font-medium">It can translate them all to English, too.</p>
          </div>
          {/* Globe Effect */}
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] opacity-30 pointer-events-none mix-blend-screen">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-600 via-zinc-800 to-transparent blur-3xl"></div>
             {/* Dotted Globe overlay simulation */}
             <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-20 mask-image-[radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
          </div>
          <Globe className="absolute right-12 top-1/2 -translate-y-1/2 text-zinc-800 opacity-20 w-48 h-48" strokeWidth={0.5} />
        </div>

        {/* Marquee Section */}
        <div 
          className="w-full overflow-hidden py-2"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
           <div className="flex gap-3 animate-scroll w-max">
             {marqueeTags.map((tag, i) => (
               <div key={i} className="px-5 py-3 rounded-xl border border-zinc-800 bg-[#0c0c0c] text-zinc-400 font-medium text-sm whitespace-nowrap hover:border-zinc-600 hover:text-zinc-200 transition-colors cursor-default select-none">
                 {tag}
               </div>
             ))}
           </div>
        </div>

        {/* Custom Vocabulary */}
        <div className="w-full rounded-3xl border border-zinc-800 bg-[#0c0c0c] p-8 md:p-10 relative overflow-hidden group min-h-[180px] flex flex-col justify-center">
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Use Custom Vocabulary</h3>
                <p className="text-zinc-400 text-lg font-medium">Allows you phrases, names, links, or acronyms.</p>
            </div>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
        </div>

        {/* Private & Secure */}
        <div className="w-full rounded-3xl border border-zinc-800 bg-[#0c0c0c] p-8 md:p-10 relative overflow-hidden min-h-[180px] flex flex-col justify-center">
            {/* Dot Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Private & Secure</h3>
                <p className="text-zinc-400 text-lg font-medium">Everything stays on your device.</p>
            </div>
        </div>

        {/* Offline First */}
        <div className="w-full rounded-3xl border border-zinc-800 bg-[#0c0c0c] p-8 md:p-10 relative overflow-hidden flex items-center justify-between min-h-[180px]">
            <div className="relative z-10 max-w-md pr-4">
                <h3 className="text-2xl font-bold text-white mb-2">Offline First</h3>
                <p className="text-zinc-400 text-lg font-medium">Everything happens on your device, no WiFi needed.</p>
            </div>
            <div className="relative z-0">
                 <WifiOff size={100} strokeWidth={1.5} className="text-zinc-800/80" />
            </div>
        </div>

        {/* Use with any app */}
        <div className="w-full rounded-3xl border border-zinc-800 bg-[#0c0c0c] p-8 md:p-10 relative overflow-hidden min-h-[180px] flex flex-col justify-center">
            <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl font-bold text-white mb-2">Use with any app</h3>
                <p className="text-zinc-400 text-lg font-medium">Works anywhere you can type or paste text. No need to switch apps.</p>
            </div>
        </div>

      </div>
    </section>
  );
};
