
import axiosInstance from './apiConfig';

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/task');
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  getTaskById: async (taskId) => {
    try {
      const response = await axiosInstance.get(`/task/${taskId}`);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/task', taskData);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      const response = await axiosInstance.put(`/task/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
    } catch (error) {
      handleErrors(error);
    }
  },
};

const handleErrors = (error) => {
  console.error('API error occurred:', error);
  throw error;
};

export default taskService;
