import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email === "") return;
    setOpenModal(true);
  };
  return (
    <div className="bg-primary w-full px-4 py-8 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
          <div>
            <Link to="/" aria-label="go to home page">
              <span className="text-3xl font-bold">MARMOT SHOP</span>
            </Link>
            <p className="text-lg">
              Finland{" "}
              <a
                aria-label="go to google map"
                href="http://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLocationDot} />
              </a>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between py-8">
            <form onSubmit={handleSubscribe}>
              <p>Subscribe our newsletter</p>
              <div className="h-10 my-4 flex items-center rounded-md overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email address here"
                  className="px-4 h-full w-56 text-sm text-black outline-none border-none"
                />
                <button
                type="submit"
                  className="inline bg-sky-500 w-8 h-full outline-none border-none"
                  aria-label="submit email"
                >
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
                    aria-label="go to facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="go to youtube"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="go to instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="go to twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
              </ul>
            </div>
          </div>


        <div className="text-center pt-8 mt-8 border-t border-sky-950 dark:border-gray-100">
          <p>
            This website is a demo of Yuanke's frontend project for Integrify's
            Fullstack Program
          </p>
          <p>
            Check the repository of this project on{" "}
            <a
              href="https://github.com/yuankeMiao/marmot-shop"
              target="_blank"
              rel="noreferrer"
              className="font-bold underline"
            >
              Github
            </a>
          </p>
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thank you for subscribing</Modal.Header>
        <Modal.Body>
          <p className="text-sm dark:text-gray-100">{`We received your email (actualy not): ${email}, You will receive our newsletter soon`}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Footer;
