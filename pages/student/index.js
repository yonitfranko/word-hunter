import { useState, useEffect } from 'react';
import { Star, Book, Trophy, Flag } from 'lucide-react';
import { supabase } from '../../lib/supabase';
export default function StudentDashboard() {
  const [currentWord, setCurrentWord] = useState(null);
  const [challenges, setChallenges] = useState({
    root: '',
    definition: '',
    translation: '',
    sentence: ''
  });
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadCurrentWord();
    loadStudentStats();
  }, []);

  const loadCurrentWord = async () => {
    const { data: word } = await supabase
      .from('words')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    setCurrentWord(word);
  };

  const loadStudentStats = async () => {
    // כאן נטען את הנקודות והרצף של התלמיד
    // TODO: להוסיף את הלוגיקה לאחר שנוסיף מערכת משתמשים
  };

  const handleChallengeSubmit = async (type) => {
    const answer = challenges[type];
    if (!answer.trim()) return;

    const { data, error } = await supabase
      .from('completed_challenges')
      .insert([
        {
          word_id: currentWord.id,
          challenge_type: type,
          answer: answer,
          auto_check: false,
          teacher_approved: false
        }
      ]);

    if (!error) {
      // נקה את התשובה אחרי שליחה
      setChallenges(prev => ({
        ...prev,
        [type]: ''
      }));
    }
  };

  if (!currentWord) {
    return <div>טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* סטטיסטיקות */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">נקודות</span>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{points}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">רצף</span>
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{streak} ימים</div>
          </div>
        </div>

        {/* מילת היום */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{currentWord.word}</h1>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                מילת היום
              </span>
            </div>
            <p className="text-gray-600">{currentWord.definition}</p>
          </div>

          {/* אתגרים */}
          <div className="divide-y">
            {/* אתגר שורש */}
            <div className="p-6">
              <h3 className="font-bold mb-3">מה השורש של המילה?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={challenges.root}
                  onChange={(e) => setChallenges(prev => ({ ...prev, root: e.target.value }))}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="הכנס/י את השורש"
                />
                <button
                  onClick={() => handleChallengeSubmit('root')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  שלח
                </button>
              </div>
            </div>

            {/* אתגר תרגום */}
            <div className="p-6">
              <h3 className="font-bold mb-3">תרגום לרוסית</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={challenges.translation}
                  onChange={(e) => setChallenges(prev => ({ ...prev, translation: e.target.value }))}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="הכנס/י את התרגום"
                />
                <button
                  onClick={() => handleChallengeSubmit('translation')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  שלח
                </button>
              </div>
            </div>

            {/* אתגר משפט */}
            <div className="p-6">
              <h3 className="font-bold mb-3">כתוב/כתבי משפט עם המילה</h3>
              <div className="flex gap-2">
                <textarea
                  value={challenges.sentence}
                  onChange={(e) => setChallenges(prev => ({ ...prev, sentence: e.target.value }))}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="הכנס/י משפט שמשתמש במילה"
                  rows="2"
                />
                <button
                  onClick={() => handleChallengeSubmit('sentence')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  שלח
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
