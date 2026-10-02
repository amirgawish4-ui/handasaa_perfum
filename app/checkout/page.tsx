'use client';
import { useState } from 'react';

export default function Checkout() {
  const [governorate, setGovernorate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // حساب الشحن تلقائياً حسب المحافظة
  const getShippingCost = (gov: string) => {
    if (gov === 'Kafr El-Sheikh' || gov === 'Beheira') return 65;
    if (gov === 'Bahri') return 80;
    if (gov === 'Qibli') return 90;
    if (gov === 'Upper & Sinai') return 100;
    return 0;
  };

  const shippingCost = getShippingCost(governorate);

  const handleWhatsAppCheckout = () => {
    // [الرقم هنا]: حط رقم الواتساب بتاعك
    const whatsappNumber = "201012345678"; 
    const message = `أهلاً هندسة بيرفيوم، أريد تأكيد الأوردر:%0a- الاسم: ${name}%0a- الهاتف: ${phone}%0a- العنوان: ${address}%0a- المحافظة: ${governorate}%0a- مصاريف الشحن: ${shippingCost} ج.م`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl mt-6 border border-yellow-600">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">إتمام الأوردر والشحن 🚚</h2>
      <div className="space-y-4">
        <input type="text" placeholder="اسمك الكامل" onChange={(e)=>setName(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700" />
        <input type="text" placeholder="رقم الهاتف" onChange={(e)=>setPhone(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700" />
        <textarea placeholder="العنوان بالتفصيل" onChange={(e)=>setAddress(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700"></textarea>
        
        <div>
          <label className="block mb-2 font-semibold">اختر المحافظة:</label>
          <select value={governorate} onChange={(e)=>setGovernorate(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700">
            <option value="">اختر المحافظة</option>
            <option value="Kafr El-Sheikh">كفر الشيخ (65 ج.م)</option>
            <option value="Beheira">البحيرة (65 ج.م)</option>
            <option value="Bahri">محافظات بحري (80 ج.م)</option>
            <option value="Qibli">قبلي (90 ج.م)</option>
            <option value="Upper & Sinai">الصعيد وسيناء (100 ج.م)</option>
          </select>
        </div>

        <div className="bg-gray-800 p-3 rounded flex justify-between items-center font-bold">
          <span>تكلفة الشحن التلقائية:</span>
          <span className="text-yellow-400">{shippingCost} ج.م</span>
        </div>

        <button onClick={handleWhatsAppCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-500 transition">
          إرسال الفاتورة عبر واتساب لتأكيد الأوردر 📲
        </button>
      </div>
    </div>
  );
}