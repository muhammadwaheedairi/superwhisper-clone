import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Demo } from './components/Demo';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Tutorials } from './components/Tutorials';
import { FAQ } from './components/FAQ';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
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
    </div>
  );
}