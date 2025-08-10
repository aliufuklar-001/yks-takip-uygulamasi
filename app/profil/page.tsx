import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProfile } from "./actions";

export default async function ProfilePage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('hedef_net, alan, sinif')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil ve Hedefler</h1>
        <p className="text-gray-600 mb-8">Bilgilerinizi ve hedeflerinizi buradan yönetebilirsiniz.</p>
        
        <form action={updateProfile} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
            <input type="email" name="email" id="email" disabled value={user.email || ''} className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed" />
          </div>
          
          <div>
            <label htmlFor="hedef_net" className="block text-sm font-medium text-gray-700">TYT Net Hedefi</label>
            <input type="number" step="0.25" name="hedef_net" id="hedef_net" defaultValue={profile?.hedef_net || ''} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 95.5" />
          </div>

          <div>
            <label htmlFor="sinif" className="block text-sm font-medium text-gray-700">Sınıf</label>
            <select name="sinif" id="sinif" defaultValue={profile?.sinif || ''} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Seçiniz...</option>
              <option value="9">9. Sınıf</option>
              <option value="10">10. Sınıf</option>
              <option value="11">11. Sınıf</option>
              <option value="12">12. Sınıf</option>
              <option value="Mezun">Mezun</option>
            </select>
          </div>

          <div>
            <label htmlFor="alan" className="block text-sm font-medium text-gray-700">Alan</label>
            <select name="alan" id="alan" defaultValue={profile?.alan || ''} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Seçiniz...</option>
              <option value="Sayısal">Sayısal</option>
              <option value="Eşit Ağırlık">Eşit Ağırlık</option>
              <option value="Sözel">Sözel</option>
              <option value="Dil">Dil</option>
            </select>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Bilgileri Güncelle
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
