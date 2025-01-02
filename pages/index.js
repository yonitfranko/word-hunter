import { useState } from 'react';
import { useRouter } from 'next/router';
import { BookOpen, User, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    class: '',
  });

  const classes = ['ז1', 'ז2', 'ז3', 'ח1', 'ח2', 'ח3'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (role === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* כותרת */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">צייד המילים</h1>
          <p className="text-gray-600">ברוכים הבאים למשחק אוצר המילים</p>
        </div>

        {/* טופס כניסה */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* בחירת תפקיד */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  role === 'student'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="block text-sm font-medium">תלמיד/ה</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  role === 'teacher'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="block text-sm font-medium">מורה</span>
              </button>
            </div>

            {/* שם */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                שם מלא
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* בחירת כיתה (רק לתלמידים) */}
            {role === 'student' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="class">
                  כיתה
                </label>
                <select
                  id="class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">בחר/י כיתה</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* כפתור כניסה */}
            <button
              type="submit"
              disabled={!role || !formData.name || (role === 'student' && !formData.class)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              כניסה למשחק
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
