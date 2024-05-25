
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBP_Ha0A9lTrUl0_efWgjg36lPjkLuFCxc",
  authDomain: "traditional-images.firebaseapp.com",
  projectId: "traditional-images",
  storageBucket: "traditional-images.appspot.com",
  messagingSenderId: "323125157464",
  appId: "1:323125157464:web:6b5b8dab18c6c0ef95742d",
  measurementId: "G-W0112FHV3L",
};


const app = initializeApp(firebaseConfig);
 
export const storage= getStorage(app)
 import { toast } from "react-toastify"; 
export async function uploadImageFirebase(imageObj?:any|undefined,source?:string)
{
 
   const imageRef = ref(storage, `${source}/${imageObj.image.name}`);
   return await uploadBytes(imageRef, imageObj.getImage()).then((snapshot) => {
     return getDownloadURL(snapshot.ref)
       .then((res) => {
          return res;
       })
       .catch(() => 
        toast.error("upload image")
      );
   });
}