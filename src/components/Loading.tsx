

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';


const Loading = () => {
    useEffect(()=>{
         document.body.style.overflow='hidden'
         return ()=>{
             document.body.style.overflowY = "scroll";
         }
    })
  return (
    <div className="fixed w-full h-full bg-black opacity-50 flex items-center">
      <div  style={{position:"relative",left:"35%"}}>
        <FontAwesomeIcon className='animate-spin text-5xl text-slate-200' icon={faSpinner} />
      </div>
    </div>
  );
}

export default Loading