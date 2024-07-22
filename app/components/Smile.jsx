import Link from 'next/link'

import Eyes from './Eyes'
import Mouth from './Mouth'

export default function Smile() {
  return (
    <div className="travelling-smile">
      <Link href="/">
        <Eyes />
        <Mouth />
      </Link>
    </div>
  );
}
