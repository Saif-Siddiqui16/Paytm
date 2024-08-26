"use client"
import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
  return (
    <div className='bg-blue-500 w-full flex justify-center px-2 py-2 border rounded-xl text-white hover:bg-blue-400'>
      <button className='w-full' onClick={()=>signOut()}>Logout</button>
    </div>
  );
}

export default Logout;
