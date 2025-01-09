import Link from 'next/link'

import Eyes from './Eyes'
import Mouth from './Mouth'

export default function Smile() {
  return (
    <div className="travelling-smile" tabIndex="0">
      <Link href="/" title="to home">
        <Eyes />
        <Mouth />
      </Link>
    </div>
  );
}
