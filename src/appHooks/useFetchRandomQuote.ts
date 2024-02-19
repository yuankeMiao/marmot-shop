import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchRandomQuote() {
  type Quote = {
    quote: {
      quote: string;
      author: string;
    };
    isloading: boolean;
    error: string | null;
  };
  const [quote, setQuote] = useState<Quote>({
    quote: {
      quote: "",
      author: "",
    },
    isloading: true,
    error: null,
  });

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then((res) => {
        setQuote({
          quote: {
            quote: res.data.content,
            author: res.data.author,
          },
          isloading: false,
          error: null,
        });
      })
      .catch((error) => {
        setQuote((prev) => ({
          ...prev,
          error: error.message,
        }));
      });
  }, []);

  return { quote:quote.quote, isLoading: quote.isloading, error:quote.error};
}
