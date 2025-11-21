'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [isStudent, setIsStudent] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Free Plan */}
        <div className="p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-1">Free</h3>
            <div className="text-5xl font-bold my-6 flex items-baseline">
                $0 <span className="text-lg font-normal text-zinc-500 ml-2">USD<br/>per month</span>
            </div>
            <p className="text-zinc-400 mb-8">Must-have features for everyday use.</p>
            
            <ul className="space-y-4 mb-8">
                {[
                    'Voice to text that works in any app',
                    'Meeting recording and transcription',
                    'Unlimited use of small voice models',
                    'Custom prompt control',
                    'Email Support'
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <Check size={20} className="text-zinc-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-3xl bg-[#080820] border border-blue-900/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
                 <div className="flex items-center gap-2 bg-zinc-800/50 rounded-full p-1 pr-3 cursor-pointer" onClick={() => setIsStudent(!isStudent)}>
                    <div className={`w-4 h-4 rounded-full transition-colors ${isStudent ? 'bg-blue-500' : 'bg-zinc-600'}`} />
                    <span className="text-xs font-medium text-zinc-300">Student Discount</span>
                 </div>
            </div>

            <h3 className="text-2xl font-bold mb-1 text-blue-100">Pro</h3>
            <div className="text-5xl font-bold my-6 flex items-baseline text-white">
                ${isStudent ? '4.25' : '8.49'} <span className="text-lg font-normal text-zinc-400 ml-2">USD<br/>per month</span>
            </div>
            <p className="text-blue-200/70 mb-8">Advanced tools for a refined workflow.</p>

             <ul className="space-y-4 mb-8">
                <li className="text-sm text-white font-semibold">Everything in Free, plus:</li>
                {[
                    'Use your own AI API Keys',
                    'Unlimited use of Cloud and Local AI models',
                    'Translate any language to English',
                    'Transcribe audio and video files',
                    'Priority Support'
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-50">
                        <Check size={20} className="text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                    </li>
                ))}
            </ul>

            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">
                Get Pro
            </button>
        </div>
      </div>
    </section>
  );
};