export interface MockExamQuestion {
  id: number;
  sectionTitle: string;
  promptPrefix: string;
  suggestions: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface MockExamSubject {
  id: string;
  name: string;
  coefficient: number;
  duration: string;
  examTitle: string;
  questions: MockExamQuestion[];
}

export interface MockExamLevel {
  id: 'primary' | 'middle' | 'bac';
  label: string;
  badge: string;
  subjects: MockExamSubject[];
}

export const MOCK_EXAMS_DATA: MockExamLevel[] = [
  {
    id: 'middle',
    label: 'الثالثة إعدادي · الامتحان الجهوي',
    badge: 'السنة الثالثة ثانوي إعدادي',
    subjects: [
      {
        id: 'middle-social',
        name: 'الاجتماعيات',
        coefficient: 1,
        duration: 'ساعة و 15 دقيقة',
        examTitle: 'الامتحان الجهوي الموحد — مادة الاجتماعيات (الثالثة إعدادي)',
        questions: [
          {
            id: 1,
            sectionTitle: 'التاريخ',
            promptPrefix: 'اندلعت الحرب العالمية الثانية سنة:',
            suggestions: ['1939', '1914', '1945'],
            correctAnswer: '1939',
            explanation: 'بدأت الحرب العالمية الثانية في فاتح شتنبر 1939 بعد غزو ألمانيا لبولونيا.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'التاريخ',
            promptPrefix: 'تأسس النظام النازي في ألمانيا بقيادة:',
            suggestions: ['أدولف هتلر', 'موسوليني', 'تشرشل'],
            correctAnswer: 'أدولف هتلر',
            explanation: 'وصل أدولف هتلر إلى المستشارية سنة 1933 وأقام نظاماً ديكتاتورياً نازياً.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'التاريخ',
            promptPrefix: 'وقّعت معاهدة فرساي التي فرضت شروطاً قاسية على ألمانيا سنة:',
            suggestions: ['1919', '1929', '1945'],
            correctAnswer: '1919',
            explanation: 'وُقعت معاهدة فرساي سنة 1919 عقب نهاية الحرب العالمية الأولى.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'التاريخ',
            promptPrefix: 'المعركة التي هزم فيها المقاوم المغربي محمد بن عبد الكريم الخطابي الجيش الإسباني سنة 1921 هي معركة:',
            suggestions: ['أنوال', 'وادي المخازن', 'إيسلي'],
            correctAnswer: 'أنوال',
            explanation: 'حققت المقاومة الريفية بقيادة الخطابي انتصاراً تاريخياً في معركة أنوال في يوليوز 1921.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'التاريخ',
            promptPrefix: 'قدّمت الحركة الوطنية المغربية وثيقة المطالبة بالاستقلال يوم:',
            suggestions: ['11 يناير 1944', '20 غشت 1953', '18 نونبر 1956'],
            correctAnswer: '11 يناير 1944',
            explanation: 'قدّم حزب الاستقلال بتنسيق مع السلطان محمد الخامس وثيقة المطالبة بالاستقلال في 11 يناير 1944.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'الجغرافيا',
            promptPrefix: 'يُعرف التكتل الاقتصادي الذي يضم دول المغرب العربي منذ سنة 1989 باسم:',
            suggestions: ['اتحاد المغرب العربي', 'مجلس التعاون الخليجي', 'مجموعة البريكس'],
            correctAnswer: 'اتحاد المغرب العربي',
            explanation: 'تأسس اتحاد المغرب العربي بمدينة مراكش في 17 فبراير 1989 ويضم خمس دول.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'الجغرافيا',
            promptPrefix: 'الدولة التي تُعد القوة الاقتصادية الأولى عالمياً وتُعرف بسيليكون فالي في التكنولوجيا هي:',
            suggestions: ['الولايات المتحدة الأمريكية', 'نيجيريا', 'روسيا'],
            correctAnswer: 'الولايات المتحدة الأمريكية',
            explanation: 'تمتلك الولايات المتحدة الأمريكية أقوى ناتج داخلي خام وأبرز أقطاب الابتكار التكنولوجي.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'الجغرافيا',
            promptPrefix: 'القطاع الذي يعتمد على الموارد التكنولوجية العالية والبحث العلمي في اليابان يسمى:',
            suggestions: ['الصناعة عالية التكنولوجيا', 'الصيد التقليدي', 'الرعي الواسع'],
            correctAnswer: 'الصناعة عالية التكنولوجيا',
            explanation: 'تتفوق اليابان عالمياً في الصناعات الدقيقة والإلكترونيات والروبوتيك.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'التربية على المواطنة',
            promptPrefix: 'الإجراء الذي يتيح للتلاميذ والأفراد الدفاع عن القضايا العامة أمام المؤسسات هو:',
            suggestions: ['المبادرة المواطِنة والالتماس', 'اللامبالاة', 'العزوف المدني'],
            correctAnswer: 'المبادرة المواطِنة والالتماس',
            explanation: 'يضمن الدستور المغربي الحق في تقديم الملتمسات والعرائض والمشاركة المواطِنة.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'التربية على المواطنة',
            promptPrefix: 'المفهوم الذي يعني تلبية حاجيات الحاضر دون المساس بقدرة الأجيال المقبلة هو:',
            suggestions: ['التنمية المستدامة', 'الاستهلاك المفرط', 'التصحر'],
            correctAnswer: 'التنمية المستدامة',
            explanation: 'التنمية المستدامة توازن بين النمو الاقتصادي، العدالة الاجتماعية، وحماية البيئة.',
            points: 2
          }
        ]
      },
      {
        id: 'middle-math',
        name: 'الرياضيات',
        coefficient: 3,
        duration: 'ساعتان',
        examTitle: 'الامتحان الجهوي الموحد — مادة الرياضيات (الثالثة إعدادي)',
        questions: [
          {
            id: 1,
            sectionTitle: 'الهندسة',
            promptPrefix: 'في مثلث ABC قائم الزاوية في A حيث AB = 3cm و AC = 4cm، طول الوتر BC يساوي:',
            suggestions: ['5 cm', '7 cm', '12 cm'],
            correctAnswer: '5 cm',
            explanation: 'حسب مبرهنة فيثاغورس المباشرة: BC² = 3² + 4² = 25 إذن BC = 5 cm.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'الجبر',
            promptPrefix: 'حل المعادلة 3x - 9 = 0 هو العدد x يساوي:',
            suggestions: ['3', '-3', '9'],
            correctAnswer: '3',
            explanation: '3x = 9 ومنه x = 9 ÷ 3 = 3.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'الجبر',
            promptPrefix: 'تبسيط الجذر المربع √49 + √16 يساوي:',
            suggestions: ['11', '65', '13'],
            correctAnswer: '11',
            explanation: '√49 = 7 و √16 = 4، إذن 7 + 4 = 11.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'الدوال',
            promptPrefix: 'لتكن الدالة الخطية f(x) = 4x، صورة العدد 3 بالدالة f هي f(3) تساوي:',
            suggestions: ['12', '7', '1.33'],
            correctAnswer: '12',
            explanation: 'نعوض x بـ 3: f(3) = 4 × 3 = 12.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'المتطابقات',
            promptPrefix: 'نشر المتطابقة الهامة (x + 2)² يعطي:',
            suggestions: ['x² + 4x + 4', 'x² + 4', 'x² + 2x + 4'],
            correctAnswer: 'x² + 4x + 4',
            explanation: '(a+b)² = a² + 2ab + b² = x² + 4x + 4.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'الهندسة',
            promptPrefix: 'قياس الزاوية المحيطية بالنسبة للزاوية المركزية التي تحصر معها نفس القوس يساوي:',
            suggestions: ['نصفها (1/2)', 'ضعفها (×2)', 'يساويها'],
            correctAnswer: 'نصفها (1/2)',
            explanation: 'الزاوية المحيطية تساوي نصف قياس الزاوية المركزية المرتبطة بنفس القوس.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'المعلم في المستوى',
            promptPrefix: 'إحداثيات منتصف القطعة [AB] حيث A(2, 4) و B(6, 8) هي:',
            suggestions: ['(4, 6)', '(8, 12)', '(2, 2)'],
            correctAnswer: '(4, 6)',
            explanation: 'xM = (2+6)/2 = 4 و yM = (4+8)/2 = 6.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'المتراجحات',
            promptPrefix: 'حل المتراجحة x + 5 > 8 هو مجموعة الأعداد x الأكبر قطعا من:',
            suggestions: ['3', '13', '-3'],
            correctAnswer: '3',
            explanation: 'x > 8 - 5 أي x > 3.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الحساب المثلثي',
            promptPrefix: 'في مثلث قائم الزاوية، العلاقة التي تربط جيب تمام الزاوية cos(α) وجيبها sin(α) هي cos²(α) + sin²(α) تساوي:',
            suggestions: ['1', '0', '2'],
            correctAnswer: '1',
            explanation: 'المتطابقة المثلثية الأساسية: cos²(α) + sin²(α) = 1.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'الهندسة الفضائية',
            promptPrefix: 'حجم متوازي المستطيلات أبعاده 2cm و 3cm و 5cm يساوي:',
            suggestions: ['30 cm³', '10 cm³', '15 cm³'],
            correctAnswer: '30 cm³',
            explanation: 'الحجم V = الطول × العرض × الارتفاع = 2 × 3 × 5 = 30 cm³.',
            points: 2
          }
        ]
      },
      {
        id: 'middle-physics',
        name: 'الفيزياء والكيمياء',
        coefficient: 1,
        duration: 'ساعة واحدة',
        examTitle: 'الامتحان الجهوي الموحد — الفيزياء والكيمياء (الثالثة إعدادي)',
        questions: [
          {
            id: 1,
            sectionTitle: 'الميكانيك',
            promptPrefix: 'وحدة قياس السرعة المتوسطة في النظام العالمي للوحدات (SI) هي:',
            suggestions: ['m/s', 'km/h', 'N/kg'],
            correctAnswer: 'm/s',
            explanation: 'الوحدة العالمية للمسافة هي المتر وللزمن هي الثانية، فتكون وحدة السرعة m/s.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'الميكانيك',
            promptPrefix: 'سيارة تسير بسرعة 20 m/s بزمن رد فعل 1s ومسافة كبح 35m، مسافة التوقف Da هي:',
            suggestions: ['55 m', '36 m', '70 m'],
            correctAnswer: '55 m',
            explanation: 'dr = 20 × 1 = 20m إذن Da = 20 + 35 = 55m.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'الميكانيك',
            promptPrefix: 'الجهاز المستعمل لقياس شدة القوة (الوزن P) هو:',
            suggestions: ['الدينامومتر', 'الميزان ذو الكفتين', 'الفولطمتر'],
            correctAnswer: 'الدينامومتر',
            explanation: 'تقاس شدة القوة بالنيوتن باستعمال الدينامومتر.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'الميكانيك',
            promptPrefix: 'العلاقة التي تربط شدة الوزن P بالكتلة m وشدة الثقالة g هي:',
            suggestions: ['P = m × g', 'P = m / g', 'g = P × m'],
            correctAnswer: 'P = m × g',
            explanation: 'وزن الجسم يساوي جداء كتلته في شدة مجال الثقالة.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'الكهرباء',
            promptPrefix: 'العلاقة المعبرة عن قانون أوم بين التوتر U والمقاومة R وشدة التيار I هي:',
            suggestions: ['U = R × I', 'I = U × R', 'R = U × I'],
            correctAnswer: 'U = R × I',
            explanation: 'التوتر يساوي المقاومة مضروبة في شدة التيار الكهربائي.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'الكهرباء',
            promptPrefix: 'وحدة قياس القدرة الكهربائية P هي:',
            suggestions: ['الواط (W)', 'الأوم (Ω)', 'الجول (J)'],
            correctAnswer: 'الواط (W)',
            explanation: 'تُقاس القدرة الكهربائية بالواط (Watt) وتُحسب بالعلاقة P = U × I.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'الكهرباء',
            promptPrefix: 'مصباح يحمل الإشارتين (220V ; 100W)، شدة التيار المار فيه تقريباً هي:',
            suggestions: ['0.45 A', '2.2 A', '22000 A'],
            correctAnswer: '0.45 A',
            explanation: 'I = P / U = 100 / 220 ≈ 0.45 A.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'الكهرباء',
            promptPrefix: 'الجهاز المستعمل في المنازل لحساب الطاقة الكهربائية المستهلكة E هو:',
            suggestions: ['العداد الكهربائي', 'الأمبيرمتر', 'الأوممتر'],
            correctAnswer: 'العداد الكهربائي',
            explanation: 'يقيس العداد الكهربائي الطاقة المستهلكة بالكيلوواط-ساعة (kWh).',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الميكانيك',
            promptPrefix: 'عندما يكون جسم صلب في توازن تحت تأثير قوتين F1 و F2، يكون لمجموع متجهتيهما القيمة:',
            suggestions: ['المتجهة المنعدمة (0)', '2 × F1', 'P + m'],
            correctAnswer: 'المتجهة المنعدمة (0)',
            explanation: 'شرط التوازن: للقوتين نفس خط التأثير ونفس الشدة ومنحيان متعاكسان.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'الكهرباء',
            promptPrefix: 'تحويل الطاقة الكهربائية 1 kWh إلى الجول (J) يساوي:',
            suggestions: ['3 600 000 J', '1000 J', '3600 J'],
            correctAnswer: '3 600 000 J',
            explanation: '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J.',
            points: 2
          }
        ]
      }
    ]
  },
  {
    id: 'primary',
    label: 'السادس ابتدائي · الموحد الإقليمي',
    badge: 'السنة السادسة ابتدائي',
    subjects: [
      {
        id: 'primary-math',
        name: 'الرياضيات',
        coefficient: 2,
        duration: 'ساعة ونصف',
        examTitle: 'الامتحان الإقليمي الموحد — مادة الرياضيات (السادس ابتدائي)',
        questions: [
          {
            id: 1,
            sectionTitle: 'العمليات الأربع',
            promptPrefix: 'ناتج العملية 450 + 350 × 2 (مع احترام الأسبقية) هو:',
            suggestions: ['1150', '1600', '800'],
            correctAnswer: '1150',
            explanation: 'نبدأ بالضرب 350 × 2 = 700 ثم نجمع مع 450 لنحصل على 1150.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'القسمة',
            promptPrefix: 'حاصل قسمة العدد 720 على 8 يساوي:',
            suggestions: ['90', '80', '72'],
            correctAnswer: '90',
            explanation: '72 ÷ 8 = 9 وبإضافة الصفر نحصل على 90.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'التحويلات',
            promptPrefix: 'تحويل الكتلة 2.5 kg إلى الغرام (g) يساوي:',
            suggestions: ['2500 g', '250 g', '25 g'],
            correctAnswer: '2500 g',
            explanation: '1 كيلوغرام = 1000 غرام، إذن 2.5 × 1000 = 2500 g.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'الهندسة',
            promptPrefix: 'حقل مستطيل طوله 120m وعرضه 45m، مساحته الإجمالية تساوي:',
            suggestions: ['5400 m²', '330 m²', '165 m²'],
            correctAnswer: '5400 m²',
            explanation: 'المساحة = الطول × العرض = 120 × 45 = 5400 m².',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'النسبة المئوية',
            promptPrefix: 'نسبة 25% من المبلغ 400 درهم تساوي:',
            suggestions: ['100 درهم', '200 درهم', '50 درهم'],
            correctAnswer: '100 درهم',
            explanation: '25% تعني الربع، وربع 400 هو 100 درهم.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'الهندسة',
            promptPrefix: 'مجموع قياسات زوايا أي مثلث يساوي دائماً:',
            suggestions: ['180°', '90°', '360°'],
            correctAnswer: '180°',
            explanation: 'مجموع زوايا المثلث الهندسي ثابت ويساوي 180 درجة.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'الأعداد الكسرية',
            promptPrefix: 'مجموع الكسرين 1/2 + 1/4 يساوي:',
            suggestions: ['3/4', '2/6', '1/8'],
            correctAnswer: '3/4',
            explanation: 'نوحد المقام: 2/4 + 1/4 = 3/4.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'المساحات',
            promptPrefix: 'محيط مربع طول ضلعه 9 cm يساوي:',
            suggestions: ['36 cm', '81 cm', '18 cm'],
            correctAnswer: '36 cm',
            explanation: 'محيط المربع = الضلع × 4 = 9 × 4 = 36 cm.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الحجوم',
            promptPrefix: 'تحويل السعة 3.5 L إلى المليلتر (mL) يساوي:',
            suggestions: ['3500 mL', '350 mL', '35 mL'],
            correctAnswer: '3500 mL',
            explanation: '1 لتر = 1000 مليلتر، إذن 3.5 × 1000 = 3500 mL.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'السرعة المتوسطة',
            promptPrefix: 'تقطع سيارة مسافة 180 km في مدة ساعتين (2h)، سرعتها المتوسطة هي:',
            suggestions: ['90 km/h', '360 km/h', '60 km/h'],
            correctAnswer: '90 km/h',
            explanation: 'السرعة = المسافة ÷ المدة = 180 ÷ 2 = 90 km/h.',
            points: 2
          }
        ]
      },
      {
        id: 'primary-arabic',
        name: 'اللغة العربية',
        coefficient: 2,
        duration: 'ساعة ونصف',
        examTitle: 'الامتحان الإقليمي الموحد — مادة اللغة العربية (السادس ابتدائي)',
        questions: [
          {
            id: 1,
            sectionTitle: 'التراكيب',
            promptPrefix: 'في جملة «يَقرأُ التلميذُ القصةَ»، إعراب كلمة «القصةَ» هو:',
            suggestions: ['مفعول به منصوب', 'فاعل مرفوع', 'مبتدأ مرفوع'],
            correctAnswer: 'مفعول به منصوب',
            explanation: 'وقع عليها فعل القراءة فهي مفعول به منصوب بالفتحة الظاهرة.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'الصرف والتحويل',
            promptPrefix: 'وزن كلمة «مِفْتَاح» من اسم الآلة هو:',
            suggestions: ['مِفْعَال', 'مَفْعَل', 'فَعَّال'],
            correctAnswer: 'مِفْعَال',
            explanation: 'مفتاح اسم آلة مشتق على وزن مِفْعَال.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'التراكيب',
            promptPrefix: 'علامة جزم الفعل المضارع الصحيح الآخر مثل «لم يكتبْ» هي:',
            suggestions: ['السكون', 'الفتحة', 'الضمة'],
            correctAnswer: 'السكون',
            explanation: 'يجزم المضارع الصحيح الآخر بالسكون الظاهر.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'الإملاء',
            promptPrefix: 'تُكتب الهمزة المتطرفة في كلمة «شاطِئ» على الياء لأن الحرف الذي قبلها:',
            suggestions: ['مكسور', 'مفتوح', 'مضموم'],
            correctAnswer: 'مكسور',
            explanation: 'الكسرة يناسبها الياء غير المنقوطة في الهمزة المتطرفة.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'الصرف والتحويل',
            promptPrefix: 'اسم الفاعل من الفعل الثلاثي «سَمِعَ» هو:',
            suggestions: ['سَامِع', 'مَسْمُوع', 'مَسْمَع'],
            correctAnswer: 'سَامِع',
            explanation: 'يصاغ اسم الفاعل من الثلاثي على وزن فَاعِل.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'التراكيب',
            promptPrefix: 'من النواسخ الحرفية التي تنصب المبتدأ وترفع الخبر:',
            suggestions: ['إنَّ', 'كان', 'أصبح'],
            correctAnswer: 'إنَّ',
            explanation: 'إنّ وأخواتها حروف ناسخة تنصب الاسم وترفع الخبر.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'الصرف والتحويل',
            promptPrefix: 'الفعل «وَعَدَ» الذي يبدأ بحرف علة يُسمى فعلاً:',
            suggestions: ['مثالاً', 'أجوف', 'ناقصاً'],
            correctAnswer: 'مثالاً',
            explanation: 'الفعل المعتل الأول يسمى فعلاً مثالاً.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'التراكيب',
            promptPrefix: 'يُنصب جمع المؤنث السالم مثل «المجتهداتِ» وعلامة نصبه:',
            suggestions: ['الكسرة النائبة عن الفتحة', 'الفتحة الظاهرة', 'الياء'],
            correctAnswer: 'الكسرة النائبة عن الفتحة',
            explanation: 'جمع المؤنث السالم ينصب بالكسرة نيابة عن الفتحة.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الفهم والشكل',
            promptPrefix: 'مرادف كلمة «المثابرة» في سياق الاجتهاد الدراسي هو:',
            suggestions: ['المواظبة والمداومة', 'الكسل', 'التأخير'],
            correctAnswer: 'المواظبة والمداومة',
            explanation: 'المثابرة تعني الاستمرار والمداومة على العمل بجد.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'الإملاء',
            promptPrefix: 'تُحذف ألف «ابن» إذا وقعت بين:',
            suggestions: ['اسمين عَلَمين ثانيهما أب للأول', 'فعلين', 'حرفين'],
            correctAnswer: 'اسمين عَلَمين ثانيهما أب للأول',
            explanation: 'تحذف همزة ابن مثل: طارق بن زياد.',
            points: 2
          }
        ]
      }
    ]
  },
  {
    id: 'bac',
    label: 'الثانية باكالوريا · الامتحان الوطني',
    badge: 'السنة الثانية باكالوريا',
    subjects: [
      {
        id: 'bac-math',
        name: 'الرياضيات',
        coefficient: 7,
        duration: 'ثلاث ساعات',
        examTitle: 'الامتحان الوطني الموحد — مادة الرياضيات (الثانية باكالوريا)',
        questions: [
          {
            id: 1,
            sectionTitle: 'التحليل',
            promptPrefix: 'مشتقة الدالة f(x) = ln(x) + x عند النقطة x = 1 هي f\'(1) تساوي:',
            suggestions: ['2', '1', '0'],
            correctAnswer: '2',
            explanation: 'f\'(x) = 1/x + 1، وبالتعويض بـ x=1 نحصل على 1 + 1 = 2.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'النهايات',
            promptPrefix: 'قيمة النهاية الشهيرة lim (e^x / x) عندما يؤول x إلى +∞ هي:',
            suggestions: ['+∞', '0', '1'],
            correctAnswer: '+∞',
            explanation: 'الدالة الأسية تتفوق على القوى عند +∞.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'الأعداد العقدية',
            promptPrefix: 'مرافق العدد العقدي z = 3 + 4i هو z̄ يساوي:',
            suggestions: ['3 - 4i', '-3 + 4i', '5'],
            correctAnswer: '3 - 4i',
            explanation: 'المرافق يعكس إشارة الجزء التخيلي فقط.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'الأعداد العقدية',
            promptPrefix: 'معيار العدد العقدي z = 3 + 4i هو |z| يساوي:',
            suggestions: ['5', '7', '25'],
            correctAnswer: '5',
            explanation: '|z| = √(3² + 4²) = √25 = 5.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'المتتاليات',
            promptPrefix: 'نهاية المتتالية الهندسية (q^n) عندما يكون الأساس q محصوراً بين -1 و 1 هي:',
            suggestions: ['0', '1', '+∞'],
            correctAnswer: '0',
            explanation: 'إذا كان |q| < 1 فإن lim q^n = 0.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'التكامل',
            promptPrefix: 'قيمة التكامل المحدود ∫₀¹ 2x dx تساوي:',
            suggestions: ['1', '2', '0.5'],
            correctAnswer: '1',
            explanation: 'الدالة الأصلية لـ 2x هي x²، إذن 1² - 0² = 1.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'الاحتمالات',
            promptPrefix: 'عند رمي نرد متوازن من 6 أوجه مرة واحدة، احتمال الحصول على عدد زوجي هو:',
            suggestions: ['1/2', '1/6', '1/3'],
            correctAnswer: '1/2',
            explanation: 'الأعداد الزوجية هي {2, 4, 6} أي 3 من أصل 6 = 1/2.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'الهندسة الفضائية',
            promptPrefix: 'الجداء السلمي لمتجهتين متعامدتين u و v يساوي دائماً:',
            suggestions: ['0', '1', '-1'],
            correctAnswer: '0',
            explanation: 'تتعامد متجهتان إذا وفقط إذا كان جداؤهما السلمي منعدماً.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الدوال اللوغاريتمية',
            promptPrefix: 'تبسيط التعبير ln(e³) يساوي:',
            suggestions: ['3', 'e', '1'],
            correctAnswer: '3',
            explanation: 'ln(e^a) = a لأن اللوغاريتم النيبيري دالة عكسية للأسية.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'المعادلات التفاضلية',
            promptPrefix: 'الحل العام للمعادلة التفاضلية y\' = 2y هو من الشكل:',
            suggestions: ['k · e^(2x)', 'k · e^(-2x)', '2x + k'],
            correctAnswer: 'k · e^(2x)',
            explanation: 'حل المعادلة y\' = ay هو y(x) = k e^(ax).',
            points: 2
          }
        ]
      },
      {
        id: 'bac-philo',
        name: 'الفلسفة',
        coefficient: 2,
        duration: 'ساعتان',
        examTitle: 'الامتحان الوطني الموحد — مادة الفلسفة (الثانية باكالوريا)',
        questions: [
          {
            id: 1,
            sectionTitle: 'الوضع البشري',
            promptPrefix: 'يرى روني ديكارت أن أساس هوية الشخص هو:',
            suggestions: ['الفكر (الكوجيطو)', 'الإحساس والذاكرة', 'البنية البيولوجية'],
            correctAnswer: 'الفكر (الكوجيطو)',
            explanation: 'يؤكد ديكارت أن التفكير هو الجوهر الثابت الذي يحدد هوية الذات.',
            points: 2
          },
          {
            id: 2,
            sectionTitle: 'الوضع البشري',
            promptPrefix: 'الفيلسوف الذي أسس هوية الشخص على الشعور والذاكرة هو:',
            suggestions: ['جون لوك', 'باروخ سبينوزا', 'نيتشه'],
            correctAnswer: 'جون لوك',
            explanation: 'ربط جون لوك الهوية الشخصية باستمرارية الشعور المقترن بالذاكرة.',
            points: 2
          },
          {
            id: 3,
            sectionTitle: 'قيمة الشخص',
            promptPrefix: 'عند إيمانويل كانط، الشخص غاية في ذاته ولا يجب معاملته كـ:',
            suggestions: ['وسيلة', 'كائن عاقل', 'كائن أخلاقي'],
            correctAnswer: 'وسيلة',
            explanation: 'يمتلك الشخص كرامة مطلقة لكونه ذاتاً عاقلة أخلاقية لا تُقدّر بثمن.',
            points: 2
          },
          {
            id: 4,
            sectionTitle: 'معرفة الغير',
            promptPrefix: 'اعتبر جان بول سارتر أن نظرة الغير للذات تحولها إلى موضوع، وبالتالي فمعرفته:',
            suggestions: ['مستحيلة وموضوعية', 'سهلة وبسيطة', 'فطرية'],
            correctAnswer: 'مستحيلة وموضوعية',
            explanation: 'يرى سارتر أن الغير جحيم وتشييء للذات مما يجعل معرفته مستحيلة.',
            points: 2
          },
          {
            id: 5,
            sectionTitle: 'معرفة الغير',
            promptPrefix: 'في مقابل سارتر، يرى موريس ميرلوبونتي أن معرفة الغير ممكنة عبر:',
            suggestions: ['التواصل والتعاطف والحوار', 'العزلة التامة', 'الشك المنهجي'],
            correctAnswer: 'التواصل والتعاطف والحوار',
            explanation: 'الجسد واللغة يفتحان أفقاً للتشارك الوجداني والتواصل مع الغير.',
            points: 2
          },
          {
            id: 6,
            sectionTitle: 'المعرفة والحقيقة',
            promptPrefix: 'يرى غاستون باشلار أن المعرفة العلمية تُبنى انطلاقاً من:',
            suggestions: ['الجدل بين العقل والتجربة', 'التجربة الحسية الساذجة', 'الخيال الأدبي'],
            correctAnswer: 'الجدل بين العقل والتجربة',
            explanation: 'يرفض باشلار النزعة الاختبارية الساذجة والعقلانية المنغلقة لصالح عقلانية مطبقة.',
            points: 2
          },
          {
            id: 7,
            sectionTitle: 'معايير الحقيقة',
            promptPrefix: 'معيار الحقيقة عند الفلسفة البراغماتية (وليام جيمس) هو:',
            suggestions: ['النجاح العملي والمنفعة', 'الوضوح الرياضي فقط', 'الاتفاق اللغوي'],
            correctAnswer: 'النجاح العملي والمنفعة',
            explanation: 'تُقاس حقيقة الفكرة بقدرتها على العمل وتحقيق نتائج نافعة في الواقع.',
            points: 2
          },
          {
            id: 8,
            sectionTitle: 'السياسة',
            promptPrefix: 'يقوم مشروع «العقد الاجتماعي» عند توماس هوبز وجون لوك على الانتقال من حالة الطبيعة إلى:',
            suggestions: ['حالة المجتمع المدني والدولة', 'الفوضى الدائمة', 'الحكم الفردي المطلق'],
            correctAnswer: 'حالة المجتمع المدني والدولة',
            explanation: 'تنشأ الدولة باتفاق تعاقدي لحفظ الأمن والحريات والحقوق.',
            points: 2
          },
          {
            id: 9,
            sectionTitle: 'الأخلاق',
            promptPrefix: 'يقوم الواجب الأخلاقي عند كانط على:',
            suggestions: ['الواجب لذاته واحترام القانون العقلي', 'طلب اللذة والمنفعة', 'الخوف من المجتمع'],
            correctAnswer: 'الواجب لذاته واحترام القانون العقلي',
            explanation: 'الفعل الأخلاقي الحر يستند إلى الأمر القطعي لا إلى المصلحة.',
            points: 2
          },
          {
            id: 10,
            sectionTitle: 'الأخلاق',
            promptPrefix: 'ترتبط السعادة عند أرسطو بممارسة الفضيلة وتطبيق مبدأ:',
            suggestions: ['الوسط الذهبي (الاعتدال)', 'الإفراط في الرغبات', 'الانطواء التام'],
            correctAnswer: 'الوسط الذهبي (الاعتدال)',
            explanation: 'الفضيلة عند أرسطو هي وسط عادل بين رذيلتي الإفراط والتفريط.',
            points: 2
          }
        ]
      }
    ]
  }
];
