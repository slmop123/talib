import React from 'react';
import { Sparkles, Crown, ArrowDown, Play, Shield, Compass, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { PROJECT_METADATA } from '../data/presentationData';

interface LiquidGlassHeroProps {
  onExploreClick: () => void;
  onTrySimulator: () => void;
  onOpenPitch: () => void;
}

export const LiquidGlassHero: React.FC<LiquidGlassHeroProps> = ({
  onExploreClick,
  onTrySimulator,
  onOpenPitch,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background Liquid Glass Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#D4B996]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Royal Alignment Badge */}
      <div className="max-w-4xl mx-auto w-full mb-6 text-center">
        <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full liquid-glass-beige-card text-[#D4B996] text-xs font-semibold shadow-md sand-gold-glow">
          <Crown className="w-4 h-4 text-[#D4B996] animate-pulse" />
          <span>تثمين التوجيهات الملكية السامية: رقمنة التعليم، تكافؤ الفرص، ومحاربة الهدر المدرسي</span>
        </div>
      </div>

      {/* Main Grid: Headline & Visual Pitch Card */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (in RTL: Right side content): Executive Headline & Pitch */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>عرض تقديمي تفاعلي متكامل لفكرة المشروع (Pitch & Architecture)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3EDE2] tracking-tight leading-[1.25]">
              منصة <span className="bg-gradient-to-r from-[#38BDF8] via-[#F3EDE2] to-[#D4B996] bg-clip-text text-transparent">طالب ذكي</span> (TalibAI)
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4B996] block mt-1">
                التعليم الذكي للمناهج المغربية
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#C2D2E2] leading-relaxed max-w-xl">
              هندسة شاملة توضح <strong>كيف ستشتغل الفكرة على أرض الواقع</strong>: بين الشرح الذكي المبسط بأمثلة من المعيش المغربي، ونظام التحفيز الإدماني الإيجابي ضد تشتت الهواتف، ولوحة طمأنينة الآباء والامتثال لمعايير CNDP.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onTrySimulator}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-sm font-bold shadow-lg shadow-[#0284C7]/30 hover:shadow-[#0284C7]/50 border border-white/20 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F3EDE2] group-hover:rotate-12 transition-transform" />
              <span>تجربة المختبر والمحاكاة الحية</span>
            </button>

            <button
              onClick={onOpenPitch}
              className="py-3 px-5 rounded-xl liquid-glass-card hover:bg-white/10 text-[#F3EDE2] text-sm font-semibold border border-[#D4B996]/30 hover:border-[#D4B996]/60 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#D4B996]" />
              <span>عرض السلايدات (Pitch Deck)</span>
            </button>

            <button
              onClick={onExploreClick}
              className="py-3 px-4 rounded-xl text-xs text-[#A2B4C7] hover:text-[#F3EDE2] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>استكشف الخدمات</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#F3EDE2]/10">
            <div className="p-2.5 rounded-xl liquid-glass-beige-card text-right">
              <div className="text-xs font-bold text-[#38BDF8]">100% مغربية</div>
              <div className="text-[11px] text-[#A2B4C7]">مقررات وأطر وطنية</div>
            </div>
            <div className="p-2.5 rounded-xl liquid-glass-beige-card text-right">
              <div className="text-xs font-bold text-[#D4B996]">بومودورو ذكي</div>
              <div className="text-[11px] text-[#A2B4C7]">حجب المشتتات و XP</div>
            </div>
            <div className="p-2.5 rounded-xl liquid-glass-beige-card text-right">
              <div className="text-xs font-bold text-[#38BDF8]">لوحة ولي الأمر</div>
              <div className="text-[11px] text-[#A2B4C7]">إشعارات واتساب مريحة</div>
            </div>
            <div className="p-2.5 rounded-xl liquid-glass-beige-card text-right">
              <div className="text-xs font-bold text-[#D4B996]">يبدأ بـ 0 درهم</div>
              <div className="text-[11px] text-[#A2B4C7]">وكاش بلوس / CMI</div>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Liquid Glass Feature Card) */}
        <div className="lg:col-span-5 relative">
          <div className="liquid-glass-card rounded-3xl p-3 border border-[#F3EDE2]/20 shadow-2xl relative overflow-hidden group">
            {/* Top Gloss Reflection */}
            <div className="absolute inset-0 glass-reflection pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0A192F]">
              <img
                src="/src/assets/images/hero_talibai_morocco_1793794959872.jpg"
                alt="فكرة منصة طالب ذكي بالمغرب"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay Pill on Image */}
              <div className="absolute bottom-3 right-3 left-3 p-3 rounded-xl liquid-glass-card border border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0284C7]/80 flex items-center justify-center text-white">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">دروسك Morocco AI</div>
                    <div className="text-[10px] text-[#A2B4C7]">من الابتدائي إلى البكالوريا</div>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-[#D4B996] font-semibold bg-[#D4B996]/15 px-2 py-0.5 rounded-md border border-[#D4B996]/30">
                    أثر مجتمعي
                  </span>
                </div>
              </div>
            </div>

            {/* Quick interactive quote card */}
            <div className="mt-3 p-3.5 rounded-xl bg-[#091C36]/80 border border-[#F3EDE2]/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#D4B996] font-medium">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>فلسفة المشروع الأساسية</span>
                </span>
                <span className="text-[11px] text-[#A2B4C7]">وثيقة العمل</span>
              </div>
              <p className="text-xs text-[#C2D2E2] leading-relaxed">
                "ليس سجنًا رقميًا يرفضه التلميذ، بل لعبة ذكية تحفز شغفه بالتعلم، واستثمار يمنح الأب الطمأنينة الكاملة دون توتر المراقبة الخانقة."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
