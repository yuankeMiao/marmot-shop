import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";

import marmot from "../statics/marmot-1.png"

// this small animation is copied from my portfolio home page :)

function MarmoteAnime() {
  return (
        <div className="w-96 h-96 relative rounded-full border-[10px] border-sky-500 bg-sky-800 shadow-inner flex overflow-hidden">
          <img id="marmot" src={marmot} alt="marmot" className="w-full h-full animate-bounce z-10" />
          <span className="absolute text-gray-100 translate-y-[-200%] text-6xl left-8 animate-animateCloud">
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span className="absolute text-gray-100 translate-y-[-200%] text-4xl left-20 animate-animateCloud delay-1000">
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span className="absolute text-gray-100 translate-y-[-200%] text-7xl right-8 animate-animateCloud delay-500">
            <FontAwesomeIcon icon={faCloudMoon} />
          </span>
        </div>
  )
}

export default MarmoteAnime