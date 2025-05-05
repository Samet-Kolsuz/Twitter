import UserAvatar from './user-avatar';
import TextArea from './text-area';
import FormActions from './form-actions';
import { useRef, useState } from 'react';
import ImagePreview from './image-prewiev';
import { toast } from 'react-toastify';
import uploadToStorage from '../../firebase/uploadToStorage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase";


const Form = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [image, setImage]= useState(null);
    const onImageChange = (e)=> {
        if (e.target.files && e.target.files[0]){
         setImage(URL.createObjectURL(e.target.files[0]))
        }
    }
const clearImage = ()=>{
    setImage(null);
    if(fileInputRef.current){
        fileInputRef.current.value = "";
    }
}
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const text = e.target.text.value;
        const file = e.target.image.files[0];
        if(!text && !file) return toast.warning("Lutfen bir metin veya resim yukleyin");
        try{
            setIsLoading(true);
            //resim yukle varsa
           const url = await uploadToStorage(file);

            // koleksiyonunun referansini al
            const collectionRef = collection(db, "tweets");


            // yeni tweet belgesini kolleksiyona kaydet
            addDoc(collectionRef,{
                context:{text,image: url},
                isEdited:false,
                likes:[],
                createdAt: serverTimestamp(),
                user:{
                    id:user.uid,
                    name:user.displayName,
                    photo:user.photoURL,
                }
            })

            //formu sifirla
            e.target.reset();
            clearImage();
            toast.success("Tweet Basariyla Yuklendi");

        } catch(error){
            toast.error("Hata Tweet Yuklenemedi");

        }
        setIsLoading(false);
        console.log(user)

    };
    return (
        <div className='border-b border-tw-gray p-4 flex -gap-3'>
            <UserAvatar photo={user.photoURL} name={user.displayName}/>
            <form onSubmit={handleSubmit} className='w-full pt-1'>
                <TextArea />
                <ImagePreview image={image} clearImage={clearImage}/>
                <FormActions onImageChange={onImageChange} fileInputRef={fileInputRef} isLoading={isLoading}/>
            </form>
        </div>
    )
}

export default Form