import Link from 'next/link'

import Smile from './Smile'
import MenuNav from './MenuNav'

export default function StickyMenu() {
  return (
    <div className="sticky-menu">
      <Smile />
      <div className="sticky-part">
        <Link href="/"><h1>A Pinch of 한미</h1></Link>
        <MenuNav />
      </div>
    </div>

  );
}
