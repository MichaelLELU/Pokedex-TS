import { FC, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import "./backToTopButton.css";

const BackToTopButton: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button className="back-to-top" onClick={scrollToTop}>
      <span className="bttb-text">BACK TO TOP</span>
      <span className="chevron">
        <ChevronUp size={16} />
      </span>
      <span className="chevron">
        <ChevronUp size={16} />
      </span>
      <span className="chevron">
        <ChevronUp size={16} />
      </span>
    </button>
  );
};

export default BackToTopButton;
