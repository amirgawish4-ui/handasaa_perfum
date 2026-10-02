'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [basePrice, setBasePrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');

  const [p25, setP25] = useState({ price: '', orig: '' });
  const [p35, setP35] = useState({ price: '', orig: '' });
  const [p50, setP50] = useState({ price: '', orig: '' });
  const [p100, setP100] = useState({ price: '', orig: '' });

  const [flowerPrice, setFlowerPrice] = useState('');
  const [babyFlowerPrice, setBabyFlowerPrice] = useState('');
  const [butterflyPrice, setButterflyPrice] = useState('');

  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      initCategoriesAndSettings();
    }
  }, [isAuthenticated]);

  // تهيئة الأقسام تلقائياً في سوبابيس لضمان الحصول على UUID حقيقي وصحيح
  async function initCategoriesAndSettings() {
    try {
      // 1. جلب الأقسام الموجودة
      let { data: existingCats, error } = await supabase.from('categories').select('*');
      
      if (error || !existingCats || existingCats.length === 0) {
        // إذا لم تكن موجودة، قم بإضافتها لتوليد UUID حقيقي
        const defaultCategories = [
          { name: 'برفانات فاخره', slug: 'perfumes' },
          { name: 'ساعات', slug: 'watches' },
          { name: 'نظارات', slug: 'glasses' },
          { name: 'بوكيهات الورد', slug: 'flowers' }
        ];
        
        const { data: insertedCats, error: insertError } = await supabase
          .from('categories')
          .insert(defaultCategories)
          .select();
          
        if (!insertError && insertedCats) {
          setCategories(insertedCats);
        }
      } else {
        setCategories(existingCats);
      }

      // 2. جلب إعدادات الأسعار
      const { data: settingsData } = await supabase.from('settings').select('*');
      if (settingsData && Array.isArray(settingsData)) {
        settingsData.forEach((item: any) => {
          if (item.key === 'flower_price') setFlowerPrice(item.value || '');
          if (item.key === 'baby_flower_price') setBabyFlowerPrice(item.value || '');
          if (item.key === 'butterfly_price') setButterflyPrice(item.value || '');
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // رفع الصور (يدعم اللابتوب والموبايل وأي صيغة)
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fileExt = file.name ? file.name.split('.').pop()?.toLowerCase() || 'jpg' : 'jpg';
      const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('products-images')
        .upload(fileName, file, { contentType: file.type, upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('products-images').getPublicUrl(fileName);
      if (data?.publicUrl) {
        setProductImage(data.publicUrl);
        alert('تم رفع الصورة بنجاح! 🖼️');
      }
    } catch (error: any) {
      alert('خطأ في رفع الصورة: ' + (error.message || error));
    } finally {
      setUploadingImage(false);
    }
  }

  // إضافة قسم جديد وحفظه في سوبابيس للحصول على UUID سليم
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName) return;
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    try {
      const slug = trimmed.toLowerCase().replace(/\s+/g, '-');
      const { data, error } = await supabase.from('categories').insert([{ name: trimmed, slug }]).select();
      if (error) throw error;

      if (data && data[0]) {
        setCategories(prev => [...prev, data[0]]);
      }
      setNewCategoryName('');
      alert('تم إضافة القسم بنجاح في قاعدة البيانات! 🎉');
    } catch (err: any) {
      alert('خطأ في إضافة القسم: ' + err.message);
    }
  }

  const currentCat = Array.isArray(categories) ? categories.find(c => c.id === selectedCategory) : null;
  const isPerfume = (currentCat?.name ?? '').includes('برفان') || (currentCat?.name ?? '').includes('برفانات فاخره');

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategory || !productName) {
      alert('يرجى اختيار القسم وتحديد اسم المنتج.');
      return;
    }

    setLoading(true);
    try {
      const productData: any = {
        name: productName,
        category_id: selectedCategory, // الآن أصبح UUID حقيقي متطابق 100% مع الجدول
        description: productDescription || null,
        image_url: productImage || null,
      };

      if (isPerfume) {
        productData.prices = {
          '25ml': { price: Number(p25.price) || 0, original_price: Number(p25.orig) || 0 },
          '35ml': { price: Number(p35.price) || 0, original_price: Number(p35.orig) || 0 },
          '50ml': { price: Number(p50.price) || 0, original_price: Number(p50.orig) || 0 },
          '100ml': { price: Number(p100.price) || 0, original_price: Number(p100.orig) || 0 },
        };
      } else {
        productData.price = Number(basePrice) || 0;
        productData.original_price = Number(originalPrice) || 0;
      }

      const { error } = await supabase.from('products').insert([productData]);
      if (error) throw error;

      alert('تم إضافة المنتج بنجاح! 🚀');
      setProductName('');
      setProductDescription('');
      setProductImage('');
      setBasePrice('');
      setOriginalPrice('');
      setP25({ price: '', orig: '' });
      setP35({ price: '', orig: '' });
      setP50({ price: '', orig: '' });
      setP100({ price: '', orig: '' });
    } catch (error: any) {
      alert('خطأ أثناء الإضافة: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    try {
      const settings = [
        { key: 'flower_price', value: flowerPrice },
        { key: 'baby_flower_price', value: babyFlowerPrice },
        { key: 'butterfly_price', value: butterflyPrice },
      ];

      for (const s of settings) {
        await supabase.from('settings').upsert({ key: s.key, value: s.value }, { onConflict: 'key' });
      }
      alert('تم تحديث أسعار الإضافات بنجاح! ✨');
    } catch (err: any) {
      alert('خطأ في حفظ الإعدادات: ' + err.message);
    }
  }

  async function handleAddDiscount(e: React.FormEvent) {
    e.preventDefault();
    if (!discountCode || !discountValue) return;
    try {
      const { error } = await supabase.from('discount_codes').insert([{ code: discountCode.toUpperCase(), value: Number(discountValue) }]);
      if (error) throw error;
      
      setDiscountCode('');
      setDiscountValue('');
      alert('تم إنشاء كود الخصم بنجاح! 🎟️');
    } catch (err: any) {
      alert('خطأ في إنشاء كود الخصم: ' + err.message);
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '30px', maxWidth: '400px', margin: '80px auto', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '12px', border: '1px solid #d97706', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>تسجيل دخول الأدمن 🛡️</h2>
        <input 
          type="password" 
          placeholder="أدخل كلمة المرور" 
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          style={{ width: '100%', padding: '12px', backgroundColor: '#333', color: '#fff', border: '1px solid #555', borderRadius: '5px', marginBottom: '15px', outline: 'none', boxSizing: 'border-box' }}
        />
        <button 
          onClick={() => {
            if (passwordInput === 'karim1234') {
              setIsAuthenticated(true);
            } else {
              alert('كلمة المرور غير صحيحة!');
            }
          }}
          style={{ width: '100%', backgroundColor: '#d97706', color: '#000', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          دخول
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '750px', margin: '30px auto', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '12px', border: '1px solid #d97706', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#f59e0b', marginBottom: '20px', fontSize: '26px' }}>لوحة تحكم هندسة بيرفيوم 🛡️</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => setActiveTab('products')} style={tabBtnStyle(activeTab === 'products')}>📦 إضافة منتج</button>
        <button onClick={() => setActiveTab('categories')} style={tabBtnStyle(activeTab === 'categories')}>📂 إضافة قسم</button>
        <button onClick={() => setActiveTab('settings')} style={tabBtnStyle(activeTab === 'settings')}>💐 أسعار الورد</button>
        <button onClick={() => setActiveTab('discounts')} style={tabBtnStyle(activeTab === 'discounts')}>🎟️ أكواد الخصم</button>
      </div>

      {activeTab === 'products' && (
        <form onSubmit={handleAddProduct} style={formBoxStyle}>
          <h2 style={titleStyle}>إضافة منتج جديد</h2>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">اختر القسم</option>
            {Array.isArray(categories) && categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="اسم المنتج" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />

          <textarea 
            placeholder="وصف المنتج (اختياري)" 
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' }}
            rows={2}
          />

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#fbbf24', fontSize: '14px' }}>صورة المنتج من الجهاز:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              style={{ color: '#fff' }}
            />
            {uploadingImage && <p style={{ color: '#fbbf24', fontSize: '13px' }}>جاري رفع الصورة...</p>}
            {productImage && <p style={{ color: '#10b981', fontSize: '13px' }}>تم إرفاق الصورة بنجاح ✔️</p>}
          </div>

          {isPerfume ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
              <p style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold', margin: '0' }}>أسعار الأحجام:</p>
              
              <div style={sizeRowStyle}>
                <span style={{ width: '60px' }}>25 مل:</span>
                <input type="number" placeholder="السعر بعد الخصم" value={p25.price} onChange={(e) => setP25({...p25, price: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="قبل الخصم (اختياري)" value={p25.orig} onChange={(e) => setP25({...p25, orig: e.target.value})} style={inputStyle} />
              </div>

              <div style={sizeRowStyle}>
                <span style={{ width: '60px' }}>35 مل:</span>
                <input type="number" placeholder="السعر بعد الخصم" value={p35.price} onChange={(e) => setP35({...p35, price: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="قبل الخصم (اختياري)" value={p35.orig} onChange={(e) => setP35({...p35, orig: e.target.value})} style={inputStyle} />
              </div>

              <div style={sizeRowStyle}>
                <span style={{ width: '60px' }}>50 مل:</span>
                <input type="number" placeholder="السعر بعد الخصم" value={p50.price} onChange={(e) => setP50({...p50, price: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="قبل الخصم (اختياري)" value={p50.orig} onChange={(e) => setP50({...p50, orig: e.target.value})} style={inputStyle} />
              </div>

              <div style={sizeRowStyle}>
                <span style={{ width: '60px' }}>100 مل:</span>
                <input type="number" placeholder="السعر بعد الخصم" value={p100.price} onChange={(e) => setP100({...p100, price: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="قبل الخصم (اختياري)" value={p100.orig} onChange={(e) => setP100({...p100, orig: e.target.value})} style={inputStyle} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input type="number" placeholder="سعر البيع (بعد الخصم)" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} style={inputStyle} />
              <input type="number" placeholder="السعر قبل الخصم (اختياري)" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} style={inputStyle} />
            </div>
          )}

          <button type="submit" disabled={loading} style={mainBtnStyle}>
            {loading ? 'جاري الحفظ...' : 'حفظ وإضافة المنتج 📦'}
          </button>
        </form>
      )}

      {activeTab === 'categories' && (
        <form onSubmit={handleAddCategory} style={formBoxStyle}>
          <h2 style={titleStyle}>إضافة قسم جديد للمتجر</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="اسم القسم (مثلاً: بوكيهات الورد...)" 
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={btnStyle}>إضافة</button>
          </div>
        </form>
      )}

      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} style={formBoxStyle}>
          <h2 style={titleStyle}>تعديل أسعار إضافات الورد والبوكسات 💐</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#ccc' }}>سعر الوردة:</label>
              <input type="number" value={flowerPrice} onChange={(e) => setFlowerPrice(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#ccc' }}>سعر بيبي فلاور:</label>
              <input type="number" value={babyFlowerPrice} onChange={(e) => setBabyFlowerPrice(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#ccc' }}>سعر الفراشات:</label>
              <input type="number" value={butterflyPrice} onChange={(e) => setButterflyPrice(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <button type="submit" style={mainBtnStyle}>حفظ أسعار الإضافات</button>
        </form>
      )}

      {activeTab === 'discounts' && (
        <form onSubmit={handleAddDiscount} style={formBoxStyle}>
          <h2 style={titleStyle}>إنشاء كود خصم جديد 🎟️</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input type="text" placeholder="كود الخصم (مثلاً: EGYPT10)" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="قيمة الخصم" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={mainBtnStyle}>إنشاء كود الخصم</button>
        </form>
      )}
    </div>
  );
}

const formBoxStyle = { padding: '15px', backgroundColor: '#262626', borderRadius: '8px', border: '1px solid #404040' };
const titleStyle = { fontSize: '18px', color: '#fbbf24', marginBottom: '15px' };
const inputStyle = { width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', border: '1px solid #555', borderRadius: '5px', outline: 'none', boxSizing: 'border-box' as const };
const btnStyle = { backgroundColor: '#d97706', color: '#000', padding: '10px 20px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', whiteSpace: 'nowrap' as const };
const mainBtnStyle = { width: '100%', backgroundColor: '#d97706', color: '#000', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' };
const sizeRowStyle = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' };
const tabBtnStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? '#d97706' : '#333',
  color: isActive ? '#000' : '#fff',
  padding: '10px 15px',
  fontWeight: 'bold',
  border: '1px solid #555',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px'
});