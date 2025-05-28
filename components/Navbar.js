
"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();


  const handleBlur = () => {
    setTimeout(() => {
      if (
        !buttonRef.current.contains(document.activeElement) &&
        !dropdownRef.current.contains(document.activeElement)
      ) {
        setShowdropdown(false);
      }
    }, 100);
  };


  const handleLinkClick = () => {
    setShowdropdown(false);
  };


  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Trigger signOut with explicit redirect
    router.replace('/'); // Force router to redirect to homepage
  };


  return (
    <nav className='bg-gray-900 text-white flex justify-between px-4 md:h-16 items-center flex-col md:flex-row w-10xl'>
      <Link className='logo font-bold text-lg flex justify-center items-center' href={'/'}>
        <img width={50} className='invertImg md:my-0 my-3' src="tea.gif" alt="" />
        <span className='md:my-0 my-3 text-xl'>GetMeaChai!</span>
      </Link>


      <div className='relative flex flex-col md:block gap-4'>
        {session && (
          <>
            <button
              ref={buttonRef}
              onClick={() => setShowdropdown(!showdropdown)}
              onBlur={handleBlur}
              id="dropdownDefaultButton"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>


            <div
              id="dropdown"
              ref={dropdownRef}
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Your Page
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}


        {session && (
          <button
            className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 md:ml-2'
            onClick={handleSignOut}
          >
            Logout
          </button>
        )}


        {!session && (
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
