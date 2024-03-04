import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <div className="bg-primary w-full px-4 py-8 md:px-12">
      <div className="max-w-screen-2xl mx-auto ">
      <div>
        <div>
          <Link to="/">
            <span className="text-3xl font-bold">LOGO</span>
          </Link>
          <p className="text-lg">
            Finland{" "}
            <a href="http://www.google.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLocationDot} />
            </a>
          </p>
        </div>
      </div>

      <div className="flex justify-between py-8">
        <form>
          <p>Subscribe our newsletter</p>
          <div className="h-10 my-4 flex items-center rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Type your email address here"
              className="px-4 h-full w-56 text-sm text-black"
            />
            <button className="inline bg-sky-500 w-8 h-full">
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          </div>
        </form>
        <div>
          <ul className="my-4 flex text-4xl gap-4">
            <li>
              <a
                href="http://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="http://www.youtube.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <li>
              <a
                href="http://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="http://www.twitter.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-8 mt-8 border-t border-sky-950 dark:border-gray-100">
        <p>This website is a demo of Yuanke's frontend project for Integrify's Fullstack Program</p>
        <p>Check the repository of this project on <a href="not public yet" className="font-bold underline">Github</a></p>
      </div>
      </div>
    </div>
  );
}

export default Footer;
