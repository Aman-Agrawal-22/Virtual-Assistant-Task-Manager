import { useState } from "react";
import TodoExtractor from "../components/TodoExtractor";
import TodoList from "../components/TodoList";

const Home = () => {
  const [extractedTodos, setExtractedTodos] = useState([]);
  const [summary, setSummary] = useState("");

  const handleExtract = (todos, summaryText) => {
    setExtractedTodos(todos);
    setSummary(summaryText);
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center py-4 bg-primary bg-gradient">
      <div className="w-100 max-w-3xl bg-white bg-opacity-75 backdrop-blur-lg shadow-lg rounded-4 p-4 transition-all hover-shadow">
        <h1 className="text-center text-light fw-bold display-5 mb-4 animate-fadeIn">
        🗣️ Smart Voice Assistant
        </h1>
        <TodoExtractor onExtract={handleExtract} />
        <div className="mt-4">
          <TodoList extractedTodos={extractedTodos} summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default Home;
