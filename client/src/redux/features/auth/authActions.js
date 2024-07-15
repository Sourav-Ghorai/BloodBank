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
        localStorage.setItem("token", data.token);
        window.location.replace("/");
        toast.success(data.message);
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
         toast.success(data.message);
         alert("Registered Successfully")
      }
      return data
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

//Get Current User
export const getCurrentUser = createAsyncThunk(
   'auth/getCurrentUser',
   async({rejectWithValue})=>{
      try {
         const res = await API.get('/auth/current-user')
         return res?.data;
      } catch (error) {
         console.log(error);
         if (error.response && error.response.data.message) {
           return rejectWithValue(error.response.data.message);
         } else {
           return rejectWithValue(error.message);
         }
      }
   }
)