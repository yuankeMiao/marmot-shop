

function CardLoader() {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64">
      <div className="w-full aspect-square bg-gray-300 rounded-md animate-pulse"></div>
      <span className="mt-4 h-12 font-bold placeholder"></span>
      <p className="py-4 *:pr-4">
        <span className="text-lg font-semibold line-through placeholder"></span>
        <span className="text-xl font-bold text-red-700 placeholder"></span>
      </p>

      <div className="placeholder"></div>
    </div>
  );
}

export default CardLoader;
