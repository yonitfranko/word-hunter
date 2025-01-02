import { useState, useEffect } from 'react';
import { Book, CheckCircle, Clock, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function TeacherDashboard() {
  const [pendingChallenges, setPendingChallenges] = useState(0);
  const [activeWords, setActiveWords] = useState([]);
  const [newWord, setNewWord] = useState({
    word: '',
    root: '',
    definition: '',
    translation: ''
  });

  // טעינת נתונים ראשונית
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // טעינת אתגרים שממתינים לבדיקה
    const { data: challenges } = await supabase
      .from('completed_challenges')
      .select('*')
      .eq('teacher_approved', false);

    setPendingChallenges(challenges?.length || 0);

    // טעינת מילים פעילות
    const { data: words } = await supabase
      .from('words')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    setActiveWords(words || []);
  };

  const handleAddWord = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('words')
      .insert([{
        ...newWord,
        is_active: true
      }]);

    if (!error) {
      setNewWord({
        word: '',
        root: '',
        definition: '',
        translation: ''
      });
      loadDashboardData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">לוח בקרה למורה</h1>
          <p className="text-gray-600">ניהול מילים ומעקב אחר התקדמות התלמידים</p>
        </div>

        {/* כרטיסיות סטטיסטיקה */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">אתגרים לבדיקה</div>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{pendingChallenges}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600">מילים פעילות</div>
              <Book className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{activeWords.length}</div>
          </div>
        </div>

        {/* טופס הוספת מילה */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">הוספת מילה חדשה</h2>
          <form onSubmit={handleAddWord} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  מילה
                </label>
                <input
                  type="text"
                  value={newWord.word}
                  onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  שורש
                </label>
                <input
                  type="text"
                  value={newWord.root}
                  onChange={(e) => setNewWord({ ...newWord, root: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  הגדרה
                </label>
                <textarea
                  value={newWord.definition}
                  onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תרגום לרוסית
                </label>
                <input
                  type="text"
                  value={newWord.translation}
                  onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              הוספת מילה
            </button>
          </form>
        </div>

        {/* רשימת מילים פעילות */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">מילים פעילות</h2>
          </div>
          <div className="divide-y">
            {activeWords.map((word) => (
              <div key={word.id} className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{word.word}</h3>
                  <p className="text-gray-600">{word.definition}</p>
                </div>
                <button
                  onClick={() => {/* TODO: Toggle word status */}}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  פעיל
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
