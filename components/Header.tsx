'use client'

import Link from 'next/link';
import {  signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import NavLink from '@/components/NavLink';

interface TabProps {
    link: string;
    title: string;
}

function Tab({ link, title}: TabProps) {

    
    return (
        <li>
            <NavLink href={link}>{title}</NavLink>
        </li> 
    )
}



export default function Header() {
  const { status, data } = useSession();
  const router = useRouter();

  const isAuth = status === "authenticated";

  return (
    
    <header id="menu-header">
    <div className='flex justify-between'>
      <menu id="tabs" >
        <Tab link="/" title="Home" />
        <Tab link="/acoustic/materials" title="Materials" />
        <Tab link="/acoustic/results" title="Results" />
        <Tab link="/resume" title="Alex's Resume" />
        <li>
            <Link href="https://github.com/apcave/acoustic"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub</Link>
        </li>
    </menu>
      </div>
      {isAuth && <p>Hello {data.user.name}</p>}
      {isAuth && <button 
        className='pr-4'
        onClick={() => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        });
        }}
        >Log Out</button>}
      {!isAuth && <button 
        className='pr-4'
        onClick={() => {
            router.push("/login");
        }}
        >Log In</button>}        
      
    </header>
  );
}