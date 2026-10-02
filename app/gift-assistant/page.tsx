'use client';
import { useState } from 'react';

export default function GiftAssistant() {
  const [recipient, setRecipient] = useState('');
  const [age, setAge] = useState('');
  const [occasion, setOccasion] = useState('');
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl mt-6 border border-yellow-600">
      <h1 className="text-2xl font-bold text-yellow-500 mb-4 text-center">مساعد الهدايا الذكي 🤖</h1>
      {!showResults ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">الهدية لمن؟</label>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700">
              <option value="">اختر الشخص</option>
              <option value="friend">صديق / صديقة</option>
              <option value="spouse">زوج / زوجة</option>
              <option value="family">أحد أفراد العائلة</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">العمر كام سنة؟</label>
            <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700">
              <option value="">اختر الفئة العمرية</option>
              <option value="18-25">18 - 25 سنة</option>
              <option value="25-40">25 - 40 سنة</option>
              <option value="40+">أكبر من 40 سنة</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">ما هي المناسبة؟</label>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700">
              <option value="">اختر المناسبة</option>
              <option value="birthday">عيد ميلاد</option>
              <option value="graduation">تخرج</option>
              <option value="wedding">خطوبة / زفاف</option>
            </select>
          </div>
          <button 
            onClick={() => setShowResults(true)} 
            className="w-full bg-yellow-600 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            اعرض الهدايا المقترحة المناسبة 🎁
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-green-400 mb-4">المنتجات المرشحة لك بناءً على إجاباتك:</h2>
          <p className="text-gray-300 text-sm mb-4">يمكنك اختيار إضافتها للسلة مع أو بدون بوكس، وسيقوم المساعد بحساب السعر الإجمالي تلقائياً.</p>
          <button 
            onClick={() => setShowResults(false)} 
            className="w-full bg-gray-800 text-yellow-500 py-2 rounded font-bold border border-yellow-600"
          >
            إعادة الاختيار
          </button>
        </div>
      )}
    </div>
  );
}