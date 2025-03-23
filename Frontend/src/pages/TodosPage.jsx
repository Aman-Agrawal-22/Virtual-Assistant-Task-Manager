import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "../services/api";
import AnimatedButton from "../components/AnimatedButton";
import { motion } from "framer-motion";

export default function TodosPage() {
  const [todosList, setTodosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    async function loadTodos() {
      const todos = await fetchTodos();
      setTodosList(todos);
      setLoading(false);
    }
    loadTodos();
  }, []);

  const markTaskAsDone = async (summaryId, taskId) => {
    setDeletingTaskId(taskId);
    try {
      await deleteTodo(summaryId, taskId);
      setTodosList((prevTodos) =>
        prevTodos
          .map((todo) =>
            todo._id === summaryId
              ? { ...todo, tasks: todo.tasks.filter((task) => task._id !== taskId) }
              : todo
          )
          .filter((todo) => todo.tasks.length > 0)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setDeletingTaskId(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (todosList.length === 0) {
    return <p className="text-center mt-4 text-danger fw-medium">No todos available</p>;
  }

  return (
    <div className="container py-5">
      {todosList.map((todo) => (
        <motion.div
          key={todo._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-lg rounded-3 p-4 mb-4 transition-all hover-shadow"
        >
          {/* Summary */}
          <h2 className="fs-4 fw-bold text-primary mb-2 d-flex align-items-center">📌 Meeting Summary</h2>
          <p className="text-secondary">{todo.summary}</p>

          {/* Task List */}
          <h2 className="fs-5 fw-bold text-info mt-3">📝 Tasks</h2>
          <ul className="list-unstyled">
            {todo.tasks.map((task) => (
              <motion.li
                key={task._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="d-flex justify-content-between align-items-center p-3 border rounded shadow-sm bg-light transition-all"
              >
                <div>
                  <p className="fw-semibold text-dark">{task.task}</p>
                  <p className="text-muted small">📅 Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                </div>

                {/* Done Button (Delete Task) */}
                <AnimatedButton
                  onClick={() => markTaskAsDone(todo._id, task._id)}
                  isLoading={deletingTaskId === task._id}
                  label="Done"
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
