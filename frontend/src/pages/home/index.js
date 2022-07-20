import Header from "../../components/headers";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
}
