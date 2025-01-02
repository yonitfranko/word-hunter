# צייד המילים - משחק אוצר מילים

משחק אינטראקטיבי ללימוד ותרגול אוצר מילים בעברית.

## התקנה

1. העתקת הפרויקט:
```bash
git clone https://github.com/[your-username]/word-hunter.git
cd word-hunter
```

2. התקנת חבילות:
```bash
npm install
```

3. הגדרת משתני סביבה:
- העתק את הקובץ `.env.example` לקובץ חדש בשם `.env.local`
- עדכן את פרטי החיבור ל-Supabase

4. הרצת הפרויקט:
```bash
npm run dev
```

## מבנה הפרויקט

```
word-hunter/
├── pages/               # דפי האפליקציה
├── components/          # קומפוננטות משותפות
├── lib/                # פונקציות עזר
└── public/             # קבצים סטטיים
```

## טכנולוגיות

- Next.js
- Supabase
- Tailwind CSS
- Lucide Icons
