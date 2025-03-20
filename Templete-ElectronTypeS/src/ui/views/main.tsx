import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./../index.css";
import App from "./Menu";
import imageAd from "./../assets/Ad.png";
import imageTransition from "./../assets/test.png";
import "../tailwind.css";


function Main() {
  const [showApp, setShowApp] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleClick = () => {
    setShowTransition(true);
    setTimeout(() => {
      setShowApp(true);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {!showApp ? (
        <img
          src={showTransition ? imageTransition : imageAd}
          alt="Ad"
          className="w-screen h-screen object-cover transition-opacity duration-1000 ease-in-out"
          onClick={handleClick}
        />
      ) : (
        <App />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
