import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function ChallengeCard({ title, type, onSubmit, placeholder = '' }) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('pending'); // 'pending', 'submitted', 'approved', 'rejected'

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setStatus('submitted');
    await onSubmit(type, answer);
    setAnswer('');
  };

  return (
    <div className="p-6 border-b last:border-b-0">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold">{title}</h3>
        {status !== 'pending' && (
          <div className={`px-3 py-1 rounded-full text-sm ${
            status === 'submitted' ? 'bg-yellow-100 text-yellow-600' :
            status === 'approved' ? 'bg-green-100 text-green-600' :
            'bg-red-100 text-red-600'
          }`}>
            {status === 'submitted' ? 'ממתין לבדיקה' :
             status === 'approved' ? 'אושר' : 'נדחה'}
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {type === 'sentence' ? (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder={placeholder}
            rows="2"
            disabled={status !== 'pending'}
          />
        ) : (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder={placeholder}
            disabled={status !== 'pending'}
          />
        )}
        
        {status === 'pending' && (
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            שלח
          </button>
        )}
      </div>
      
      {status === 'rejected' && (
        <p className="mt-2 text-sm text-red-600">
          נא לנסות שוב - התשובה לא מספיק מדויקת
        </p>
      )}
    </div>
  );
}
