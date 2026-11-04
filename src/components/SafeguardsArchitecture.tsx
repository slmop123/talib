import React, { useState } from 'react';
import { ShieldCheck, Cpu, Lock, Smile, AlertCircle, CheckCircle2, ChevronRight, Server, Key, EyeOff } from 'lucide-react';
import { SAFEGUARD_POINTS } from '../data/presentationData';

interface SafeguardsArchitectureProps {
  onPlaySound?: () => void;
}

export const SafeguardsArchitecture: React.FC<SafeguardsArchitectureProps> = ({ onPlaySound }) => {
  const [activeSafeguardId, setActiveSafeguardId] = useState(SAFEGUARD_POINTS[0].id);

  const activeSafeguard = SAFEGUARD_POINTS.find(s => s.id === activeSafeguardId) || SAFEGUARD_POINTS[0];

  return (
    <section id="safeguards" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 px-3 py-1 rounded-full liquid-glass-beige-card border border-emerald-400/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>المحور السادس: هندسة التحصين التقني والنفسي (Safeguards & CNDP)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          الاستدامة المالية والأمان النفسي للتلميذ
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          خطة محكمة لتفادي عيوب مشاريع الذكاء الاصطناعي: ضبط تكاليف الخوادم، تشفير CNDP، وإبعاد هاجس التلصص الأسري.
        </p>
      </div>

      {/* 3 Main Safeguards Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {SAFEGUARD_POINTS.map((item) => {
          const isSelected = item.id === activeSafeguardId;
          return (
            <div
              key={item.id}
              onClick={() => { if (onPlaySound) onPlaySound(); setActiveSafeguardId(item.id); }}
              className={`p-5 rounded-3xl text-right transition-all duration-300 relative cursor-pointer ${
                isSelected
                  ? 'liquid-glass-card border-[#38BDF8] shadow-xl shadow-[#0284C7]/20 scale-[1.02]'
                  : 'liquid-glass-beige-card hover:bg-[#F3EDE2]/10 border-[#F3EDE2]/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-[#D4B996] font-semibold bg-[#D4B996]/15 px-2 py-0.5 rounded border border-[#D4B996]/30">
                  {item.tag}
                </span>
                {item.id === 'token-quota' && <Cpu className="w-4 h-4 text-[#38BDF8]" />}
                {item.id === 'cndp-privacy' && <Lock className="w-4 h-4 text-emerald-400" />}
                {item.id === 'anti-surveillance' && <Smile className="w-4 h-4 text-amber-400" />}
              </div>

              <h3 className="text-sm font-bold text-[#F3EDE2] mb-1">{item.title}</h3>
              <p className="text-xs text-[#38BDF8] font-medium mb-2">{item.subtitle}</p>
              <p className="text-xs text-[#A2B4C7] leading-relaxed line-clamp-3">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Deep-Dive Architecture Console */}
      <div className="liquid-glass-card rounded-3xl p-6 md:p-8 border border-[#F3EDE2]/20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Detailed explanation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#D4B996]">تفاصيل التحصين الميداني:</span>
              <h4 className="text-xl font-bold text-[#F3EDE2]">{activeSafeguard.title}</h4>
              <p className="text-xs text-[#38BDF8]">{activeSafeguard.subtitle}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#C2D2E2] leading-relaxed">
              {activeSafeguard.desc}
            </p>

            {/* Sub-bullets depending on selected safeguard */}
            {activeSafeguard.id === 'token-quota' && (
              <div className="p-3.5 rounded-xl bg-[#061122] border border-[#38BDF8]/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#38BDF8] font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>آلية حماية الخوادم وميزانية الـ API:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#A2B4C7]">
                  <li>• كاش ذكي (Semantic Caching) للأسئلة الشائعة في الامتحانات الوطنية يقلل التكلفة بنسبة 60%.</li>
                  <li>• تحديد سقف 30 سؤالاً عالي الدقة يومياً في الباقات العادية، مع إعادة التعبئة التلقائية فجر كل يوم.</li>
                  <li>• خوارزمية تلخيص ذكية للمناهج تمنع إرسال نصوص المقررات كاملة في كل استدعاء.</li>
                </ul>
              </div>
            )}

            {activeSafeguard.id === 'cndp-privacy' && (
              <div className="p-3.5 rounded-xl bg-[#061122] border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Key className="w-3.5 h-3.5" />
                  <span>الامتثال للجنة الوطنية CNDP المغربية:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#A2B4C7]">
                  <li>• تشفير بيانات التلاميذ (الاسم، المستوى، الأداء) بتشفير AES-256 محلي.</li>
                  <li>• عدم استخدام بيانات واستفسارات التلاميذ في تدريب نماذج الذكاء الاصطناعي العامة.</li>
                  <li>• إمكانية حذف الحساب وسجل التعلم بنقرة واحدة بطلب من ولي الأمر.</li>
                </ul>
              </div>
            )}

            {activeSafeguard.id === 'anti-surveillance' && (
              <div className="p-3.5 rounded-xl bg-[#061122] border border-amber-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>فلسفة الحماية النفسية وعدم كسر الثقة:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#A2B4C7]">
                  <li>• الأب لا يرى "ماذا يكتب التلميذ بالتفصيل" ولا "تسجيل شاشة"، بل يرى مؤشرات النتيجة والجهد المبذول.</li>
                  <li>• كل إشعار يبدأ بنبرة فخر وإيجابية وتوصية بمكافأة مستحقة لتعزيز الترابط العائلي.</li>
                  <li>• حماية التلميذ من الشعور بالاختناق تجعله شريكاً في التطبيق لا محتالاً يحاول حذفه.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Visual Diagram on Left / Right in RTL */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#061122]/90 border border-[#F3EDE2]/15 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#0284C7] to-emerald-500 flex items-center justify-center text-white shadow-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-[#F3EDE2]">معيار الموثوقية الشامل</div>
              <p className="text-[11px] text-[#A2B4C7]">
                ثلاثية متوازنة تضمن استمرار المشروع بدون أزمات تقنية أو قانونية أو أسرية
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EDE2]/10 text-[10px]">
              <div className="p-2 rounded-lg bg-black/40">
                <span className="text-[#38BDF8] block font-bold">تقنية مستدامة</span>
                <span className="text-[#A2B4C7]">Token Limit</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40">
                <span className="text-emerald-400 block font-bold">قانونية محصنة</span>
                <span className="text-[#A2B4C7]">CNDP المغرب</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40">
                <span className="text-amber-400 block font-bold">تربوية حكيمة</span>
                <span className="text-[#A2B4C7]">شراكة لا تجسس</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
