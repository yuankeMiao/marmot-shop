import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";

import marmot from "../statics/marmot-1.png"

// this small animation is copied from my portfolio home page :)

function Loading() {
  return (
    <div>
        <h1>Just a moment</h1>
        <div
          className="left-container"
        >
          <img id="marmot" src={marmot} alt="marmot" />
          <span className="cloud cloud1">
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span className="cloud cloud2">
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span className="cloud cloud3">
            <FontAwesomeIcon icon={faCloudMoon} />
          </span>
        </div>
    </div>
  )
}

export default Loading