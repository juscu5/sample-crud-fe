import create from "zustand";
import axios, { AxiosResponse } from "axios";

interface UserState {
  user: any[];
  edit_user: any[];
}

interface UserActions {
  getUser: () => Promise<void>;
  editUser: (
    editData: any,
    callback?: (status: number, message: string | null) => void
  ) => Promise<void>;
  deleteUser: (
    clientData: { id: string | number },
    callback?: (status: number, message: string | null) => void
  ) => Promise<void>;
}

const userStore = create<UserState & UserActions>((set) => ({
  user: [],
  edit_user: [],

  getUser: async () => {
    try {
      const response: AxiosResponse<any> = await axios.get("/api/getUser");
      set((state) => ({
        ...state,
        rfp: response.data,
      }));
    } catch (error: any) {
      console.error("Error fetching User:", error);
    }
  },

  editUser: async (
    userData: { id: string | number },
    editData: any,
    callback?: (status: number, message: string | null) => void
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `/api/deleteUser/${Number(userData.id)}`,
        editData
      );
      set((state) => ({
        ...state,
        edit_rfp: response.data,
      }));

      if (response.status === 200) {
        if (callback) {
          callback(200, "Success");
        }
      } else {
        if (callback) {
          callback(response.status || 500, "Error occurred"); // Default to 500 if status is undefined
        }
      }
    } catch (error: any) {
      console.error("Error editing RFP:", error);
      if (callback) {
        callback(error.response?.status || 500, "Error occurred");
      }
    }
  },

  deleteUser: async (
    userData: { id: string | number },
    callback?: (status: number, message: string | null) => void
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `/api/deleteUser/${Number(userData.id)}`
      );
      set((state) => ({
        ...state,
        // Update state as needed after delete operation
      }));

      if (response.status === 200) {
        if (callback) {
          callback(200, "Success");
        }
      } else {
        if (callback) {
          callback(response.status || 500, "Error occurred");
        }
      }
    } catch (error: any) {
      console.error("Error deleting RFP:", error);
      if (callback) {
        callback(error.response?.status || 500, "Error occurred");
      }
    }
  },
}));

export default userStore;
