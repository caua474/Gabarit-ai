import React, { useState } from 'react';
import { User, Target, Award, Zap, Save } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profile.name || 'Estudante');
  const [targetCourse, setTargetCourse] = useState(profile.targetCourse || 'Medicina');
  const [targetExam, setTargetExam] = useState(profile.targetExam || 'ENEM 2026');
  const [dailyQuestionsGoal, setDailyQuestionsGoal] = useState(profile.dailyQuestionsGoal || 20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      targetCourse,
      targetExam,
      dailyQuestionsGoal: Number(dailyQuestionsGoal),
    });
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-lg">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{name}</h3>
            <p className="text-xs text-purple-400 font-semibold">{targetCourse} • {targetExam}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Nome de Usuário
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Curso Alvo
              </label>
              <input
                type="text"
                value={targetCourse}
                onChange={(e) => setTargetCourse(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Exame Alvo
              </label>
              <input
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
              Meta Diária de Questões
            </label>
            <input
              type="number"
              value={dailyQuestionsGoal}
              onChange={(e) => setDailyQuestionsGoal(Number(e.target.value))}
              min={1}
              max={200}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95 mt-2"
          >
            <Save size={15} /> Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};
