import React from 'react';

const NotFound: React.FC<any> = () => {
  return (
    <section className="inset-0 mt-20 sm:mt-16 sm:ml-56 absolute font-sans antialiased">
      <div className="container-notfound">
        <div className="boo-wrapper">
          <div className="boo">
            <div className="face"></div>
          </div>
          <div className="shadow"></div>

          <h1 className="py-2 text-center text-gray-800 text-lg font-bold">
            Whoops!
          </h1>
          <p className="text-center text-sm text-red-800">
            We couldn't find the page you
            <br />
            were looking for.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
