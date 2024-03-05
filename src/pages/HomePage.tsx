
import ProductCard from "../components/produtcs/ProductCard";
import { HERO_IMAGE } from "../misc/constants";
import useFetchRandomQuote from "../appHooks/useFetchRandomQuote";
import { useGetAllProductsQuery } from "../redux/slices/apiQuery";
import CardLoader from "../components/skeleton/CardLoader";


function HomePage() {
  const {
    quote,
    isLoading: isLoadingQuote,
    error: errorQuote,
  } = useFetchRandomQuote();

  const { data, error, isLoading } = useGetAllProductsQuery(10);

  return (
    <div className="*:mb-12 last:pb-40" >
      <div className="relative w-full aspect-[3/2] md:aspect-[3/1]">
        <img
          className="w-full h-full object-cover"
          src={HERO_IMAGE}
          alt="Hero"
        />
        <blockquote className="absolute inset-0 md:w-1/2 h-full p-8 text-gray-100 flex flex-col justify-end md:justify-center gap-4">
          {isLoadingQuote && (
            <p className="text-7xl font-bold tracking-widest">...</p>
          )}
          {errorQuote && (
            <p className="text-7xl font-bold tracking-widest">
              Not quotes today, try refresh the page
            </p>
          )}
          <p className="text-2xl md:text-3xl lg:text-4xl font-thin">
            {quote.quote}
          </p>
          <footer className="lg:text-lg font-thin">{quote.author}</footer>
        </blockquote>
      </div>

      <div className="px-4 xl:px-0">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-2">
          Welcome to Marmot Shop
        </h2>
        <p className="lg:text-lg font-light">
          Explore our latest collections and find your perfect fit!
        </p>
        <div className="h-[32rem] py-4 flex gap-8 overflow-x-scroll *:min-w-[18rem]">
          {error && <p>Something went wrong</p>}
          {isLoading && (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          )}
          {data?.map((product) => (
            <ProductCard productItem={product} key={product.id} />
          ))}
        </div>
      </div>

      <div className="mt-40 px-4 xl:px-8 text-center">
        <h3 className="text-5xl lg:text-7xl font-bold my-8">Join our membership</h3>
        <p>Get 10% off your first order</p>
      </div>
    </div>
  );
}

export default HomePage;
