# متجر الأناقة - منصة تجارة إلكترونية عربية/إنجليزية

منصة حديثة مستوحاة من Target.com بواجهة Next.js 14 + TypeScript وTailwind (مع دعم RTL) وخادم Express + Prisma على PostgreSQL مع استعداد للتطبيقات الجوالة.

## المتطلبات
- Node.js 18+
- PostgreSQL 14+
- (اختياري) Redis لـ sessions/cache

> يمكنك تشغيل Postgres وRedis محليًا بسرعة عبر `docker-compose up -d` (ملف `docker-compose.yml` موجود في الجذر).

## الإعداد السريع
### المتغيرات البيئية
أنشئ ملفات البيئة:
```
# backend/.env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=super-secret-key
JWT_REFRESH_SECRET=refresh-secret-key
CORS_ORIGINS=http://localhost:3000

# frontend/.env.local (عند الحاجة)
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

### تثبيت الحزم
```bash
cd backend && npm install
cd ../frontend && npm install
```

### قاعدة البيانات
- حدّث مخطط Prisma (يحتوي على المستخدمين، المنتجات، التصنيفات، السلة، الطلبات، القسائم، المراجعات، البانرات، وغيرها) ثم شغّل:
```bash
cd backend
npx prisma migrate dev --name init
```
- اختياري: أضِف بيانات تجريبية سريعة (تصنيفات المنتجات السبعة + عينات منتجات) بعد تشغيل الهجرة:
```bash
npm run seed
```

### تشغيل الخادم (Express + TS)
```bash
cd backend
npm run dev
```
- يقدّم `/api/health`، مصادقة JWT أولية (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)، وكاتالوج مبسط (`/api/catalog/categories`, `/api/catalog/products`).
- مفعّل Helmet، CORS، rate limiting، وقراءة الكعكات.

### تشغيل الواجهة (Next.js 14 + Tailwind + React Query)
```bash
cd frontend
npm run dev
```
- يدعم i18next للغتين (ar/en) مع تبديل RTL/LTR تلقائي.
- React Query لجلب المنتجات من الخادم مع بيانات احتياطية.
- React Hook Form + Zod للتحقق من نموذج النشرة البريدية.

### تسلسل تشغيل محلي كامل (localhost)
1. شغّل الخدمات المساعدة (اختياري لكن موصى به): `docker-compose up -d` لتشغيل Postgres وRedis.
2. ثبّت الحزم: `npm install` داخل كل من `backend/` و`frontend/`.
3. أنشئ ملفات البيئة (راجع القسم أعلاه) وحدّث `DATABASE_URL` لتطابق بيانات Postgres لديك (إن استخدمت docker-compose فالقيم الافتراضية تعمل: `postgresql://ecommerce:ecommerce@localhost:5432/ecommerce`).
4. شغّل الهجرة: `cd backend && npx prisma migrate dev --name init` ثم (اختياري) `npm run seed` لإضافة بيانات تجريبية.
5. شغّل خادم الـ API: من `backend/` نفّذ `npm run dev` (المنفذ 4000 افتراضيًا).
6. شغّل الواجهة: في نافذة أخرى `cd frontend && npm run dev` ثم زر المتصفح إلى `http://localhost:3000`.
7. جرّب الواجهات الأساسية:
   - صحة الخادم: `http://localhost:4000/api/health`
   - التصنيفات: `http://localhost:4000/api/catalog/categories`
   - المنتجات (بعد seed): `http://localhost:4000/api/catalog/products`
   - الواجهة العربية/الإنجليزية مع تبديل RTL/LTR من الصفحة الرئيسية.

## البنية
- `backend/`: Express + TypeScript، Prisma schema لـ PostgreSQL، وسطيات أمنية، ومسارات auth/catalog الأساسية.
- `frontend/`: Next.js (App Router) مع Tailwind، shadcn-style Button، React Query، Zustand، i18next.
- `images/`: أصول SVG مشتركة، نُسخت إلى `frontend/public/` للاستخدام داخل الواجهة.

## خريطة طريق مختصرة
- إضافة Stripe/PayPal وCOD للمدفوعات.
- تكامل Cloudinary للصور ومصادقة OAuth (Google/Facebook).
- بناء لوحة تحكم إدارية مع تقارير CSV/PDF وSocket.io لتحديث الطلبات.
- إضافة اختبارات (Jest للباك، React Testing Library/Playwright للواجهة) وتوليد Swagger/OpenAPI.
