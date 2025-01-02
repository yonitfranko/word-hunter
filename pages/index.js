import { useState } from 'react';
import { BookOpen, User, Users } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    class: '',
  });

  const classes = ['ז1', 'ז2', 'ז3', 'ח1', 'ח2', 'ח3'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { role, ...formData });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-md mx-auto">
        {/* לוגו בית הספר */}
        <div className="flex justify-center mb-12">
          <div className="relative w-24 h-24">
            <Image
              src="/לוגו דרכא.PNG"
              alt="לוגו בית ספר"
              width={96}
              height={96}
              style={{
                objectFit: 'contain',
                quality: 100
              }}
              priority
            />
          </div>
        </div>
        
        {/* כותרת */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">צייד המילים</h1>
          <p className="text-gray-600 text-lg">ברוכים הבאים למשחק אוצר המילים</p>
        </div>

        {/* טופס כניסה */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-6 rounded-lg border-2 transition-all ${
                role === 'student'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <User className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <span className="block text-lg font-medium">תלמיד/ה</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`p-6 rounded-lg border-2 transition-all ${
                role === 'teacher'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <span className="block text-lg font-medium">מורה</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                שם מלא
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {role === 'student' && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  כיתה
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            <button
              type="submit"
              disabled={!role || !formData.name || (role === 'student' && !formData.class)}
              className="w-full py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 
                       transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              כניסה למשחק
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
