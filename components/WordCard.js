import { Book, Clock } from 'lucide-react';

export default function WordCard({ 
  word,
  isActive = true,
  showActions = false,
  onToggleStatus
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
            {word.root && (
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Book className="w-4 h-4 mr-1" />
                שורש: {word.root}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {showActions ? (
              <button
                onClick={() => onToggleStatus(word.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  isActive 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isActive ? 'פעיל' : 'לא פעיל'}
              </button>
            ) : (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                מילת היום
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">פירוש</h3>
            <p className="text-gray-900">{word.definition}</p>
          </div>

          {word.translation && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">תרגום לרוסית</h3>
              <p className="text-gray-900">{word.translation}</p>
            </div>
          )}
        </div>

        {showActions && (
          <div className="mt-4 pt-4 border-t flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(word.created_at).toLocaleDateString('he-IL')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
