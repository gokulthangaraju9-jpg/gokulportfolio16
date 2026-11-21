import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import SocialLinks from './SocialLinks';

export default function HomeFlow() {
  return (
    <div className="flex flex-col w-full">
      <section id="home">
        <Hero />
      </section>

      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>

      <section id="social" className="scroll-mt-24">
        <SocialLinks />
      </section>
    </div>
  );
}
