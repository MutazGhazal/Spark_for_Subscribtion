# Spark Store - Project Structure

## 📁 المجلدات والملفات

### 🏠 Root Files (الملفات الرئيسية)
```
├── index.html              # الصفحة الرئيسية للمتجر
├── admin.html              # لوحة التحكم
├── reset-password.html     # صفحة إعادة تعيين كلمة المرور
├── CNAME                   # إعدادات النطاق
├── .nojekyll               # تعطيل Jekyll
└── README.md               # ملف التعريف
```

### 📂 css/ - ملفات التنسيق
```
css/
├── style.css               # التنسيق الرئيسي
└── admin.css               # تنسيق لوحة التحكم
```

### 📂 js/ - ملفات JavaScript
```
js/
├── app.js                  # منطق المتجر الرئيسي
├── admin.js                # منطق لوحة التحكم
├── supabase-config.js      # إعدادات Supabase
└── referral.js             # نظام الإحالات
```

### 📂 data/ - ملفات البيانات
```
data/
├── products.json           # بيانات المنتجات (JSON fallback)
└── settings.json           # إعدادات المتجر
```

### 📂 images/ - الصور
```
images/
└── *.svg                   # أيقونات المنتجات
```

### 📂 scripts/ - سكريبتات Python
```
scripts/
├── core/                   # السكريبتات الأساسية
│   ├── check_availability.py      # فحص التوفر والأسعار
│   ├── enhanced_scraper.py        # سكريبت متقدم للجلب
│   └── fix_plan_prices.py         # إصلاح أسعار الخطط
│
├── utils/                  # أدوات مساعدة
│   ├── fetch_plan_urls.py         # جلب روابط الخطط
│   ├── fetch_source_urls.py       # جلب روابط المصادر
│   ├── fix_plan_urls.py           # إصلاح روابط الخطط
│   ├── list_urls.py               # عرض الروابط
│   └── official_prices.json       # الأسعار الرسمية
│
├── debug/                  # أدوات التصحيح
│   ├── debug_products.py          # فحص المنتجات
│   ├── debug_scraper.py           # فحص السكريبت
│   ├── verify_urls.py             # التحقق من الروابط
│   └── simulate_scraper.py        # محاكاة الجلب
│
└── insert/                 # سكريبتات الإدخال
    └── *.js                       # ملفات إدخال المنتجات
```

### 📂 logs/ - ملفات السجلات
```
logs/
└── *.log                   # ملفات السجلات
```

### 📂 .github/workflows/ - GitHub Actions
```
.github/workflows/
└── checker.yml             # workflow التحديث التلقائي
```

---

## ⚙️ GitHub Actions Workflow

### المشكلة الحالية:
- الـ workflow بياخد **7+ دقائق** (طويل جداً)
- بيعمل فحص لـ 268 منتج كل مرة
- مفيش تفريق بين المنتجات اللي محتاجة تحديث واللي مش محتاجة

### الاقتراحات للتحسين:

#### 1. **تقليل عدد المنتجات المفحوصة**
```yaml
# بدل ما تفحص كل المنتجات، فحص بس اللي:
# - سعرها تغير في آخر 24 ساعة
# - متاحتها تغيرت
# - محتاجة تحديث (محددة يدوياً)
```

#### 2. **تقسيم الـ workflow**
```yaml
# workflow منفصل لكل نوع:
- check_availability.yml    # فحص التوفر فقط
- update_prices.yml         # تحديث الأسعار
- update_urls.yml           # تحديث الروابط
```

#### 3. **جدولة مختلفة**
```yaml
# فحص التوفر: كل 6 ساعات (كافي)
# تحديث الأسعار: مرة يومياً
# تحديث الروابط: مرة أسبوعياً
```

---

## 🚀 الاستخدام الأمثل

### تحديث يدوي (موصى به):
```bash
# 1. فحص المنتجات اللي محتاجة تحديث
python scripts/utils/list_urls.py

# 2. تحديث روابط منتج معين
python scripts/core/fix_plan_urls.py --product PRODUCT_ID --update

# 3. تحديث الأسعار
python scripts/core/fix_plan_prices.py --update
```

### تحديث تلقائي (GitHub Actions):
```bash
# الـ workflow الحالي بيعمل:
python check_availability.py

# لكن الأفضل يكون:
python scripts/core/check_availability.py --quick  # فحص سريع
```

---

## 📊 ملخص المشاكل والحلول

| المشكلة | الحل |
|---------|------|
| ملفات كثيرة مبعثرة | تنظيم في مجلدات |
| GitHub Actions بطيء | تقليل المنتجات المفحوصة |
| روابط غلط | تحديث يدوي لكل منتج |
| أسعار ثابتة | استخدام multipliers حسب المدة |
