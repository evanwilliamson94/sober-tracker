import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-200">
              Stay Sober Tracker
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {['tracker', 'affirmation', 'blog', 'community'].map((item) => (
              <Link key={item} href={`/${item}`} className="text-gray-200 hover:text-gold-500 transition-colors relative group">
                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                <span className="block w-full h-1 bg-gold-500 absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </div>
          {/* Mobile burger menu */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-gold-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {!isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16M4 12h16m-7 7h7"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['tracker', 'affirmation', 'blog', 'community'].map((item) => (
              <Link key={item} href={`/${item}`} className="text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:text-gold-500">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
