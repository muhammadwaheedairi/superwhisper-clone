import React from 'react';
import { Navbar } from './app/components/Navbar';
import { Hero } from './app/components/Hero';
import { Features } from './app/components/Features';
import { Demo } from './app/components/Demo';
import { Testimonials } from './app/components/Testimonials';
import { Pricing } from './app/components/Pricing';
import { Tutorials } from './app/components/Tutorials';
import { FAQ } from './app/components/FAQ';
import { Footer } from './app/components/Footer';
import './app/globals.css';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <div id="demo">
          <Demo />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <Tutorials />
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}