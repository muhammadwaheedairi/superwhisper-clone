'use client';

import React, { useState } from 'react';
import { FAQItem } from '../../types';
import { ChevronDown, ArrowRight } from 'lucide-react';

const items: FAQItem[] = [
  {
    question: 'Can I try Superwhisper for free?',
    answer: 'Yes! Superwhisper has a generous free tier that includes unlimited basic dictation and standard features. You only need to upgrade for advanced models and specialized workflows.'
  },
  {
    question: 'Will it work on my Intel Mac?',
    answer: 'Superwhisper is optimized for Apple Silicon (M1/M2/M3) for the best performance and battery life, but we do support Intel Macs running macOS 13 Ventura or later.'
  },
  {
    question: 'Which features are being worked on next?',
    answer: 'We are currently working on improved multi-language support, custom vocabulary expansion, and deeper integrations with popular writing apps like Obsidian and Notion.'
  },
  {
    question: 'Can I use my Pro license on all my devices?',
    answer: 'Yes, a single Pro license covers all your personal Macs signed into the same iCloud account.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12">
        <span className="text-zinc-500 text-sm font-medium mb-2 block">Support</span>
        <h2 className="text-3xl font-bold">Frequently asked questions</h2>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border-b border-zinc-800 pb-4">
            <button 
              className="w-full flex items-center justify-between py-4 text-left hover:text-zinc-300 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-lg font-medium text-zinc-200">{item.question}</span>
              <ChevronDown 
                className={`text-zinc-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-zinc-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8">
        <p className="text-zinc-500 mb-4 max-w-md">
            Can't find the answers you're looking for? Take a look in our Documentation. Click the button below to find the answers you need.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors">
            <span>Documentation</span>
            <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};