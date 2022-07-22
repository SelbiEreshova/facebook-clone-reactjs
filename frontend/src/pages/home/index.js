import Header from "../../components/headers";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import  './style.css'
export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories/>
      </div>
      <RightHome user={user}/>
    </div>
  );
}
