import React from 'react';
import { Twitter, Youtube, MessageCircle, Github, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="flex items-center gap-2 mb-8 md:mb-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 19H22L12 2Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
                 <span className="font-medium text-zinc-300">superwhisper</span>
            </div>
            <div className="text-zinc-600 text-sm">
                © 2025
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 */}
            <div className="p-6 rounded-2xl bg-[#0F0F10] border border-zinc-900">
                <h4 className="text-zinc-400 font-semibold mb-4">Policies</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                    <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Refund policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                </ul>
            </div>

            {/* Column 2 */}
            <div className="p-6 rounded-2xl bg-[#0F0F10] border border-zinc-900">
                <h4 className="text-zinc-400 font-semibold mb-4">Resources & Support</h4>
                 <ul className="space-y-3 text-sm text-zinc-500">
                    <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Documentation & Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Manage Billing</a></li>
                </ul>
            </div>

             {/* Column 3 */}
            <div className="p-6 rounded-2xl bg-[#0F0F10] border border-zinc-900">
                <h4 className="text-zinc-400 font-semibold mb-4">Let's stay in touch!</h4>
                <p className="text-sm text-zinc-600 mb-4">Never miss news and updates about Superwhisper</p>
                <div className="flex gap-3">
                    <a href="#" className="p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"><Twitter size={18}/></a>
                    <a href="#" className="p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"><Github size={18}/></a>
                    <a href="#" className="p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"><Youtube size={18}/></a>
                    <a href="#" className="p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"><MessageCircle size={18}/></a>
                </div>
            </div>

             {/* Column 4 */}
            <div className="p-6 rounded-2xl bg-[#0F0F10] border border-zinc-900">
                <h4 className="text-zinc-400 font-semibold mb-4">Subscribe to our newsletter</h4>
                 <p className="text-sm text-zinc-600 mb-4">Carefully curated emails to keep you in the loop</p>
                 <div className="relative">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                        <ArrowRight size={14} />
                    </button>
                 </div>
            </div>

        </div>
      </div>
    </footer>
  );
};