import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto h-[4.375rem] bg-black text-white">
      <div className="flex h-full items-center justify-center px-7">
        <ul className="flex gap-4">
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
