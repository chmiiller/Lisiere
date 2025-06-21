'use client';
import { Aperture } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/Button';
import InputText from '@/components/InputText';

import { signup, verify } from './actions';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  async function signUp() {
    if (email) {
      signup(email);
    }
  }

  async function verifyCode() {
    if (email && code) {
      verify(email, code);
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
          <div className="mt-5 mb-2 flex w-full flex-row justify-center">
            <Button title={'Signup'} onClick={signUp}>
              <Aperture size={18} />
            </Button>
          </div>
        </form>
        <form className="flex w-full flex-col items-center">
          <InputText
            id="Code"
            label="Code"
            inputType="Code"
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
          />
          <div className="mt-5 mb-2 flex w-full flex-row justify-center">
            <Button title={'with code'} onClick={verifyCode}>
              <Aperture size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
