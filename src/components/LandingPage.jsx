import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, Calendar, PieChart, Settings, User, Users, ChevronRight, Check, BarChart2, Brain, Target, BookMarked, GraduationCap, Clock, RotateCw, Star, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LandingPage = ({ onLogin }) => {
  const { darkMode, toggleDarkMode, t, language, toggleLanguage } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialRef = useRef(null);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Ahmad Al-Farsi",
      role: "Medical Student",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "The GAT preparation on this platform was exceptional! The practice questions were very similar to the actual exam, and the detailed explanations helped me understand concepts I struggled with. I scored 92% on my GAT and got accepted into my dream medical school.",
    },
    {
      id: 2,
      name: "Fatima Al-Zahrani",
      role: "Engineering Student",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      stars: 5,
      text: "After struggling with the math section of GAT for months, I found this platform. The step-by-step solutions and targeted practice sessions helped me improve from 65% to 88% in just 6 weeks! Highly recommend for anyone preparing for GAT.",
    },
    {
      id: 3,
      name: "Mohammed Al-Qahtani",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      stars: 4,
      text: "The Arabic section training was exactly what I needed. As someone who struggles with grammar, the detailed explanations and practice exercises were extremely helpful. I achieved a score of 85% on my GAT, much higher than I expected!",
    },
    {
      id: 4,
      name: "Noor Abdullah",
      role: "Business Student",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      stars: 5,
      text: "I only had 3 weeks to prepare for my GAT exam, but this platform made it possible. The focused study paths and practice tests helped me target my weak areas effectively. I scored 90% and got accepted to my first-choice university!",
    },
    {
      id: 5,
      name: "Khalid Al-Otaibi",
      role: "Science Teacher",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      stars: 5,
      text: "As a teacher, I recommend this platform to all my students preparing for GAT. The quality of content and the adaptive learning system are outstanding. I've seen significant improvements in my students' scores since they started using it.",
    }
  ];
  
  // Animation for counters
  useEffect(() => {
    setTimeout(() => {
      setShowStats(true);
    }, 500);
  }, []);
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Manually navigate testimonials
  const handlePrevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };
  
  // Scroll animation trigger
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLoginClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onLogin();
    }, 300);
  };
  
  // Animated counter component
  const AnimatedCounter = ({ targetValue, duration = 2000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!showStats) return;
      
      let startTime;
      const startValue = 0;
      const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * (targetValue - startValue) + startValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(targetValue);
        }
      };
      
      window.requestAnimationFrame(step);
    }, [targetValue, duration, showStats]);
    
    return (
      <span>
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    );
  };
  
  // Render stars for ratings
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${
          index < count 
            ? darkMode ? 'text-yellow-400' : 'text-yellow-500' 
            : darkMode ? 'text-gray-600' : 'text-gray-300'
        }`} 
        fill={index < count ? "currentColor" : "none"} 
      />
    ));
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 ${isAnimating ? 'animate-fade-out' : ''}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 shadow-gray-700/20' : 'bg-white shadow-gray-200/50'} shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
            <h1 className="text-2xl font-bold">Exam Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-full ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  darkMode
                    ? 'text-yellow-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            <button
              onClick={handleLoginClick}
              className={`${darkMode 
                ? 'bg-blue-500 hover:bg-blue-400' 
                : 'bg-blue-600 hover:bg-blue-700'} 
                text-white px-4 py-2 rounded-md transition duration-200`}
            >
              {t.login}
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900/10' : 'bg-blue-100/30'} z-0`}></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-20"></div>
          <div className={`absolute top-20 ${darkMode ? 'left-10' : 'left-20'} w-64 h-64 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-blue-500'} filter blur-3xl opacity-20 animate-blob`}></div>
          <div className={`absolute bottom-20 ${darkMode ? 'right-10' : 'right-20'} w-64 h-64 rounded-full ${darkMode ? 'bg-purple-700' : 'bg-purple-500'} filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
          <div className={`absolute top-1/2 ${darkMode ? 'left-1/3' : 'left-1/4'} w-64 h-64 rounded-full ${darkMode ? 'bg-green-700' : 'bg-green-500'} filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
        </div>

        <div className={`max-w-7xl mx-auto px-4 pt-24 pb-32 sm:px-6 lg:px-8 text-center relative z-10`}>
          <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-6`}>
            {t.welcomeToExamPortal}
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-10`}>
            {t.landingDescription}
          </p>
          
          {/* Stats counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transform transition-all duration-500 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mb-4`}>
                <BookMarked className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter targetValue={10000} suffix="+" />
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Questions in our database</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transform transition-all duration-500 ${showStats ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-10 opacity-0'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'} mb-4`}>
                <GraduationCap className={`h-6 w-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter targetValue={5000} suffix="+" />
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Active students</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transform transition-all duration-500 ${showStats ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-10 opacity-0'}`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mb-4`}>
                <BarChart2 className={`h-6 w-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
              </div>
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter targetValue={95} suffix="%" />
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Success rate</p>
            </div>
          </div>
          
          <div className="mt-10">
            <button
              onClick={handleLoginClick}
              className={`inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-lg ${
                darkMode 
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors duration-200 group`}
            >
              {t.getStarted}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
              <span className={`block ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Student Success Stories</span>
              <span className="block mt-2">Hear from our top performers</span>
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Our students consistently achieve outstanding results on their GAT exams.
              Here's what they have to say about their experience.
            </p>
          </div>
          
          <div className="relative">
            {/* Testimonial controls */}
            <div className="flex justify-between absolute top-1/2 -mt-4 w-full z-10">
              <button 
                onClick={handlePrevTestimonial}
                className={`-ml-4 p-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } shadow-md transition-colors duration-200 focus:outline-none`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={handleNextTestimonial}
                className={`-mr-4 p-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } shadow-md transition-colors duration-200 focus:outline-none`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Testimonial carousel */}
            <div className="overflow-hidden" ref={testimonialRef}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 flex flex-col items-center justify-center p-6 md:p-8 ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}">
                          <img 
                            className="h-24 w-24 rounded-full object-cover border-4 ${darkMode ? 'border-blue-500' : 'border-blue-200'}" 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                          />
                          <div className="mt-4 text-center">
                            <h3 className="text-lg font-medium">{testimonial.name}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{testimonial.role}</p>
                            <div className="flex items-center justify-center mt-2">
                              {renderStars(testimonial.stars)}
                            </div>
                          </div>
                        </div>
                        <div className="p-6 md:p-8 flex items-center">
                          <blockquote>
                            <div className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed italic`}>
                              "{testimonial.text}"
                            </div>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 mx-1 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial
                      ? darkMode ? 'bg-blue-400' : 'bg-blue-600'
                      : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GAT Training section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
              <span className={`block ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>GAT Training</span>
              <span className="block mt-2">Comprehensive Preparation for Success</span>
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Our specialized GAT training program is designed to help you excel in both the Math and Arabic sections of the General Aptitude Test.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="mb-12">
            <div className="flex justify-center border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'overview'
                    ? darkMode 
                      ? 'border-b-2 border-blue-400 text-blue-400' 
                      : 'border-b-2 border-blue-600 text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('math')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'math'
                    ? darkMode 
                      ? 'border-b-2 border-blue-400 text-blue-400' 
                      : 'border-b-2 border-blue-600 text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Math Section
              </button>
              <button
                onClick={() => setActiveTab('arabic')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'arabic'
                    ? darkMode 
                      ? 'border-b-2 border-blue-400 text-blue-400' 
                      : 'border-b-2 border-blue-600 text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Arabic Section
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'features'
                    ? darkMode 
                      ? 'border-b-2 border-blue-400 text-blue-400' 
                      : 'border-b-2 border-blue-600 text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Features
              </button>
            </div>
            
            {/* Tab content */}
            <div className="max-w-3xl mx-auto">
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 mb-6`}>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Why Train with Us?</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Our GAT preparation program has helped thousands of students achieve their target scores and gain admission to their desired universities. With a comprehensive curriculum covering both the Math and Arabic sections, we provide you with all the tools you need to succeed.
                    </p>
                    <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
                      <li className="flex items-start">
                        <Check className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                        <span>Over 10,000 practice questions with detailed explanations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                        <span>Personalized study plans based on your strengths and weaknesses</span>
                      </li>
                      <li className="flex items-start">
                        <Check className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                        <span>Full-length practice tests that simulate the actual GAT experience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                        <span>Advanced analytics to track your progress and identify areas for improvement</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mb-4`}>
                        <Brain className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Adaptive Learning</h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                        Our system adapts to your learning pace and focuses on areas where you need the most improvement.
                      </p>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mb-4`}>
                        <Target className={`h-6 w-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Targeted Practice</h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                        Focus on specific topics and question types with our targeted practice sessions.
                      </p>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'} mb-4`}>
                        <RotateCw className={`h-6 w-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Regular Updates</h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                        Our question bank is constantly updated to reflect the latest GAT patterns and trends.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'math' && (
                <div className="animate-fade-in">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 mb-6`}>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Math Section Training</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Our comprehensive math training covers all the key topics tested in the GAT, from basic arithmetic to complex problem-solving. With thousands of practice questions and detailed explanations, you'll be well-prepared for test day.
                    </p>
                    
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mt-6 mb-3`}>Topics Covered:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Algebra</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Equations, inequalities, functions
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Geometry</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Angles, shapes, areas, volumes
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Arithmetic</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Basic operations, percentages, ratios
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Statistics</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Mean, median, mode, standard deviation
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Probability</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Basic probability concepts and applications
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Problem Solving</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Logical reasoning and analytical skills
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-lg p-4 flex items-start`}>
                    <Clock className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3 mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'} mb-1`}>Time-saving Strategies</h4>
                      <p className={`${darkMode ? 'text-blue-200' : 'text-blue-600'} text-sm`}>
                        Our training includes specialized techniques to solve math problems quickly and efficiently, giving you an edge on test day when every second counts.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'arabic' && (
                <div className="animate-fade-in">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 mb-6`}>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Arabic Section Training</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Mastering the Arabic section requires a deep understanding of language concepts and verbal reasoning skills. Our program focuses on all aspects tested in the GAT Arabic section, with thousands of practice questions to build your proficiency.
                    </p>
                    
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mt-6 mb-3`}>Topics Covered:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Grammar (النحو)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Sentence structure, grammatical rules
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Vocabulary (المفردات)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Word meanings, synonyms, antonyms
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Reading Comprehension (الفهم)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Understanding texts and passages
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Semantics (الدلالات)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Word relationships and contextual meanings
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Syntax (التراكيب)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Sentence construction and analysis
                        </p>
                      </div>
                      
                      <div className={`${darkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded-lg`}>
                        <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Verbal Reasoning (الاستدلال اللفظي)</h5>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          Logical analysis of language patterns
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} rounded-lg p-4 flex items-start`}>
                    <BookMarked className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'} mr-3 mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-700'} mb-1`}>Contextual Learning</h4>
                      <p className={`${darkMode ? 'text-green-200' : 'text-green-600'} text-sm`}>
                        Our Arabic section training emphasizes understanding words and concepts in context, the way they appear on the actual GAT, rather than isolated memorization.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'features' && (
                <div className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} mb-4`}>
                        <BookMarked className={`h-5 w-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Comprehensive Content</h4>
                      <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-sm`}>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Over 10,000 practice questions across all topics</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Detailed explanations for every question</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Topic-specific lessons and tutorials</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Advanced concepts and problem-solving techniques</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} mb-4`}>
                        <BarChart2 className={`h-5 w-5 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Performance Analytics</h4>
                      <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-sm`}>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Detailed performance reports by topic and difficulty</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Progress tracking over time</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Comparison with peer performance</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Identification of knowledge gaps and weak areas</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900/50' : 'bg-green-100'} mb-4`}>
                        <Brain className={`h-5 w-5 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Adaptive Learning System</h4>
                      <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-sm`}>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Personalized study plans based on your performance</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Difficulty adjusts to your skill level</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Targeted practice for areas needing improvement</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Optimized review schedules based on learning science</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-red-900/50' : 'bg-red-100'} mb-4`}>
                        <Award className={`h-5 w-5 ${darkMode ? 'text-red-300' : 'text-red-600'}`} />
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Full-Length Practice Tests</h4>
                      <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-sm`}>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Simulates the actual GAT test environment</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Same format, timing, and difficulty as the real exam</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Detailed score reports and performance analysis</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} />
                          <span>Multiple tests available for repeated practice</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleLoginClick}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md ${
                darkMode 
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors duration-200`}
            >
              Start Training Now
            </button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className={`py-16 ${darkMode ? 'bg-gradient-to-br from-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Ready to Boost Your GAT Score?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have achieved their target scores with our comprehensive GAT preparation platform.
          </p>
          <button
            onClick={handleLoginClick}
            className={`px-8 py-4 rounded-md ${
              darkMode 
                ? 'bg-white text-blue-900 hover:bg-gray-100' 
                : 'bg-white text-blue-700 hover:bg-gray-100'
            } font-bold text-lg shadow-lg transition-colors duration-200`}
          >
            Start Your Preparation Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
            <span className="font-bold text-lg">Exam Portal</span>
          </div>
          <p>© 2025 Exam Portal. {t.allRightsReserved}</p>
        </div>
      </footer>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-fade-out {
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;