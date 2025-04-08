import React, { createContext, useState, useContext, useEffect } from 'react';

// Translations
const translations = {
  en: {
    // Common
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    students: 'Students',
    exams: 'Exams',
    settings: 'Settings',
    search: 'Search',
    loading: 'Loading',
    actions: 'Actions',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    remove: 'Remove',
    view: 'View',
    add: 'Add',
    manage: 'Manage',
    submit: 'Submit',
    section: 'Section',
    searchTopics: 'Search topics...',
    gridView: 'Grid View',
    listView: 'List View',
    importTopics: 'Import Topics',
    exportTopics: 'Export Topics',
    topicExists: 'Topic already exists',
    topicUpdated: 'Topic updated successfully',
    topicsImported: 'Topics imported successfully',
    invalidImportFormat: 'Invalid import format',
    errorStartingExam: 'Error starting exam. Please try again.',
    topicsCount: 'Topics Count',
    totalQuestions: 'Total Questions',
    mathStatistics: 'Math Statistics',
    arabicStatistics: 'Arabic Statistics',
    noSearchResults: 'No results found for your search',
    
    // Landing page
    welcomeToExamPortal: 'Welcome to Exam Portal',
    landingDescription: 'A comprehensive platform for creating, managing, and taking exams, with special focus on GAT preparation.',
    getStarted: 'Get Started',
    features: 'Key Features',
    interactiveExams: 'Interactive Exams',
    interactiveExamsDesc: 'Take part in interactive online exams with instant feedback and detailed results.',
    gatPreparation: 'GAT Preparation',
    gatPreparationDesc: 'Specialized modules for General Aptitude Test (GAT) preparation in both math and Arabic sections.',
    scheduleExams: 'Schedule Exams',
    scheduleExamsDesc: 'Plan your exam schedule and get reminders for upcoming tests.',
    personalizedDashboard: 'Personalized Dashboard',
    personalizedDashboardDesc: 'Track your progress and performance with customized analytics.',
    adminTools: 'Admin Tools',
    adminToolsDesc: 'Comprehensive tools for administrators to manage exams, students, and content.',
    studentManagement: 'Student Management',
    studentManagementDesc: 'Easy management of student accounts, registrations, and performance tracking.',
    allRightsReserved: 'All rights reserved',
    
    // Auth
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginAsStudent: 'Login as Student',
    loginAsAdmin: 'Login as Administrator',
    studentId: 'Student ID',
    fullName: 'Full Name',
    
    // Student dashboard
    availableExams: 'Available Exams',
    pastExams: 'Past Exams',
    examName: 'Exam Name',
    organizer: 'Organizer',
    endDate: 'End Date',
    addedDate: 'Added Date',
    score: 'Score',
    start: 'Start',
    details: 'Details',
    gatExam: 'GAT Exam',
    gatTraining: 'GAT Training',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    studentsTab: 'Students',
    examScoresTab: 'Exam Scores',
    createExamTab: 'Create Exam',
    adminManagementTab: 'Admin Management',
    gatManagementTab: 'GAT Management',
    newsManagementTab: 'News Management',
    
    // GAT Management
    gatManagement: 'GAT Management',
    mathSection: 'Math',
    arabicSection: 'Arabic',
    addNewTopic: 'Add New Topic',
    topicName: 'Topic Name',
    enterTopicName: 'Enter topic name',
    selectedSection: 'Selected section',
    addTopic: 'Add Topic',
    mathTopics: 'Math Topics',
    arabicTopics: 'Arabic Topics',
    noTopicsFound: 'No topics found for this section',
    topicRequired: 'Topic name is required',
    topicExists: 'This topic already exists',
    topicAdded: 'Topic added successfully',
    topicRemoved: 'Topic removed successfully',
    removeTopic: 'Remove Topic',
    confirmRemoveTopic: 'Are you sure you want to remove this topic?',
    questionManagement: 'Question Management',
    questionManagementDesc: 'Add, edit, and manage GAT questions for different topics and difficulty levels',
    comingSoon: 'This feature will be available soon',
    
    // GAT Exam Page
    selectExamType: 'Select Exam Type',
    mathSectionDesc: 'Test your mathematical problem-solving skills',
    arabicSectionDesc: 'Test your Arabic language and verbal reasoning skills',
    selectDifficulty: 'Select Difficulty Level',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    min: '{0} min',
    minutes: 'minutes',
    questions: '{0} questions',
    examSummary: 'Exam Summary',
    type: 'Type',
    difficulty: 'Difficulty',
    duration: 'Duration',
    examInstructions: 'Exam Instructions',
    examInstructions1: 'Read each question carefully before answering.',
    examInstructions2: 'You can navigate between questions using the navigation panel.',
    examInstructions3: 'You can mark questions for review and come back to them later.',
    examInstructions4: 'Once you submit the exam, you cannot return to change your answers.',
    startExam: 'Start Exam',
    
    // Exam
    progress: 'Progress',
    questionsAnswered: 'Questions Answered',
    notAnswered: 'Not answered',
    answered: 'Answered',
    markedForReview: 'Marked for review',
    questionCount: 'Question',
    markForReview: 'Mark for review',
    previous: 'Previous',
    next: 'Next',
    submitExam: 'Submit Exam',
    confirmSubmit: 'Are you sure you want to submit your exam? You cannot make changes after submission.',
    
    // Misc
    goToHomepage: 'Go to Homepage',
    goToDashboard: 'Go to Dashboard',
    examResults: 'Exam Results',
  },
  ar: {
    // Common
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    welcome: 'مرحباً',
    dashboard: 'لوحة التحكم',
    students: 'الطلاب',
    exams: 'الاختبارات',
    settings: 'الإعدادات',
    search: 'بحث',
    loading: 'جاري التحميل',
    actions: 'إجراءات',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    remove: 'إزالة',
    view: 'عرض',
    add: 'إضافة',
    manage: 'إدارة',
    submit: 'إرسال',
    section: 'القسم',
    searchTopics: 'البحث في المواضيع...',
    gridView: 'عرض الشبكة',
    listView: 'عرض القائمة',
    importTopics: 'استيراد المواضيع',
    exportTopics: 'تصدير المواضيع',
    topicExists: 'الموضوع موجود بالفعل',
    topicUpdated: 'تم تحديث الموضوع بنجاح',
    topicsImported: 'تم استيراد المواضيع بنجاح',
    invalidImportFormat: 'تنسيق الاستيراد غير صالح',
    errorStartingExam: 'خطأ في بدء الاختبار. يرجى المحاولة مرة أخرى.',
    topicsCount: 'عدد المواضيع',
    totalQuestions: 'إجمالي الأسئلة',
    mathStatistics: 'إحصائيات الرياضيات',
    arabicStatistics: 'إحصائيات اللغة العربية',
    noSearchResults: 'لم يتم العثور على نتائج لبحثك',
    
    // Landing page
    welcomeToExamPortal: 'مرحباً بك في بوابة الاختبارات',
    landingDescription: 'منصة شاملة لإنشاء وإدارة وأداء الاختبارات، مع التركيز بشكل خاص على التحضير لاختبار القدرات العامة.',
    getStarted: 'البدء',
    features: 'الميزات الرئيسية',
    interactiveExams: 'اختبارات تفاعلية',
    interactiveExamsDesc: 'شارك في اختبارات تفاعلية عبر الإنترنت مع تغذية راجعة فورية ونتائج مفصلة.',
    gatPreparation: 'التحضير لاختبار القدرات',
    gatPreparationDesc: 'وحدات متخصصة للتحضير لاختبار القدرات العامة (GAT) في قسمي الرياضيات واللغة العربية.',
    scheduleExams: 'جدولة الاختبارات',
    scheduleExamsDesc: 'خطط لجدول اختباراتك واحصل على تذكيرات للاختبارات القادمة.',
    personalizedDashboard: 'لوحة تحكم مخصصة',
    personalizedDashboardDesc: 'تتبع تقدمك وأدائك مع تحليلات مخصصة.',
    adminTools: 'أدوات المشرف',
    adminToolsDesc: 'أدوات شاملة للمشرفين لإدارة الاختبارات والطلاب والمحتوى.',
    studentManagement: 'إدارة الطلاب',
    studentManagementDesc: 'إدارة سهلة لحسابات الطلاب والتسجيلات وتتبع الأداء.',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Auth
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    loginAsStudent: 'تسجيل الدخول كطالب',
    loginAsAdmin: 'تسجيل الدخول كمشرف',
    studentId: 'رقم الطالب',
    fullName: 'الاسم الكامل',
    
    // Student dashboard
    availableExams: 'الاختبارات المتاحة',
    pastExams: 'الاختبارات السابقة',
    examName: 'اسم الاختبار',
    organizer: 'المنظم',
    endDate: 'تاريخ الانتهاء',
    addedDate: 'تاريخ الإضافة',
    score: 'النتيجة',
    start: 'ابدأ',
    details: 'التفاصيل',
    gatExam: 'اختبار القدرات',
    gatTraining: 'تدريب القدرات',
    
    // Admin
    adminDashboard: 'لوحة تحكم المشرف',
    studentsTab: 'الطلاب',
    examScoresTab: 'نتائج الاختبارات',
    createExamTab: 'إنشاء اختبار',
    adminManagementTab: 'إدارة المشرفين',
    gatManagementTab: 'إدارة اختبار القدرات',
    newsManagementTab: 'إدارة الأخبار',
    
    // GAT Management
    gatManagement: 'إدارة اختبار القدرات',
    mathSection: 'الرياضيات',
    arabicSection: 'اللغة العربية',
    addNewTopic: 'إضافة موضوع جديد',
    topicName: 'اسم الموضوع',
    enterTopicName: 'أدخل اسم الموضوع',
    selectedSection: 'القسم المحدد',
    addTopic: 'إضافة موضوع',
    mathTopics: 'مواضيع الرياضيات',
    arabicTopics: 'مواضيع اللغة العربية',
    noTopicsFound: 'لم يتم العثور على مواضيع لهذا القسم',
    topicRequired: 'اسم الموضوع مطلوب',
    topicExists: 'هذا الموضوع موجود بالفعل',
    topicAdded: 'تمت إضافة الموضوع بنجاح',
    topicRemoved: 'تمت إزالة الموضوع بنجاح',
    removeTopic: 'إزالة الموضوع',
    confirmRemoveTopic: 'هل أنت متأكد من رغبتك في إزالة هذا الموضوع؟',
    questionManagement: 'إدارة الأسئلة',
    questionManagementDesc: 'إضافة وتعديل وإدارة أسئلة اختبار القدرات لمختلف المواضيع ومستويات الصعوبة',
    comingSoon: 'ستتوفر هذه الميزة قريبًا',
    
    // GAT Exam Page
    selectExamType: 'اختر نوع الاختبار',
    mathSectionDesc: 'اختبر مهاراتك في حل المشكلات الرياضية',
    arabicSectionDesc: 'اختبر مهاراتك في اللغة العربية والاستدلال اللفظي',
    selectDifficulty: 'اختر مستوى الصعوبة',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    min: '{0} دقيقة',
    minutes: 'دقائق',
    questions: '{0} سؤال',
    examSummary: 'ملخص الاختبار',
    type: 'النوع',
    difficulty: 'الصعوبة',
    duration: 'المدة',
    examInstructions: 'تعليمات الاختبار',
    examInstructions1: 'اقرأ كل سؤال بعناية قبل الإجابة.',
    examInstructions2: 'يمكنك التنقل بين الأسئلة باستخدام لوحة التنقل.',
    examInstructions3: 'يمكنك وضع علامة على الأسئلة للمراجعة والعودة إليها لاحقًا.',
    examInstructions4: 'بمجرد إرسال الاختبار، لا يمكنك العودة لتغيير إجاباتك.',
    startExam: 'بدء الاختبار',
    
    // Exam
    progress: 'التقدم',
    questionsAnswered: 'الأسئلة المجابة',
    notAnswered: 'غير مجاب',
    answered: 'مجاب',
    markedForReview: 'تمت الإشارة للمراجعة',
    questionCount: 'سؤال',
    markForReview: 'وضع علامة للمراجعة',
    previous: 'السابق',
    next: 'التالي',
    submitExam: 'إرسال الاختبار',
    confirmSubmit: 'هل أنت متأكد من رغبتك في إرسال الاختبار؟ لا يمكنك إجراء تغييرات بعد الإرسال.',
    
    // Misc
    goToHomepage: 'العودة إلى الصفحة الرئيسية',
    goToDashboard: 'العودة إلى لوحة التحكم',
    examResults: 'نتائج الاختبار',
  }
};

// Create context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') {
        setLanguage('ar');
      }
    }
  }, []);
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prevLang => {
      const newLang = prevLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      return newLang;
    });
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;