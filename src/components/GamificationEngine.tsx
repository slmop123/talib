import React, { useState } from 'react';
import { Flame, Trophy, Crown, Sparkles, Award, Shield, Users, Lock, Unlock, Check, Star } from 'lucide-react';
import { GAMIFICATION_LEVELS } from '../data/presentationData';

interface GamificationEngineProps {
  onPlaySound?: () => void;
}

export const GamificationEngine: React.FC<GamificationEngineProps> = ({ onPlaySound }) => {
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(2);
  const [activeStreakDays, setActiveStreakDays] = useState(7);
  const [streakFrozen, setStreakFrozen] = useState(false);

  const selectedLevel = GAMIFICATION_LEVELS[selectedLevelIdx];

  const handleSelectLevel = (idx: number) => {
    if (onPlaySound) onPlaySound();
    setSelectedLevelIdx(idx);
  };

  const handleBoostStreak = () => {
    if (onPlaySound) onPlaySound();
    setActiveStreakDays(prev => prev + 1);
  };

  const sampleLeaderboard = [
    { rank: 1, name: "أميمة ز. (وجدة)", xp: "4,820 XP", streak: 21, badge: "عالم المستقبل", avatar: "👑" },
    { rank: 2, name: "ياسين م. (مراكش)", xp: "4,150 XP", streak: 18, badge: "نابغة الأكاديمية", avatar: "🌟" },
    { rank: 3, name: "سارة ب. (الرباط)", xp: "3,890 XP", streak: 15, badge: "نابغة الأكاديمية", avatar: "🚀" },
    { rank: 4, name: "أيمن ت. (الدار البيضاء)", xp: "2,450 XP", streak: 7, badge: "فارس التركيز", avatar: "🎯", isCurrentUser: true },
    { rank: 5, name: "حمزة ك. (طنجة)", xp: "2,100 XP", streak: 6, badge: "فارس التركيز", avatar: "⚡" },
  ];

  return (
    <section id="gamification" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 px-3 py-1 rounded-full liquid-glass-beige-card border border-amber-400/30">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>المحور الرابع: سيكولوجية 'التحفيز الإدماني الإيجابي' (Gamified Engine)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          تحويل التعلم إلى شغف ذاتي مستوحى من ألعاب الفيديو
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          استعارة آليات الدوبامين الإيجابي من Duolingo وألعاب الأبطال ليدخل التلميذ المنصة برغبته وبلا إكراه من الأب.
        </p>
      </div>

      {/* 4 Pillars of Gamification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* 1. XP & Levels */}
        <div className="liquid-glass-card rounded-2xl p-5 border border-[#F3EDE2]/15 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F3EDE2]">نقاط الخبرة والمستويات (XP & Levels)</h3>
              <span className="text-[11px] text-[#A2B4C7]">من مبتدئ إلى عالم المستقبل</span>
            </div>
          </div>
          <p className="text-xs text-[#C2D2E2] leading-relaxed">
            كلما أتم التلميذ جلسة بومودورو أو حل مسألة رياضية بنجاح، يكسب نقاط خبرة (XP) تصعد به في مراتب الشرف وتمنحه اعترافاً بجهده.
          </p>
        </div>

        {/* 2. Streaks Flame */}
        <div className="liquid-glass-card rounded-2xl p-5 border border-[#D4B996]/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F3EDE2]">سلسلة الأيام المتتالية (Streaks 🔥)</h3>
              <span className="text-[11px] text-amber-300">أنت في اليوم الـ 7! لا تكسر السلسلة</span>
            </div>
          </div>
          <p className="text-xs text-[#C2D2E2] leading-relaxed">
            عداد الاستمرارية اليومية الذي يستغل الدافع النفسي لحماية الإنجاز؛ فيجعل التلميذ يفتح التطبيق يومياً حتى لا يفقد رقمه القياسي.
          </p>
        </div>

        {/* 3. Unlockable Moroccan Rewards */}
        <div className="liquid-glass-card rounded-2xl p-5 border border-[#D4B996]/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4B996]/20 border border-[#D4B996]/40 flex items-center justify-center text-[#D4B996]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F3EDE2]">مكافآت التحرير الموجه (Unlockables)</h3>
              <span className="text-[11px] text-[#D4B996]">تخصيص المساعد بالهوية المغربية</span>
            </div>
          </div>
          <p className="text-xs text-[#C2D2E2] leading-relaxed">
            جوائز رقمية ممتعة يفتحها التلميذ: كإلباس المساعد الذكي الطربوش الفاسي أو الجلابة المغربية، وفتح خلفيات معمارية زجاجية فخمة.
          </p>
        </div>

        {/* 4. Safe Leaderboards */}
        <div className="liquid-glass-card rounded-2xl p-5 border border-[#F3EDE2]/15 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F3EDE2]">لوحة الصدارة الآمنة (Safe Leaderboards)</h3>
              <span className="text-[11px] text-purple-300">تنافس شريف بدون إفشاء بيانات</span>
            </div>
          </div>
          <p className="text-xs text-[#C2D2E2] leading-relaxed">
            لوحة صدارة اختيارية تجمع تلاميذ المستوى الإشهادي في المغرب لتأجيج الحماس الإيجابي والتنافس، مع إخفاء الأسماء الكاملة والبيانات الحساسة.
          </p>
        </div>
      </div>

      {/* Interactive Level Progression Explorer */}
      <div className="liquid-glass-card rounded-3xl p-6 md:p-8 border border-[#F3EDE2]/20 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]/10">
          <div>
            <h3 className="text-sm font-bold text-[#F3EDE2] flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#D4B996]" />
              <span>خريطة ارتقاء الرتب الأكاديمية (انقر لاستعراض المزايا):</span>
            </h3>
            <span className="text-xs text-[#A2B4C7]">سلم التطور الأكاديمي داخل منظومة طالب ذكي</span>
          </div>

          <button
            onClick={handleBoostStreak}
            className="py-1.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🔥 محاكاة يوم إضافي في السلسلة: ({activeStreakDays} أيام)</span>
          </button>
        </div>

        {/* Level Progression Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {GAMIFICATION_LEVELS.map((lvl, idx) => {
            const isSelected = selectedLevelIdx === idx;
            return (
              <button
                key={lvl.level}
                onClick={() => handleSelectLevel(idx)}
                className={`p-3 rounded-2xl text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0284C7]/30 to-[#D4B996]/20 border border-[#38BDF8] shadow-lg shadow-[#0284C7]/20 scale-105'
                    : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] hover:bg-[#F3EDE2]/10 border border-[#F3EDE2]/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[#D4B996]">المستوى {lvl.level}</span>
                  <Star className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400 fill-amber-400' : 'text-[#A2B4C7]'}`} />
                </div>
                <div className="text-xs font-bold text-[#F3EDE2] truncate">{lvl.title}</div>
                <div className="text-[10px] text-[#38BDF8] mt-1 font-mono">{lvl.minXp} XP+</div>
              </button>
            );
          })}
        </div>

        {/* Active Selected Level Details */}
        <div className="p-5 rounded-2xl bg-[#061122]/90 border border-[#F3EDE2]/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center p-4 rounded-xl liquid-glass-beige-card border border-[#D4B996]/30 space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#D4B996] flex items-center justify-center text-2xl shadow-lg">
              {selectedLevel.level === 5 ? '👑' : selectedLevel.level >= 3 ? '🌟' : '🌱'}
            </div>
            <div className="font-extrabold text-sm text-[#F3EDE2]">{selectedLevel.title}</div>
            <div className="text-xs text-[#D4B996] font-semibold">{selectedLevel.badge}</div>
            <div className="text-[10px] text-[#A2B4C7] font-mono">الحد الأدنى: {selectedLevel.minXp} نقطة خبرة</div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-bold text-[#38BDF8] block">المزايا المفتوحة لهذا المستوى (Perks):</span>
            <div className="space-y-2">
              {selectedLevel.unlockedPerks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl liquid-glass-beige-card text-xs text-[#F3EDE2]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulated Moroccan Classroom Leaderboard */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#F3EDE2]">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>معاينة لوحة الصدارة الشريفة (مستوى البكالوريا - جهة الدار البيضاء سطات)</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-normal">تحديث مباشر</span>
          </div>

          <div className="space-y-1.5">
            {sampleLeaderboard.map((item) => (
              <div
                key={item.rank}
                className={`flex items-center justify-between p-3 rounded-xl text-xs transition-colors ${
                  item.isCurrentUser
                    ? 'bg-[#0284C7]/30 border border-[#38BDF8] text-white shadow-md'
                    : 'liquid-glass-beige-card text-[#C2D2E2] border border-[#F3EDE2]/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-950' : item.rank === 2 ? 'bg-slate-300 text-slate-950' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.rank}
                  </span>
                  <span className="text-base">{item.avatar}</span>
                  <div>
                    <span className="font-bold">{item.name}</span>
                    {item.isCurrentUser && (
                      <span className="mr-2 text-[10px] px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                        حسابك أنت
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-amber-400 font-mono text-[11px]">🔥 {item.streak} يوم</span>
                  <span className="font-bold font-mono text-[#D4B996]">{item.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
