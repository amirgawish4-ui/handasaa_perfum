'use client';
import { useState } from 'react';

export default function FillYourBox() {
  const [step, setStep] = useState(1);
  const [boxSize, setBoxSize] = useState<{name: string, price: number} | null>(null);
  const [boxShape, setBoxShape] = useState<string>('');

  const boxSizes = [
    { name: 'صغير', price: 150 },
    { name: 'وسط', price: 200 },
    { name: 'كبير', price: 250 },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl mt-6 border border-yellow-600">
      {/* الخطوة 1: اختيار حجم البوكس */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">اختر حجم البوكس 🎁</h2>
          <div className="space-y-3">
            {boxSizes.map((size) => (
              <button 
                key={size.name}
                onClick={() => { setBoxSize(size); setStep(2); }}
                className="w-full p-4 bg-gray-800 border border-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-black transition flex justify-between items-center font-bold text-lg"
              >
                <span>بوكس {size.name}</span>
                <span className="text-yellow-400">{size.price} ج.م</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* الخطوة 2: اختيار شكل البوكس */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">اختر شكل البوكس</h2>
          <div className="grid grid-cols-2 gap-4">
            {['اسطواني', 'مستطيل'].map((shape) => (
              <button 
                key={shape}
                onClick={() => { setBoxShape(shape); setStep(3); }}
                className="p-6 bg-gray-800 border border-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-black transition text-center text-xl font-bold"
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* الخطوة 3: مود املأ بوكسك بالمنتجات */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-yellow-500 mb-2">مود: املأ بوكسك ✨</h2>
          <p className="text-gray-300 mb-4 text-sm">البوكس المختختار: {boxSize?.name} ({boxShape}) بسعر {boxSize?.price} ج.م</p>
          <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
            [هنا سيتم عرض جميع منتجات المتجر ليختار منها العميل ويتم إضافتها للفاتورة مع سعر البوكس]
          </div>
        </div>
      )}
    </div>
  );
}