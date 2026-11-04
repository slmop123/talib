import React, { useState } from 'react';
import { Bot, Flame, FileCheck, HeartHandshake, CheckCircle, ChevronLeft, ArrowRight, Sparkles, Smartphone, Award, Cpu } from 'lucide-react';
import { CORE_SERVICES } from '../data/presentationData';
import { ServiceItem } from '../types';

interface ServicesShowcaseProps {
  onOpenSimulatorForService?: (serviceId: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onOpenSimulatorForService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CORE_SERVICES[0].id);

  const activeService = CORE_SERVICES.find(s => s.id === selectedServiceId) || CORE_SERVICES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return Bot;
      case 'Flame': return Flame;
      case 'FileCheck': return FileCheck;
      case 'ShieldHeart': return HeartHandshake;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] px-3 py-1 rounded-full liquid-glass-beige-card border border-[#38BDF8]/30">
          <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>المحور الثاني: هيكل الخدمات وكيف ستشتغل المنظومة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          أربعة أعمدة تقنية تصنع الفارق الحقيقي
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          تم تصميم الخدمات لتكون عملية، واقعية، ومصممة خصيصاً للمجتمع والمنهاج الدراسي المغربي.
        </p>
      </div>

      {/* Services Grid Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {CORE_SERVICES.map((service) => {
          const Icon = getIcon(service.iconName);
          const isSelected = service.id === selectedServiceId;
          return (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`p-4 rounded-2xl text-right transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'liquid-glass-card border-[#38BDF8]/70 shadow-lg shadow-[#0284C7]/20 scale-[1.02]'
                  : 'liquid-glass-beige-card hover:bg-[#F3EDE2]/10 border-[#F3EDE2]/10'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#D4B996]" />
              )}
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-[#0284C7] text-white' : 'bg-[#F3EDE2]/10 text-[#D4B996] group-hover:text-white'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono ${
                  isSelected ? 'text-[#38BDF8]' : 'text-[#A2B4C7]'
                }`}>
                  {service.subtitle.split(' ')[0]}
                </span>
              </div>
              <h3 className={`text-xs sm:text-sm font-bold tracking-tight ${
                isSelected ? 'text-[#F3EDE2]' : 'text-[#C2D2E2] group-hover:text-[#F3EDE2]'
              }`}>
                {service.title}
              </h3>
              <p className="text-[11px] text-[#A2B4C7] line-clamp-1 mt-1">
                {service.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Service Detailed Architecture Card */}
      <div className="liquid-glass-card rounded-3xl p-6 md:p-8 border border-[#F3EDE2]/20 relative overflow-hidden">
        {/* Background glow and subtle specular */}
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 glass-reflection pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Service Info & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#D4B996] bg-[#D4B996]/15 px-3 py-1 rounded-full border border-[#D4B996]/30">
                  {activeService.badge}
                </span>
                <span className="text-xs text-[#A2B4C7] font-mono">{activeService.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F3EDE2]">
                {activeService.title}
              </h3>
              <p className="text-sm text-[#38BDF8] font-medium">
                {activeService.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#C2D2E2] leading-relaxed pt-1">
                {activeService.description}
              </p>
            </div>

            {/* Key Features Bullet List */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-[#F3EDE2] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>المزايا التشغيلية الرئيسية</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl liquid-glass-beige-card text-xs text-[#F3EDE2]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moroccan Touch Callout Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4B996]/15 to-[#0284C7]/15 border border-[#D4B996]/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4B996]/20 flex items-center justify-center text-[#D4B996] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4B996] block mb-0.5">البصمة واللمسة المغربية الخاصة:</span>
                <p className="text-xs text-[#C2D2E2] leading-relaxed">
                  {activeService.moroccanTouch}
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Sequence: "كيف يشتغل هذا العمود؟" */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#071326]/80 border border-[#F3EDE2]/15 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3EDE2]/10">
                <span className="text-xs font-bold text-[#F3EDE2] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#38BDF8]" />
                  <span>دورة العمل الميداني (4 مراحل)</span>
                </span>
                <span className="text-[10px] text-[#A2B4C7]">مسار الاستخدام</span>
              </div>

              <div className="space-y-3">
                {activeService.howItWorksSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0284C7] to-[#D4B996] text-[#071326] font-bold text-xs flex items-center justify-center shrink-0 shadow">
                      {step.step}
                    </div>
                    <div className="space-y-0.5 text-right">
                      <div className="text-xs font-bold text-[#F3EDE2]">{step.title}</div>
                      <div className="text-[11px] text-[#A2B4C7] leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Jump to interactive simulator CTA */}
              {onOpenSimulatorForService && (
                <div className="pt-3 border-t border-[#F3EDE2]/10">
                  <button
                    onClick={() => onOpenSimulatorForService(activeService.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7]/30 to-[#38BDF8]/20 hover:from-[#0284C7]/50 hover:to-[#38BDF8]/40 border border-[#38BDF8]/40 text-[#F3EDE2] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>شاهد هذا العمود في المختبر التفاعلي</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
