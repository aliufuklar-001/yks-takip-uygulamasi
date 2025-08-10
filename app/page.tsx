import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Bu kısım sonraki adımlarda deneme kartları ve hedef bileşeni ile doldurulacak.
  // Şimdilik basit bir karşılama mesajı ve diğer sayfalara linkler içeriyor.

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">YKS Analiz</h1>
              </div>
            </div>
            <div className="flex items-center">
               <Link href="/profil" className="mr-4 text-sm font-medium text-gray-600 hover:text-gray-900">
                Profil
              </Link>
              <Link href="/istatistikler" className="mr-4 text-sm font-medium text-gray-600 hover:text-gray-900">
                İstatistikler
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-900">
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hoş Geldin, {user.email}</h2>
          <p>Bu ana sayfa (Dashboard), sonraki adımlarda deneme kartları, hedef takip bileşeni ve istatistiklerle dolacak.</p>
           <div className="mt-6">
             <Link href="/yeni-deneme" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Yeni Deneme Ekle
              </Link>
           </div>
        </div>
      </main>
    </div>
  );
}
