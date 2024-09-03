import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <nav className="pt-0 lg:pt-2 bg-white text-aqua px-12 h-[120px] lg:h-[98px] grid">
      <div className='max-w-screen-2xl my-auto mx-auto w-full'>
        <section className="hidden lg:block">
          <div className='flex'>
            <Image src="/Logo.png" width={60} height={60} alt="Logo" className='w-fit h-fit ' />
            <h1 className='text-2xl font-normal my-auto text-aqua ml-2'>Boston Bioprocess</h1>
            <h2 className='text-xl font-light mt-auto ms-auto text-aqua'>Fermentation Data Upload</h2>
          </div>
        </section>

        <section className="flex justify-center items-center lg:hidden">
          <Image src="/LogoAndName.png" width={100} height={100} alt="Logo" className='w-fit h-fit' />
        </section>

      </div>
    </nav>
  );
};

export default Header;