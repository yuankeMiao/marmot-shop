import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrolltoTopButton() {
  const [isHidden, setIsHidden] = useState(true);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (document.documentElement.scrollTop > 20) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    };

    window.addEventListener("scroll", () => {
      toggleVisibility();
    });

    return () =>
      window.removeEventListener("scroll", () => {
        toggleVisibility();
      });
  }, []);

  return (
    <button
      className={`${
        isHidden && "hidden"
      } w-12 h-12 rounded-full bg-gray-200 shadow-xl hover:bg-gray-300 transition duration-250 ease-in-out fixed bottom-16 right-16 z-50`}
      aria-label="scroll to top"
      onClick={handleScroll}
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
    </button>
  );
}

export default ScrolltoTopButton;
