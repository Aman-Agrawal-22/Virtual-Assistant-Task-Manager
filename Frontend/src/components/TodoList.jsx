import { useEffect, useState } from "react";
import { fetchTodos, deleteAllTodos, deleteTodo } from "../services/api";
import { Loader2, Trash, CheckCircle} from "lucide-react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [error, setError] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos. Please try again.");
    }
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    if (deleting) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteAllTodos();
      setTodos([]);
    } catch (err) {
      setError("Error deleting todos. Please try again.");
    }
    setDeleting(false);
  };

  const handleTaskCompletion = async (summaryId, taskId) => {
    if (deletingTaskId) return;
    setDeletingTaskId(taskId);
    setError(null);

    try {
      await deleteTodo(summaryId, taskId);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === summaryId
            ? { ...todo, tasks: todo.tasks.filter((task) => task._id !== taskId) }
            : todo
        )
      );

      setSelectedTodo((prevSelected) => {
        if (!prevSelected) return null;
        const updatedTasks = prevSelected.tasks.filter((task) => task._id !== taskId);
        return updatedTasks.length === 0 ? null : { ...prevSelected, tasks: updatedTasks };
      });
    } catch (err) {
      setError("Error completing task. Please try again.");
    }
    setDeletingTaskId(null);
  };

  return (
    <div className="mt-4 p-4 bg-light shadow rounded w-100 mx-auto border">
      <h2 className="fs-4 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
      📅 Meeting Details
      </h2>

      {error && <p className="text-danger">{error}</p>}

      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-secondary">No meeting details available.</p>
      ) : (
        <div className="d-grid gap-2">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="p-3 bg-dark text-light rounded shadow-sm cursor-pointer"
              onClick={() => setSelectedTodo(todo)}
              style={{ transition: "background 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#212529")}
            >
              <p className="fw-semibold">{todo.summary}</p>
              <p className="text-secondary small">🗓 {new Date(todo.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleDeleteAll}
        className={`mt-3 w-100 btn d-flex align-items-center justify-content-center gap-2 text-light ${
          deleting ? "btn-secondary disabled" : "btn-danger"
        }`}
        disabled={deleting}
      >
        {deleting ? <Loader2 className="spinner-border spinner-border-sm" /> : <Trash />}
        {deleting ? "Deleting..." : "Delete All Summaries"}
      </button>

      {/* Popup Modal for Details */}
      {selectedTodo && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Meeting Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedTodo(null)}></button>
              </div>
              <div className="modal-body">
                <p>{selectedTodo.summary}</p>
                <p className="text-muted small">
                  🕒 Created: {new Date(selectedTodo.createdAt).toLocaleString()}
                </p>

                <h6 className="fw-semibold">Tasks:</h6>
                <ul className="list-group">
                  {selectedTodo.tasks.length === 0 ? (
                    <li className="list-group-item text-success">✅ All tasks completed!</li>
                  ) : (
                    selectedTodo.tasks.map((task) => (
                      <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          📌 {task.task} –{" "}
                          <span className="text-muted">
                            {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </span>
                        <button
                          className={`btn btn-sm d-flex align-items-center gap-1 ${
                            deletingTaskId === task._id ? "btn-secondary disabled" : "btn-success"
                          }`}
                          onClick={() => handleTaskCompletion(selectedTodo._id, task._id)}
                          disabled={deletingTaskId === task._id}
                        >
                          {deletingTaskId === task._id ? (
                            <Loader2 className="spinner-border spinner-border-sm" />
                          ) : (
                            <CheckCircle />
                          )}
                          {deletingTaskId === task._id ? "Processing..." : "Done"}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
