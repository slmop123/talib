import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  MessageSquare, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  Layers, 
  Maximize2
} from 'lucide-react';
import { SLIDES_CONTENT } from '../data/presentationData';

interface PresentationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaySound?: () => void;
}

export const PresentationModeModal: React.FC<PresentationModeModalProps> = ({
  isOpen,
  onClose,
  onPlaySound,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);

  const currentSlide = SLIDES_CONTENT[currentSlideIndex];
  const totalSlides = SLIDES_CONTENT.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  if (!isOpen) return null;

  const goToNext = () => {
    if (onPlaySound) onPlaySound();
    setCurrentSlideIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const goToPrev = () => {
    if (onPlaySound) onPlaySound();
    setCurrentSlideIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#040C18]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="liquid-glass-card rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col justify-between border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3EDE2]/10 bg-[#071326]/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#D4B996] flex items-center gap-1.5">
              <Crown className="w-4 h-4" />
              <span>عرض الشرائح التنفيذي (Pitch Deck Mode)</span>
            </span>
            <span className="text-[11px] text-[#A2B4C7]">
              الشريحة {currentSlideIndex + 1} من {totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                showSpeakerNotes
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8]/40 text-[#38BDF8]'
                  : 'bg-white/5 border-white/10 text-[#A2B4C7]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ملاحظات العرض (Speaker Notes)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A2B4C7] hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="إغلاق العرض"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Main Body Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-center relative">
          {/* Ambient Slide Backing Refraction */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#D4B996]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto w-full space-y-6 relative z-10 text-right">
            {/* Slide Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/15 px-2.5 py-0.5 rounded-md border border-[#38BDF8]/30">
                  {currentSlide.num}
                </span>
                <span className="text-xs text-[#D4B996] font-semibold">{currentSlide.kicker}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3EDE2] tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-sm md:text-base text-[#38BDF8] font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Core Highlight Quote */}
            <div className="p-4 rounded-2xl liquid-glass-beige-card border border-[#D4B996]/30 text-xs sm:text-sm text-[#F3EDE2] leading-relaxed">
              <strong className="text-[#D4B996] block mb-1">الرسالة الاستراتيجية للشريحة:</strong>
              "{currentSlide.highlight}"
            </div>

            {/* Bullets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {currentSlide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#061122]/80 border border-[#F3EDE2]/10 text-xs text-[#C2D2E2]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Speaker Notes Drawer (Optional Toggle) */}
            {showSpeakerNotes && (
              <div className="p-3.5 rounded-xl bg-[#030914] border border-[#38BDF8]/30 text-xs text-[#A2B4C7] space-y-1 animate-fadeIn">
                <span className="text-[10px] font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  <span>دليل الإلقاء والتأطير المقترح:</span>
                </span>
                <p className="leading-relaxed">{currentSlide.speakerNote}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className="px-6 py-4 border-t border-[#F3EDE2]/10 bg-[#071326]/60 flex items-center justify-between">
          {/* Slide Indicator Buttons */}
          <div className="flex items-center gap-2">
            {SLIDES_CONTENT.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => { if (onPlaySound) onPlaySound(); setCurrentSlideIndex(idx); }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-8 bg-gradient-to-r from-[#0284C7] to-[#D4B996]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`الانتقال إلى ${slide.title}`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              disabled={currentSlideIndex === 0}
              className="py-2 px-4 rounded-xl liquid-glass-beige-card hover:bg-white/10 disabled:opacity-40 text-xs text-[#F3EDE2] font-semibold flex items-center gap-1 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الشريحة السابقة</span>
            </button>

            <button
              onClick={goToNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-40 text-xs text-white font-bold flex items-center gap-1 transition-all shadow-md cursor-pointer"
            >
              <span>الشريحة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
