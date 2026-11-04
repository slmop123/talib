import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  Calculator, 
  Building2, 
  Store, 
  Smartphone, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import { PRICING_TIERS, PAYMENT_METHODS } from '../data/presentationData';

interface PricingCalculatorProps {
  onPlaySound?: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onPlaySound }) => {
  const [childrenCount, setChildrenCount] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState('middle');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

  // Traditional tutoring cost in Morocco: roughly 900 DH per month per student
  const traditionalMonthlyCost = childrenCount * 900;
  
  // Calculate TalibAI cost based on selection
  const planCosts: Record<string, number> = {
    free: 0,
    primary: 70,
    middle: 100,
    bac: 160
  };
  const talibMonthlyCost = (planCosts[selectedPlanId] || 100) * childrenCount;
  const monthlySavings = traditionalMonthlyCost - talibMonthlyCost;
  const yearlySavings = monthlySavings * 10; // 10 school months

  return (
    <section id="pricing" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] px-3 py-1 rounded-full liquid-glass-beige-card border border-[#38BDF8]/30">
          <CreditCard className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>المحور الخامس: هيكل التسعير واستراتيجية الدفع والعدالة الاجتماعية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          تعليم عالي الجودة بسعر أقل من حصة دعم واحدة
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          دراسة دقيقة للقدرة الشرائية للأسر المغربية مع تجاوز عائق الدفع الإلكتروني عبر كاش بلوس ووفاكاش.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {PRICING_TIERS.map((tier) => {
          const isSelected = tier.id === selectedPlanId;
          return (
            <div
              key={tier.id}
              onClick={() => { if (onPlaySound) onPlaySound(); setSelectedPlanId(tier.id); }}
              className={`rounded-3xl p-5 text-right transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                tier.popular
                  ? 'liquid-glass-card border-[#38BDF8] shadow-2xl shadow-[#0284C7]/25 lg:-translate-y-2'
                  : isSelected
                  ? 'liquid-glass-card border-[#D4B996] shadow-xl'
                  : 'liquid-glass-card border-[#F3EDE2]/15 hover:border-[#F3EDE2]/30'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white text-[10px] font-bold py-1 px-3 rounded-full shadow-md">
                  الأكثر طلباً للجهوي
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-base font-bold text-[#F3EDE2]">{tier.name}</h3>
                  <p className="text-[11px] text-[#A2B4C7] mt-0.5">{tier.targetAudience}</p>
                </div>

                <div className="mb-5 pb-4 border-b border-[#F3EDE2]/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#F3EDE2] font-mono tracking-tight">{tier.price}</span>
                    <span className="text-xs font-bold text-[#D4B996]">درهم مغربي</span>
                  </div>
                  <span className="text-[10px] text-[#A2B4C7]">{tier.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#C2D2E2]">
                      <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#F3EDE2]/10">
                <div className="p-2.5 rounded-xl bg-[#071326]/60 text-[11px] space-y-1">
                  <div className="text-[#38BDF8]">
                    <span className="font-bold">للتلميذ: </span>
                    <span>{tier.benefitsForChild}</span>
                  </div>
                  <div className="text-[#D4B996]">
                    <span className="font-bold">للأب: </span>
                    <span>{tier.benefitsForParent}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white'
                      : 'liquid-glass-beige-card hover:bg-white/10 text-[#F3EDE2] border border-[#F3EDE2]/20'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Family ROI & Savings Calculator */}
      <div className="liquid-glass-card rounded-3xl p-6 md:p-8 border border-[#D4B996]/30 space-y-6 mb-12">
        <div className="flex items-center justify-between pb-4 border-b border-[#F3EDE2]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4B996]/20 border border-[#D4B996]/40 flex items-center justify-center text-[#D4B996]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F3EDE2]">حاسبة التوفير العائلي مقابل الساعات الإضافية التقليدية</h3>
              <span className="text-[11px] text-[#A2B4C7]">مقارنة واقعية بتكاليف الدعم في المدن المغربية</span>
            </div>
          </div>

          <div className="text-xs text-[#D4B996] font-semibold">
            متوسط حصص الدعم: 900 درهم/شهرياً للطفل
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#A2B4C7] block mb-2">
                عدد الأبناء المتمدرسين في الأسرة:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => { if (onPlaySound) onPlaySound(); setChildrenCount(num); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      childrenCount === num
                        ? 'bg-[#0284C7] text-white shadow-md'
                        : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2]'
                    }`}
                  >
                    {num} {num === 1 ? 'ابن' : 'أبناء'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A2B4C7] block mb-2">
                الباقة المعتمدة في الحساب:
              </label>
              <select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl liquid-glass-beige-card border border-[#F3EDE2]/20 text-xs text-[#F3EDE2] bg-[#071326] focus:outline-none"
              >
                <option value="primary">المستوى الابتدائي (70 د.م/شهر)</option>
                <option value="middle">المستوى الإعدادي (100 د.م/شهر)</option>
                <option value="bac">المستوى الثانوي / البكالوريا (160 د.م/شهر)</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-7 p-5 rounded-2xl bg-[#061122]/90 border border-[#D4B996]/30 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F3EDE2]/10">
              <span className="text-[#A2B4C7]">تكلفة الساعات الإضافية المعتادة:</span>
              <span className="font-mono text-rose-400 font-bold line-through">{traditionalMonthlyCost} درهم / شهر</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F3EDE2]/10">
              <span className="text-[#A2B4C7]">اشتراك طالب ذكي لـ {childrenCount} تلاميذ:</span>
              <span className="font-mono text-[#38BDF8] font-bold">{talibMonthlyCost} درهم / شهر</span>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-[#0284C7]/20 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-300 font-bold block">مجموع التوفير الصافي للأسرة:</span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  +{monthlySavings} <span className="text-xs font-normal">درهم شهرياً</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-[#A2B4C7] block">توفير الموسم الدراسي (10 أشهر):</span>
                <span className="font-mono text-sm font-bold text-[#D4B996]">+{yearlySavings} درهم سنوياً</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Solutions for Morocco Grid */}
      <div className="space-y-4">
        <div className="text-right">
          <h3 className="text-base font-bold text-[#F3EDE2] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#38BDF8]" />
            <span>تجاوز عائق الدفع الإلكتروني: حلول مغربية محلية 100%</span>
          </h3>
          <p className="text-xs text-[#A2B4C7]">
            لأن 65% من الأسر تفضل الدفع النقدي (Cash) ولا تمتلك بطاقات دفع دولية، المنصة تعتمد شبكات الدفع المغربية المعتمدة:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PAYMENT_METHODS.map((method, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPaymentMethod(idx)}
              className={`p-4 rounded-2xl liquid-glass-card border transition-all cursor-pointer ${
                selectedPaymentMethod === idx
                  ? 'border-[#38BDF8] shadow-lg shadow-[#0284C7]/20 bg-[#0284C7]/10'
                  : 'border-[#F3EDE2]/10 hover:border-[#F3EDE2]/25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#D4B996] font-semibold bg-[#D4B996]/15 px-2 py-0.5 rounded">
                  {method.badge}
                </span>
                <span className="text-xs text-[#A2B4C7] font-mono">0{idx + 1}</span>
              </div>
              <h4 className="text-xs font-bold text-[#F3EDE2] mb-1">{method.name}</h4>
              <p className="text-[11px] text-[#A2B4C7] leading-relaxed">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
