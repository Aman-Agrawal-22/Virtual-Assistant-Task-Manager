import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { clsx } from "clsx";

export default function AnimatedButton({ onClick, isLoading, label }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!isLoading) {
      setClicked(true);
      onClick();
      setTimeout(() => setClicked(false), 600); 
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={clsx(
        "btn d-flex align-items-center gap-2 position-relative overflow-hidden shadow",
        isLoading ? "btn-secondary disabled" : "btn-success"
      )}
      style={{
        transition: "all 0.3s ease-in-out",
      }}
    >
      <span
        className={clsx(
          "position-absolute w-100 h-100 bg-success",
          clicked ? "opacity-25" : "opacity-0"
        )}
        style={{
          transition: "all 0.5s ease-out",
          transform: clicked ? "scale(1)" : "scale(0)",
        }}
      />

      {isLoading ? (
        <Loader2 className="spinner-border spinner-border-sm text-white" />
      ) : (
        <CheckCircle size={18} className="text-white" />
      )}
      {label}
    </button>
  );
}
