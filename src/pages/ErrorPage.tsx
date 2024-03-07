// handle the errors
import React from "react";
import { Link } from "react-router-dom";
import MarmoteAnime from "../components/MarmoteAnime";

function ErrorPage({errorMsg}: {errorMsg?: string}) {
  return (
    <div className="p-12 flex flex-col md:flex-row h-screen justify-center items-center md:gap-4">
      <div className="flex-1">
        <MarmoteAnime />
      </div>
      <div className="h-full flex-1 flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-semibold">{errorMsg ? errorMsg :  "Hi, seems like you are lost!"}</h1>
        <Link to="/" className="btn-primary max-w-min">
          Home page
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
