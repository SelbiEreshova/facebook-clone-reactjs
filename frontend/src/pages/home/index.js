import Header from "../../components/headers";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import  './style.css'
import SendVerification from "../../components/sendVerification";
export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories/>
        {user.verified === false && <SendVerification user={user} />}
          <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
    </div>
  );
}
