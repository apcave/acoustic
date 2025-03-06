import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";

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
  return (
    <header id="menu-header">
    <div className='flex justify-between'>
      <menu id="tabs" >
        <Tab link="/" title="Home" />      
        <Tab link="/resume" title="Alex's Resume" />
        <Tab link="/acoustic" title="Acoustic App" />
        <li>
            <Link href="https://github.com/apcave/acoustic"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub</Link>
        </li>
    </menu>
    <menu id="app-links" >
        <li>
            <Link href="/acoustic/materials">Materials</Link>
        </li>
        <li>
            <Link href="/acoustic/materials">Layers </Link>
        </li>
      </menu>
      </div>
      <button className='pr-4'>Log In</button>
    </header>
  );
}