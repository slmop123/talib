import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  MessageSquare,
  Clock,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Bot,
  FileCheck,
  Flame,
  CreditCard,
  Leaf,
  Users,
  Crown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Database,
  Building2,
  Award,
  Film,
  HelpCircle,
  LayoutGrid,
  Check,
  Landmark,
  Megaphone,
  ArrowLeft
} from 'lucide-react';
import { SLIDES_CONTENT, PRICING_TIERS } from '../data/presentationData';
import { PitchSlide } from '../types';
import { FloatingParticles } from './FloatingParticles';
import { LiveAllServicesMockup } from './LiveAllServicesMockup';

const COMPETITOR_AXES = [
  {
    id: 'curriculum',
    criterion: 'التوافق مع المنهج المغربي',
    tutoring: 'يتبع المقرر لكن يرتبط بمستوى الأستاذ ووقته المحدود',
    youtubeChat: 'أجنبي وعام: ChatGPT يهلوس خارج المنهج ويوتيوب مبعثر',
    talibAi: 'مغذى 100% بمقررات الوزارة (RAG) ويشرح بأمثلة مغربية',
    whyUs: 'التلميذ يدرس تماماً ما سيُمتحن فيه في الموحد والجهوي والوطني بالمسارين العام والدولي، دون تضييع وقت في شروحات أجنبية لا تطابق الإطار المرجعي المغربي.'
  },
  {
    id: 'focus',
    criterion: 'التركيز ومنع التشتت',
    tutoring: 'ساعتان أسبوعياً فقط، وبقية الأسبوع التلميذ وحيد مع المشتتات',
    youtubeChat: 'كارثة تشتت: خوارزميات Reels تدفع التلميذ لإدمان الهاتف',
    talibAi: 'بومودورو + حجب إشعارات التشتت + نظام XP و Streaks محفز',
    whyUs: 'بدل أن تفتح المذاكرة باب يوتيوب وتيك توك، نحول الهاتف نفسه إلى درع تركيز يكافئ التلميذ على الانضباط ويبني لديه عادة دراسية يومية.'
  },
  {
    id: 'cost',
    criterion: 'التكلفة الشهرية للأسرة',
    tutoring: 'باهظ جداً: 800 إلى 2500 د.م شهرياً ترهق الأسر المغربية',
    youtubeChat: 'مجاني ظاهرياً لكنه يفتقر للتأطير الممنهج وتصحيح الامتحانات',
    talibAi: 'رمزي: 70–160 د.م/شهر (توفير +90%) ودفع نقدي عبر Cash Plus',
    whyUs: 'نمنح الأسرة المغربية تعليماً ذكياً متاحاً 24/7 بتكلفة أقل من حصة خصوصية واحدة، مع تجاوز عائق البطاقة البنكية عبر وكالات القرب.'
  },
  {
    id: 'parent',
    criterion: 'متابعة ولي الأمر',
    tutoring: 'غياب تقارير دقيقة؛ الأب يدفع دون معرفة مستوى استيعاب الابن',
    youtubeChat: 'انعدام تام للمتابعة؛ الأب لا يعرف هل ابنه يذاكر أم يتصفح',
    talibAi: 'لوحة أب ذكية + تقارير واتساب إيجابية دون تجسس خانق',
    whyUs: 'نمنح الأب طمأنينة حقيقية حول جدوى استثماره ونقاط ضعف ابنه، بأسلوب تشجيعي يعزز العلاقة العائلية بدل الرقابة القمعية.'
  }
];

interface PitchDeckViewerProps {
  isFullscreenModal?: boolean;
  onRequestFullscreen?: () => void;
  onCloseFullscreen?: () => void;
  onPlaySound?: () => void;
  initialSlideIndex?: number;
}

const VIDEO_SCENES = [
  {
    time: '00:00 - 00:12',
    title: 'المشهد 1: أزمة التشتت في البيت المغربي',
    caption: 'ساعات ضائعة على الهاتف بين تيك توك والألعاب.. بينما الامتحان الجهوي والوطني يقترب.',
    accent: 'from-rose-500/20 to-[#071326]'
  },
  {
    time: '00:12 - 00:24',
    title: 'المشهد 2: دخول طالب ذكي (TalibAI)',
    caption: 'تلميذ يفتح المساعد الذكي: شرح فوري لفيثاغورس وقانون أوم بأمثلة من الواقع المغربي.',
    accent: 'from-[#0284C7]/30 to-[#071326]'
  },
  {
    time: '00:24 - 00:36',
    title: 'المشهد 3: تحدي البومودورو والتحفيز',
    caption: 'تفعيل وضع التركيز الذكي.. 25 دقيقة دراسة صافية، كسب XP وStreaks، وتوليد امتحان PDF.',
    accent: 'from-amber-500/20 to-[#071326]'
  },
  {
    time: '00:36 - 00:45',
    title: 'المشهد 4: طمأنينة الأب ومستقبل المغرب',
    caption: 'إشعار إيجابي على هاتف الأب: "ابنك أتم 4 ساعات تركيز هذا الأسبوع!" — نجاح بتكلفة 70 د.م.',
    accent: 'from-emerald-500/25 to-[#071326]'
  }
];

export const PitchDeckViewer: React.FC<PitchDeckViewerProps> = ({
  isFullscreenModal = false,
  onRequestFullscreen,
  onCloseFullscreen,
  onPlaySound,
  initialSlideIndex = 0
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverviewGrid, setShowOverviewGrid] = useState(false);

  // 7-Minute Pitch Timer (420 seconds)
  const [pitchSecondsLeft, setPitchSecondsLeft] = useState(420);
  const [isPitchTimerRunning, setIsPitchTimerRunning] = useState(false);

  // Pitch Video Reel Simulation on Slide 9
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoElapsed, setVideoElapsed] = useState(0); // 0 to 45s

  // Interactive Competitor Matrix Axis on Slide 3
  const [selectedAxisIdx, setSelectedAxisIdx] = useState(0);

  const totalSlides = SLIDES_CONTENT.length;
  const slide: PitchSlide = SLIDES_CONTENT[currentIdx] || SLIDES_CONTENT[0];

  // Pitch 7-minute timer loop
  useEffect(() => {
    if (!isPitchTimerRunning || pitchSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setPitchSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPitchTimerRunning, pitchSecondsLeft]);

  // Pitch video promo simulation loop (45s)
  useEffect(() => {
    if (!isVideoPlaying || slide.slideType !== 'conclusion') return;
    const interval = setInterval(() => {
      setVideoElapsed((prev) => {
        if (prev >= 45) {
          setIsVideoPlaying(false);
          return 45;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isVideoPlaying, slide.slideType]);

  // Keyboard navigation in fullscreen modal
  useEffect(() => {
    if (!isFullscreenModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToNext();
      } else if (e.key === 'ArrowRight') {
        goToPrev();
      } else if (e.key === 'Escape' && onCloseFullscreen) {
        onCloseFullscreen();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreenModal, currentIdx]);

  const goToNext = () => {
    if (onPlaySound) onPlaySound();
    setCurrentIdx((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
    setIsVideoPlaying(false);
  };

  const goToPrev = () => {
    if (onPlaySound) onPlaySound();
    setCurrentIdx((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    setIsVideoPlaying(false);
  };

  const selectSlide = (idx: number) => {
    if (onPlaySound) onPlaySound();
    setCurrentIdx(idx);
    setShowOverviewGrid(false);
    setIsVideoPlaying(false);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentVideoSceneIdx = Math.min(3, Math.floor(videoElapsed / 12));
  const currentVideoScene = VIDEO_SCENES[currentVideoSceneIdx];

  const renderSlideVisualPanel = (s: PitchSlide) => {
    switch (s.slideType) {
      case 'cover':
        return (
          <div className="relative h-full min-h-[290px] rounded-2xl overflow-hidden liquid-glass-dynamic border border-[#38BDF8]/35 flex flex-col justify-between p-6">
            <img
              src="/src/assets/images/futuristic_talibai_cover_1794598235501.jpg"
              alt="TalibAI Futuristic Moroccan EdTech Backdrop"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1B]/90 via-[#040D1B]/45 to-transparent" />

            {/* Startup Futuristic Logo Mark */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284C7] via-[#2563EB] to-[#D4B996] p-[1.5px] shadow-lg shadow-[#0284C7]/30">
                  <div className="w-full h-full rounded-[14px] bg-[#040D1B]/85 flex items-center justify-center">
                    <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                      <path d="M18 4L30 11V25L18 32L6 25V11L18 4Z" stroke="#38BDF8" strokeWidth="2" />
                      <path d="M18 9L25 13V23L18 27L11 23V13L18 9Z" stroke="#D4B996" strokeWidth="1.5" />
                      <circle cx="18" cy="18" r="3" fill="#38BDF8" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-base font-black text-white tracking-tight">TalibAI</div>
                  <div className="text-[11px] text-[#D4B996] font-semibold">طالب ذكي · المغرب</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#38BDF8] px-2.5 py-1 rounded-lg bg-[#040D1B]/75 backdrop-blur-md border border-[#38BDF8]/30">
                EDTECH MOROCCO
              </span>
            </div>

            {/* Team Identifier Footer inside Cover Visual */}
            <div className="relative z-10 p-4 rounded-xl liquid-glass-dynamic border border-[#F3EDE2]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#D4B996]">بطاقة تعريف الفريق والبرنامج</span>
                <span className="font-mono text-[#38BDF8] tabular-nums">7:00 MIN PITCH</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-[#C2D2E2] pt-1 border-t border-white/10">
                <div>
                  <span className="text-[#A2B4C7] block text-[10px]">الفريق</span>
                  <span className="font-bold text-white">فريق طالب ذكي</span>
                </div>
                <div>
                  <span className="text-[#A2B4C7] block text-[10px]">المسار</span>
                  <span className="font-bold text-white">ريادة الأعمال AI</span>
                </div>
                <div>
                  <span className="text-[#A2B4C7] block text-[10px]">التغطية</span>
                  <span className="font-bold text-[#38BDF8]">ابتدائي · إعدادي · باك</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'problem':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-[#F3EDE2]">تشخيص الأزمة في الأسرة المغربية</span>
              <span className="text-xs font-mono text-rose-400 tabular-nums">30 ثانية</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-rose-950/35 border border-rose-500/30 space-y-1.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>تشتت الهاتف وإدمان الترفيه</span>
                  </span>
                  <span className="font-mono tabular-nums">+4.5 ساعات/يوم</span>
                </div>
                <p className="text-[11px] text-rose-100/80">تيك توك · ألعاب الفيديو · إشعارات مستمرة تسرق تركيز التلميذ.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>عجز المراقبة وغلاء الدعم</span>
                  </span>
                  <span className="font-mono tabular-nums">900+ د.م/شهر</span>
                </div>
                <p className="text-[11px] text-amber-100/80">صعوبة تتبع الوالدين للدراسة وارتفاع تكلفة الدروس الخصوصية.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-l from-[#0284C7]/30 to-emerald-500/15 border border-[#38BDF8]/40 flex items-center justify-between backdrop-blur-md">
              <div>
                <span className="text-[11px] font-bold text-[#38BDF8] block">المعادلة المفقودة التي نحققها:</span>
                <span className="text-xs font-bold text-white">AI بالمقرر المغربي + بومودورو + تحكم أبوي</span>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            </div>
          </div>
        );

      case 'market': {
        const activeAxis = COMPETITOR_AXES[selectedAxisIdx] || COMPETITOR_AXES[0];
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-4 sm:p-5 flex flex-col justify-between space-y-3">
            {/* Competitive Gap Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#38BDF8] tracking-tight">منظومة متكاملة 4 في 1</div>
                <div className="text-[11px] text-[#D4B996] font-semibold">فجوة السوق · مقارنة مباشرة بين الخيارات الثلاثة المتاحة للأسر</div>
              </div>
              <TrendingUp className="w-7 h-7 text-[#D4B996]" />
            </div>

            {/* 3-Competitor Head-to-Head Interactive Matrix */}
            <div className="space-y-1.5 text-[11px]">
              {/* Matrix Header */}
              <div className="grid grid-cols-12 gap-1.5 px-2 py-1 text-[#A2B4C7] font-bold border-b border-white/10 text-[10px]">
                <div className="col-span-3">معيار المقارنة</div>
                <div className="col-span-3 text-center">الدعم الحضوري</div>
                <div className="col-span-3 text-center">YouTube / ChatGPT</div>
                <div className="col-span-3 text-center text-[#38BDF8]">طالب ذكي (نحن)</div>
              </div>

              {COMPETITOR_AXES.map((row, idx) => {
                const isSelected = selectedAxisIdx === idx;
                return (
                  <button
                    key={row.id}
                    onClick={() => {
                      if (onPlaySound) onPlaySound();
                      setSelectedAxisIdx(idx);
                    }}
                    className={`w-full text-right grid grid-cols-12 gap-1.5 p-2 rounded-xl transition-all cursor-pointer items-center border ${
                      isSelected
                        ? 'bg-[#0284C7]/25 border-[#38BDF8]/60 shadow-md'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="col-span-3 font-bold text-[#F3EDE2] text-[10px] leading-tight">
                      {row.criterion}
                    </div>
                    <div className="col-span-3 text-[10px] text-rose-200/90 leading-snug text-center">
                      {idx === 0 ? 'محدود الوقت' : idx === 1 ? 'ساعتان/أسبوع' : idx === 2 ? '800–2500 د.م' : 'دون تقارير'}
                    </div>
                    <div className="col-span-3 text-[10px] text-amber-200/90 leading-snug text-center">
                      {idx === 0 ? 'خارج المنهج' : idx === 1 ? 'مشتت Reels' : idx === 2 ? 'بلا تأطير' : 'صفر رقابة'}
                    </div>
                    <div className="col-span-3 text-[10px] text-emerald-300 font-bold leading-snug text-center">
                      {idx === 0 ? '100% RAG' : idx === 1 ? 'بومودورو + XP' : idx === 2 ? '70–160 د.م' : 'واتساب إيجابي'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Deep "Why Us?" Comparison Callout for Selected Criterion */}
            <div className="p-3 rounded-xl bg-gradient-to-l from-[#0284C7]/30 via-[#081931]/80 to-[#D4B996]/15 border border-[#38BDF8]/45 space-y-1.5 backdrop-blur-md">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#D4B996]">تفسير معمق: لماذا نحن أفضل في «{activeAxis.criterion}»؟</span>
                <span className="text-[10px] text-[#38BDF8]">اضغط أي معيار أعلاه</span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-[10px] text-[#C2D2E2]">
                <div><strong className="text-rose-300">الدعم الحضوري:</strong> {activeAxis.tutoring}</div>
                <div><strong className="text-amber-300">YouTube / ChatGPT:</strong> {activeAxis.youtubeChat}</div>
                <div className="text-[#F3EDE2] pt-1 border-t border-white/10">
                  <strong className="text-[#38BDF8]">أفضلية طالب ذكي:</strong> {activeAxis.whyUs}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'solution':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-5 flex flex-col justify-between space-y-3">
            <div className="text-xs font-bold text-[#D4B996] flex items-center justify-between pb-2 border-b border-white/10">
              <span>مكونات النموذج الأولي (Live Prototype Flow)</span>
              <span className="text-[#38BDF8] font-mono">3 MODULES</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-[#38BDF8]/35 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0284C7] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">1. شات بوت بأمثلة من الواقع المغربي</div>
                  <div className="text-[11px] text-[#A2B4C7]">شرح تفاعلي مبسط يرسخ الفهم لا الحفظ الآلي</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-[#D4B996]/35 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4B996] text-[#071326] flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">2. مولد الامتحانات (جهوي / وطني)</div>
                  <div className="text-[11px] text-[#A2B4C7]">تصحيح فوري مع سلم التنقيط + تصدير PDF</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-emerald-500/35 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 text-[#071326] flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">3. وضع التركيز + XP & Streaks + لوحة الأب</div>
                  <div className="text-[11px] text-[#A2B4C7]">تحويل الهاتف لأداة تفوق مع تقارير طمأنينة للوالدين</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'strategy':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-5 flex flex-col justify-between space-y-3.5">
            {/* RAG Technical Pipeline */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                <span>1. التطوير والإنتاج (هندسة RAG للمقررات المغربية)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-[#D4B996] block">المناهج الرسمية</span>
                  <span className="text-[10px] text-[#A2B4C7]">فهرسة الكتب</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0284C7]/25 border border-[#38BDF8]/50">
                  <span className="font-bold text-white block">محرك RAG</span>
                  <span className="text-[10px] text-[#38BDF8]">دقة علمية</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                  <span className="font-bold text-emerald-300 block">شرح موثوق</span>
                  <span className="text-[10px] text-[#A2B4C7]">صفر هلوسة</span>
                </div>
              </div>
            </div>

            {/* Dual Reach Strategy: Paid Ads + Ministry of Education */}
            <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-[#38BDF8]/30 space-y-2.5">
              <div className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                <Megaphone className="w-4 h-4" />
                <span>2. خطة الوصول للآباء والتلاميذ</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                <div className="py-1.5 px-1 rounded-lg bg-[#040D1B]/70 border border-[#38BDF8]/30 font-bold text-white">Facebook Ads</div>
                <div className="py-1.5 px-1 rounded-lg bg-[#040D1B]/70 border border-[#38BDF8]/30 font-bold text-[#38BDF8]">TikTok Ads</div>
                <div className="py-1.5 px-1 rounded-lg bg-[#040D1B]/70 border border-[#38BDF8]/30 font-bold text-[#D4B996]">Google AdSense</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center gap-2.5">
                <Landmark className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-emerald-300 block">التعاون مع وزارة التربية الوطنية</span>
                  <span className="text-[#C2D2E2]">نشر وتعميم التطبيق في المؤسسات التعليمية على الصعيد الوطني.</span>
                </div>
              </div>
            </div>

            {/* Local Payment Channels */}
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-[#D4B996]/30 flex items-center justify-between gap-2">
              <div className="text-[11px] font-bold text-[#D4B996] flex items-center gap-1.5 shrink-0">
                <CreditCard className="w-4 h-4" />
                <span>الدفع المحلي:</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="py-1 px-2 rounded-md bg-[#040D1B]/70 border border-white/10 font-bold text-white">CMI</span>
                <span className="py-1 px-2 rounded-md bg-[#040D1B]/70 border border-white/10 font-bold text-[#38BDF8]">Wafacash</span>
                <span className="py-1 px-2 rounded-md bg-[#040D1B]/70 border border-white/10 font-bold text-[#D4B996]">Cash Plus</span>
              </div>
            </div>
          </div>
        );

      case 'live-mockup':
      case 'financial':
        return null;

      case 'impact':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-5 flex flex-col justify-between space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-l from-[#0284C7]/25 to-white/5 border border-[#38BDF8]/35 space-y-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8]">
                <Users className="w-4 h-4" />
                <span>الأثر الاجتماعي والتعليمي</span>
              </div>
              <p className="text-xs text-[#F3EDE2] leading-relaxed">
                ديمقراطية التعليم وتكافؤ الفرص بين القرية والمدينة ومحاربة الهدر المدرسي بتكلفة في متناول الأسر.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-l from-emerald-500/20 to-white/5 border border-emerald-500/35 space-y-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Leaf className="w-4 h-4" />
                <span>الأثر البيئي المستدام</span>
              </div>
              <p className="text-xs text-[#F3EDE2] leading-relaxed">
                رقمنة شاملة للتمارين والامتحانات والتصحيح، مما يقلص بشكل كبير استهلاك الورق والطباعة.
              </p>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-5 flex flex-col justify-between space-y-4">
            {/* Expansion Roadmap */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0284C7]/25 to-[#D4B996]/20 border border-[#D4B996]/35 flex items-center justify-between backdrop-blur-md">
              <div>
                <span className="text-[10px] font-bold text-[#D4B996] block">طريق التوسع الإقليمي</span>
                <span className="text-sm font-black text-white">المغرب أولاً ← شمال إفريقيا</span>
              </div>
              <Crown className="w-6 h-6 text-[#D4B996]" />
            </div>

            {/* Team Roles Matrix */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#38BDF8]">هيكلة الفريق التنفيذي المتكامل:</div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">التطوير التقني والذكاء الاصطناعي</span>
                  <span className="text-[10px] text-[#38BDF8] font-mono">AI / RAG / App</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">الإدارة المالية والتسويق والنمو</span>
                  <span className="text-[10px] text-[#D4B996] font-mono">Finance & 4Ps</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">خدمة العملاء ومواكبة الأسر</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Customer Success</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="h-full min-h-[290px] rounded-2xl liquid-glass-dynamic p-4 flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="font-bold text-[#D4B996] flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#38BDF8]" />
                <span>الفيلم الترويجي التفاعلي (Pitch Video · 45s)</span>
              </span>
              <span className="font-mono text-[#38BDF8] tabular-nums">{videoElapsed}s / 45s</span>
            </div>

            {/* Interactive Simulated Video Stage */}
            <div className={`flex-1 rounded-xl p-4 bg-gradient-to-br ${currentVideoScene.accent} border border-white/15 flex flex-col justify-between min-h-[155px] relative overflow-hidden`}>
              <img
                src="/src/assets/images/hero_talibai_morocco_1793794959872.jpg"
                alt="معاينة الفيلم الترويجي لمنصة طالب ذكي"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
              />
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#D4B996]">
                <span>{currentVideoScene.time}</span>
                <span>{isVideoPlaying ? 'جاري العرض' : 'جاهز للتشغيل'}</span>
              </div>

              <div className="relative z-10 space-y-1 my-auto py-2">
                <div className="text-sm font-black text-white">{currentVideoScene.title}</div>
                <p className="text-xs text-[#E2E8F0] leading-relaxed">{currentVideoScene.caption}</p>
              </div>

              {/* Video Progress Bar */}
              <div className="relative z-10 w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#38BDF8] to-[#D4B996] transition-all duration-300"
                  style={{ width: `${(videoElapsed / 45) * 100}%` }}
                />
              </div>
            </div>

            {/* Video Controls & Jury Q&A Indicator */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onPlaySound) onPlaySound();
                    if (videoElapsed >= 45) setVideoElapsed(0);
                    setIsVideoPlaying(!isVideoPlaying);
                  }}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                >
                  {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isVideoPlaying ? 'إيقاف الفيلم' : videoElapsed >= 45 ? 'إعادة تشغيل الفيلم' : 'تشغيل الفيلم الترويجي'}</span>
                </button>
                <button
                  onClick={() => { setIsVideoPlaying(false); setVideoElapsed(0); }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A2B4C7] hover:text-white border border-white/10 cursor-pointer"
                  title="إعادة من البداية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>باب الأسئلة مفتوح</span>
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col justify-between relative overflow-hidden ${isFullscreenModal ? 'h-full' : ''}`}>
      {/* Visible Flying Background Particles & Dynamic Liquid Glass Caustic Orbs across ALL slides */}
      <FloatingParticles density={48} className="absolute inset-0 pointer-events-none z-0 opacity-95" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0284C7]/20 blur-[95px] pointer-events-none z-0 liquid-caustic-orb" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D4B996]/15 blur-[100px] pointer-events-none z-0 animate-liquid-float" />

      {/* Top Pitch Control & 7-Minute Jury Timer Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[#F3EDE2]/15 bg-[#050F20]/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-[#F3EDE2] flex items-center gap-2 whitespace-nowrap shrink-0">
            <Crown className="w-4 h-4 text-[#D4B996]" />
            <span>عرض لجنة التحكيم · طالب ذكي (TalibAI)</span>
          </span>
          <span className="text-xs text-[#A2B4C7] font-mono tabular-nums whitespace-nowrap shrink-0">
            شريحة {currentIdx + 1} / {totalSlides}
          </span>
        </div>

        {/* Interactive 7-Minute Countdown Timer + Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#091A33] border border-[#38BDF8]/30 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#A2B4C7] hidden sm:inline">مؤقت العرض:</span>
            <span className={`font-mono font-bold tabular-nums ${pitchSecondsLeft <= 60 ? 'text-amber-400' : 'text-white'}`}>
              {formatTimer(pitchSecondsLeft)}
            </span>
            <button
              onClick={() => setIsPitchTimerRunning(!isPitchTimerRunning)}
              className="text-[11px] font-bold text-[#38BDF8] hover:text-white px-1.5 py-0.5 rounded bg-[#38BDF8]/15 cursor-pointer whitespace-nowrap shrink-0"
            >
              {isPitchTimerRunning ? 'إيقاف' : 'بدء 7د'}
            </button>
            <button
              onClick={() => { setIsPitchTimerRunning(false); setPitchSecondsLeft(420); }}
              className="text-[#A2B4C7] hover:text-white cursor-pointer"
              title="إعادة ضبط 7 دقائق"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => setShowOverviewGrid(!showOverviewGrid)}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showOverviewGrid
                ? 'bg-[#D4B996]/20 border-[#D4B996]/50 text-[#D4B996]'
                : 'bg-white/5 border-white/10 text-[#C2D2E2] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>كل الشرائح (10)</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showNotes
                ? 'bg-[#38BDF8]/20 border-[#38BDF8]/50 text-[#38BDF8]'
                : 'bg-white/5 border-white/10 text-[#C2D2E2] hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>دليل الإلقاء</span>
          </button>

          {!isFullscreenModal && onRequestFullscreen && (
            <button
              onClick={onRequestFullscreen}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>ملء الشاشة</span>
            </button>
          )}

          {isFullscreenModal && onCloseFullscreen && (
            <button
              onClick={onCloseFullscreen}
              className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>إنهاء العرض</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Slide Canvas OR 9-Slide Grid Overview */}
      <div className="relative z-10 flex-1 p-5 md:p-8 overflow-y-auto">
        {showOverviewGrid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SLIDES_CONTENT.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => selectSlide(idx)}
                className={`p-4 rounded-2xl text-right transition-all border cursor-pointer flex flex-col justify-between gap-3 liquid-glass-dynamic ${
                  currentIdx === idx
                    ? 'border-[#38BDF8] shadow-lg shadow-[#0284C7]/20'
                    : 'border-white/15 hover:border-[#D4B996]/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#38BDF8]">شريحة {s.num}</span>
                  <span className="text-[11px] text-[#D4B996] font-mono">{s.allocatedTimeLabel}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white line-clamp-2">{s.title}</div>
                  <div className="text-[11px] text-[#A2B4C7] mt-1 line-clamp-1">{s.kicker}</div>
                </div>
              </button>
            ))}
          </div>
        ) : slide.slideType === 'live-mockup' ? (
          /* Dedicated Full-Width Slide 5: Unified All-in-One Live Product Mockup (1.5-Min Interactive Demo) */
          <div className="space-y-3.5 text-right">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="font-mono text-[#38BDF8]">شريحة {slide.num}</span>
                  <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                  <span className="text-[#D4B996]">{slide.kicker}</span>
                  <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-mono">الزمن: {slide.allocatedTimeLabel}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug text-balance">
                  {slide.title}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#38BDF8] font-medium max-w-md">
                {slide.subtitle}
              </p>
            </div>

            <LiveAllServicesMockup onPlaySound={onPlaySound} />

            {showNotes && (
              <div className="p-3.5 rounded-xl liquid-glass-dynamic border-[#38BDF8]/30 text-xs text-[#C2D2E2] space-y-1">
                <span className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ملاحظات المتحدث للجنة التحكيم:</span>
                </span>
                <p className="leading-relaxed">{slide.speakerNote}</p>
              </div>
            )}
          </div>
        ) : slide.slideType === 'financial' ? (
          /* Dedicated Full-Width Executive Financial Slide: Unit Economics Flowchart + Real Pricing Tier Cards */
          <div className="space-y-5 text-right">
            {/* Top Row: Slide Header + Unit Economics Visual Flowchart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="font-mono text-[#38BDF8]">شريحة {slide.num}</span>
                    <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                    <span className="text-[#D4B996]">{slide.kicker}</span>
                    <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono">الزمن: {slide.allocatedTimeLabel}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-[1.3] text-balance">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#38BDF8] font-medium">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Funding Sources Card */}
                <div className="p-3.5 rounded-2xl liquid-glass-dynamic space-y-2">
                  <div className="text-xs font-bold text-[#D4B996] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>مصادر التمويل الأولي والتوسع:</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#F3EDE2]">
                    <span className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-semibold flex-1 text-center">
                      1. حاضنات الأعمال ومسابقات المشاريع
                    </span>
                    <ArrowLeft className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span className="px-2.5 py-1.5 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/40 font-semibold text-[#38BDF8] flex-1 text-center">
                      2. المستثمرون الملائكة (Business Angels)
                    </span>
                  </div>
                </div>
              </div>

              {/* Unit Economics Visual Diagram (خطاطة الاقتصاد الوحدوي) */}
              <div className="lg:col-span-7 rounded-2xl liquid-glass-dynamic p-4 sm:p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>خطاطة الاقتصاد الوحدوي (Unit Economics Flowchart)</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">عائد 22.5x</span>
                </div>

                {/* 3-Step Connected Flowchart */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-center">
                  {/* Step 1: CAC */}
                  <div className="flex-1 p-3 rounded-xl bg-rose-950/30 border border-rose-500/35 space-y-1 backdrop-blur-md">
                    <div className="text-[10px] text-rose-300 font-semibold">1. إنفاق الاستقطاب (CAC)</div>
                    <div className="text-xl font-black text-white font-mono tabular-nums">40 د.م</div>
                    <div className="text-[10px] text-[#A2B4C7]">$4 إعلانات مستهدفة</div>
                  </div>

                  <div className="hidden sm:flex justify-center text-[#38BDF8] shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                  </div>

                  {/* Step 2: Active Subscription */}
                  <div className="flex-1 p-3 rounded-xl bg-white/5 border border-[#38BDF8]/40 space-y-1 backdrop-blur-md">
                    <div className="text-[10px] text-[#38BDF8] font-semibold">2. متوسط الاشتراك</div>
                    <div className="text-xl font-black text-white font-mono tabular-nums">100 د.م</div>
                    <div className="text-[10px] text-[#A2B4C7]">شهرياً للباقة المتوسطة</div>
                  </div>

                  <div className="hidden sm:flex justify-center text-emerald-400 shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                  </div>

                  {/* Step 3: LTV */}
                  <div className="flex-1 p-3 rounded-xl bg-emerald-950/35 border border-emerald-500/40 space-y-1 backdrop-blur-md">
                    <div className="text-[10px] text-emerald-300 font-semibold">3. القيمة الدائمة (LTV)</div>
                    <div className="text-xl font-black text-emerald-400 font-mono tabular-nums">900 د.م</div>
                    <div className="text-[10px] text-emerald-200/80">عائد سنوي للعميل</div>
                  </div>
                </div>

                {/* Bottom Visual Comparison Bar + LTV Result */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-gradient-to-l from-emerald-500/15 via-[#0284C7]/15 to-transparent border border-emerald-500/35 backdrop-blur-md">
                  <div className="sm:col-span-7 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#C2D2E2]">نسبة القيمة الدائمة (LTV) مقارنة بالتكلفة (CAC):</span>
                      <span className="font-mono font-bold text-emerald-400 tabular-nums">40 ← 900 د.م</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                      <div className="h-full bg-rose-400 w-[5%]" title="CAC: 40 د.م" />
                      <div className="h-full bg-gradient-to-l from-emerald-400 to-[#38BDF8] w-[95%]" title="LTV: 900 د.م سنوياً" />
                    </div>
                  </div>
                  <div className="sm:col-span-5 text-center sm:text-left border-t sm:border-t-0 sm:border-r border-white/10 pt-2 sm:pt-0 sm:pr-3">
                    <div className="text-[10px] text-emerald-300 font-bold">3. القيمة الدائمة السنوية (LTV)</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">900 د.م / سنة</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Realistic Pricing Cards (مثل الباقات والجدوى بدون تعمق) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F3EDE2] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#D4B996]" />
                  <span>هيكل الاشتراكات والباقات الشهرية:</span>
                </span>
                <span className="text-[11px] text-[#A2B4C7]">أسعار مدروسة تلائم القدرة الشرائية للأسر المغربية</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-4 relative flex flex-col justify-between liquid-glass-dynamic ${
                      tier.popular
                        ? 'border-[#38BDF8] shadow-lg shadow-[#0284C7]/25'
                        : 'border-[#F3EDE2]/15'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white text-[10px] font-bold py-0.5 px-2.5 rounded-full shadow">
                        الأكثر طلباً
                      </div>
                    )}

                    <div>
                      <div className="flex items-baseline justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10">
                        <div>
                          <h4 className="text-xs font-extrabold text-white">{tier.name}</h4>
                          <span className="text-[10px] text-[#A2B4C7]">{tier.period}</span>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-xl font-black text-[#D4B996] font-mono tabular-nums">{tier.price}</span>
                          <span className="text-[10px] text-[#F3EDE2] mr-1">د.م</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5">
                        {tier.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#C2D2E2]">
                            <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                            <span className="leading-snug line-clamp-2">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Speaker Notes on Financial Slide */}
            {showNotes && (
              <div className="p-3.5 rounded-xl liquid-glass-dynamic border-[#38BDF8]/30 text-xs text-[#C2D2E2] space-y-1">
                <span className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ملاحظات المتحدث للجنة التحكيم:</span>
                </span>
                <p className="leading-relaxed">{slide.speakerNote}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Slide Content Column (Bold Title + Short Punchy Bullets) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-right">
              <div className="space-y-3">
                {/* Clean Unboxed Typographic Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="font-mono text-[#38BDF8]">شريحة {slide.num}</span>
                  <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                  <span className="text-[#D4B996]">{slide.kicker}</span>
                  <span className="text-[#A2B4C7]" aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-mono">الزمن: {slide.allocatedTimeLabel}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.3] text-balance">
                  {slide.title}
                </h3>

                <p className="text-sm sm:text-base text-[#38BDF8] font-medium leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              {/* Short Punchy Jury Bullets */}
              <div className="space-y-2.5">
                {slide.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl liquid-glass-dynamic flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm leading-relaxed text-[#F3EDE2]">
                      <strong className="text-[#D4B996] ml-1.5">{b.label}</strong>
                      <span>{b.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Speaker Notes */}
              {showNotes && (
                <div className="p-3.5 rounded-xl liquid-glass-dynamic border-[#38BDF8]/30 text-xs text-[#C2D2E2] space-y-1">
                  <span className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>ملاحظات المتحدث للجنة التحكيم:</span>
                  </span>
                  <p className="leading-relaxed">{slide.speakerNote}</p>
                </div>
              )}
            </div>

            {/* Slide Futuristic Visual / Infographic Column */}
            <div className="lg:col-span-5">
              {renderSlideVisualPanel(slide)}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Slide Stepper & Progress Bar */}
      <div className="relative z-10 px-5 py-3.5 border-t border-[#F3EDE2]/15 bg-[#050F20]/70 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {SLIDES_CONTENT.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => selectSlide(idx)}
              title={`${s.num}. ${s.title}`}
              className={`h-7 min-w-7 px-2 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                currentIdx === idx
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#D4B996] text-[#071326] shadow'
                  : 'bg-white/5 text-[#A2B4C7] hover:bg-white/15 hover:text-white'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentIdx === 0}
            className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs text-[#F3EDE2] font-semibold flex items-center gap-1 border border-white/10 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابقة</span>
          </button>

          <button
            onClick={goToNext}
            disabled={currentIdx === totalSlides - 1}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-40 text-xs text-white font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
