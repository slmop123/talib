import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, HeartHandshake, School } from 'lucide-react';
import { PROJECT_METADATA } from '../data/presentationData';

export const VisionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'royal' | 'comparison'>('vision');

  const comparisonData = [
    {
      problem: "إدمان الهاتف وشبكات التواصل (TikTok / Reels) أثناء محاولة المذاكرة",
      solution: "نظام التركيز والبومودورو الذكي بوضع Gamified Focus يحجب الإشعارات ويكافئ التلميذ بـ XP وعملات افتراضية تفتح له وقتاً حراً",
      category: "التركيز ومحاربة التشتت"
    },
    {
      problem: "تكاليف الساعات الإضافية الباهظة (800 إلى 2500 درهم شهرياً) التي ترهق الأسر المغربية",
      solution: "اشتراك شهري رمزي (من 70 إلى 160 درهم) يغطي جميع المواد والامتحانات طيلة الشهر مع جودة فائقة وأسئلة غير محدودة",
      category: "تكافؤ الفرص والعدالة"
    },
    {
      problem: "شروحات الذكاء الاصطناعي الأجنبية الجامدة التي لا تفهم المناهج والأمثلة المغربية",
      solution: "مساعد ذكي تم تغذيته بالمقررات المغربية ويشرح بأمثلة حية من واقع المغرب وبالدارجة والفرنسية والعربية المبسطة",
      category: "ملاءمة المنهاج الوطني"
    },
    {
      problem: "قلق وتوتر الآباء المستمر وغياب أي مؤشر عن استفادة الابن أو هدر أموال الدعم",
      solution: "لوحة تحكم خاصة للأب مع تقارير واتساب ذكية توضح ساعات الدراسة ونقاط التعثر مع مقترحات لمكافأة الابن",
      category: "طمأنينة الأسرة"
    }
  ];

  return (
    <section id="vision" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4B996] px-3 py-1 rounded-full liquid-glass-beige-card border border-[#D4B996]/30">
          <Crown className="w-3.5 h-3.5 text-[#D4B996]" />
          <span>المحور الأول: التعريف بالمشروع والرؤية الاستراتيجية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          إعادة صياغة تجربة التعلم للتلميذ والأسرة المغربية
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          مشروع وطني يجمع بين الذكاء الاصطناعي البيداغوجي وسيكولوجية التحفيز لمواكبة التلميذ من الابتدائي حتى اجتياز البكالوريا.
        </p>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'vision'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E40AF] text-white shadow-md shadow-[#0284C7]/30 border border-white/20'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            الرؤية والهدف الشامل
          </button>
          <button
            onClick={() => setActiveTab('royal')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'royal'
                ? 'bg-gradient-to-r from-[#D4B996] to-[#A37E58] text-[#071326] shadow-md shadow-[#D4B996]/30 border border-white/30 font-bold'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            التوافق مع الرؤية الملكية
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E40AF] text-white shadow-md shadow-[#0284C7]/30 border border-white/20'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            المعاناة الحالية مقابل الحل الذكي
          </button>
        </div>
      </div>

      {/* Tab 1: Vision Overview */}
      {activeTab === 'vision' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="liquid-glass-card rounded-2xl p-6 md:p-8 border border-[#F3EDE2]/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold text-[#38BDF8] tracking-wider uppercase">البيان التأسيسي للمشروع</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#F3EDE2] leading-snug">
                  منصة تجمع بين الشرح المبسط للمناهج الوطنية، نظام التركيز الإدماني الإيجابي، وطمأنينة الوالدين.
                </h3>
                <p className="text-xs md:text-sm text-[#C2D2E2] leading-relaxed">
                  {PROJECT_METADATA.visionStatement}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-[#0284C7]/20 border border-[#38BDF8]/30 text-[#38BDF8]">
                    الاسم المقترح 1: طالب ذكي (TalibAI)
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-[#D4B996]/20 border border-[#D4B996]/30 text-[#D4B996]">
                    الاسم المقترح 2: دروسك المغرب (Dorousk Morocco)
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl liquid-glass-beige-card space-y-3 border border-[#D4B996]/20 text-right">
                <div className="text-xs font-bold text-[#D4B996] flex items-center gap-1.5">
                  <School className="w-4 h-4" />
                  <span>الفئات المستهدفة المعتمدة</span>
                </div>
                <ul className="text-xs text-[#F3EDE2] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>المستوى الابتدائي (الأول إلى السادس)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>المستوى الإعدادي (الأولى إلى الثالثة)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>المستوى الثانوي (الجذوع المشتركة والبكالوريا)</span>
                  </li>
                </ul>
                <div className="text-[10px] text-[#A2B4C7] pt-2 border-t border-[#F3EDE2]/10">
                  * تم استثناء الحضانة لعدم ملاءمتها للشات بوت ونمط التعلم الذاتي.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Royal Vision Alignment */}
      {activeTab === 'royal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {PROJECT_METADATA.royalAlignment.pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="liquid-glass-card rounded-2xl p-5 border border-[#D4B996]/20 hover:border-[#D4B996]/50 transition-all duration-300 relative group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4B996]/20 to-[#0284C7]/20 border border-[#D4B996]/40 flex items-center justify-center shrink-0 text-[#D4B996]">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#F3EDE2] group-hover:text-[#D4B996] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#A2B4C7] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Problem vs Solution */}
      {activeTab === 'comparison' && (
        <div className="space-y-3 animate-fadeIn">
          {comparisonData.map((item, idx) => (
            <div 
              key={idx}
              className="liquid-glass-card rounded-xl p-4 border border-[#F3EDE2]/10 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-3">
                <span className="text-[11px] font-bold text-[#D4B996] bg-[#D4B996]/15 px-2 py-0.5 rounded border border-[#D4B996]/25">
                  {item.category}
                </span>
              </div>
              <div className="md:col-span-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs text-rose-200/90 leading-relaxed">{item.problem}</span>
              </div>
              <div className="hidden md:flex md:col-span-1 justify-center">
                <ArrowRight className="w-4 h-4 text-[#38BDF8] rotate-180" />
              </div>
              <div className="md:col-span-4 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-emerald-100 font-medium leading-relaxed">{item.solution}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
