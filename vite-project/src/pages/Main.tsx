
import { Link } from 'react-router-dom';
import './home.css';

function Main() {
 
  return (
    <div className="header overflow-hidden a">
      <div className="w-full h-screen flex justify-center overflow-hidden">
        <div className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
          {/* Attach the ref to the mydiv element */}
         

          <Link to={'/Home'}>
            <button className="sm:text-8xl text-5xl font-bold text-blue-500 hover:text-blue-700 text-center py-0 px-0 w-fit h-fit z-[1000] ">
            <h1 className='m' >Sohely Khotha</h1>  
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
