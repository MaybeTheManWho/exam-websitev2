// Mock GAT question data
export const generateGatQuestions = (type, difficulty) => {
    // Number of questions based on difficulty
    const questionCount = difficulty === 'easy' ? 15 : 
                          difficulty === 'medium' ? 20 : 25;
    
    // Generate questions
    return Array(questionCount).fill(null).map((_, index) => {
      if (type === 'math') {
        return generateMathQuestion(index, difficulty);
      } else if (type === 'arabic') {
        return generateArabicQuestion(index, difficulty);
      }
      return null;
    }).filter(q => q !== null);
  };
  
  // Generate a math question
  const generateMathQuestion = (index, difficulty) => {
    const questionTypes = [
      'algebra', 
      'geometry', 
      'arithmetic', 
      'statistics', 
      'probability'
    ];
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let questionText = '';
    let options = [];
    
    // Adjust complexity based on difficulty
    switch(questionType) {
      case 'algebra':
        if (difficulty === 'easy') {
          questionText = `حل المعادلة: 2x + 3 = 7`;
          options = [
            { id: `q-${index}-a`, text: `x = 1` },
            { id: `q-${index}-b`, text: `x = 2` },
            { id: `q-${index}-c`, text: `x = 3` },
            { id: `q-${index}-d`, text: `x = 4` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `حل المعادلة: 3x² - 12x + 9 = 0`;
          options = [
            { id: `q-${index}-a`, text: `x = 1.5` },
            { id: `q-${index}-b`, text: `x = 3` },
            { id: `q-${index}-c`, text: `x = 1` },
            { id: `q-${index}-d`, text: `x = 2` },
          ];
        } else {
          questionText = `حل النظام المعادلات: 2x + 3y = 7, 3x - y = 5`;
          options = [
            { id: `q-${index}-a`, text: `x = 2, y = 1` },
            { id: `q-${index}-b`, text: `x = 1, y = 2` },
            { id: `q-${index}-c`, text: `x = 3, y = 1/3` },
            { id: `q-${index}-d`, text: `x = 2, y = 3` },
          ];
        }
        break;
        
      case 'geometry':
        if (difficulty === 'easy') {
          questionText = `ما هي مساحة مستطيل طوله 6 متر وعرضه 4 متر؟`;
          options = [
            { id: `q-${index}-a`, text: `20 متر مربع` },
            { id: `q-${index}-b`, text: `24 متر مربع` },
            { id: `q-${index}-c`, text: `10 متر مربع` },
            { id: `q-${index}-d`, text: `18 متر مربع` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هي مساحة دائرة نصف قطرها 7 سم؟ (استخدم π = 3.14)`;
          options = [
            { id: `q-${index}-a`, text: `153.86 سم مربع` },
            { id: `q-${index}-b`, text: `43.96 سم مربع` },
            { id: `q-${index}-c`, text: `21.98 سم مربع` },
            { id: `q-${index}-d`, text: `154 سم مربع` },
          ];
        } else {
          questionText = `في مثلث متساوي الأضلاع طول ضلعه 8 سم، ما هو ارتفاع المثلث؟`;
          options = [
            { id: `q-${index}-a`, text: `6.93 سم` },
            { id: `q-${index}-b`, text: `4 سم` },
            { id: `q-${index}-c`, text: `4√3 سم` },
            { id: `q-${index}-d`, text: `8√2 سم` },
          ];
        }
        break;
        
      case 'arithmetic':
        if (difficulty === 'easy') {
          questionText = `ما هو ناتج 28 ÷ 4 × 3 + 7؟`;
          options = [
            { id: `q-${index}-a`, text: `28` },
            { id: `q-${index}-b`, text: `35` },
            { id: `q-${index}-c`, text: `21` },
            { id: `q-${index}-d`, text: `24` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هو ناتج 15% من 240؟`;
          options = [
            { id: `q-${index}-a`, text: `36` },
            { id: `q-${index}-b`, text: `30` },
            { id: `q-${index}-c`, text: `40` },
            { id: `q-${index}-d`, text: `25` },
          ];
        } else {
          questionText = `إذا كان عدد ما أكبر من ضعف عدد آخر بـ 5، ومجموعهما 25، فما هو العدد الأكبر؟`;
          options = [
            { id: `q-${index}-a`, text: `15` },
            { id: `q-${index}-b`, text: `20` },
            { id: `q-${index}-c`, text: `18.33` },
            { id: `q-${index}-d`, text: `16.67` },
          ];
        }
        break;
        
      case 'statistics':
        if (difficulty === 'easy') {
          questionText = `ما هو المتوسط الحسابي للأعداد: 5، 7، 8، 10، 15؟`;
          options = [
            { id: `q-${index}-a`, text: `9` },
            { id: `q-${index}-b`, text: `10` },
            { id: `q-${index}-c`, text: `8` },
            { id: `q-${index}-d`, text: `7.5` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هو الوسيط للبيانات التالية: 12، 15، 17، 19، 21، 22، 35؟`;
          options = [
            { id: `q-${index}-a`, text: `19` },
            { id: `q-${index}-b`, text: `21` },
            { id: `q-${index}-c`, text: `17` },
            { id: `q-${index}-d`, text: `20` },
          ];
        } else {
          questionText = `إذا كان الانحراف المعياري لمجموعة من البيانات يساوي 4، وقمنا بضرب كل قيمة في المجموعة في 3، فما هو الانحراف المعياري للمجموعة الجديدة؟`;
          options = [
            { id: `q-${index}-a`, text: `12` },
            { id: `q-${index}-b`, text: `7` },
            { id: `q-${index}-c`, text: `4` },
            { id: `q-${index}-d`, text: `16` },
          ];
        }
        break;
        
      case 'probability':
        if (difficulty === 'easy') {
          questionText = `ما هو احتمال ظهور عدد أكبر من 4 عند رمي نرد عادي مرقم من 1 إلى 6؟`;
          options = [
            { id: `q-${index}-a`, text: `2/6` },
            { id: `q-${index}-b`, text: `1/2` },
            { id: `q-${index}-c`, text: `1/3` },
            { id: `q-${index}-d`, text: `1/6` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `إذا سحبنا كرة عشوائياً من كيس يحتوي على 4 كرات حمراء و 3 كرات زرقاء و 5 كرات خضراء، فما هو احتمال أن تكون الكرة زرقاء؟`;
          options = [
            { id: `q-${index}-a`, text: `3/12` },
            { id: `q-${index}-b`, text: `1/4` },
            { id: `q-${index}-c`, text: `1/3` },
            { id: `q-${index}-d`, text: `1/6` },
          ];
        } else {
          questionText = `إذا كان لدينا 7 كتب مختلفة، كم طريقة لترتيبها على رف؟`;
          options = [
            { id: `q-${index}-a`, text: `5040` },
            { id: `q-${index}-b`, text: `720` },
            { id: `q-${index}-c`, text: `2520` },
            { id: `q-${index}-d`, text: `1260` },
          ];
        }
        break;
        
      default:
        break;
    }
    
    // Randomly select correct answer
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const correctAnswer = options[correctAnswerIndex].id;
    
    return {
      id: `q-${index + 1}`,
      text: questionText,
      options,
      correctAnswer,
      type: questionType,
      difficulty
    };
  };
  
  // Generate an Arabic question
  const generateArabicQuestion = (index, difficulty) => {
    const questionTypes = [
      'grammar', 
      'vocabulary', 
      'reading',
      'semantics',
      'syntax'
    ];
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let questionText = '';
    let options = [];
    
    // Adjust complexity based on difficulty
    switch(questionType) {
      case 'grammar':
        if (difficulty === 'easy') {
          questionText = `ما هو جمع كلمة "كتاب"؟`;
          options = [
            { id: `q-${index}-a`, text: `كُتُب` },
            { id: `q-${index}-b`, text: `كتابات` },
            { id: `q-${index}-c`, text: `مكاتب` },
            { id: `q-${index}-d`, text: `كتائب` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هو إعراب كلمة "محمد" في جملة "قرأ محمد الكتاب"؟`;
          options = [
            { id: `q-${index}-a`, text: `فاعل مرفوع` },
            { id: `q-${index}-b`, text: `مفعول به منصوب` },
            { id: `q-${index}-c`, text: `مبتدأ مرفوع` },
            { id: `q-${index}-d`, text: `خبر مرفوع` },
          ];
        } else {
          questionText = `ما الضبط الصحيح لحرف الضاد في كلمة "ضرب" في قولنا: ضرب زيد عمرا؟`;
          options = [
            { id: `q-${index}-a`, text: `الفتح` },
            { id: `q-${index}-b`, text: `الضم` },
            { id: `q-${index}-c`, text: `الكسر` },
            { id: `q-${index}-d`, text: `السكون` },
          ];
        }
        break;
        
      case 'vocabulary':
        if (difficulty === 'easy') {
          questionText = `ما هو المعنى الصحيح لكلمة "ساطع"؟`;
          options = [
            { id: `q-${index}-a`, text: `مُضيء` },
            { id: `q-${index}-b`, text: `مُظلم` },
            { id: `q-${index}-c`, text: `سريع` },
            { id: `q-${index}-d`, text: `بطيء` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هو المعنى الصحيح لكلمة "مؤانسة"؟`;
          options = [
            { id: `q-${index}-a`, text: `مؤالفة وملاطفة` },
            { id: `q-${index}-b`, text: `معاداة` },
            { id: `q-${index}-c`, text: `مخالفة` },
            { id: `q-${index}-d`, text: `مواجهة` },
          ];
        } else {
          questionText = `ما هو مرادف كلمة "الشنآن"؟`;
          options = [
            { id: `q-${index}-a`, text: `البغضاء` },
            { id: `q-${index}-b`, text: `المحبة` },
            { id: `q-${index}-c`, text: `الفرح` },
            { id: `q-${index}-d`, text: `الغضب` },
          ];
        }
        break;
        
      case 'reading':
        if (difficulty === 'easy') {
          questionText = `"المدرسة مكان للتعلم". ما هي الكلمة التي تدل على المكان في هذه الجملة؟`;
          options = [
            { id: `q-${index}-a`, text: `المدرسة` },
            { id: `q-${index}-b`, text: `مكان` },
            { id: `q-${index}-c`, text: `التعلم` },
            { id: `q-${index}-d`, text: `لا توجد كلمة تدل على المكان` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `اقرأ الفقرة التالية: "يعد الأدب العربي من أغنى الآداب العالمية، فقد تطور على مر العصور وتنوعت أغراضه وأشكاله". ما هو موضوع الفقرة؟`;
          options = [
            { id: `q-${index}-a`, text: `الأدب العربي` },
            { id: `q-${index}-b`, text: `الآداب العالمية` },
            { id: `q-${index}-c`, text: `تطور الأدب` },
            { id: `q-${index}-d`, text: `أشكال الأدب` },
          ];
        } else {
          questionText = `اقرأ الفقرة التالية: "إن العمل المتقن هو الذي يترك بصمة في قلوب الناس، ويبقى خالداً في ذاكرتهم، بينما العمل الرديء سرعان ما ينسى". ما هي الفكرة الرئيسية في هذه الفقرة؟`;
          options = [
            { id: `q-${index}-a`, text: `أهمية إتقان العمل` },
            { id: `q-${index}-b`, text: `تأثير العمل على الناس` },
            { id: `q-${index}-c`, text: `الفرق بين الأعمال الجيدة والرديئة` },
            { id: `q-${index}-d`, text: `خلود الأعمال الجيدة` },
          ];
        }
        break;
        
      case 'semantics':
        if (difficulty === 'easy') {
          questionText = `ما هو ضد كلمة "سعادة"؟`;
          options = [
            { id: `q-${index}-a`, text: `حزن` },
            { id: `q-${index}-b`, text: `فرح` },
            { id: `q-${index}-c`, text: `سرور` },
            { id: `q-${index}-d`, text: `بهجة` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `اختر الكلمة التي لا تنتمي إلى المجموعة التالية:`;
          options = [
            { id: `q-${index}-a`, text: `قلم` },
            { id: `q-${index}-b`, text: `دفتر` },
            { id: `q-${index}-c`, text: `كتاب` },
            { id: `q-${index}-d`, text: `تلميذ` },
          ];
        } else {
          questionText = `ما هو المعنى المناسب لكلمة "عين" في جملة "جلست عند عين الماء"؟`;
          options = [
            { id: `q-${index}-a`, text: `منبع الماء` },
            { id: `q-${index}-b`, text: `العين التي نرى بها` },
            { id: `q-${index}-c`, text: `الجاسوس` },
            { id: `q-${index}-d`, text: `الشيء الثمين` },
          ];
        }
        break;
        
      case 'syntax':
        if (difficulty === 'easy') {
          questionText = `ما نوع "لم" في جملة "لم يحضر الطالب"؟`;
          options = [
            { id: `q-${index}-a`, text: `حرف نفي وجزم` },
            { id: `q-${index}-b`, text: `حرف نصب` },
            { id: `q-${index}-c`, text: `حرف استفهام` },
            { id: `q-${index}-d`, text: `حرف نداء` },
          ];
        } else if (difficulty === 'medium') {
          questionText = `ما هو إعراب "الكتاب" في جملة "قرأت الكتاب"؟`;
          options = [
            { id: `q-${index}-a`, text: `مفعول به منصوب` },
            { id: `q-${index}-b`, text: `فاعل مرفوع` },
            { id: `q-${index}-c`, text: `مبتدأ مرفوع` },
            { id: `q-${index}-d`, text: `خبر مرفوع` },
          ];
        } else {
          questionText = `ما إعراب جملة "يقول الحق" في قوله تعالى: "والله يقول الحق وهو يهدي السبيل"؟`;
          options = [
            { id: `q-${index}-a`, text: `جملة فعلية في محل رفع خبر` },
            { id: `q-${index}-b`, text: `جملة فعلية في محل نصب حال` },
            { id: `q-${index}-c`, text: `جملة فعلية في محل نصب مفعول به` },
            { id: `q-${index}-d`, text: `جملة فعلية في محل جر مضاف إليه` },
          ];
        }
        break;
        
      default:
        break;
    }
    
    // Randomly select correct answer
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const correctAnswer = options[correctAnswerIndex].id;
    
    return {
      id: `q-${index + 1}`,
      text: questionText,
      options,
      correctAnswer,
      type: questionType,
      difficulty
    };
  };
  
  // Start a GAT exam
  export const startGatExam = (type, difficulty, onStartExam) => {
    // Create a GAT exam object
    const gatExam = {
      id: `gat-${type}-${difficulty}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} GAT Exam (${difficulty})`,
      organizer: 'GAT System',
      endDate: '2025-12-31',
      addedDate: new Date().toISOString().split('T')[0],
      duration: difficulty === 'easy' ? 45 : difficulty === 'medium' ? 60 : 75,
      questionCount: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25,
      questions: generateGatQuestions(type, difficulty),
      type: type,
      difficulty: difficulty
    };
    
    // Start the exam
    onStartExam(gatExam);
  };
  
  // Get topics for GAT management
  export const getGatTopics = () => {
    return {
      math: [
        'algebra',
        'geometry',
        'arithmetic',
        'statistics',
        'probability',
        'calculus',
        'trigonometry'
      ],
      arabic: [
        'grammar',
        'vocabulary',
        'reading',
        'semantics',
        'syntax',
        'literature',
        'poetry',
        'rhetoric'
      ]
    };
  };
  
  // Add topic to GAT management
  export const addGatTopic = (topics, type, newTopic) => {
    const updatedTopics = { ...topics };
    
    if (updatedTopics[type] && !updatedTopics[type].includes(newTopic)) {
      updatedTopics[type] = [...updatedTopics[type], newTopic];
    }
    
    return updatedTopics;
  };
  
  // Remove topic from GAT management
  export const removeGatTopic = (topics, type, topicToRemove) => {
    const updatedTopics = { ...topics };
    
    if (updatedTopics[type]) {
      updatedTopics[type] = updatedTopics[type].filter(topic => topic !== topicToRemove);
    }
    
    return updatedTopics;
  };