'use server';

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const hedef_net = parseFloat(formData.get('hedef_net') as string);
    const sinif = parseInt(formData.get('sinif') as string);
    const alan = formData.get('alan') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            hedef_net: isNaN(hedef_net) ? null : hedef_net,
            sinif: isNaN(sinif) ? null : sinif,
            alan: alan || null,
        })
        .eq('id', user.id);

    if (error) {
    console.error("Profil güncellenirken hata:", error);
    // Hata durumunda işlemi durdur, bir şey döndürme
    return; 
}


    revalidatePath('/profil');
    revalidatePath('/'); // Hedef bileşenini de yenilemek için
    redirect('/profil');
}
