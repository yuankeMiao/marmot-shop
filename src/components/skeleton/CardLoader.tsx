import React from "react";
import ContentLoader from "react-content-loader";

function CardLoader() {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={420}
      viewBox="0 0 300 420"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="300" height="300" />
      <rect x="0" y="310" rx="0" ry="0" width="160" height="20" />
      <rect x="4" y="340" rx="0" ry="0" width="130" height="20" />
      <rect x="100" y="370" rx="10" ry="10" width="100" height="30" />
    </ContentLoader>
  );
}

export default CardLoader;
