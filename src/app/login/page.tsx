'use client';
import { Aperture } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/Button';
import InputText from '@/components/InputText';

import { login } from './actions';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function logIn() {
    if (email && password) {
      login(email, password);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-1/2 flex-col items-center justify-center rounded-xl border-1 border-gray-700 bg-gray-800 py-4">
        <header className="mb-3">
          <h3 className="text-2xl">Welcome to Lisiére</h3>
        </header>
        <form className="flex w-full flex-col items-center">
          <InputText
            id="email"
            label="Email"
            inputType="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
            }}
          />
          <InputText
            id="password"
            label="Password"
            inputType="password"
            value={password}
            onChange={(value) => {
              setPassword(value);
            }}
          />
          <Link href={'/signup'}>
            <p className="mt-4 underline">Or create an account</p>
          </Link>
          <div className="mt-5 mb-2 flex w-full flex-row justify-center">
            <Button title={'Login'} onClick={logIn}>
              <Aperture size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
