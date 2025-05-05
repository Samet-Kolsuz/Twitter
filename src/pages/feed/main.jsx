import Form from "../../components/feed-form";
import List from "./list";

const Main = ({ user }) => {
  return (
    <main className="border border-tw-gray  h-screen">
      <header className="border-b border-tw-gray p-4 font-bold sticky top-0 bg-black z-10">Anasayfa</header>

      <Form user={user} />

      <List />
    </main>
  );
};

export default Main;