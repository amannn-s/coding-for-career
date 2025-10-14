import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-black py-6 text-white">
      <div className="flex h-full items-center justify-center px-7">
        <ul className="flex gap-4">
          <li>
            <Link href="#">Blog</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Help</Link>
          </li>
          <li>
            <Link href="#">Terms</Link>
          </li>
          <li>
            <Link href="#">Privacy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
