import React from 'react';

const HeaderDesktop: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2"></div>

      <div className="relative w-1/2 flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-100 focus:border-gray-300 focus:outline-none"
        >
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
        </button>
        {!open && (
          <button className="h-full w-full fixed inset-0 cursor-default"></button>
        )}
        {open && (
          <div className="absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16">
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white hover:bg-new-gray"
            >
              <i className="fas fa-user mr-3"></i>
              Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white hover:bg-new-gray"
            >
              <i className="fas fa-cogs mr-3"></i>Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white hover:bg-new-gray"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderDesktop;
