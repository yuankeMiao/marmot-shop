import MarmoteAnime from "../MarmoteAnime";

const AnimeLoader = ({ message }: { message: string }) => {
  return (
    <div className="p-12 flex flex-col md:flex-row h-screen justify-center items-center md:gap-4">
      <div className="flex-1">
        <MarmoteAnime />
      </div>
      <div className="h-full flex-1 flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-semibold">{message}</h1>
      </div>
    </div>
  );
};

export default AnimeLoader;
