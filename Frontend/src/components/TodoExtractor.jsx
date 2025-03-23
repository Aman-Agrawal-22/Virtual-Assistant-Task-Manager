import { useState } from "react";
import { extractTodos } from "../services/api";
import { Loader2, Mic, ClipboardList } from "lucide-react";

const TodoExtractor = ({ onExtract }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  let recognition;

  const handleExtract = async () => {
    if (!text.trim() || text === "Listening...") return;
    setLoading(true);
    setError("");

    try {
      const result = await extractTodos(text);
      onExtract(result.todos, result.summary);
    } catch (err) {
      setError("Failed to extract todos.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    setError("");
    setIsListening(true);
    setText("Listening..."); 

    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false; 
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; 
      setText(transcript);
    };

    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
      setIsListening(false);
      setText(""); 
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-3 border border-light w-100 mx-auto position-relative overflow-hidden" style={{ maxWidth: "600px" }}>
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style={{ opacity: 0.2, zIndex: 0 }}></div>

      <h2 className="fs-4 fw-bold text-dark mb-4 position-relative d-flex align-items-center gap-2">
        <ClipboardList className="me-2" /> Extract Todos
      </h2>

      <div className="position-relative w-100">
        <textarea
          className="form-control position-relative"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter meeting transcript..."
        />
        <button
          onClick={startListening}
          className={`position-absolute bottom-0 end-0 m-2 p-2 rounded-circle text-white border-0 shadow-lg ${isListening ? "bg-danger" : "bg-primary"}`}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={handleExtract}
        className="mt-3 w-100 d-flex align-items-center justify-content-center btn btn-primary fw-semibold shadow-sm position-relative"
        disabled={loading}
      >
        {loading ? <Loader2 className="spinner-border spinner-border-sm me-2" /> : "Extract Todos"}
      </button>

      {error && <p className="text-danger mt-2 small fw-medium position-relative">{error}</p>}
    </div>
  );
};

export default TodoExtractor;
