import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText, Crown, Shield, Award } from 'lucide-react';
import { PROJECT_METADATA, CORE_SERVICES, PRICING_TIERS, SAFEGUARD_POINTS } from '../data/presentationData';

interface ExecutiveSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveSummaryModal: React.FC<ExecutiveSummaryModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const summaryText = `
وثيقة مشروع: منصة التعلم الذكي المدعومة بالذكاء الاصطناعي للمناهج المغربية (طالب ذكي - TalibAI)
الرؤية: منصة تعليمية ذكية للتلاميذ المغاربة تدمج بين الشرح المبسط للمناهج الوطنية ونظام التركيز الإدماني الإيجابي ولوحة متابعة الأب.
التوافق الملكي: تكافؤ الفرص، إدماج التكنولوجيا، محاربة الهدر المدرسي.
الخدمات:
1. المساعد الذكي للمناهج المغربية (شرح بأمثلة من الواقع المغربي).
2. نظام التركيز وبومودورو (كتم الإشعارات ومكافآت XP).
3. مولد الامتحانات التفاعلي (الموحد، الجهوي، الوطني مع التصحيح الفوري وتصدير PDF).
4. لوحة تحكم ولي الأمر (تقارير واتساب وطمأنينة دون تجسس).
الأسعار:
- المجانية: 0 درهم
- الابتدائي: 70 درهم/شهرياً
- الإعدادي: 100 درهم/شهرياً
- الثانوي: 160 درهم/شهرياً
طرق الدفع: CMI، كاش بلوس، وفاكاش، تعبئة الهاتف.
التحصين: Token Rate Limiter، الامتثال لقوانين CNDP، سيكولوجية التشجيع لا الرقابة.
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="liquid-glass-card rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col justify-between border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3EDE2]/10 bg-[#071326]/80">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F3EDE2]">
            <FileText className="w-4 h-4 text-[#D4B996]" />
            <span>الملخص التنفيذي للمشروع (Executive Pitch Brief)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="py-1 px-3 rounded-lg liquid-glass-beige-card hover:bg-white/10 text-xs text-[#D4B996] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الملخص'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-1 px-3 rounded-lg liquid-glass-beige-card hover:bg-white/10 text-xs text-[#38BDF8] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A2B4C7] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 text-right text-xs leading-relaxed">
          {/* Title and Vision */}
          <div className="border-b border-[#F3EDE2]/10 pb-4 space-y-2">
            <div className="flex items-center gap-2 text-[#D4B996] text-[11px] font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>{PROJECT_METADATA.royalAlignment.title}</span>
            </div>
            <h2 className="text-xl font-black text-[#F3EDE2]">{PROJECT_METADATA.nameAr}</h2>
            <p className="text-[#C2D2E2]">{PROJECT_METADATA.visionStatement}</p>
          </div>

          {/* Core Services Brief */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#38BDF8] text-sm">الخدمات الأساسية الأربعة:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CORE_SERVICES.map(service => (
                <div key={service.id} className="p-3 rounded-xl bg-[#071326] border border-[#F3EDE2]/10 space-y-1">
                  <div className="font-bold text-[#F3EDE2]">{service.title}</div>
                  <div className="text-[11px] text-[#A2B4C7]">{service.tagline}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#D4B996] text-sm">هيكل الأسعار المقترح:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRICING_TIERS.map(p => (
                <div key={p.id} className="p-2.5 rounded-xl liquid-glass-beige-card text-center space-y-0.5">
                  <div className="text-[11px] text-[#A2B4C7]">{p.name}</div>
                  <div className="text-base font-bold text-[#F3EDE2] font-mono">{p.price} د.م</div>
                  <div className="text-[10px] text-[#D4B996]">{p.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Safeguards Summary */}
          <div className="space-y-2">
            <h3 className="font-bold text-emerald-400 text-sm">الأمان والاستدامة:</h3>
            <ul className="space-y-1.5 text-[#C2D2E2]">
              <li>• <strong>Token Limit:</strong> ضبط استهلاك الـ LLM لحماية ميزانية الخوادم.</li>
              <li>• <strong>CNDP:</strong> تشفير كامل لبيانات القاصرين وعدم مشاركتها خارجياً.</li>
              <li>• <strong>سيكولوجية التحفيز:</strong> لوحة الأب صممت كأداة فخر وتشجيع ومكافأة وليس للتجسس.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#F3EDE2]/10 bg-[#071326]/80 flex justify-between items-center text-[11px] text-[#A2B4C7]">
          <span>منصة طالب ذكي - وثيقة العرض الأولي للمستثمرين وأولياء الأمور</span>
          <span>المغرب 2026</span>
        </div>
      </div>
    </div>
  );
};
