'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';

const schema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح')
});

type FormData = z.infer<typeof schema>;

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log('Subscribe', data);
  };

  return (
    <section className="container-wide rounded-2xl bg-slate-900 px-6 py-10 text-right text-white">
      <h2 className="text-2xl font-bold">انضم إلى نشرتنا البريدية</h2>
      <p className="mt-2 text-slate-200">عروض حصرية وتنبيهات وصول المنتجات الجديدة باللغتين العربية والإنجليزية.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          {...register('email')}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-rose-500 focus:outline-none"
        />
        <Button type="submit" className="w-full sm:w-auto">
          اشتراك
        </Button>
      </form>
      {errors.email && <p className="mt-2 text-sm text-amber-300">{errors.email.message}</p>}
      {isSubmitSuccessful && <p className="mt-2 text-sm text-emerald-300">تم حفظ بريدك الإلكتروني بنجاح.</p>}
    </section>
  );
}
