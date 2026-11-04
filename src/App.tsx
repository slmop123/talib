/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RightNavbar } from './components/RightNavbar';
import { LiquidGlassHero } from './components/LiquidGlassHero';
import { VisionSection } from './components/VisionSection';
import { ServicesShowcase } from './components/ServicesShowcase';
import { InteractiveSimulators } from './components/InteractiveSimulators';
import { GamificationEngine } from './components/GamificationEngine';
import { PricingCalculator } from './components/PricingCalculator';
import { SafeguardsArchitecture } from './components/SafeguardsArchitecture';
import { PresentationModeModal } from './components/PresentationModeModal';
import { ExecutiveSummaryModal } from './components/ExecutiveSummaryModal';
import { Sparkles, Crown, ArrowUp, FileText, Play } from 'lucide-react';
import { PROJECT_METADATA } from './data/presentationData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPitchModeOpen, setIsPitchModeOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [simulatorTargetService, setSimulatorTargetService] = useState('ai-tutor');

  // Simple Web Audio API sound synthesizer for interactive feedback
  const playInteractionSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  // Section observer for scroll spy
  useEffect(() => {
    const sections = ['hero', 'vision', 'services', 'simulators', 'gamification', 'pricing', 'safeguards'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    playInteractionSound();
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulatorForService = (serviceId: string) => {
    playInteractionSound();
    setSimulatorTargetService(serviceId);
    const el = document.getElementById('simulators');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    playInteractionSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#071326] text-[#F3EDE2] relative selection:bg-[#38BDF8]/30 selection:text-white">
      {/* Liquid Caustic Background Wallpaper with Smooth Blend */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 -z-20 bg-cover bg-center mix-blend-screen transition-opacity duration-1000"
        style={{ backgroundImage: `url('/src/assets/images/liquid_glass_caustics_1793794960731.jpg')` }}
      />

      {/* Floating Ambient Glow Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-liquid-float" />
      <div className="fixed bottom-1/4 right-80 w-96 h-96 bg-[#D4B996]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* THE RIGHT NAVBAR (الناف بار في اليمين ليس الفوق) */}
      <RightNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPitchSlides={() => { playInteractionSound(); setIsPitchModeOpen(true); }}
        onOpenExecutiveSummary={() => { playInteractionSound(); setIsSummaryOpen(true); }}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area - Shifted for the Right Navbar on desktop (lg:mr-72 in RTL gives room on right) */}
      <main className="lg:mr-72 min-h-screen flex flex-col justify-between">
        <div className="relative z-10">
          {/* Top Subtle Announcement Ribbon (Not a navbar, a presentation banner) */}
          <header className="py-2.5 px-4 md:px-8 border-b border-[#F3EDE2]/10 bg-[#071326]/70 backdrop-blur-md flex items-center justify-between text-xs text-[#A2B4C7]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-[#F3EDE2]">عرض فكرة المشروع:</span>
              <span className="hidden sm:inline">منظومة الذكاء الاصطناعي للمناهج المغربية</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { playInteractionSound(); setIsPitchModeOpen(true); }}
                className="text-[11px] text-[#38BDF8] hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 text-[#38BDF8]" />
                <span>عرض السلايدات</span>
              </button>
              <span className="text-[#F3EDE2]/20">|</span>
              <button
                onClick={() => { playInteractionSound(); setIsSummaryOpen(true); }}
                className="text-[11px] text-[#D4B996] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3 text-[#D4B996]" />
                <span>الملخص التنفيذي</span>
              </button>
            </div>
          </header>

          {/* 1. Hero Presentation Section */}
          <LiquidGlassHero
            onExploreClick={() => handleNavigate('services')}
            onTrySimulator={() => handleNavigate('simulators')}
            onOpenPitch={() => { playInteractionSound(); setIsPitchModeOpen(true); }}
          />

          {/* 2. Vision & Royal Orientation Section */}
          <VisionSection />

          {/* 3. Core Services Breakdown */}
          <ServicesShowcase
            onOpenSimulatorForService={handleOpenSimulatorForService}
          />

          {/* 4. Interactive Live Simulators Sandbox */}
          <InteractiveSimulators
            initialServiceId={simulatorTargetService}
            onPlaySound={playInteractionSound}
          />

          {/* 5. Gamification & Positive Engagement Engine */}
          <GamificationEngine
            onPlaySound={playInteractionSound}
          />

          {/* 6. Pricing Strategy & Moroccan Payment Channels */}
          <PricingCalculator
            onPlaySound={playInteractionSound}
          />

          {/* 7. Safeguards, CNDP, & Token Rate Limits */}
          <SafeguardsArchitecture
            onPlaySound={playInteractionSound}
          />
        </div>

        {/* Global Footer in Main Content */}
        <footer className="mt-20 border-t border-[#F3EDE2]/10 py-10 px-6 md:px-12 bg-[#050E1C]/90 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A2B4C7]">
            <div className="space-y-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-extrabold text-[#F3EDE2] text-sm">طالب ذكي - TalibAI Morocco</span>
                <span className="text-[#D4B996] text-[10px] px-2 py-0.5 rounded bg-[#D4B996]/15 border border-[#D4B996]/30">
                  فكرة مشروع وطني
                </span>
              </div>
              <p className="text-[11px] text-[#A2B4C7]/80">
                منظومة التعلم الذكي الموجهة للتلاميذ المغاربة من الابتدائي إلى البكالوريا بثيم الليكويد جلاس.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => { playInteractionSound(); setIsPitchModeOpen(true); }}
                className="text-[#38BDF8] hover:underline cursor-pointer"
              >
                عرض السلايدات (Pitch Deck)
              </button>
              <span>·</span>
              <button
                onClick={() => { playInteractionSound(); setIsSummaryOpen(true); }}
                className="text-[#D4B996] hover:underline cursor-pointer"
              >
                وثيقة المشروع الكاملة
              </button>
              <span>·</span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl liquid-glass-beige-card hover:bg-white/10 text-[#F3EDE2] transition-colors cursor-pointer"
                title="العودة لأعلى الصفحة"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Presentation Pitch Deck Fullscreen Modal */}
      <PresentationModeModal
        isOpen={isPitchModeOpen}
        onClose={() => setIsPitchModeOpen(false)}
        onPlaySound={playInteractionSound}
      />

      {/* Executive Summary Printable Modal */}
      <ExecutiveSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </div>
  );
}
