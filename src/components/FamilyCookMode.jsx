import React, { useState } from 'react';
import {
  X, CheckCircle, Clock, Users, ArrowRight, Play, Award, Check,
  Sparkles, Sun, Smartphone, Monitor, ChevronRight, UserCheck, Flame
} from 'lucide-react';

export default function FamilyCookMode({
  recipe,
  onClose,
  household
}) {
  if (!recipe) return null;

  // Step 1: Kitchen Check-in ("Who's cooking tonight?")
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeMembers, setActiveMembers] = useState(
    household.members.filter(m => m.isPresent).map(m => m.id)
  );

  // Step 2: Live Done -> Next Queue State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState([]);
  const [viewMode, setViewMode] = useState('master'); // 'master' | 'helper'
  const [activeHelperId, setActiveHelperId] = useState(
    household.members.find(m => m.role.includes('Helper'))?.id || household.members[0]?.id
  );

  // Toggle member attendance
  const toggleMemberPresence = (memberId) => {
    if (activeMembers.includes(memberId)) {
      if (activeMembers.length === 1) return; // Must have at least 1 cook
      setActiveMembers(activeMembers.filter(id => id !== memberId));
    } else {
      setActiveMembers([...activeMembers, memberId]);
    }
  };

  // Active household member objects
  const presentMemberObjects = household.members.filter(m => activeMembers.includes(m.id));

  // Determine assigned member for a step based on roleTag
  const getAssignedMember = (step) => {
    if (presentMemberObjects.length === 0) return household.members[0];

    if (step.roleTag === 'Helper Friendly') {
      // Find a helper/kids member if present
      const helper = presentMemberObjects.find(m => m.role.includes('Helper') || m.role.includes('Partner') || m.role.includes('Sous'));
      return helper || presentMemberObjects[0];
    } else {
      // Advanced step -> assigned to Main Cook if present
      const mainCook = presentMemberObjects.find(m => m.role.includes('Main Cook'));
      return mainCook || presentMemberObjects[0];
    }
  };

  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIndex];
  const assignedMember = currentStep ? getAssignedMember(currentStep) : null;
  const isCookingFinished = currentStepIndex >= steps.length;

  // Handle "Done -> Next" step completion
  const handleCompleteStep = () => {
    if (currentStepIndex < steps.length) {
      setCompletedStepIds([...completedStepIds, currentStep.stepNumber]);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in z-50">
      <div className="bg-slate-950 text-white w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-800">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-black shadow-lg shadow-orange-500/20">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Family Cook Engine</span>
                <span className="text-[10px] bg-teal-900/80 text-teal-300 px-2 py-0.5 rounded-full border border-teal-700">Live Sync</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black truncate max-w-md">{recipe.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher: Master View vs Helper View */}
            {isCheckedIn && !isCookingFinished && (
              <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setViewMode('master')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'master' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Main Cook Master</span>
                </button>
                <button
                  onClick={() => setViewMode('helper')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'helper' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Helper Mobile Screen</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: Kitchen Check-in screen ("Who's cooking tonight?") */}
        {!isCheckedIn ? (
          <div className="flex-1 p-6 sm:p-12 overflow-y-auto flex flex-col justify-between max-w-3xl mx-auto w-full">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-orange-950/80 text-orange-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-orange-800">
                  <UserCheck className="w-4 h-4" />
                  <span>Kitchen Attendance Setup</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white">Who's cooking in the kitchen tonight?</h3>
                <p className="text-slate-400 text-sm">
                  Check off active family members. Dishcovery will automatically assign chopping, mixing, and cooking tasks matching their difficulty level!
                </p>
              </div>

              {/* Members Selection List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {household.members.map((member) => {
                  const isPresent = activeMembers.includes(member.id);

                  return (
                    <div
                      key={member.id}
                      onClick={() => toggleMemberPresence(member.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isPresent
                          ? 'bg-slate-900 border-orange-500/80 shadow-lg shadow-orange-500/10'
                          : 'bg-slate-950/50 border-slate-800 opacity-50 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="font-bold text-white text-base">{member.name}</h4>
                          <span className="text-xs font-semibold text-orange-400">{member.role}</span>
                        </div>
                      </div>

                      <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition ${
                        isPresent ? 'bg-orange-600 border-orange-500 text-white' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isPresent && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="pt-8 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsCheckedIn(true)}
                disabled={activeMembers.length === 0}
                className="btn-primary py-3.5 px-8 text-base font-extrabold rounded-2xl shadow-xl shadow-orange-600/30"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Start Orchestrated Cooking</span>
              </button>
            </div>
          </div>
        ) : isCookingFinished ? (
          /* FINISHED COOKING CELEBRATION */
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-500/40 animate-bounce">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-3xl font-black text-white">Meal Complete! Bon Appétit!</h3>
              <p className="text-slate-400 text-sm">
                Your family executed all {steps.length} recipe steps seamlessly together!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {presentMemberObjects.map(m => (
                <div key={m.id} className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
                  <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="btn-primary py-3 px-8 text-sm"
            >
              <span>Back to Home</span>
            </button>
          </div>
        ) : (
          /* STEP 2: Live "Done -> Next" Orchestration Dashboard */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Main Content Area */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
              
              {/* Progress Header */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Step {currentStepIndex + 1} of {steps.length}</span>
                  <span>{Math.round(((currentStepIndex) / steps.length) * 100)}% Complete</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Active Step Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
                
                {/* Step Role Assignment Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={assignedMember.avatar}
                      alt={assignedMember.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-md"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block">Assigned Active Member</span>
                      <h4 className="font-extrabold text-white text-lg">{assignedMember.name}</h4>
                    </div>
                  </div>

                  <span className={currentStep.roleTag === 'Helper Friendly' ? 'badge-helper' : 'badge-advanced'}>
                    {currentStep.roleTag}
                  </span>
                </div>

                {/* Step Title & Instruction */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{currentStep.title}</h3>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                    {currentStep.text}
                  </p>
                </div>

                {/* LIVE "DONE -> NEXT" ACTION BUTTON */}
                <div className="pt-4 flex items-center justify-end">
                  <button
                    onClick={handleCompleteStep}
                    className="btn-primary py-4 px-8 text-base sm:text-lg font-extrabold rounded-2xl w-full sm:w-auto justify-center shadow-xl shadow-orange-600/30 pulse-glow"
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span>Done → Push Next Task</span>
                  </button>
                </div>

              </div>

              {/* Sequential Step Queue Preview */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Step Queue</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {steps.slice(currentStepIndex + 1, currentStepIndex + 3).map((nextStep) => (
                    <div key={nextStep.stepNumber} className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs flex items-center justify-between text-slate-400">
                      <span className="font-bold truncate">Step {nextStep.stepNumber}: {nextStep.title}</span>
                      <span className="text-[10px] font-semibold bg-slate-800 px-2 py-0.5 rounded">{nextStep.roleTag}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar / Active Kitchen Roster */}
            <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-400" />
                <span>Active Kitchen Roster ({presentMemberObjects.length})</span>
              </h4>

              <div className="space-y-3">
                {presentMemberObjects.map((m) => {
                  const isCurrentlyActive = assignedMember?.id === m.id;

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                        isCurrentlyActive
                          ? 'bg-orange-950/60 border-orange-500/60 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}
                    >
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{m.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{m.role}</p>
                      </div>
                      {isCurrentlyActive && (
                        <span className="text-[10px] bg-orange-600 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                          Active Task
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Simulated WebSocket / Live Sync Info */}
              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60 space-y-2 text-xs text-teal-300">
                <div className="flex items-center gap-2 font-bold text-teal-200">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Real-Time Task Sync</span>
                </div>
                <p className="text-[11px] leading-relaxed text-teal-300/80">
                  When a helper taps "Done", task states instantly synchronize to the main cook's tablet view.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
