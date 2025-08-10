import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { addDeneme } from "./actions";

export default async function YeniDenemePage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const dersler = [
    { name: "turkce", label: "Türkçe", max: 40 },
    { name: "tarih", label: "Tarih", max: 5 },
    { name: "cografya", label: "Coğrafya", max: 5 },
    { name: "felsefe", label: "Felsefe", max: 5 },
    { name: "din", label: "Din Kültürü / Ek Felsefe", max: 5 },
    { name: "matematik", label: "Temel Matematik", max: 40 },
    { name: "fizik", label: "Fizik", max: 7 },
    { name: "kimya", label: "Kimya", max: 7 },
    { name: "biyoloji", label: "Biyoloji", max: 6 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Yeni TYT Denemesi Ekle</h1>
        <p className="text-gray-600 mb-8">Lütfen her ders için doğru ve yanlış sayılarını girin.</p>
        
        <form action={addDeneme} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deneme_adi" className="block text-sm font-medium text-gray-700 mb-1">Deneme Adı / Kaynak</label>
              <input type="text" name="deneme_adi" id="deneme_adi" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 3D Türkiye Geneli TYT-1" />
            </div>
            <div>
              <label htmlFor="deneme_tarihi" className="block text-sm font-medium text-gray-700 mb-1">Deneme Tarihi</label>
              <input type="date" name="deneme_tarihi" id="deneme_tarihi" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {dersler.map((ders) => (
              <div key={ders.name} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{ders.label} <span className="text-sm text-gray-500">({ders.max} soru)</span></h3>
                <div className="flex space-x-4">
                  <div>
                    <label htmlFor={`${ders.name}_dogru`} className="block text-xs font-medium text-gray-600">Doğru</label>
                    <input type="number" name={`${ders.name}_dogru`} id={`${ders.name}_dogru`} min="0" max={ders.max} defaultValue="0" className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor={`${ders.name}_yanlis`} className="block text-xs font-medium text-gray-600">Yanlış</label>
                    <input type="number" name={`${ders.name}_yanlis`} id={`${ders.name}_yanlis`} min="0" max={ders.max} defaultValue="0" className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Denemeyi Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
