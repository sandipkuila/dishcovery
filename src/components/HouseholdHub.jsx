import React, { useState } from 'react';
import { Users, ShieldAlert, Plus, Trash2, CheckCircle, Edit2, Heart, Award, Sparkles } from 'lucide-react';

export default function HouseholdHub({
  household,
  setHousehold,
  savedRecipes
}) {
  const [activeSubTab, setActiveSubTab] = useState('members'); // 'members' | 'allergies'
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Junior Helper (Kids)');
  const [newAllergyName, setNewAllergyName] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(household.members[0]?.id || '');
  const [allergyType, setAllergyType] = useState('Peanuts');

  // Add Family Member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember = {
      id: `m-${Date.now()}`,
      name: newMemberName,
      role: newMemberRole,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      isPresent: true,
      bio: "Active kitchen helper"
    };

    setHousehold({
      ...household,
      members: [...household.members, newMember]
    });

    setNewMemberName('');
  };

  // Remove Family Member
  const handleRemoveMember = (id) => {
    if (household.members.length <= 1) return;
    setHousehold({
      ...household,
      members: household.members.filter(m => m.id !== id)
    });
  };

  // Add Allergy Restriction
  const handleAddAllergy = (e) => {
    e.preventDefault();
    const targetMember = household.members.find(m => m.id === selectedMemberId);
    if (!targetMember) return;

    const newEntry = {
      memberId: selectedMemberId,
      memberName: targetMember.name,
      allergy: allergyType,
      severity: "Strict Compliance"
    };

    setHousehold({
      ...household,
      allergiesAndDiets: [...household.allergiesAndDiets, newEntry]
    });
  };

  // Remove Allergy
  const handleRemoveAllergy = (idx) => {
    const updated = household.allergiesAndDiets.filter((_, i) => i !== idx);
    setHousehold({
      ...household,
      allergiesAndDiets: updated
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Household Header Dashboard Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-teal-500/30">
            <Users className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{household.familyName}</h1>
              <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                Active Household
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Managing {household.members.length} family cooks & {household.allergiesAndDiets.length} automated safety allergy profiles.
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex-1 md:flex-initial min-w-[100px]">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-400">Members</p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{household.members.length}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex-1 md:flex-initial min-w-[100px]">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-400">Saved Recipes</p>
            <p className="text-xl font-extrabold text-teal-600 dark:text-teal-400">{savedRecipes.length}</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        <button
          onClick={() => setActiveSubTab('members')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeSubTab === 'members' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Family Roster ({household.members.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('allergies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeSubTab === 'allergies' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Allergy & Diet Safety ({household.allergiesAndDiets.length})</span>
        </button>
      </div>

      {/* SUB TAB 1: Family Roster Management */}
      {activeSubTab === 'members' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {household.members.map((member) => (
              <div key={member.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-600" />
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{member.name}</h3>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{member.role}</span>
                    </div>
                  </div>

                  {household.members.length > 1 && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-700/40 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  "{member.bio || 'Ready to cook!'}"
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Default Attendance:</span>
                  <span className="text-teal-700 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">Present</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Member Card Form */}
          <form onSubmit={handleAddMember} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-xl space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Onboard New Family Member</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Member Name & Age</label>
                <input
                  type="text"
                  placeholder="e.g. Sam (Age 7)"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Household Role</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100"
                >
                  <option value="Main Cook">Main Cook</option>
                  <option value="Sous Chef / Partner">Sous Chef / Partner</option>
                  <option value="Junior Helper (Kids)">Junior Helper (Kids)</option>
                  <option value="Official Taste Tester">Official Taste Tester</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-accent py-2.5 px-5 text-xs font-extrabold">
              Add Family Member
            </button>
          </form>
        </div>
      )}

      {/* SUB TAB 2: Allergy & Diet Safety Engine */}
      {activeSubTab === 'allergies' && (
        <div className="space-y-6 max-w-3xl">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">Persistent Safety Engine</h4>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed mt-0.5">
                Allergies declared here are continuously scanned against every public and saved recipe. If a recipe contains an allergen, Dishcovery flags it and offers instant safe culinary replacements!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {household.allergiesAndDiets.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No persistent allergies configured. Add one below!</p>
            ) : (
              household.allergiesAndDiets.map((item, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-extrabold flex items-center justify-center text-xs">
                      {item.memberName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.memberName}</h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                        Allergy: <strong>{item.allergy}</strong> ({item.severity})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveAllergy(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Allergy Form */}
          <form onSubmit={handleAddAllergy} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">Add Member Allergy Profile</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Family Member</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100"
                >
                  {household.members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Allergen / Diet Restriction</label>
                <select
                  value={allergyType}
                  onChange={(e) => setAllergyType(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100"
                >
                  <option value="Peanuts">Peanuts</option>
                  <option value="Lactose / Dairy">Lactose / Dairy</option>
                  <option value="Gluten">Gluten</option>
                  <option value="Sesame">Sesame</option>
                  <option value="Tree Nuts">Tree Nuts</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary py-2.5 px-5 text-xs font-extrabold">
              Save Allergy Safety Rule
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
