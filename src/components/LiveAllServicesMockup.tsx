import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Mic,
  Square,
  Volume2,
  VolumeX,
  Send,
  Flame,
  Lock,
  Unlock,
  Play,
  Pause,
  FileCheck,
  FileDown,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Network,
  Zap,
  MessageCircle,
  ShieldCheck,
  RotateCcw,
  BellRing,
  Clock,
  GraduationCap,
  Award,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Gift,
  CalendarDays,
  BookOpen,
  HelpCircle,
  Wand2,
  ArrowRight
} from 'lucide-react';
import { MOCK_EXAMS_DATA } from '../data/mockExamsData';
import { downloadExamAsPdf } from '../utils/pdfExamExport';

interface LiveAllServicesMockupProps {
  onPlaySound?: () => void;
}

const SUB_SLIDES = [
  { id: 0, num: '5.1', label: 'المساعد الذكي والخطاطات', icon: Bot },
  { id: 1, num: '5.2', label: 'بومودورو «ركز معي»', icon: Flame },
  { id: 2, num: '5.3', label: 'مولد الامتحان (10 أسئلة)', icon: FileCheck },
  { id: 3, num: '5.4', label: 'لوحة ولي الأمر والطمأنينة', icon: HeartHandshake }
];

const AI_CHECK_QUESTIONS = [
  {
    id: 'q1',
    question: 'السؤال 1: إذا كان ارتفاع الحائط 6 أمتار وبعد قاعدة السلّم عن الحائط 8 أمتار، ما طول السلّم؟',
    options: [
      { id: 'a', text: '10 أمتار', correct: true },
      { id: 'b', text: '14 متراً', correct: false },
      { id: 'c', text: '48 متراً', correct: false }
    ],
    feedback: 'رائع! 6² + 8² = 36 + 64 = 100 وجذر 100 هو 10 أمتار.'
  },
  {
    id: 'q2',
    question: 'السؤال 2: في أي نوع من المثلثات نستطيع تطبيق مبرهنة فيثاغورس؟',
    options: [
      { id: 'a', text: 'المثلث قائم الزاوية (90°) فقط', correct: true },
      { id: 'b', text: 'أي مثلث كيفما كان شكله', correct: false },
      { id: 'c', text: 'المثلث متساوي الأضلاع فقط', correct: false }
    ],
    feedback: 'ممتاز! شرط الزاوية القائمة (90°) هو الأساس لاستخراج الوتر.'
  }
];

const POMODORO_ALERTS = [
  {
    prompt: 'تحقق سريع من تركيزك: ما هو ناتج ²3 + ²4 تحت الجذر (√25)؟',
    choices: ['5 (تركيز 100%)', '7', '12'],
    correctIdx: 0
  },
  {
    prompt: 'هل ما زلت تركز في درسك دون تشتت؟ أثبت حضورك الآن!',
    choices: ['نعم، أنا مركز في التمرين ✓', 'أحتاج استراحة قصيرة'],
    correctIdx: 0
  },
  {
    prompt: 'تثبيت سريع: في قانون أوم U = R × I، ما هي وحدة المقاومة R؟',
    choices: ['الأوم (Ω)', 'الفولط (V)', 'الأمبير (A)'],
    correctIdx: 0
  }
];

export const LiveAllServicesMockup: React.FC<LiveAllServicesMockupProps> = ({ onPlaySound }) => {
  const [subIdx, setSubIdx] = useState(0);

  // Synced Student State across all 4 sub-slides
  const [xp, setXp] = useState(1450);
  const [streak, setStreak] = useState(12);
  const [readiness, setReadiness] = useState(86);
  const [extraFocusMinutes, setExtraFocusMinutes] = useState(0);

  // ---------------- SUB-SLIDE 1: VOICE-TRIGGERED AI TUTOR (EMPTY UNTIL VOICE STOPS) ----------------
  const [promptInput, setPromptInput] = useState('');
  const [hasAiResult, setHasAiResult] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, string>>({});
  const audioTimerRef = useRef<number | null>(null);

  // ---------------- SUB-SLIDE 2: POMODORO "ركز معي" + 10s CHECK-IN ALERTS ----------------
  const [presetSeconds, setPresetSeconds] = useState(1500);
  const [focusSeconds, setFocusSeconds] = useState(1500);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [secondsToNextAlert, setSecondsToNextAlert] = useState(10);
  const [activeAlertIdx, setActiveAlertIdx] = useState<number | null>(null);
  const [alertCycleCount, setAlertCycleCount] = useState(0);
  const [alertFeedback, setAlertFeedback] = useState<string | null>(null);
  const [blockedApps, setBlockedApps] = useState({ tiktok: true, instagram: true, games: true });
  const [focusHelperInput, setFocusHelperInput] = useState('');
  const [focusHelperReply, setFocusHelperReply] = useState<string | null>(null);

  // ---------------- SUB-SLIDE 3: EXAM GENERATOR (LEVEL -> SUBJECT -> 10-Q SINGLE-SUBJECT PAPER) ----------------
  const [selectedLevelId, setSelectedLevelId] = useState<'middle' | 'primary' | 'bac' | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfSuccessMsg, setPdfSuccessMsg] = useState(false);

  // ---------------- SUB-SLIDE 4: PARENT DASHBOARD ----------------
  const [parentRewardSent, setParentRewardSent] = useState(false);
  const [whatsappPreviewOpen, setWhatsappPreviewOpen] = useState(false);

  const activeLevel = selectedLevelId
    ? MOCK_EXAMS_DATA.find((l) => l.id === selectedLevelId) || null
    : null;
  const activeSubject =
    activeLevel && selectedSubjectId
      ? activeLevel.subjects.find((s) => s.id === selectedSubjectId) || null
      : null;

  // Play crisp Web Audio alert chime
  const playAlertChime = () => {
    if (onPlaySound) onPlaySound();
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // Audio context unavailable
    }
  };

  // Voice recording elapsed counter
  useEffect(() => {
    if (!isRecording) return;
    const t = window.setInterval(() => {
      setRecordingSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [isRecording]);

  // Audio playback progress loop
  useEffect(() => {
    if (!isPlayingAudio) {
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
      return;
    }
    audioTimerRef.current = window.setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          setIsPlayingAudio(false);
          return 0;
        }
        return prev + 4;
      });
    }, 240);
    return () => {
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
    };
  }, [isPlayingAudio]);

  // Pomodoro countdown + 10-second active check-in alert loop
  useEffect(() => {
    if (!isFocusRunning || focusSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setFocusSeconds((prev) => {
        if (prev <= 1) {
          setIsFocusRunning(false);
          setExtraFocusMinutes((m) => m + Math.max(1, Math.round(presetSeconds / 60)));
          setXp((x) => x + 60);
          return 0;
        }
        return prev - 1;
      });

      setSecondsToNextAlert((sec) => {
        if (sec <= 1) {
          playAlertChime();
          setAlertCycleCount((c) => {
            setActiveAlertIdx(c % POMODORO_ALERTS.length);
            return c + 1;
          });
          setAlertFeedback(null);
          return 10;
        }
        return sec - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isFocusRunning, focusSeconds, presetSeconds]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopAudio = () => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleToggleAudio = () => {
    if (onPlaySound) onPlaySound();
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    setAudioProgress(0);
    setIsPlayingAudio(true);

    const speechText =
      'أهلاً سلمى! مبرهنة فيثاغورس ساهلة بزاف بالدارجة: تخيلي معايا شي صباغ فكازا باغي يصبغ حيط عالي بربعة دالمترو، وحط رجل السلاّم بعيدة على الحيط بتلاتة دالمترو. القاعدة كتقول: مربع طول السلاّم كيساوي ربعة أس جوج زائد تلاتة أس جوج، يعني ستاش زائد تسعود كتساوي خمسة وعشرين، وجذر خمسة وعشرين هو خمسة أمتار بالضبط!';

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = 'ar-MA';
      utterance.rate = 1.02;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start / Finish Voice Recording -> Transcribes ANY spoken words to "شرح لمبرهنة فيثاغورس بالدارجة المغربية"
  const handleToggleVoiceRecording = () => {
    if (onPlaySound) onPlaySound();
    stopAudio();

    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setHasAiResult(false);
      setIsThinking(false);
    } else {
      setIsRecording(false);
      const transcribed = 'شرح لمبرهنة فيثاغورس بالدارجة المغربية';
      setPromptInput(transcribed);
      setActivePrompt(transcribed);
      setCheckAnswers({});
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setHasAiResult(true);
        setXp((x) => x + 15);
      }, 450);
    }
  };

  const handleSubmitAnyPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPlaySound) onPlaySound();
    stopAudio();
    const text = promptInput.trim();
    if (!text) return;
    setActivePrompt(text);
    setCheckAnswers({});
    setIsThinking(true);
    setHasAiResult(false);
    setTimeout(() => {
      setIsThinking(false);
      setHasAiResult(true);
      setXp((x) => x + 15);
    }, 450);
  };

  const handleResetAiStage = () => {
    if (onPlaySound) onPlaySound();
    stopAudio();
    setIsRecording(false);
    setIsThinking(false);
    setHasAiResult(false);
    setActivePrompt('');
    setPromptInput('');
    setCheckAnswers({});
  };

  const handleAnswerCheckQ = (qId: string, optId: string, correct: boolean) => {
    if (onPlaySound) onPlaySound();
    const wasAnswered = Boolean(checkAnswers[qId]);
    setCheckAnswers((prev) => ({ ...prev, [qId]: optId }));
    if (correct && !wasAnswered) {
      setXp((x) => x + 20);
      setReadiness((r) => Math.min(99, r + 2));
    }
  };

  const triggerInstant10sAlert = () => {
    playAlertChime();
    setAlertCycleCount((c) => {
      setActiveAlertIdx(c % POMODORO_ALERTS.length);
      return c + 1;
    });
    setAlertFeedback(null);
    setSecondsToNextAlert(10);
  };

  const handleAskFocusHelper = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPlaySound) onPlaySound();
    const q = focusHelperInput.trim() || 'تلخيص سريع للقاعدة';
    setFocusHelperReply(
      `تلميح سريع حول «${q}»: ركّز على المعطيات الأساسية أولاً (الزاوية القائمة + الضلعين المعلومين)، ثم طبق العلاقة BC² = AB² + AC² بهدوء دون تسرع.`
    );
    setFocusHelperInput('');
  };

  const handleSelectExamLevel = (lvlId: 'middle' | 'primary' | 'bac') => {
    if (onPlaySound) onPlaySound();
    setSelectedLevelId(lvlId);
    setSelectedSubjectId(null);
    setExamAnswers({});
    setShowCorrection(false);
    setActiveBlankId(null);
  };

  const handleSelectExamSubject = (subjId: string) => {
    if (onPlaySound) onPlaySound();
    setSelectedSubjectId(subjId);
    setExamAnswers({});
    setShowCorrection(false);
    setActiveBlankId(null);
  };

  const handleExamFillQuick = () => {
    if (!activeSubject) return;
    if (onPlaySound) onPlaySound();
    const filled: Record<number, string> = {};
    activeSubject.questions.forEach((q, idx) => {
      filled[q.id] = idx === 7 ? q.suggestions[1] || q.correctAnswer : q.correctAnswer;
    });
    setExamAnswers(filled);
    setShowCorrection(true);
    setXp((x) => x + 35);
  };

  const handleDownloadPdf = async () => {
    if (!activeLevel || !activeSubject) return;
    if (onPlaySound) onPlaySound();
    setIsExportingPdf(true);
    try {
      await downloadExamAsPdf({
        title: activeSubject.examTitle,
        levelLabel: `${activeLevel.badge} · مادة ${activeSubject.name}`,
        duration: activeSubject.duration,
        studentName: 'سلمى العلوي',
        includeCorrection: showCorrection,
        questions: activeSubject.questions.map((q) => ({
          num: q.id,
          text: `[${q.sectionTitle}] ${q.promptPrefix}`,
          userAnswer: examAnswers[q.id] || '',
          correctAnswer: q.correctAnswer,
          points: q.points
        }))
      });
      setPdfSuccessMsg(true);
      setTimeout(() => setPdfSuccessMsg(false), 3200);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const totalExamScore = activeSubject
    ? activeSubject.questions.reduce((acc, q) => {
        const ans = (examAnswers[q.id] || '').trim();
        if (!ans) return acc;
        return ans === q.correctAnswer ? acc + q.points : acc;
      }, 0)
    : 0;

  const answeredExamCount = activeSubject
    ? activeSubject.questions.filter((q) => Boolean((examAnswers[q.id] || '').trim())).length
    : 0;

  // Pomodoro SVG Ring Math
  const ringRadius = 62;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringProgress = presetSeconds > 0 ? focusSeconds / presetSeconds : 0;
  const ringDashOffset = ringCircumference * (1 - ringProgress);
  const focusMin = Math.floor(focusSeconds / 60).toString().padStart(2, '0');
  const focusSec = (focusSeconds % 60).toString().padStart(2, '0');

  const bothCheckQuestionsCorrect = checkAnswers.q1 === 'a' && checkAnswers.q2 === 'a';

  return (
    <div className="space-y-3.5 text-right">
      {/* Top Unified App Header + 4 Sub-Slide Switcher */}
      <div className="rounded-2xl liquid-glass-dynamic p-3 border border-[#38BDF8]/35 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#D4B996] p-[1.5px]">
              <div className="w-full h-full rounded-[10px] bg-[#040D1B] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              </div>
            </div>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-2">
                <span>تجربة «ركز معي» · طالب ذكي (TalibAI)</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-md bg-[#0284C7]/25 text-[#38BDF8] border border-[#38BDF8]/30">
                  شريحة فرعية {subIdx + 1} / 4
                </span>
              </div>
              <div className="text-[10px] text-[#A2B4C7]">
                تنقّل بين السلايدات الفرعية الأربع لتجربة كل خدمة بوضوح كامل
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-300 font-bold flex items-center gap-1 tabular-nums">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streak} يوم</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/40 text-[#38BDF8] font-bold flex items-center gap-1 font-mono tabular-nums">
              <Zap className="w-3.5 h-3.5" />
              <span>{xp} XP</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-bold font-mono tabular-nums">
              الجاهزية: {readiness}%
            </div>
          </div>
        </div>

        {/* 4 Dedicated Sub-Slide Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          {SUB_SLIDES.map((tab) => {
            const Icon = tab.icon;
            const active = subIdx === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (onPlaySound) onPlaySound();
                  setSubIdx(tab.id);
                }}
                className={`py-2 px-3 rounded-xl border text-right flex items-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-l from-[#0284C7]/35 to-[#D4B996]/20 border-[#38BDF8] text-white shadow-md shadow-[#0284C7]/20'
                    : 'bg-white/5 border-white/10 text-[#C2D2E2] hover:bg-white/10 hover:text-white'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? 'bg-[#0284C7] text-white' : 'bg-[#040D1B]/60 text-[#38BDF8]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#D4B996] block leading-none">{tab.num}</span>
                  <span className="text-[11px] font-bold truncate block mt-0.5">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= SUB-SLIDE 1: VOICE-FIRST AI TUTOR + MIND MAP + 2 QUESTIONS ================= */}
      {subIdx === 0 && (
        <div className="rounded-2xl liquid-glass-dynamic p-4 sm:p-5 border border-[#38BDF8]/35 space-y-4">
          {/* Prompt Input & Voice Toggle Bar */}
          <form onSubmit={handleSubmitAnyPrompt} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoiceRecording}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                isRecording
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/35'
                  : 'bg-gradient-to-r from-[#D4B996] to-amber-300 hover:opacity-95 text-[#040D1B] shadow'
              }`}
            >
              {isRecording ? <Square className="w-3.5 h-3.5 fill-current" /> : <Mic className="w-4 h-4" />}
              <span>
                {isRecording
                  ? `إنهاء الكلام وإرسال (${recordingSeconds}ث)`
                  : 'ابدأ التحدث بالصوت'}
              </span>
            </button>

            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="تحدث بالصوت أعلاه أو اكتب سؤالك هنا..."
              className="flex-1 min-w-[200px] bg-[#040D1B]/75 border border-[#38BDF8]/35 focus:border-[#38BDF8] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#A2B4C7] outline-none"
            />

            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>

            {(hasAiResult || isRecording) && (
              <button
                type="button"
                onClick={handleResetAiStage}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-[#C2D2E2] cursor-pointer shrink-0"
                title="تصفير للبدء من جديد"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* State 1: Empty / Waiting for Voice Input */}
          {!hasAiResult && !isThinking && (
            <div className="min-h-[260px] rounded-2xl bg-[#040D1B]/45 border border-dashed border-[#38BDF8]/35 p-6 flex flex-col items-center justify-center text-center space-y-4">
              {isRecording ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center animate-pulse">
                    <Mic className="w-8 h-8 text-rose-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-black text-white">جاري الاستماع لصوتك الآن... ({recordingSeconds}ث)</div>
                    <p className="text-xs text-[#C2D2E2]">
                      تحدث بحرية ثم اضغط على الزر الأحمر <strong className="text-rose-300">«إنهاء الكلام وإرسال»</strong> لعرض الشرح والخطاطة الذهنية.
                    </p>
                  </div>
                  <div className="flex items-end gap-1.5 h-8">
                    <span className="w-1.5 bg-rose-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-4" />
                    <span className="w-1.5 bg-[#38BDF8] rounded-full animate-[pulse_0.35s_ease-in-out_infinite] h-8" />
                    <span className="w-1.5 bg-[#D4B996] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-5" />
                    <span className="w-1.5 bg-rose-400 rounded-full animate-[pulse_0.45s_ease-in-out_infinite] h-7" />
                    <span className="w-1.5 bg-[#38BDF8] rounded-full animate-[pulse_0.55s_ease-in-out_infinite] h-3" />
                    <span className="w-1.5 bg-[#D4B996] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-6" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center">
                    <Mic className="w-7 h-7 text-[#38BDF8]" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <div className="text-sm font-black text-[#F3EDE2]">المساعد الذكي في انتظار كلامك</div>
                    <p className="text-xs text-[#A2B4C7] leading-relaxed">
                      اضغط على <strong className="text-[#D4B996]">«ابدأ التحدث بالصوت»</strong> وتحدث ثم أنهِ الكلام ليتم كتابة <strong>«شرح لمبرهنة فيثاغورس بالدارجة المغربية»</strong> وعرض الشرح والخطاطة الذهنية وأسئلة التثبيت.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* State 2: Processing Voice/Prompt */}
          {isThinking && (
            <div className="min-h-[260px] rounded-2xl bg-[#040D1B]/50 border border-[#38BDF8]/30 flex flex-col items-center justify-center gap-2.5 p-6">
              <Sparkles className="w-7 h-7 text-[#38BDF8] animate-spin" />
              <span className="text-xs font-bold text-[#38BDF8]">
                تم التقاط كلامك («{activePrompt}») — جاري توليد الشرح والخطاطة الذهنية...
              </span>
            </div>
          )}

          {/* State 3: Full Explanation + Mind Map + Audio + 2 Mastery Verification Questions */}
          {hasAiResult && !isThinking && (
            <div className="space-y-3.5">
              {/* Transcribed Spoken Request + Listen Button */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/15 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-[#F3EDE2] flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#D4B996]/20 text-[#D4B996] font-bold text-[10px] shrink-0">
                    ما قلته للتو
                  </span>
                  <span className="font-bold text-white">{activePrompt}</span>
                </div>

                <button
                  onClick={handleToggleAudio}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shrink-0 whitespace-nowrap ${
                    isPlayingAudio
                      ? 'bg-emerald-500 text-[#040D1B] shadow-lg shadow-emerald-500/30'
                      : 'bg-[#0284C7]/25 hover:bg-[#0284C7]/45 text-[#38BDF8] border border-[#38BDF8]/40'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'إيقاف القراءة الصوتية' : 'استمع للشرح بالصوت'}</span>
                </button>
              </div>

              {isPlayingAudio && (
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center gap-3">
                  <div className="flex items-end gap-0.5 h-4 shrink-0">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                    <span className="w-1 bg-[#38BDF8] rounded-full animate-[pulse_0.45s_ease-in-out_infinite] h-4" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.75s_ease-in-out_infinite] h-2" />
                    <span className="w-1 bg-[#D4B996] rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-4" />
                    <span className="w-1 bg-[#38BDF8] rounded-full animate-[pulse_0.65s_ease-in-out_infinite] h-2.5" />
                  </div>
                  <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-[#38BDF8] transition-all duration-200"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300">جاري الشرح الصوتي بالدارجة المغربية</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Col 1: Moroccan Darija Explanation + Visual Mind Map */}
                <div className="lg:col-span-7 rounded-2xl bg-[#040D1B]/55 border border-white/15 p-4 space-y-3">
                  <div className="p-3 rounded-xl bg-gradient-to-l from-[#0284C7]/25 to-[#D4B996]/10 border border-[#38BDF8]/35 space-y-1.5">
                    <div className="text-xs font-black text-[#D4B996] flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#38BDF8]" />
                      <span>الشرح بالدارجة المغربية وبمثال من الواقع:</span>
                    </div>
                    <p className="text-xs text-[#F3EDE2] leading-relaxed">
                      تخيل معايا شي صبّاغ فكازا باغي يصبغ حيط الطول ديالو <strong>4 أمتار</strong>، وحط رجل السلاّم بعيدة على الحيط بـ <strong>3 أمتار</strong>. هنا عندك مثلث قائم الزاوية فالأرض، والسلاّم هو <strong>الوتر (الضلع الكبير)</strong>. القاعدة بالدارجة ساهلة: مربع الوتر = مربع الضلع الأول + مربع الضلع الثاني!
                    </p>
                    <div className="font-mono text-xs font-bold text-[#38BDF8] bg-[#040D1B]/70 px-3 py-1.5 rounded-lg inline-block" dir="ltr">
                      L² = 4² + 3² = 16 + 9 = 25 ⇒ L = √25 = 5m
                    </div>
                  </div>

                  {/* Visual Mind Map */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#38BDF8] flex items-center gap-1.5">
                        <Network className="w-4 h-4" />
                        <span>الخطاطة الذهنية التفاعلية (AI Mind Map)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">مطابق للمقرر المغربي ✓</span>
                    </div>

                    <div className="flex flex-col items-center pt-1">
                      <div className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] border border-[#38BDF8]/70 shadow-lg shadow-[#0284C7]/30 text-center">
                        <div className="text-xs font-black text-white">مبرهنة فيثاغورس</div>
                        <div className="text-[10px] text-[#E2E8F0]">في مثلث قائم الزاوية ABC</div>
                      </div>

                      <svg className="w-full h-6 max-w-lg" viewBox="0 0 360 28" fill="none" aria-hidden="true">
                        <path d="M180 0 V12 M180 12 H60 V28 M180 12 V28 M180 12 H300 V28" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="2" />
                        <circle cx="60" cy="25" r="3" fill="#38BDF8" />
                        <circle cx="180" cy="25" r="3" fill="#D4B996" />
                        <circle cx="300" cy="25" r="3" fill="#34D399" />
                      </svg>

                      <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="p-2.5 rounded-xl border border-[#38BDF8]/45 bg-[#0284C7]/15 text-center space-y-1">
                          <div className="text-[11px] font-black text-[#38BDF8]">1. الشروط</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1">زاوية قائمة 90°</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1">أطول ضلع = الوتر</div>
                        </div>
                        <div className="p-2.5 rounded-xl border border-[#D4B996]/45 bg-[#D4B996]/15 text-center space-y-1">
                          <div className="text-[11px] font-black text-[#D4B996]">2. القاعدة</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1" dir="ltr">BC² = AB² + AC²</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1">حساب ضلع مجهول</div>
                        </div>
                        <div className="p-2.5 rounded-xl border border-emerald-400/45 bg-emerald-500/15 text-center space-y-1">
                          <div className="text-[11px] font-black text-emerald-300">3. مثال الحومة</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1">حائط 4m + بعد 3m</div>
                          <div className="text-[10px] text-[#F3EDE2] bg-[#040D1B]/60 rounded px-1.5 py-1">طول السلّم = 5m</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 2: 2 Verification Questions */}
                <div className="lg:col-span-5 rounded-2xl bg-[#040D1B]/55 border border-[#D4B996]/35 p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-black text-[#D4B996] flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
                      <span>تأكد: هل حفرت المعلومة في رأسك؟</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#38BDF8]">سؤالان للتحقق</span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {AI_CHECK_QUESTIONS.map((cq) => {
                      const chosenId = checkAnswers[cq.id];
                      const chosenOpt = cq.options.find((o) => o.id === chosenId);
                      return (
                        <div key={cq.id} className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                          <div className="text-[11px] font-bold text-white leading-snug">{cq.question}</div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {cq.options.map((opt) => {
                              const isSelected = chosenId === opt.id;
                              let cls = 'bg-[#040D1B]/65 border-white/10 text-[#C2D2E2] hover:bg-white/10';
                              if (isSelected) {
                                cls = opt.correct
                                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold'
                                  : 'bg-rose-500/25 border-rose-400 text-rose-200';
                              }
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => handleAnswerCheckQ(cq.id, opt.id, opt.correct)}
                                  className={`py-1.5 px-2.5 rounded-lg border text-right text-[11px] transition-all cursor-pointer ${cls}`}
                                >
                                  {opt.text}
                                </button>
                              );
                            })}
                          </div>
                          {chosenOpt && (
                            <div
                              className={`text-[10px] px-2 py-1 rounded-lg ${
                                chosenOpt.correct
                                  ? 'bg-emerald-500/15 text-emerald-300'
                                  : 'bg-rose-500/15 text-rose-300'
                              }`}
                            >
                              {chosenOpt.correct ? cq.feedback : 'جرّب خياراً آخر للتأكد من الفهم!'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={`p-2.5 rounded-xl border text-center text-[11px] font-bold ${
                      bothCheckQuestionsCorrect
                        ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                        : 'bg-[#0284C7]/15 border-[#38BDF8]/30 text-[#C2D2E2]'
                    }`}
                  >
                    {bothCheckQuestionsCorrect
                      ? '✓ المعلومة محفورة في رأسك 100%! أنت مستعد لبدء جلسة التركيز.'
                      : 'أجب عن السؤالين أعلاه ليؤكد الذكاء الاصطناعي جاهزيتك (+40 XP).'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SUB-SLIDE 2: PROFESSIONAL POMODORO "ركز معي" + 10s CHECK-IN ALERTS ================= */}
      {subIdx === 1 && (
        <div className="rounded-2xl liquid-glass-dynamic p-4 sm:p-5 border border-amber-400/35 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-6 rounded-2xl bg-[#040D1B]/55 border border-white/15 p-4 flex flex-col items-center justify-between space-y-4">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>مؤقت «ركز معي» الاحترافي</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#0284C7]/25 text-[#38BDF8] border border-[#38BDF8]/35 tabular-nums">
                  تنبيه قادم خلال: {secondsToNextAlert}ث
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
                {[
                  { label: '25د دراسة', sec: 1500 },
                  { label: '15د مراجعة', sec: 900 },
                  { label: '5د راحة', sec: 300 },
                  { label: '30ث تجريبي', sec: 30 }
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setIsFocusRunning(false);
                      setPresetSeconds(p.sec);
                      setFocusSeconds(p.sec);
                      setSecondsToNextAlert(10);
                    }}
                    className={`py-1 px-2.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
                      presetSeconds === p.sec
                        ? 'bg-[#0284C7] border-[#38BDF8] text-white'
                        : 'bg-white/5 border-white/15 text-[#C2D2E2] hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r={ringRadius} stroke="rgba(255,255,255,0.1)" strokeWidth="9" fill="none" />
                  <circle
                    cx="75"
                    cy="75"
                    r={ringRadius}
                    stroke="url(#pomodoroGrad)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringDashOffset}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="pomodoroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#D4B996" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white font-mono tabular-nums">
                    {focusMin}:{focusSec}
                  </span>
                  <span className="text-[10px] text-[#D4B996] font-semibold mt-0.5">
                    {isFocusRunning ? 'درع التركيز نشط 🔥' : 'جاهز للانطلاق'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                <button
                  onClick={() => {
                    if (onPlaySound) onPlaySound();
                    if (focusSeconds === 0) setFocusSeconds(presetSeconds);
                    setIsFocusRunning(!isFocusRunning);
                  }}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                >
                  {isFocusRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isFocusRunning ? 'إيقاف مؤقت' : 'بدء جلسة ركز معي'}</span>
                </button>

                <button
                  onClick={triggerInstant10sAlert}
                  className="py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  <span>تجربة تنبيه الـ 10ث الآن</span>
                </button>

                <button
                  onClick={() => {
                    setIsFocusRunning(false);
                    setFocusSeconds(presetSeconds);
                    setSecondsToNextAlert(10);
                    setActiveAlertIdx(null);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[#C2D2E2] cursor-pointer"
                  title="إعادة ضبط"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              <div
                className={`rounded-2xl p-4 border transition-all space-y-2.5 ${
                  activeAlertIdx !== null
                    ? 'bg-amber-950/45 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-[#040D1B]/55 border-[#38BDF8]/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-amber-300 flex items-center gap-1.5">
                    <BellRing className={`w-4 h-4 ${activeAlertIdx !== null ? 'animate-bounce' : ''}`} />
                    <span>نظام الإنذار والتحقق الذكي (كل 10 ثوانٍ)</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#A2B4C7]">ضد الشرود الذهني</span>
                </div>

                {activeAlertIdx !== null ? (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-white leading-snug">
                      {POMODORO_ALERTS[activeAlertIdx].prompt}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POMODORO_ALERTS[activeAlertIdx].choices.map((ch, cIdx) => (
                        <button
                          key={ch}
                          onClick={() => {
                            if (onPlaySound) onPlaySound();
                            if (cIdx === POMODORO_ALERTS[activeAlertIdx].correctIdx) {
                              setXp((x) => x + 10);
                              setAlertFeedback('أحسنت! تركيزك 100% وتمت إضافة +10 XP.');
                              setTimeout(() => setActiveAlertIdx(null), 1200);
                            } else {
                              setAlertFeedback('ركّز أكثر وحاول الإجابة الصحيحة!');
                            }
                          }}
                          className="py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/50 text-amber-100 text-[11px] font-bold cursor-pointer"
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                    {alertFeedback && <div className="text-[11px] text-emerald-300 font-bold">{alertFeedback}</div>}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#C2D2E2] leading-relaxed">
                    أثناء تشغيل المؤقت، يظهر تلقائياً كل <strong>10 ثوانٍ</strong> تنبيه صوتي بسؤال مفاجئ للتأكد من عدم شرود التلميذ. يمكنك أيضاً الضغط على «تجربة تنبيه الـ 10ث الآن» لمعاينته فوراً.
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-[#040D1B]/55 border border-white/15 p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#F3EDE2]">حاجز تطبيقات الإلهاء أثناء الجلسة:</div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  {[
                    { key: 'tiktok' as const, label: 'تيك توك' },
                    { key: 'instagram' as const, label: 'إنستغرام' },
                    { key: 'games' as const, label: 'الألعاب' }
                  ].map((app) => {
                    const locked = blockedApps[app.key];
                    return (
                      <button
                        key={app.key}
                        onClick={() => {
                          if (onPlaySound) onPlaySound();
                          setBlockedApps((p) => ({ ...p, [app.key]: !p[app.key] }));
                        }}
                        className={`py-2 px-2 rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                          locked
                            ? 'bg-emerald-500/15 border-emerald-400/45 text-emerald-300 font-bold'
                            : 'bg-white/5 border-white/15 text-[#A2B4C7]'
                        }`}
                      >
                        {locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        <span>{app.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-[#040D1B]/55 border border-[#38BDF8]/30 p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <Bot className="w-4 h-4" />
                  <span>اسأل رفيق التركيز (مساعدة سريعة دون خروج من المؤقت):</span>
                </div>
                <form onSubmit={handleAskFocusHelper} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={focusHelperInput}
                    onChange={(e) => setFocusHelperInput(e.target.value)}
                    placeholder="اطلب تلميحاً سريعاً لتمرينك الحالي..."
                    className="flex-1 bg-[#071326] border border-white/15 focus:border-[#38BDF8] rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#A2B4C7] outline-none"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-3 rounded-xl bg-[#0284C7] text-white text-xs font-bold cursor-pointer shrink-0"
                  >
                    اسأل
                  </button>
                </form>
                {focusHelperReply && (
                  <div className="text-[11px] text-[#E2E8F0] bg-[#0284C7]/15 border border-[#38BDF8]/30 rounded-lg px-2.5 py-2">
                    {focusHelperReply}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUB-SLIDE 3: EXAM GENERATOR (LEVEL -> SUBJECT -> 10-Q SINGLE-SUBJECT PAPER) ================= */}
      {subIdx === 2 && (
        <div className="rounded-2xl liquid-glass-dynamic p-4 sm:p-5 border border-[#D4B996]/35 space-y-3.5">
          {!activeLevel ? (
            /* Step 1: Choose School Year / Level */
            <div className="min-h-[280px] rounded-2xl bg-[#040D1B]/50 border border-dashed border-[#D4B996]/40 p-6 flex flex-col items-center justify-center text-center space-y-5">
              <div className="space-y-1.5 max-w-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#D4B996]/20 border border-[#D4B996]/50 flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-6 h-6 text-[#D4B996]" />
                </div>
                <h4 className="text-base font-black text-white">الخطوة 1: اختر المستوى الدراسي</h4>
                <p className="text-xs text-[#A2B4C7]">
                  اختر السنة الدراسية أولاً، ثم اختر المادة لتوليد ورقة امتحان رسمية كاملة من <strong>10 أسئلة</strong> خاصة بتلك المادة فقط.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                {MOCK_EXAMS_DATA.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => handleSelectExamLevel(lvl.id)}
                    className="p-4 rounded-2xl liquid-glass-dynamic border border-[#38BDF8]/35 hover:border-[#38BDF8] hover:bg-[#0284C7]/20 text-right space-y-2 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <GraduationCap className="w-5 h-5 text-[#38BDF8]" />
                      <span className="text-[10px] font-mono text-[#D4B996]">{lvl.subjects.length} مواد متاحة</span>
                    </div>
                    <div className="text-sm font-black text-white group-hover:text-[#38BDF8] transition-colors">
                      {lvl.label}
                    </div>
                    <div className="text-[11px] text-[#A2B4C7]">{lvl.badge}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : !activeSubject ? (
            /* Step 2: Choose Specific Subject (e.g., الاجتماعيات) */
            <div className="min-h-[280px] rounded-2xl bg-[#040D1B]/50 border border-dashed border-[#38BDF8]/40 p-6 flex flex-col items-center justify-center text-center space-y-5">
              <div className="w-full max-w-2xl flex items-center justify-between">
                <button
                  onClick={() => {
                    if (onPlaySound) onPlaySound();
                    setSelectedLevelId(null);
                  }}
                  className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-[#F3EDE2] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>تغيير المستوى</span>
                </button>
                <span className="text-xs font-bold text-[#38BDF8]">{activeLevel.label}</span>
              </div>

              <div className="space-y-1 max-w-lg">
                <h4 className="text-base font-black text-white">الخطوة 2: اختر المادة الدراسية</h4>
                <p className="text-xs text-[#A2B4C7]">
                  سيتم توليد امتحان موحد خاص فقط بالمادة المختارة (10 أسئلة كاملة على 20 نقطة).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                {activeLevel.subjects.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => handleSelectExamSubject(subj.id)}
                    className="p-4 rounded-2xl liquid-glass-dynamic border border-[#D4B996]/40 hover:border-[#38BDF8] hover:bg-[#0284C7]/20 text-right space-y-2 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <BookOpen className="w-5 h-5 text-[#D4B996] group-hover:text-[#38BDF8]" />
                      <span className="text-[10px] font-mono text-[#38BDF8]">10 أسئلة · م.{subj.coefficient}</span>
                    </div>
                    <div className="text-base font-black text-white group-hover:text-[#38BDF8] transition-colors">
                      مادة {subj.name}
                    </div>
                    <div className="text-[11px] text-[#A2B4C7]">المدة: {subj.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Step 3: Authentic Official Moroccan Exam Paper for ONLY the Chosen Subject (10 Questions) */
            <div className="space-y-3">
              {/* Floating Controls Toolbar Above Exam Paper */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setSelectedSubjectId(null);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-[#F3EDE2] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>تغيير المادة</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setSelectedLevelId(null);
                      setSelectedSubjectId(null);
                    }}
                    className="py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-semibold text-[#C2D2E2] cursor-pointer"
                  >
                    تغيير المستوى
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExamFillQuick}
                    className="py-1.5 px-3 rounded-xl bg-[#D4B996]/20 hover:bg-[#D4B996]/35 border border-[#D4B996]/45 text-[#D4B996] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>تعبئة سريعة للمعاينة</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setShowCorrection(!showCorrection);
                    }}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition-all ${
                      showCorrection
                        ? 'bg-emerald-500 text-[#040D1B] border-emerald-400 shadow'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/35 border-emerald-400/50 text-emerald-300'
                    }`}
                  >
                    {showCorrection ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showCorrection ? 'إخفاء التصحيح' : 'رؤية التصحيح (/20)'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="py-1.5 px-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>{isExportingPdf ? 'جاري التجهيز...' : 'تحميل PDF'}</span>
                  </button>
                </div>
              </div>

              {pdfSuccessMsg && (
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تم توليد وتحميل ورقة امتحان {activeSubject.name} بصيغة PDF بنجاح!</span>
                </div>
              )}

              {/* Authentic Moroccan Official Exam Paper Layout */}
              <div className="rounded-xl bg-[#FCFBF7] text-slate-900 border-4 border-double border-slate-800 shadow-2xl overflow-hidden max-h-[370px] overflow-y-auto">
                {/* Official Moroccan Header */}
                <div className="p-4 border-b-2 border-slate-800 bg-[#F4F1EA]">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start text-[11px]">
                    {/* Right Official Block */}
                    <div className="md:col-span-4 text-right space-y-0.5 font-bold text-slate-800">
                      <div>المملكة المغربية</div>
                      <div>وزارة التربية الوطنية والتعليم الأولي والرياضة</div>
                      <div className="text-slate-600 font-semibold">الأكاديمية الجهوية للتربية والتكوين</div>
                    </div>

                    {/* Center Exam Title Box */}
                    <div className="md:col-span-5 text-center border-2 border-slate-800 bg-white px-3 py-2 rounded">
                      <div className="text-xs font-black text-slate-900">{activeSubject.examTitle}</div>
                      <div className="text-[10px] font-semibold text-slate-600 mt-0.5">
                        المادة: {activeSubject.name} · المدة: {activeSubject.duration} · المعامل: {activeSubject.coefficient}
                      </div>
                    </div>

                    {/* Left Date & Score Box */}
                    <div className="md:col-span-3 text-left space-y-1">
                      <div className="text-[11px] font-bold text-slate-800">
                        التاريخ: <span className="font-mono">2025 / 06 / 14</span>
                      </div>
                      <div className="inline-block border-2 border-slate-800 bg-white px-2.5 py-1 rounded text-center">
                        <span className="text-[10px] text-slate-500 block leading-none">النقطة النهائية</span>
                        <span className="text-sm font-black font-mono text-sky-800 tabular-nums">
                          {showCorrection ? `${totalExamScore} / 20` : '...... / 20'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Identification Strip */}
                  <div className="mt-3 pt-2.5 border-t border-slate-400 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold text-slate-800">
                    <div>
                      الاسم الكامل للمترشح(ة): <span className="text-sky-800 underline decoration-dotted">سلمى العلوي</span>
                    </div>
                    <div>
                      المستوى: <span className="text-sky-800">{activeLevel.badge}</span>
                    </div>
                    <div className="sm:text-left">
                      رقم الامتحان: <span className="font-mono text-sky-800">40821</span> · المنجز:{' '}
                      <span className="font-mono">{answeredExamCount}/10</span>
                    </div>
                  </div>
                </div>

                {/* Sequential 10 Questions Body for Selected Subject Only */}
                <div className="p-4 sm:p-5 space-y-3.5 text-right divide-y divide-slate-200">
                  {activeSubject.questions.map((q) => {
                    const userAns = examAnswers[q.id] || '';
                    const isBlankFocused = activeBlankId === q.id;
                    const isCorrect = userAns.trim() === q.correctAnswer;

                    return (
                      <div key={q.id} className="pt-3 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-3 text-xs leading-relaxed">
                          <div className="flex-1 text-slate-900">
                            <span className="inline-block font-black text-sky-900 ml-1.5">
                              {q.id}) [{q.sectionTitle}]
                            </span>
                            <span className="font-semibold">{q.promptPrefix}</span>{' '}
                            <input
                              type="text"
                              value={userAns}
                              onFocus={() => setActiveBlankId(q.id)}
                              onChange={(e) =>
                                setExamAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                              }
                              placeholder="......................................"
                              className={`inline-block min-w-[145px] px-2 py-0.5 mx-1 border-b-2 text-center font-bold text-xs outline-none transition-colors rounded-t ${
                                showCorrection
                                  ? isCorrect
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                    : 'border-rose-600 bg-rose-50 text-rose-800'
                                  : userAns
                                  ? 'border-sky-700 bg-sky-50 text-sky-900'
                                  : 'border-slate-500 border-dashed bg-slate-100/70 text-slate-700 placeholder-slate-400'
                              }`}
                            />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-600 shrink-0">
                            ({q.points} ن)
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 pr-4">
                          <span className="text-[10px] text-slate-500">
                            {isBlankFocused ? 'اختر أو اكتب في الفراغ:' : 'خيارات سريعة:'}
                          </span>
                          {q.suggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => {
                                if (onPlaySound) onPlaySound();
                                setExamAnswers((prev) => ({ ...prev, [q.id]: sug }));
                              }}
                              className={`py-0.5 px-2.5 rounded border text-[10px] font-bold cursor-pointer transition-all ${
                                userAns === sug
                                  ? 'bg-sky-700 border-sky-800 text-white'
                                  : 'bg-white border-slate-300 text-slate-700 hover:border-sky-600 hover:bg-sky-50'
                              }`}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>

                        {showCorrection && (
                          <div className="mr-4 p-2 rounded bg-emerald-50 border-r-4 border-emerald-600 text-[11px] text-emerald-950">
                            <span className="font-black text-emerald-800">
                              ✓ التصحيح الرسمي ({isCorrect ? `${q.points}/${q.points}` : `0/${q.points}`} ن):{' '}
                            </span>
                            <span className="font-bold">{q.correctAnswer}</span> — {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="pt-3 text-center text-[10px] font-bold text-slate-500">
                    — انتهى الموضوع · مادة {activeSubject.name} · صفحة 1 / 1 —
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SUB-SLIDE 4: PARENT PEACE-OF-MIND DASHBOARD (TIMING + STUDENT INFO) ================= */}
      {subIdx === 3 && (
        <div className="rounded-2xl liquid-glass-dynamic p-4 sm:p-5 border border-emerald-400/35 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-5 rounded-2xl bg-[#040D1B]/55 border border-white/15 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-[#0284C7]/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-black">
                    س
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">سلمى العلوي</div>
                    <div className="text-[11px] text-[#D4B996]">الثالثة إعدادي · مسار دولي (خيار فرنسية)</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-bold">
                  ولي الأمر: سي محمد
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#A2B4C7] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    <span>تركيز اليوم الصافي</span>
                  </span>
                  <div className="text-lg font-black text-white font-mono tabular-nums">
                    {1 + Math.floor((45 + extraFocusMinutes) / 60)}س {(45 + extraFocusMinutes) % 60}د
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#A2B4C7] flex items-center gap-1">
                    <CalendarDays className="w-3 h-3 text-[#D4B996]" />
                    <span>إجمالي الأسبوع</span>
                  </span>
                  <div className="text-lg font-black text-[#D4B996] font-mono tabular-nums">9س 20د</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#A2B4C7]">التوقيت المعتاد للمذاكرة</span>
                  <div className="text-xs font-bold text-[#38BDF8] font-mono">18:30 – 20:15 مساءً</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#A2B4C7]">الانضباط دون مشتتات</span>
                  <div className="text-xs font-bold text-emerald-300 font-mono">94% التزام كامل</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-[11px] text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تتبع تربوي إيجابي يطمئن الوالدين دون تصوير الشاشة أو التجسس.</span>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-[#040D1B]/55 border border-white/15 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#38BDF8] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>مؤشر الجاهزية للامتحان الجهوي حسب المواد:</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300">المعدل المتوقع: 17.2 / 20</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'الرياضيات (فيثاغورس والمعادلات)', pct: 92, color: 'from-[#0284C7] to-[#38BDF8]' },
                  { name: 'الفيزياء والكيمياء (الميكانيك والكهرباء)', pct: 85, color: 'from-[#D4B996] to-amber-400' },
                  { name: 'اللغات والاجتماعيات', pct: 79, color: 'from-emerald-500 to-teal-300' }
                ].map((sub) => (
                  <div key={sub.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#F3EDE2] font-semibold">{sub.name}</span>
                      <span className="font-mono font-bold text-[#38BDF8] tabular-nums">{sub.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-l ${sub.color}`} style={{ width: `${sub.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-l from-[#0284C7]/20 to-emerald-500/15 border border-[#38BDF8]/30 space-y-2.5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D4B996]" />
                  <span>إنجاز اليوم: أتمت سلمى شرح فيثاغورس واجتازت أسئلة التثبيت بنجاح!</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      if (!parentRewardSent) {
                        setXp((x) => x + 30);
                        setParentRewardSent(true);
                      }
                    }}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      parentRewardSent
                        ? 'bg-[#D4B996] text-[#040D1B]'
                        : 'bg-[#D4B996]/20 hover:bg-[#D4B996]/35 border border-[#D4B996]/50 text-[#D4B996]'
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    <span>{parentRewardSent ? 'تم إرسال مكافأة الأب (+30 XP) ✓' : 'إرسال تشجيع ومكافأة (+30 XP)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setWhatsappPreviewOpen(!whatsappPreviewOpen);
                    }}
                    className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#040D1B] text-xs font-black flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{whatsappPreviewOpen ? 'إخفاء تقرير واتساب' : 'معاينة تقرير واتساب للأب'}</span>
                  </button>
                </div>

                {whatsappPreviewOpen && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/75 border border-emerald-400/50 text-[11px] text-emerald-100 leading-relaxed">
                    «السلام عليكم سي محمد، ابنتك سلمى أنجزت اليوم {1 + Math.floor((45 + extraFocusMinutes) / 60)}س{' '}
                    {(45 + extraFocusMinutes) % 60}د من المراجعة الصافية ووصلت جاهزيتها للجهوي إلى {readiness}% ({xp} XP). كلمة تشجيع منك ستزيد حماسها!»
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sub-Slide Stepper inside Slide 5 */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => {
            if (onPlaySound) onPlaySound();
            setSubIdx((prev) => Math.max(0, prev - 1));
          }}
          disabled={subIdx === 0}
          className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-35 border border-white/15 text-xs font-semibold text-[#F3EDE2] flex items-center gap-1 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>الشريحة الفرعية السابقة</span>
        </button>

        <span className="text-[11px] font-mono text-[#A2B4C7]">
          {SUB_SLIDES[subIdx].num} · {SUB_SLIDES[subIdx].label}
        </span>

        <button
          onClick={() => {
            if (onPlaySound) onPlaySound();
            setSubIdx((prev) => Math.min(SUB_SLIDES.length - 1, prev + 1));
          }}
          disabled={subIdx === SUB_SLIDES.length - 1}
          className="py-1.5 px-3 rounded-xl bg-[#0284C7]/30 hover:bg-[#0284C7]/50 disabled:opacity-35 border border-[#38BDF8]/40 text-xs font-bold text-[#38BDF8] flex items-center gap-1 cursor-pointer"
        >
          <span>الشريحة الفرعية التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
