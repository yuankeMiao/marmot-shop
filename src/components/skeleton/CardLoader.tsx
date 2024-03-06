

function CardLoader() {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64 w-full">
      <div className="w-full aspect-square bg-gray-300 rounded-md animate-pulse"></div>
      <span className="mt-4 h-12 placeholder"></span>
      <div className="py-4 *:pr-4 flex gap-8">
        <div className="placeholder inline"></div>
        <div className="placeholder inline"></div>
      </div>

      <div className="placeholder"></div>
    </div>
  );
}

export default CardLoader;
