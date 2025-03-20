import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div>
      <Image
      src="/notfound/nf.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
} 