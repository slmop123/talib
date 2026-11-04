import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Flame, 
  FileCheck, 
  HeartHandshake, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Send, 
  Download, 
  Lock, 
  Unlock, 
  Trophy, 
  MessageSquare, 
  Eye, 
  Share2, 
  Coins, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { SIMULATOR_QUESTIONS, EXAM_SAMPLES } from '../data/presentationData';

interface InteractiveSimulatorsProps {
  initialServiceId?: string;
  onPlaySound?: () => void;
}

export const InteractiveSimulators: React.FC<InteractiveSimulatorsProps> = ({ 
  initialServiceId = 'ai-tutor',
  onPlaySound 
}) => {
  const [activeTab, setActiveTab] = useState<'ai-tutor' | 'focus-pomodoro' | 'exam-generator' | 'parent-dashboard'>(
    (initialServiceId as any) || 'ai-tutor'
  );

  // Sync if prop changes
  useEffect(() => {
    if (initialServiceId && ['ai-tutor', 'focus-pomodoro', 'exam-generator', 'parent-dashboard'].includes(initialServiceId)) {
      setActiveTab(initialServiceId as any);
    }
  }, [initialServiceId]);

  // ----------------------------------------------------
  // SIMULATOR 1: AI TUTOR STATE
  // ----------------------------------------------------
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState([SIMULATOR_QUESTIONS[0]]);
  const [tutorXp, setTutorXp] = useState(45);

  const handleSelectPredefinedQuestion = (index: number) => {
    if (onPlaySound) onPlaySound();
    setIsAiThinking(true);
    setSelectedQuestionIndex(index);
    setTimeout(() => {
      setAiChatHistory([SIMULATOR_QUESTIONS[index]]);
      setIsAiThinking(false);
      setTutorXp(prev => prev + SIMULATOR_QUESTIONS[index].aiResponse.xpGained);
    }, 600);
  };

  const handleSendCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestionInput.trim()) return;
    if (onPlaySound) onPlaySound();
    setIsAiThinking(true);

    const newQuery = {
      id: `custom-${Date.now()}`,
      subject: "مقرر مغربي مخصص",
      level: "جميع المستويات",
      question: customQuestionInput,
      aiResponse: {
        intro: "تبارك الله عليك على هذا السؤال الذكي! ها كيفاش المنهاج المغربي كيشرح هاد المفهوم بطريقة بسيطة:",
        example: `تخيل معايا في سوق درب عمر أو الحومة ديالكم: لما كتحتاج تطبق (${customQuestionInput})، العقل البشري كيقسم المشكل لـ 3 خطوات منطقية تماماً بحال المقررات المغربية.`,
        rule: "القاعدة الذهبية المغربية: الفهم بالتحليل والتشبيه الواقعي كيثبت المفهوم فالعقل بنسبة 80% أكثر من الحفظ الأعمى.",
        mathBlock: "الخطوة 1: المعطيات  ->  الخطوة 2: الخاصية المعتمدة  ->  الخطوة 3: الاستنتاج النهائي",
        conclusion: "تبارك الله! جاوبتي على جوهر الدرس، دابا مستعد لأي تمرين فالامتحان الموحد!",
        xpGained: 20
      }
    };

    setTimeout(() => {
      setAiChatHistory([newQuery]);
      setIsAiThinking(false);
      setCustomQuestionInput('');
      setTutorXp(prev => prev + 20);
    }, 700);
  };

  // ----------------------------------------------------
  // SIMULATOR 2: POMODORO & FOCUS LOCK STATE
  // ----------------------------------------------------
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFocusLockActive, setIsFocusLockActive] = useState(true);
  const [blockedDistractionsCount, setBlockedDistractionsCount] = useState(14);
  const [pomodoroCoins, setPomodoroCoins] = useState(120);
  const [pomodoroStreak, setPomodoroStreak] = useState(5);
  const [isSpeedDemo, setIsSpeedDemo] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setPomodoroCoins(c => c + 25);
            setPomodoroStreak(s => s + 1);
            if (onPlaySound) onPlaySound();
            return 0;
          }
          return prev - 1;
        });
      }, isSpeedDemo ? 100 : 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isSpeedDemo]);

  const toggleTimer = () => {
    if (onPlaySound) onPlaySound();
    if (timerSeconds === 0) setTimerSeconds(25 * 60);
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (speed: boolean = false) => {
    if (onPlaySound) onPlaySound();
    setIsTimerRunning(false);
    setIsSpeedDemo(speed);
    setTimerSeconds(speed ? 10 : 25 * 60);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // SIMULATOR 3: EXAM GENERATOR STATE
  // ----------------------------------------------------
  const [selectedExamLevel, setSelectedExamLevel] = useState<'primary' | 'middle' | 'bac'>('middle');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const currentExam = EXAM_SAMPLES.find(e => e.level === selectedExamLevel) || EXAM_SAMPLES[1];

  const handleSelectExamLevel = (level: 'primary' | 'middle' | 'bac') => {
    if (onPlaySound) onPlaySound();
    setSelectedExamLevel(level);
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const handleOptionSelect = (id: string) => {
    if (isSubmitted) return;
    if (onPlaySound) onPlaySound();
    setSelectedOptionId(id);
  };

  const handleSubmitExamAnswer = () => {
    if (!selectedOptionId) return;
    if (onPlaySound) onPlaySound();
    setIsSubmitted(true);
  };

  // ----------------------------------------------------
  // SIMULATOR 4: PARENT DASHBOARD & WHATSAPP STATE
  // ----------------------------------------------------
  const [parentTone, setParentTone] = useState<'encouraging' | 'detailed'>('encouraging');
  const [childName, setChildName] = useState('أيمن');
  const [notificationSent, setNotificationSent] = useState(true);

  return (
    <section id="simulators" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4B996] px-3 py-1 rounded-full liquid-glass-beige-card border border-[#D4B996]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#D4B996]" />
          <span>المحور الثالث: المختبر التفاعلي الحي (Interactive Sandbox)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3EDE2]">
          شاهد كيف تشتغل كل خدمة على أرض الواقع
        </h2>
        <p className="text-xs sm:text-sm text-[#A2B4C7] leading-relaxed">
          انقر وجرب بنفسك كل ميزة؛ هذه محاكاة دقيقة تبرهن على المنطق التشغيلي والبيداغوجي للمنصة.
        </p>

        {/* Simulator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
          <button
            onClick={() => { if (onPlaySound) onPlaySound(); setActiveTab('ai-tutor'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'ai-tutor'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E40AF] text-white shadow-lg shadow-[#0284C7]/30 border border-white/20'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>المساعد المغربي</span>
          </button>

          <button
            onClick={() => { if (onPlaySound) onPlaySound(); setActiveTab('focus-pomodoro'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'focus-pomodoro'
                ? 'bg-gradient-to-r from-[#D4B996] to-[#A37E58] text-[#071326] shadow-lg shadow-[#D4B996]/30 border border-white/30'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>بومودورو والتركيز</span>
          </button>

          <button
            onClick={() => { if (onPlaySound) onPlaySound(); setActiveTab('exam-generator'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'exam-generator'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E40AF] text-white shadow-lg shadow-[#0284C7]/30 border border-white/20'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>مولد الامتحانات</span>
          </button>

          <button
            onClick={() => { if (onPlaySound) onPlaySound(); setActiveTab('parent-dashboard'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'parent-dashboard'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#1E40AF] text-white shadow-lg shadow-[#0284C7]/30 border border-white/20'
                : 'liquid-glass-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>لوحة ولي الأمر</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIMULATOR 1: MOROCCAN AI TUTOR */}
      {/* ========================================================================= */}
      {activeTab === 'ai-tutor' && (
        <div className="liquid-glass-card rounded-3xl p-5 md:p-7 border border-[#F3EDE2]/20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <Bot className="w-4 h-4" />
                  <span>محاكاة الشات بوت البيداغوجي (Moroccan AI Tutor Sandbox)</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  شغال بالمنهاج المغربي
                </span>
              </div>
              <p className="text-xs text-[#A2B4C7] mt-1">
                اختر تساؤلاً دراسياً نموذجياً أو اكتب سؤالك الخاص لمشاهدة أسلوب الشرح بالأمثلة المغربية الحية.
              </p>
            </div>

            <div className="flex items-center gap-2 liquid-glass-beige-card px-3 py-1.5 rounded-xl text-xs text-[#D4B996] border border-[#D4B996]/30">
              <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>مكسب الخبرة:</span>
              <span className="font-mono font-bold text-[#F3EDE2]">+{tutorXp} XP</span>
            </div>
          </div>

          {/* Quick Predefined Questions */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#A2B4C7] block">نماذج أسئلة من المقررات المغربية:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SIMULATOR_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectPredefinedQuestion(idx)}
                  className={`p-2.5 rounded-xl text-right text-xs transition-all cursor-pointer ${
                    selectedQuestionIndex === idx
                      ? 'bg-[#0284C7]/30 border border-[#38BDF8]/60 text-white shadow'
                      : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] hover:bg-[#F3EDE2]/10 border border-[#F3EDE2]/10'
                  }`}
                >
                  <span className="text-[10px] text-[#D4B996] block mb-0.5">{q.subject}</span>
                  <span className="line-clamp-1 font-medium">{q.question}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Window */}
          <div className="bg-[#061122]/90 rounded-2xl p-4 md:p-5 border border-[#F3EDE2]/10 space-y-4 min-h-[300px]">
            {aiChatHistory.map((chat) => (
              <div key={chat.id} className="space-y-4">
                {/* Student Bubble */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-[#0284C7]/30 border border-[#38BDF8]/40 rounded-2xl rounded-tr-none p-3.5 max-w-lg text-xs text-[#F3EDE2] shadow-sm">
                    <div className="text-[10px] text-[#38BDF8] font-bold mb-1 flex items-center justify-between">
                      <span>التلميذ ({chat.level})</span>
                      <span>سؤال المنهج المغربي</span>
                    </div>
                    <p className="leading-relaxed">{chat.question}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ت
                  </div>
                </div>

                {/* AI Tutor Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4B996] to-[#0284C7] text-[#071326] flex items-center justify-center text-xs font-bold shrink-0 shadow">
                    AI
                  </div>

                  <div className="bg-[#0B1E38]/90 border border-[#D4B996]/30 rounded-2xl rounded-tl-none p-4 max-w-2xl text-xs space-y-3 shadow-lg">
                    <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#F3EDE2]/10">
                      <span className="font-bold text-[#D4B996] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>مساعد طالب ذكي (شرح بالواقع المغربي)</span>
                      </span>
                      <span className="text-[10px] text-[#A2B4C7]">بيداغوجيا الفهم الذاتي</span>
                    </div>

                    {isAiThinking ? (
                      <div className="flex items-center gap-2 py-4 text-xs text-[#38BDF8]">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce" />
                        <span className="inline-block w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:0.2s]" />
                        <span className="inline-block w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:0.4s]" />
                        <span>جاري استحضار المثال المغربي وبناء خطوات الحل...</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-[#F3EDE2] font-medium leading-relaxed">{chat.aiResponse.intro}</p>

                        {/* Real Morocco Analogy Box */}
                        <div className="p-3 rounded-xl bg-[#D4B996]/10 border border-[#D4B996]/30 text-[#EED9C4] leading-relaxed">
                          <span className="text-[10px] font-bold text-[#D4B996] block mb-1">🇲🇦 التشبيه من المعيش اليومي المغربي:</span>
                          {chat.aiResponse.example}
                        </div>

                        {/* Rule and Formula */}
                        <div className="space-y-1.5">
                          <p className="text-[#C2D2E2] leading-relaxed">{chat.aiResponse.rule}</p>
                          <div className="p-2.5 rounded-lg bg-[#071326] font-mono text-center text-[#38BDF8] text-xs font-bold border border-[#38BDF8]/20 direction-ltr">
                            {chat.aiResponse.mathBlock}
                          </div>
                        </div>

                        <p className="text-[#A2B4C7] leading-relaxed pt-1 border-t border-[#F3EDE2]/10">
                          {chat.aiResponse.conclusion}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Custom Question Bar */}
          <form onSubmit={handleSendCustomQuestion} className="flex gap-2">
            <input
              type="text"
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              placeholder="جرب كتابة أي درس أو سؤال مغربي (مثلاً: اشرح لي قانون الجاذبية بتجربة سقوط كاس أتاي)..."
              className="flex-1 py-3 px-4 rounded-xl liquid-glass-beige-card border border-[#F3EDE2]/20 text-xs text-[#F3EDE2] placeholder-[#A2B4C7]/60 focus:outline-none focus:border-[#38BDF8] transition-colors"
            />
            <button
              type="submit"
              disabled={isAiThinking || !customQuestionInput.trim()}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATOR 2: POMODORO & FOCUS LOCK */}
      {/* ========================================================================= */}
      {activeTab === 'focus-pomodoro' && (
        <div className="liquid-glass-card rounded-3xl p-5 md:p-8 border border-[#F3EDE2]/20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#D4B996] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>محاكاة نظام التركيز والبومودورو الذكي (Gamified Focus Lock)</span>
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  مضاد التشتت والإدمان الرقمي
                </span>
              </div>
              <p className="text-xs text-[#A2B4C7] mt-1">
                بدل أن يكون سجناً يرفضه التلميذ، يتحول إلى لعبة تحفزه بحصد العملات وفتح أوقات الراحة الحرة.
              </p>
            </div>

            {/* Quick Speed Test Button for presentation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => resetTimer(true)}
                className="py-1.5 px-3 rounded-lg bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 text-[#38BDF8] border border-[#38BDF8]/30 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                اختبار سريع (عرض 10 ثوانٍ)
              </button>
              <button
                onClick={() => resetTimer(false)}
                className="p-1.5 rounded-lg liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10 transition-colors cursor-pointer"
                title="إعادة التعيين لـ 25 دقيقة"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* The Pomodoro Clock Visual */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#061122]/90 border border-[#F3EDE2]/15 relative overflow-hidden">
              {/* Radial ambient glow */}
              <div className={`absolute w-44 h-44 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${
                isTimerRunning ? 'bg-[#D4B996]/30' : 'bg-[#0284C7]/20'
              }`} />

              <div className="relative z-10 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4B996]/15 text-[#D4B996] border border-[#D4B996]/30">
                  <Flame className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-amber-400 animate-bounce' : 'text-[#D4B996]'}`} />
                  <span>{isTimerRunning ? 'جلسة دراسة مركزة جارية' : 'جاهز للانطلاق'}</span>
                </div>

                {/* Big Timer Digits */}
                <div className="font-mono text-5xl sm:text-6xl font-black text-[#F3EDE2] tracking-wider tabular-nums text-center drop-shadow-lg">
                  {formatTimer(timerSeconds)}
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={toggleTimer}
                    className={`py-3 px-6 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white shadow-[#0284C7]/30'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>إيقاف مؤقت</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>{timerSeconds === 0 ? 'بدء جلسة جديدة' : 'بدء التركيز (Start Pomodoro)'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsFocusLockActive(!isFocusLockActive)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                      isFocusLockActive
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {isFocusLockActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <span>{isFocusLockActive ? 'درع التركيز مفعل' : 'الدرع غير مفعل'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Gamification Counters & Distraction Block Simulation */}
            <div className="md:col-span-6 space-y-3">
              {/* Gamification Stats Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl liquid-glass-beige-card border border-[#D4B996]/30 text-right">
                  <div className="flex items-center justify-between text-xs text-[#A2B4C7] mb-1">
                    <span>رصيد العملات</span>
                    <Coins className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-extrabold text-[#D4B996] font-mono">
                    {pomodoroCoins} <span className="text-xs font-normal">عملة ذهبية</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">تفتح 15 دقيقة ألعاب حرة</div>
                </div>

                <div className="p-3.5 rounded-xl liquid-glass-beige-card border border-[#38BDF8]/30 text-right">
                  <div className="flex items-center justify-between text-xs text-[#A2B4C7] mb-1">
                    <span>سلسلة الأيام (Streaks)</span>
                    <span className="text-amber-400 font-bold">🔥</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#38BDF8] font-mono">
                    {pomodoroStreak} <span className="text-xs font-normal">أيام متتالية</span>
                  </div>
                  <div className="text-[10px] text-[#A2B4C7] mt-1">حافظ على السلسلة ولا تكسرها!</div>
                </div>
              </div>

              {/* Blocked Distractions Simulator Banner */}
              <div className="p-4 rounded-xl bg-[#08172C] border border-[#F3EDE2]/15 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F3EDE2] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-rose-400" />
                    <span>محاكاة كتم إشعارات الإلهاء</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded">
                    تم كتم {blockedDistractionsCount} إشعار
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] text-[#A2B4C7]">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-rose-300">🚫 إشعار TikTok: "فيديو جديد من صديقك"</span>
                    <span className="text-[10px] text-[#A2B4C7]">محجوب تلقائياً</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-rose-300">🚫 إشعار Instagram Reels: "تمت الإشارة إليك"</span>
                    <span className="text-[10px] text-[#A2B4C7]">محجوب تلقائياً</span>
                  </div>
                </div>
                <div className="text-[10px] text-[#D4B996] pt-1">
                  * تُسلَّم جميع الإشعارات دفعة واحدة فور انتهاء جلسة الـ 25 دقيقة أثناء وقت الراحة المخصص.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATOR 3: AI MOROCCAN EXAM GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === 'exam-generator' && (
        <div className="liquid-glass-card rounded-3xl p-5 md:p-8 border border-[#F3EDE2]/20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" />
                  <span>محاكاة مولد الامتحانات التفاعلي (AI Moroccan Exam Generator)</span>
                </span>
                <span className="text-[10px] bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/30 px-2 py-0.5 rounded-full">
                  مطابق 100% للأطر المرجعية الوطنية
                </span>
              </div>
              <p className="text-xs text-[#A2B4C7] mt-1">
                توليد امتحانات إشهادية بالمواصفات الوزارية، مع إمكانية الحل التفاعلي أو التصدير لـ PDF.
              </p>
            </div>

            <button
              onClick={() => { if (onPlaySound) onPlaySound(); setShowPdfModal(true); }}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#D4B996]/20 to-[#A37E58]/30 hover:bg-[#D4B996]/30 text-[#D4B996] border border-[#D4B996]/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>معاينة نموذج الـ PDF للطباعة</span>
            </button>
          </div>

          {/* Level Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectExamLevel('primary')}
              className={`p-3 rounded-xl text-right text-xs transition-all cursor-pointer ${
                selectedExamLevel === 'primary'
                  ? 'bg-[#0284C7]/30 border border-[#38BDF8] text-white shadow'
                  : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
              }`}
            >
              <span className="text-[10px] text-[#D4B996] block">السادس ابتدائي</span>
              <span className="font-bold">الموحد الإقليمي لنيل شهادة الابتدائي</span>
            </button>

            <button
              onClick={() => handleSelectExamLevel('middle')}
              className={`p-3 rounded-xl text-right text-xs transition-all cursor-pointer ${
                selectedExamLevel === 'middle'
                  ? 'bg-[#0284C7]/30 border border-[#38BDF8] text-white shadow'
                  : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
              }`}
            >
              <span className="text-[10px] text-[#38BDF8] block">الثالثة إعدادي</span>
              <span className="font-bold">الامتحان الجهوي الموحد (الأكاديميات)</span>
            </button>

            <button
              onClick={() => handleSelectExamLevel('bac')}
              className={`p-3 rounded-xl text-right text-xs transition-all cursor-pointer ${
                selectedExamLevel === 'bac'
                  ? 'bg-[#0284C7]/30 border border-[#38BDF8] text-white shadow'
                  : 'liquid-glass-beige-card text-[#A2B4C7] hover:text-[#F3EDE2] border border-[#F3EDE2]/10'
              }`}
            >
              <span className="text-[10px] text-[#D4B996] block">الثانية باكالوريا</span>
              <span className="font-bold">الامتحان الوطني الموحد للبكالوريا</span>
            </button>
          </div>

          {/* Official Moroccan Exam Header Frame */}
          <div className="p-4 rounded-2xl bg-[#061122]/90 border border-[#F3EDE2]/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs pb-3 border-b border-[#F3EDE2]/10">
              <div className="space-y-0.5">
                <span className="text-[11px] text-[#D4B996] font-bold">المملكة المغربية - وزارة التربية الوطنية والتعليم الأولي</span>
                <div className="text-sm font-bold text-[#F3EDE2]">{currentExam.examType}</div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="text-[11px] text-[#A2B4C7]">
                  <span>المادة: </span>
                  <span className="text-[#38BDF8] font-bold">{currentExam.subject}</span>
                </div>
                <div className="text-[11px] text-[#A2B4C7]">
                  <span>المعامل: </span>
                  <span className="text-[#D4B996] font-bold">{currentExam.coefficient}</span>
                </div>
                <div className="text-[11px] text-[#A2B4C7]">
                  <span>المدة: </span>
                  <span className="text-[#F3EDE2] font-bold">{currentExam.duration}</span>
                </div>
              </div>
            </div>

            {/* The Question */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] font-bold text-xs shrink-0 mt-0.5">
                  السؤال رقم 1
                </span>
                <p className="text-xs sm:text-sm text-[#F3EDE2] font-medium leading-relaxed">
                  {currentExam.sampleQuestion}
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2 pt-2">
                {currentExam.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle = 'liquid-glass-beige-card text-[#C2D2E2] hover:bg-[#F3EDE2]/10 border-[#F3EDE2]/10';

                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-200';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-[#0284C7]/30 border-[#38BDF8] text-white';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${optStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center font-bold text-[10px]">
                          {opt.id.toUpperCase()}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </div>
                      {isSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !opt.isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submission & Instant AI Rubric Feedback */}
              {!isSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSubmitExamAnswer}
                    disabled={!selectedOptionId}
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    تأكيد الإجابة والحصول على التصحيح الفوري
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#091D37] border border-[#38BDF8]/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#38BDF8] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>تقرير التصحيح الذكي وفق السلم الرسمي</span>
                    </span>
                    <button
                      onClick={() => { setSelectedOptionId(null); setIsSubmitted(false); }}
                      className="text-[11px] text-[#A2B4C7] hover:text-[#F3EDE2] underline cursor-pointer"
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                  <p className="text-xs text-[#EED9C4] leading-relaxed">
                    {currentExam.options.find(o => o.id === selectedOptionId)?.explanation}
                  </p>
                  <div className="text-[10px] text-[#A2B4C7] pt-1 border-t border-[#F3EDE2]/10">
                    {currentExam.moroccanStandard}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview Modal Simulation */}
          {showPdfModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
              <div className="liquid-glass-card rounded-3xl p-6 max-w-xl w-full border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EDE2]/10">
                  <span className="text-sm font-bold text-[#F3EDE2] flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#38BDF8]" />
                    <span>تصدير الامتحان في صيغة PDF رسمية</span>
                  </span>
                  <button
                    onClick={() => setShowPdfModal(false)}
                    className="text-xs text-[#A2B4C7] hover:text-white cursor-pointer px-2 py-1 rounded-lg bg-white/5"
                  >
                    إغلاق
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white text-slate-900 space-y-3 font-serif shadow-inner">
                  <div className="text-center border-b pb-2">
                    <div className="text-xs font-bold text-slate-800">المملكة المغربية - وزارة التربية الوطنية والتعليم الأولي والرياضة</div>
                    <div className="text-sm font-black text-slate-900 mt-1">{currentExam.examType}</div>
                    <div className="text-xs text-slate-600">دورة محاكاة التدريب الذكي - منصة طالب ذكي</div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700 font-bold">
                    <span>المادة: {currentExam.subject}</span>
                    <span>المعامل: {currentExam.coefficient}</span>
                    <span>مدة الإنجاز: {currentExam.duration}</span>
                  </div>
                  <div className="pt-2 text-xs leading-relaxed text-slate-800 border-t">
                    <strong>نص الموضوع الأول:</strong>
                    <p className="mt-1">{currentExam.sampleQuestion}</p>
                    <div className="mt-3 space-y-1">
                      {currentExam.options.map(opt => (
                        <div key={opt.id} className="text-[11px] text-slate-700">
                          [{opt.id.toUpperCase()}] {opt.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#A2B4C7]">جاهز للطباعة الورقية فوراً (A4 Format)</span>
                  <button
                    onClick={() => {
                      alert('تم محاكاة تحميل ملف الامتحان بصيغة PDF بنجاح وفق الأطر المرجعية المغربية!');
                      setShowPdfModal(false);
                    }}
                    className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    تأكيد التحميل (Download PDF)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATOR 4: PARENT DASHBOARD & WHATSAPP NOTIFICATION */}
      {/* ========================================================================= */}
      {activeTab === 'parent-dashboard' && (
        <div className="liquid-glass-card rounded-3xl p-5 md:p-8 border border-[#F3EDE2]/20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#D4B996] flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  <span>محاكاة لوحة ولي الأمر وإشعارات الواتساب (Parent Peace-of-Mind)</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  أداة تشجيع وشراكة عائلية
                </span>
              </div>
              <p className="text-xs text-[#A2B4C7] mt-1">
                تمنح الأب الطمأنينة الكاملة حول جدوى استثماره دون تحويل الهاتف إلى كاميرا تجسس تنفر التلميذ.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#A2B4C7]">اسم التلميذ:</span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value || 'التلميذ')}
                className="py-1 px-2.5 rounded-lg liquid-glass-beige-card border border-[#F3EDE2]/20 text-xs text-[#F3EDE2] w-24 text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* The WhatsApp Phone Simulation Screen */}
            <div className="md:col-span-6 bg-[#0B1E19] rounded-3xl p-4 border-2 border-[#128C7E]/40 shadow-2xl space-y-3 relative overflow-hidden">
              {/* WhatsApp Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center font-bold text-xs">
                    ط
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <span>طالب ذكي - TalibAI Bot</span>
                      <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                    </div>
                    <div className="text-[10px] text-emerald-400">حساب تجاري رسمي موثق</div>
                  </div>
                </div>
                <span className="text-[10px] text-white/60">اليوم 20:30</span>
              </div>

              {/* The Actual WhatsApp Message Bubble */}
              <div className="bg-[#1F2C34] text-white rounded-2xl p-4 text-xs space-y-2.5 shadow-md border border-white/5">
                <div className="text-[11px] text-[#25D366] font-bold">
                  السلام عليكم سي محمد 🌟 تقرير إنجاز {childName} الأسبوعي:
                </div>

                <div className="space-y-1.5 text-xs text-[#E1E7EA] leading-relaxed">
                  <p>
                    بشرى سارة! <strong>{childName}</strong> أتم هذا الأسبوع <strong>4 ساعات ونصف</strong> من المذاكرة المركزة بنظام البومودورو دون أي تشتت 🎯.
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#38BDF8]">📚 مادة الرياضيات:</span>
                      <span className="text-emerald-400 font-bold">مستوى ممتاز (18/20)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#D4B996]">🔬 الفيزياء والكيمياء:</span>
                      <span className="text-amber-300 font-bold">يحتاج مراجعة (المتجهات)</span>
                    </div>
                  </div>

                  <p className="text-[#25D366] font-medium pt-1">
                    💡 <strong>مقترح المنصة للوالد:</strong> {childName} كسب 150 عملة ويستحق كلمة تشجيع دافئة أو ساعة لعب إضافية في عطلة نهاية الأسبوع!
                  </p>
                </div>

                <div className="text-left text-[9px] text-white/50 pt-1 flex justify-end items-center gap-1">
                  <span>تم التوصيل</span>
                  <span className="text-[#25D366]">✓✓</span>
                </div>
              </div>

              {/* Push Action button */}
              <button
                onClick={() => {
                  if (onPlaySound) onPlaySound();
                  alert(`تم إرسال محاكاة إشعار واتساب التقرير التربوي إلى هاتف ولي أمر ${childName}!`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إعادة إرسال تقرير الواتساب التجريبي</span>
              </button>
            </div>

            {/* Parent Psychological Reassurance Dashboard View */}
            <div className="md:col-span-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[#071326]/80 border border-[#F3EDE2]/15 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EDE2]/10">
                  <span className="text-xs font-bold text-[#F3EDE2] flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#D4B996]" />
                    <span>مؤشرات الطمأنينة على استثمار الأب</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">عائد استثماري عالي</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#A2B4C7]">ساعات التركيز الصافية (دون هاتف):</span>
                      <span className="font-bold text-[#38BDF8]">14 ساعة هذا الشهر</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] rounded-full w-[82%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#A2B4C7]">نسبة الجاهزية للامتحان الإشهادي:</span>
                      <span className="font-bold text-emerald-400">88% (ميزة حسن جداً متوقعة)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#D4B996]/10 border border-[#D4B996]/30 text-xs text-[#EED9C4] leading-relaxed">
                  <strong className="text-[#D4B996] block mb-0.5">ضمان الراحة النفسية للأسرة:</strong>
                  المنصة لا تسجل محادثات التلميذ الخاصة ولا شاشته، بل تحلل الإنجازات الأكاديمية فقط حمايةً للثقة والاحترام بين الأب وابنه.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
