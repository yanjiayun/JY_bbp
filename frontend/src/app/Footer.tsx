import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Footer: React.FC = () => {
  return (
    <footer className="lg:px-12 fixed bottom-0 left-0 w-full h-36 lg:h-16 bg-aqua text-white justify-between">
      <section className='max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 relative px-10 lg:px-0 my-0 lg:my-4 h-8'>
        
        <div className='text-center my-4 lg:text-start lg:mx-0 lg:my-0 col-span-1 mx-auto lg:m-16 order-3 lg:order-1 w-full'>©2024 All Rights Reserved</div>
        
        <div className='mx-auto mt-4 lg:mt-0 col-span-1 grid grid-cols-3 gap-4 ms-auto order-1 lg:order-2'>
          <GitHubIcon />
          <LinkedInIcon />
          <MailOutlineIcon />
        </div>

        <div className='mt-4 lg:mt-0 col-span-1 mx-auto lg:mr-16 order-2 lg:order-3 w-full'>
          <div className='grid grid-cols-5 gap-2'>
            <p className='mx-auto hover:text-green'>
              Team
            </p>
            <p className='mx-auto hover:text-green'>
              Services
            </p>
            <p className='mx-auto hover:text-green'>
              News
            </p>
            <p className='mx-auto hover:text-green'>
              Careers
            </p>
            <p className='mx-auto hover:text-green'>
              Contact
            </p>
          </div>
        </div>

      </section>
    </footer>
  );
};

export default Footer;