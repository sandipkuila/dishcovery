import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw, Clock, Utensils, Sparkles, ChefHat, CheckCircle2 } from 'lucide-react';

export default function VoiceChefModal({ isOpen, onClose, currentRecipe }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [chefResponse, setChefResponse] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [chefPersona, setChefPersona] = useState('Antoine'); // 'Antoine' | 'Amelie'

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const recipe = currentRecipe || {
    title: 'Chickpea & Spinach Stew',
    ingredients: [
      { name: 'Chickpeas (canned)', amount: '2 cans (800g)' },
      { name: 'Fresh Spinach', amount: '150g' },
      { name: 'Diced Tomatoes', amount: '1 can (400g)' },
      { name: 'Feta Cheese', amount: '100g crumble' },
      { name: 'Garlic & Onion', amount: '1 each' }
    ],
    steps: [
      { step: 1, text: 'Sauté onion and garlic in olive oil over medium heat until golden and fragrant (approx 4 mins).' },
      { step: 2, text: 'Add cumin, diced tomatoes, and rinsed chickpeas. Bring to a gentle simmer for 15 minutes.' },
      { step: 3, text: 'Fold in fresh spinach until wilted. Top with crumbled feta cheese and serve warm with crusty bread.' }
    ]
  };

  // Speak helper
  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = chefPersona === 'Antoine' ? 0.9 : 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setChefResponse(text);
    synthRef.current.speak(utterance);
  };

  // Initial Greeting when modal opens
  useEffect(() => {
    if (isOpen) {
      const greeting = chefPersona === 'Antoine'
        ? `Bonjour! I am Chef Antoine, your hands-free cooking assistant for ${recipe.title}. Say 'Next step', 'Set timer', or tap any button!`
        : `Hi there! I am Chef Amelie. Let's cook ${recipe.title} hands-free together. Step 1: ${recipe.steps[0].text}`;
      
      speak(greeting);

      // Web Speech Recognition setup
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript.toLowerCase();
          setTranscript(text);

          if (event.results[current].isFinal) {
            handleVoiceCommand(text);
          }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => {
          if (isListening) recognition.start();
        };

        recognitionRef.current = recognition;
      }
    } else {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen, chefPersona]);

  // Timer Countdown
  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      speak('Timer finished! Your dish is ready for the next stage.');
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Voice Command Handler
  const handleVoiceCommand = (text) => {
    if (text.includes('next') || text.includes('forward')) {
      handleNextStep();
    } else if (text.includes('previous') || text.includes('back')) {
      handlePrevStep();
    } else if (text.includes('repeat') || text.includes('again')) {
      handleReadStep(currentStepIndex);
    } else if (text.includes('timer') || text.includes('minute')) {
      startTimer(300); // 5 min timer
    } else if (text.includes('ingredient')) {
      const ingList = recipe.ingredients.map(i => `${i.amount} of ${i.name}`).join(', ');
      speak(`You need: ${ingList}`);
    } else if (text.includes('stop') || text.includes('pause')) {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      speak(`Step ${nextIdx + 1}: ${recipe.steps[nextIdx].text}`);
    } else {
      speak('Bon appétit! You have completed all cooking steps for this dish!');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      speak(`Step ${prevIdx + 1}: ${recipe.steps[prevIdx].text}`);
    }
  };

  const handleReadStep = (idx) => {
    speak(`Step ${idx + 1}: ${recipe.steps[idx].text}`);
  };

  const startTimer = (seconds) => {
    setTimerSeconds(seconds);
    setTimerActive(true);
    speak(`Starting a ${Math.round(seconds / 60)} minute cooking timer now.`);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Use the quick voice command buttons below!');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainderSecs = sec % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-[#1E1E1E] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EEF1EB] dark:border-slate-800 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F5F5F3] dark:bg-slate-800 text-[#5B615A] dark:text-slate-300 hover:text-[#1E1E1E] hover:bg-[#EAF3DF] transition flex items-center justify-center cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="bg-[#1E1E1E] text-white p-6 sm:p-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#7DBE4A] flex items-center justify-center text-white shadow-lg">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#7DBE4A]/30 text-[#7DBE4A] text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#7DBE4A]/40">
                  Hands-Free Voice Chef
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {recipe.title}
              </h2>
            </div>
          </div>

          {/* Voice Chef Selector */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Chef Persona:</span>
            <button
              onClick={() => setChefPersona('Antoine')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                chefPersona === 'Antoine' ? 'bg-[#7DBE4A] text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Chef Antoine (French Bistro)
            </button>
            <button
              onClick={() => setChefPersona('Amelie')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                chefPersona === 'Amelie' ? 'bg-[#7DBE4A] text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Chef Amelie (Home Cook)
            </button>
          </div>
        </div>

        {/* Live Audio Waveform & Speech Display */}
        <div className="bg-[#EAF3DF] dark:bg-slate-800/80 p-6 flex flex-col items-center justify-center gap-4 text-center border-b border-[#D5E2C6] dark:border-slate-700">
          
          {/* Animated Waveform */}
          <div className="flex items-center gap-1.5 h-10">
            {[40, 70, 100, 60, 90, 50, 80, 40].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full bg-[#7DBE4A] transition-all duration-300 ${
                  isSpeaking || isListening ? 'animate-pulse' : 'opacity-40'
                }`}
                style={{
                  height: isSpeaking || isListening ? `${Math.max(15, (h * (i % 2 === 0 ? 1 : 0.6)))}px` : '12px'
                }}
              />
            ))}
          </div>

          {/* Chef Response Text */}
          <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1E1E] dark:text-white max-w-lg leading-relaxed">
            "{chefResponse || `Step ${currentStepIndex + 1}: ${recipe.steps[currentStepIndex].text}`}"
          </p>

          {/* User Live Voice Transcript */}
          {transcript && (
            <div className="text-xs text-[#5B615A] dark:text-slate-400 italic bg-white/60 dark:bg-slate-900/60 px-4 py-1.5 rounded-full">
              Heard: "{transcript}"
            </div>
          )}
        </div>

        {/* Current Step Guidance & Step Progress */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6">
          
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7DBE4A]">
              Step {currentStepIndex + 1} of {recipe.steps.length}
            </span>
            <div className="flex items-center gap-1">
              {recipe.steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-8 bg-[#7DBE4A]'
                      : idx < currentStepIndex
                      ? 'w-2 bg-[#4E8B3A]'
                      : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Step Text Card */}
          <div className="bg-[#F9FAF8] dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Current Cooking Instruction:</span>
            <p className="text-base sm:text-lg font-bold text-[#1E1E1E] dark:text-white leading-relaxed">
              {recipe.steps[currentStepIndex].text}
            </p>
          </div>

          {/* Interactive Cooking Timer */}
          {timerSeconds > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between text-amber-700 dark:text-amber-300">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-amber-500 animate-spin-slow" />
                <div>
                  <div className="text-xs font-bold uppercase">Kitchen Timer Active</div>
                  <div className="text-2xl font-black font-mono">{formatTimer(timerSeconds)}</div>
                </div>
              </div>
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-full transition cursor-pointer"
              >
                {timerActive ? 'Pause' : 'Resume'}
              </button>
            </div>
          )}

          {/* Quick Voice Command Buttons for Non-Techies */}
          <div>
            <span className="text-xs font-bold text-[#5B615A] dark:text-slate-400 block mb-3 uppercase tracking-wider">
              Quick Voice Shortcuts (Tap or Speak):
            </span>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={handleNextStep}
                className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-xs font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <span>🎙️ Next Step</span>
              </button>

              <button
                onClick={() => handleReadStep(currentStepIndex)}
                className="bg-[#F2F6ED] dark:bg-slate-800 hover:bg-[#e4edd9] text-[#4E8B3A] dark:text-[#7DBE4A] text-xs font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#d9e6cc] dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repeat Step</span>
              </button>

              <button
                onClick={() => startTimer(300)}
                className="bg-[#F2F6ED] dark:bg-slate-800 hover:bg-[#e4edd9] text-[#4E8B3A] dark:text-[#7DBE4A] text-xs font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#d9e6cc] dark:border-slate-700"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>5 Min Timer</span>
              </button>

              <button
                onClick={() => {
                  const ingList = recipe.ingredients.map(i => `${i.amount} ${i.name}`).join(', ');
                  speak(`Ingredients: ${ingList}`);
                }}
                className="bg-[#F2F6ED] dark:bg-slate-800 hover:bg-[#e4edd9] text-[#4E8B3A] dark:text-[#7DBE4A] text-xs font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#d9e6cc] dark:border-slate-700"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Read Ingredients</span>
              </button>
            </div>
          </div>

          {/* Master Microphone Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={toggleMic}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-110 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 animate-pulse ring-8 ring-rose-500/20'
                  : 'bg-[#7DBE4A] hover:bg-[#6ba63d] ring-8 ring-green-500/20'
              }`}
              title={isListening ? 'Mute Microphone' : 'Enable Voice Listening'}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
