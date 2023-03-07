import React, { useState } from 'react'
import { Bot, ThemeMode } from '@ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
// aww.default
export const Navbar = () => {

  const [ mode, setMode ] = useState<'light' | 'dark'>('dark');
  const router = useRouter(); 
  const session = useSession();

  return (
    <nav className='p-5 rounded-b-md shadow-md flex justify-around items-center gap-4 mb-20'>
      {/* eslint-disable */}
      <div 
        className='flex flex-col items-center cursor-pointer' 
        onClick={() => router.push('/')}
      >
        <Bot />
        <h1 className='font-mono'>Icon-AI</h1>
      </div>

      <div className='flex gap-5'>
        <Link href="/generate">Generate</Link>
        <Link href='/collection'>Collection</Link>
      </div>

      <div className='flex gap-20'>
        <div className='flex items-center gap-4'>
          <p>0 credits</p>
          <button
            className={clsx(
              "bg-blue-500 text-white rounded-md px-4 py-2",
              { "hidden": session.status !== "authenticated" }
            )}
          >Buy credits</button>
          <button
            className={clsx(
              "bg-blue-500 text-white rounded-md px-4 py-2",
              { "hidden": session.status === "authenticated" }
            )}
            onClick={() => signIn()}
          >Sign in</button>
          <button
            className={clsx(
              "bg-blue-500 text-white rounded-md px-4 py-2",
              {
                "hidden": session.status !== "authenticated"
              }
            )}
            onClick={() => signOut()}
          >Sign out</button>
        </div>

        <div>
          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            <ThemeMode mode={mode} />
          </button>
        </div>
      </div>

    </nav>
  )
}
