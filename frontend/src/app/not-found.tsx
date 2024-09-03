import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center h-3/4 text-black mx-auto my-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold"><ErrorOutlineIcon /> 404: Page Not Found</h1>
        <Link href="/">
          <button className="mt-4 bg-orange rounded text-white text-lg px-4 py-2">
            Back to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;