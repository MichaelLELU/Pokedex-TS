import "./ToggleBtn.css";

interface ToggleBtnProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  leftLabel: string;
  rightLabel: string;
}

export default function ToggleBtn({
  toggle,
  setToggle,
  leftLabel,
  rightLabel,
}: ToggleBtnProps) {
  const toggleValue = () => {
    setToggle(!toggle);
  };

  return (
    <button
      type="button"
      onClick={toggleValue}
      className={`toogle-btn ${toggle ? "toogled" : ""}`}
    >
      {toggle ? rightLabel : leftLabel}
      <div className="thumb"></div>
    </button>
  );
}