import Link from 'next/link'

export default function MenuNav() {

  return(
    <nav>
      <ul>
        <li className="menu-item"><Link href="/recipes">Recipes</Link></li>
        <li className="menu-item"><Link href="/remixer">Remixer</Link></li>
        <li className="menu-item"><Link href="/about">About</Link></li>
      </ul>
    </nav>
  );
}
