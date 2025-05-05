import { FaHeart, FaRegComment, FaRegHeart, FaRetweet, FaShare } from "react-icons/fa"
import { FaShareNodes } from "react-icons/fa6"
import { doc,updateDoc,arrayRemove,arrayUnion } from "firebase/firestore"
import { auth, db} from "../../firebase";


const Buttons = ({tweet}) => {
  
  const isLike = tweet.likes.includes(auth.currentUser.uid)
  const toogleLike =async ()=>{
    const docRef=doc(db,"tweets", tweet.id);

   await updateDoc(docRef,{
      likes: isLike? arrayRemove(auth.currentUser.uid): arrayUnion(auth.currentUser.uid),
    });




  };
  return (
    <div className="flex justify-between items-center text-zinc-500">
      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20">
        <FaRegComment />
      </button>

      <button className="post-icon hover:text-green-400 hover:bg-green-300/20">
        <FaRetweet />
      </button>

      <button onClick={toogleLike}  className="flex items-center hover:text-pink-500 relative">
        <span className="post-icon hover:bg-pink-400/20">
        {isLike? <FaHeart className="text-pink-500" />: <FaRegHeart/>}
        </span>
        <span className={`absolute -end-3 ${isLike && "text-pink-500"}`}>{tweet.likes.length}</span>
      </button>

      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20">
        <FaShareNodes />
      </button>
    </div>
  )
}

export default Buttons