import { toast } from "react-toastify";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";


export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      // return alert("Please Provide All Feilds");
      return toast.error("Please provide all fields")
    }
    // console.log(e, role, email, password)
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  role,
  email,
  password,
  name,
  organizationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
   if (!role || !email || !password || !address || !phone) {
     // return alert("Please Provide All Feilds");
     return toast.error("Please provide all fields");
   }
    store.dispatch(
      userRegister({
        role,
        email,
        password,
        name,
        organizationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
