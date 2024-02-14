import SouvenirGame from "@/components/souvenir";
import ItemQueue from "@/components/souvenir/ItemQueue";
import Score from "@/components/souvenir/Score";
import { Timer } from "@/components/souvenir/Timer";

const GamePage = () => {
  return (
    <div className="flex h-screen justify-center items-center min-w-500px bg-[#FFF2CC]">
      <div className="flex relative flex-col items-center h-full">
        <ItemQueue />
        <Timer />
        <div className="flex-none">
          <Score />
        </div>
        <SouvenirGame />
      </div>
    </div>
  );
};

export default GamePage;
