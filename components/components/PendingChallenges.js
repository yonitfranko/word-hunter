import { useState } from 'react';
import { CheckCircle, XCircle, User, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PendingChallenges({ onChallengeReviewed }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChallenges = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('completed_challenges')
      .select(`
        *,
        word:words(word, definition),
        user:users(name, class)
      `)
      .eq('teacher_approved', false)
      .order('created_at', { ascending: false });

    if (!error) {
      setChallenges(data || []);
    }
    setLoading(false);
  };

  const handleReview = async (challengeId, isApproved) => {
    const { error } = await supabase
      .from('completed_challenges')
      .update({ 
        teacher_approved: true,
        is_correct: isApproved,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', challengeId);

    if (!error) {
      // עדכון הנקודות של התלמיד אם האתגר אושר
      if (isApproved) {
        // TODO: עדכון נקודות
      }
      
      // רענון רשימת האתגרים
      loadChallenges();
      
      // עדכון הממשק העליון
      if (onChallengeReviewed) {
        onChallengeReviewed();
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">טוען אתגרים...</div>;
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">אין אתגרים הממתינים לבדיקה</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <div 
          key={challenge.id} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">{challenge.word.word}</h3>
              <p className="text-sm text-gray-600">{challenge.word.definition}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(challenge.created_at).toLocaleDateString('he-IL')}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm">
                {challenge.user.name} - כיתה {challenge.user.class}
              </span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-1">
                {challenge.challenge_type === 'root' && 'שורש המילה:'}
                {challenge.challenge_type === 'translation' && 'תרגום לרוסית:'}
                {challenge.challenge_type === 'sentence' && 'משפט לדוגמה:'}
              </div>
              <div className="text-gray-900">{challenge.answer}</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleReview(challenge.id, false)}
              className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5 mr-1" />
              דחה
            </button>
            <button
              onClick={() => handleReview(challenge.id, true)}
              className="flex items-center px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-1" />
              אשר
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
