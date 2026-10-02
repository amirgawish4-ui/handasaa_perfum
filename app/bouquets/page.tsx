'use client';
import { useState } from 'react';

export default function BouquetBuilder() {
  const [roseCount, setRoseCount] = useState<number>(10);
  const [includeBabyFlower, setIncludeBabyFlower] = useState(false);
  const [includeButterfly, setIncludeButterfly] = useState(false);
  const [customImage, setCustomImage] = useState<File | null>(null);

  // الأسعار الثابتة (يمكن تعديلها أو ربطها بالإدارة لاحقاً)
  const rosePrice = 30;
  const babyFlowerPrice = 45;
  const butterflyPrice = 30;

  const totalPrice = 
    (roseCount * rosePrice) + 
    (includeBabyFlower ? babyFlowerPrice : 0) + 
    (includeButterfly ? butterflyPrice : 0);

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl mt-6 border border-yellow-600">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">تصميم بوكيه الورد 💐</h1>
      
      {/* عدد الورود */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">كم عدد الورود التي تريدها؟ (سعر الوردة 30ج)</label>
        <div className="flex gap-2 mb-3">
          {[5, 10, 15, 20].map((num) => (
            <button 
              key={num} 
              onClick={() => setRoseCount(num)}
              className={`px-4 py-2 rounded font-bold ${roseCount === num ? 'bg-yellow-600 text-black' : 'bg-gray-800 text-white'}`}
            >
              {num} ورَدات
            </button>
          ))}
        </div>
        <input 
          type="number" 
          value={roseCount} 
          onChange={(e) => setRoseCount(Number(e.target.value))}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white"
          placeholder="أو اكتب العدد يدوياً هنا"
        />
      </div>

      {/* الإضافات (بيبي فلاور / فراشات) مع إمكانية التخطي بعدم اختيارها */}
      <div className="mb-6 space-y-3 bg-gray-800 p-4 rounded-lg">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={includeBabyFlower} 
            onChange={(e) => setIncludeBabyFlower(e.target.checked)}
            className="w-5 h-5 accent-yellow-600"
          />
          <span>إضافة بيبي فلاور (+{babyFlowerPrice} ج.م)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={includeButterfly} 
            onChange={(e) => setIncludeButterfly(e.target.checked)}
            className="w-5 h-5 accent-yellow-600"
          />
          <span>إضافة فراشات زينة (+{butterflyPrice} ج.م)</span>
        </label>
      </div>

      {/* رفع صورة بوكيه من الجهاز */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">هل لديك صورة بوكيه مختلفة؟ ارفعها من جهازك:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => e.target.files && setCustomImage(e.target.files[0])}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-sm text-gray-300"
        />
      </div>

      {/* إجمالي السعر */}
      <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-xl font-bold">
        <span>إجمالي السعر:</span>
        <span className="text-yellow-500">{totalPrice} ج.م</span>
      </div>
    </div>
  );
}