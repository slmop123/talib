import React, { useState } from 'react';
import { 
  Sparkles, 
  Crown, 
  Compass, 
  Layers, 
  Cpu, 
  Flame, 
  CreditCard, 
  ShieldCheck, 
  Play, 
  FileText, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  ChevronLeft
} from 'lucide-react';

interface RightNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPitchSlides: () => void;
  onOpenExecutiveSummary: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const RightNavbar: React.FC<RightNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenPitchSlides,
  onOpenExecutiveSummary,
  soundEnabled,
  onToggleSound,
}) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'الافتتاحية والرؤية', icon: Crown, badge: 'المغرب' },
    { id: 'services', label: 'أعمدة الخدمات', icon: Layers, badge: '4 ركائز' },
    { id: 'simulators', label: 'المختبر التفاعلي', icon: Cpu, badge: 'تجربة حية' },
    { id: 'gamification', label: 'التحفيز الإدماني', icon: Flame, badge: 'XP & Streaks' },
    { id: 'pricing', label: 'الباقات والجدوى', icon: CreditCard, badge: 'من 0 د.م' },
    { id: 'safeguards', label: 'التحصين و CNDP', icon: ShieldCheck, badge: 'أمان تام' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Right Edge Trigger Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="تبديل القائمة الجانبية"
          className="liquid-glass-card p-3 rounded-2xl text-[#F3EDE2] hover:text-[#38BDF8] border border-[#F3EDE2]/20 shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          {isOpenMobile ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Menu className="w-5 h-5 text-[#D4B996]" />}
          <span className="text-xs font-semibold tracking-wide">القائمة</span>
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* The Right-Side Navigation Bar (الناف بار في اليمين) */}
      <aside 
        className={`fixed top-0 right-0 h-full w-72 z-40 flex flex-col justify-between py-6 px-4 liquid-glass-nav transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Brand in Navbar */}
        <div>
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#F3EDE2]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284C7] via-[#1E40AF] to-[#D4B996] p-[1.5px] shadow-lg shadow-[#0284C7]/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#071326] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#38BDF8]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-[#F3EDE2] tracking-tight">طالب ذكي</span>
                  <span className="text-xs text-[#D4B996] font-mono">TalibAI</span>
                </div>
                <div className="text-[11px] text-[#A2B4C7] flex items-center gap-1">
                  <span>منظومة مغربية</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-[#38BDF8]" />
                  <span>عرض الفكرة</span>
                </div>
              </div>
            </div>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
              className="p-2 rounded-xl text-[#A2B4C7] hover:text-[#F3EDE2] hover:bg-[#F3EDE2]/5 border border-transparent hover:border-[#F3EDE2]/10 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#38BDF8]" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Pitch Mode Launcher Button */}
          <div className="mb-6 space-y-2">
            <button
              onClick={onOpenPitchSlides}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7]/30 via-[#2563EB]/40 to-[#D4B996]/30 hover:from-[#0284C7]/40 hover:to-[#D4B996]/40 border border-[#38BDF8]/40 hover:border-[#38BDF8]/70 text-[#F3EDE2] text-xs font-semibold flex items-center justify-between group shadow-lg shadow-[#0284C7]/15 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                <span>عرض السلايدات (Pitch Deck)</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">5 شرائح</span>
            </button>

            <button
              onClick={onOpenExecutiveSummary}
              className="w-full py-2 px-3 rounded-xl bg-[#F3EDE2]/5 hover:bg-[#F3EDE2]/10 border border-[#F3EDE2]/10 text-[#D4B996] hover:text-[#F3EDE2] text-xs font-medium flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#D4B996]" />
                <span>وثيقة الملخص التنفيذي</span>
              </span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section Navigation Items */}
          <div className="text-[11px] font-semibold text-[#A2B4C7]/70 uppercase tracking-wider px-2 mb-2">
            فصول العرض التقديمي
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group text-right ${
                    isActive
                      ? 'bg-gradient-to-l from-[#0284C7]/25 to-transparent text-[#F3EDE2] border-r-2 border-[#38BDF8] font-semibold shadow-inner'
                      : 'text-[#A2B4C7] hover:text-[#F3EDE2] hover:bg-[#F3EDE2]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#38BDF8]' : 'text-[#A2B4C7] group-hover:text-[#D4B996]'
                    }`} />
                    <span>{link.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                    isActive 
                      ? 'bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8]' 
                      : 'bg-transparent border-[#F3EDE2]/10 text-[#A2B4C7]/60 group-hover:text-[#A2B4C7]'
                  }`}>
                    {link.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area in Right Navbar */}
        <div className="pt-4 mt-auto border-t border-[#F3EDE2]/10">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#0F223D]/90 to-[#071326]/90 border border-[#D4B996]/20">
            <div className="flex items-center justify-between text-[11px] text-[#D4B996] font-medium mb-1">
              <span>ثيم التصميم</span>
              <span className="text-[#38BDF8]">Liquid Glass</span>
            </div>
            <p className="text-[10px] text-[#A2B4C7] leading-relaxed">
              أزرق أطلسي ملكي وبيج رمال الصحراء بتأثيرات زجاجية سائلة وانكسارات ضوئية ناعمة.
            </p>
          </div>
          <div className="mt-3 text-[10px] text-[#A2B4C7]/60 text-center">
            مشروع طالب ذكي © {new Date().getFullYear()} للمناهج المغربية
          </div>
        </div>
      </aside>
    </>
  );
};
