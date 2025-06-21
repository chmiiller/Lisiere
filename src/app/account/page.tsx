'use client';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { createClient } from '@/utils/supabase/client';

import { logout } from './actions';

export default function Account() {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>('');
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }
    if (data.user.email) {
      setUserEmail(data.user.email);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-1/2 flex-col items-center justify-center rounded-xl border-1 border-gray-700 bg-gray-800 py-4">
        <header className="mb-3">
          <h3 className="text-2xl">Welcome to Lisiére</h3>
        </header>
        <form className="flex w-full flex-col items-center">
          <label className="mt-2 mb-1 ml-1 text-base font-bold text-slate-200">
            {userEmail}
          </label>
          <div className="mt-5 mb-2 flex w-full flex-row justify-center">
            <Button title="Logout" onClick={logout}>
              <LogOut />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
