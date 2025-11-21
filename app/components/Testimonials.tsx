import React from 'react';
import { Play } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-black text-white">
      <div className="flex justify-center mb-12">
        <span className="px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium text-zinc-400 bg-white/5">
          Reviews
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Grid Layout */}
        <div className="flex flex-col gap-6">
          
          {/* Top Row: Full Width Card */}
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-[17px] leading-relaxed text-zinc-300 space-y-6 font-medium">
              <p>I have replaced typing emails with dictating them using a client-side hosted version of Whisper.</p>
              <p>The app I'm using is called <span className="text-white font-semibold">@superwhisperapp</span>.</p>
              <p>It runs natively on macOS and integrates with the system clipboard.</p>
              <p>I highly recommend it.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                    <img 
                      src="https://unavatar.io/twitter/maccaw" 
                      alt="Alex MacCaw"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                <div>
                  <div className="font-semibold text-white">Alex MacCaw</div>
                  <div className="text-sm text-zinc-500">@maccaw</div>
                </div>
              </div>
              
              {/* Reflect Notes Badge */}
              <a href="#" className="flex items-center gap-2 bg-[#1A1A1C] hover:bg-[#252528] px-3 py-1.5 rounded-lg border border-white/5 transition-colors group w-fit">
                <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Reflect Notes</span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* Christian */}
              <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between h-auto">
                 <div className="text-[17px] leading-relaxed text-zinc-300 space-y-6 font-medium">
                    <p>s/o to <span className="text-white font-semibold">@superwhisperapp</span>👏. easily best $ I've spent this week</p>
                    <p>been using Whisper on my iPhone, but needed the same for Mac (sorry, Apple, the dictation model isn't quite there...)</p>
                    <p>I freed up so much mental bandwidth...</p>
                 </div>
                 <div className="flex items-center gap-3 mt-8">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                      <img 
                        src="https://unavatar.io/twitter/curious_vii" 
                        alt="Christian"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Christian</div>
                      <div className="text-xs text-zinc-500">@curious_vii</div>
                    </div>
                 </div>
              </div>

              {/* Alex Volkov */}
              <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                 <div className="text-[17px] leading-relaxed text-zinc-300 space-y-6 font-medium">
                    <p>superwhisper is a great way to 'just talk' to your mac, it's way better than typing, and makes talking to chatGPT and other AIs super fun and easy.</p>
                    <p>Forget typing, just talk</p>
                 </div>
                 <div className="flex items-center gap-3 mt-8">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                      <img 
                        src="https://unavatar.io/twitter/altryne" 
                        alt="Alex Volkov"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Alex Volkov</div>
                      <div className="text-xs text-zinc-500">@altryne</div>
                    </div>
                 </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Francesco */}
              <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                 <div className="text-[17px] leading-relaxed text-zinc-300 font-medium">
                    <p>Superwhisper is an exciting new way to transcribe audio using AI saving you pesky administrative work</p>
                 </div>
                 <div className="flex items-center gap-3 mt-8">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                      <img 
                        src="https://unavatar.io/twitter/FrancescoD_Ales" 
                        alt="Francesco"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Francesco (ToolFinder.co)</div>
                      <div className="text-xs text-zinc-500">@FrancescoD_Ales</div>
                    </div>
                 </div>
              </div>

              {/* Dr. Palmer Piana */}
              <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                 <div className="text-[17px] leading-relaxed text-zinc-300 font-medium">
                    <p>"As a chiropractor, much of my day is spent writing reports. superwhisper has been amazing at helping me speed up that process. I love that the data never leaves my computer, so I know my data is safe."</p>
                 </div>
                 <div className="flex items-center gap-3 mt-8">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                      <img 
                        src="https://unavatar.io/twitter/palmerater" 
                        alt="Dr. Palmer Piana" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Dr. Palmer Piana</div>
                      <div className="text-xs text-zinc-500">@palmerater</div>
                    </div>
                 </div>
              </div>

              {/* Video Card - Fernando */}
              <div className="bg-[#0A0A0A] rounded-3xl border border-white/10 hover:border-white/20 transition-colors overflow-hidden group cursor-pointer">
                 <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center p-6 overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-[50px] opacity-50"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center transform group-hover:scale-105 transition-transform duration-500">
                         {/* Logo imitation */}
                         <div className="w-12 h-12 mb-2 bg-black rounded-xl flex items-center justify-center shadow-lg">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 18H20L12 4Z" fill="white" />
                             </svg>
                         </div>
                         <h3 className="text-black font-extrabold text-2xl tracking-tight opacity-80 mb-1">SuperWhisper</h3>
                         <div className="text-white font-black text-5xl drop-shadow-lg tracking-tighter rotate-[-2deg]">
                             TRY IT!
                         </div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play size={24} className="ml-1 text-black fill-black" />
                        </div>
                    </div>
                 </div>

                 <div className="p-5 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                      <img 
                        src="https://unavatar.io/twitter/fernandoanselmi" 
                        alt="Fernando Anselmi"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Fernando Anselmi</div>
                      <div className="text-xs text-zinc-500">@fernandoanselmi</div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};