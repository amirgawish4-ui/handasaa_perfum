'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPanel() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  }

  // إضافة قسم جديد لقاعدة البيانات
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/\s+/g, '-');
    await supabase.from('categories').insert([{ name: newCategoryName, slug }]);
    setNewCategoryName('');
    fetchCategories();
    alert('تم إضافة القسم بنجاح!');
  }

  // التحقق هل القسم المحدد هو "برفانات"
  const currentCat = categories.find(c => c.id === selectedCategory);
  const isPerfume = currentCat?.name?.includes('برفان') || currentCat?.name?.includes('برفانات');

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-xl mt-6 border border-yellow-600">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">لوحة تحكم هندسة بيرفيوم 🛡️</h1>

      {/* إضافة قسم جديد */}
      <form onSubmit={handleAddCategory} className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-lg font-bold mb-3 text-yellow-400">إضافة قسم جديد للمتجر</h2>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="اسم القسم (مثلاً: ساعات، نظارات...)" 
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 p-2 bg-gray-700 rounded border border-gray-600"
          />
          <button type="submit" className="bg-yellow-600 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500">إضافة</button>
        </div>
      </form>

      {/* إضافة منتج */}
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-lg font-bold mb-3 text-yellow-400">إضافة منتج جديد</h2>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded border border-gray-600 mb-3"
        >
          <option value="">اختر القسم</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="اسم المنتج" 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded border border-gray-600 mb-3"
        />

        {/* خيارات أحجام البرفانات تظهر فقط لو القسم برفانات */}
        {isPerfume ? (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input type="number" placeholder="سعر 25 مل" className="p-2 bg-gray-700 rounded border border-gray-600" />
            <input type="number" placeholder="سعر 35 مل" className="p-2 bg-gray-700 rounded border border-gray-600" />
            <input type="number" placeholder="سعر 50 مل" className="p-2 bg-gray-700 rounded border border-gray-600" />
            <input type="number" placeholder="سعر 100 مل" className="p-2 bg-gray-700 rounded border border-gray-600" />
          </div>
        ) : (
          <input type="number" placeholder="سعر المنتج الأساسي" className="w-full p-2 bg-gray-700 rounded border border-gray-600 mb-3" />
        )}
      </div>
    </div>
  );
}