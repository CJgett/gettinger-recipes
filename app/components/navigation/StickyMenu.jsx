import Link from 'next/link'

import Smile from '../decorations/Smile'
import MenuNav from './MenuNav'

export default function StickyMenu() {
  return (
    <div className="sticky-menu">
      <Smile />
      <div className="sticky-part">
        <Link href="/"><h1>Gettinger Recipes</h1></Link>
        <MenuNav />
      </div>
    </div>
  );
}
