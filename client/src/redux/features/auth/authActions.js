import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../../services/API";

//Login action
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Register action
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      role,
      email,
      password,
      name,
      organizationName,
      hospitalName,
      website,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        role,
        email,
        password,
        name,
        organizationName,
        hospitalName,
        website,
        address,
        phone,
      });
      if(data?.success){
         window.location.replace('/login')
         // toast.success(data.message);
         alert("Registered Successfully")
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
