import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// Bu sayfa henüz grafik içermiyor, sadece temel bir yapı.
// Grafik ekleme bir sonraki adım olabilir.

export default async function IstatistiklerPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: denemeler, error } = await supabase
    .from('denemeler')
    .select('deneme_adi, deneme_tarihi, toplam_net')
    .eq('user_id', user.id)
    .order('deneme_tarihi', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Performans İstatistikleri</h1>
        
        {(!denemeler || denemeler.length === 0) ? (
          <p className="text-center text-gray-600">Henüz görüntülenecek bir deneme verisi yok. Lütfen önce birkaç deneme ekleyin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deneme Adı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Net</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {denemeler.map((deneme, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deneme.deneme_adi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(deneme.deneme_tarihi).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-bold">{deneme.toplam_net.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
