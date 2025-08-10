'use server';

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addDeneme(formData: FormData) {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const denemeAdi = formData.get('deneme_adi') as string;
    const denemeTarihi = formData.get('deneme_tarihi') as string;

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

    let toplamNet = 0;
    const dersSonuclari = [];

    for (const ders of dersler) {
        const dogru = parseInt(formData.get(`${ders.name}_dogru`) as string || '0');
        const yanlis = parseInt(formData.get(`${ders.name}_yanlis`) as string || '0');
        const bos = ders.max - (dogru + yanlis);
        const net = dogru - (yanlis / 4);
        toplamNet += net;

        dersSonuclari.push({
            ders_adi: ders.label,
            dogru_sayisi: dogru,
            yanlis_sayisi: yanlis,
            bos_sayisi: bos,
            net: net,
            user_id: user.id,
        });
    }

    // 1. Ana deneme kaydını oluştur
    const { data: denemeData, error: denemeError } = await supabase
        .from('denemeler')
        .insert({
            deneme_adi: denemeAdi,
            deneme_tarihi: denemeTarihi,
            deneme_turu: 'TYT',
            toplam_net: toplamNet,
            user_id: user.id,
        })
        .select()
        .single();

    if (denemeError) {
    console.error('Deneme eklenirken hata:', denemeError);
    return;
}


    // 2. Ders sonuçlarına deneme_id'yi ekle ve kaydet
    const dersKayitlari = dersSonuclari.map(sonuc => ({ ...sonuc, deneme_id: denemeData.id }));
    
    const { error: dersError } = await supabase
        .from('ders_sonuclari')
        .insert(dersKayitlari);

    if (dersError) {
    console.error('Ders sonuçları eklenirken hata:', dersError);
    // İsteğe bağlı: Burada ana deneme kaydını silerek işlemi geri alabilirsiniz.
    return;
}


    revalidatePath('/'); // Ana sayfadaki deneme listesini yenile
    redirect('/'); // Kullanıcıyı ana sayfaya yönlendir
}
