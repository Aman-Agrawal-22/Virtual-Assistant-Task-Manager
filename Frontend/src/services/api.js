import axios from "axios";

const API_BASE_URL = "https://voice-assistant-backend-yswu.onrender.com/"; 

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const extractTodos = async (paragraph) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/extract-todos`, { paragraph });
    return response.data;
  } catch (error) {
    console.error("Error extracting todos:", error);
    return null;
  }
};

export const deleteAllTodos = async () => {
  try {
    await axios.delete(`${API_BASE_URL}/delete-todos`);
    console.log("All todos deleted successfully");
  } catch (error) {
    console.error("Error deleting all todos:", error);
  }
};

export const deleteTodo = async (summaryId, taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${summaryId}/tasks/${taskId}`);
    console.log(`Task ${taskId} deleted successfully:`, response.data);
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error.response?.data || error.message);
  }
};
