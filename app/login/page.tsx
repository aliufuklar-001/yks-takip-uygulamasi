import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

export default async function LoginPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Giriş Yap veya Kayıt Ol</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">E-posta</label>
            <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-medium text-gray-700 block">Şifre</label>
            <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <button formAction={login} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Giriş Yap
            </button>
            <button formAction={signup} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
