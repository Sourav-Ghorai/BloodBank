export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
   if (!role || !email || !password) {
     return alert("Please Provide All Feilds");
   }
   // console.log(e, role, email, password)
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
   // console.log(
   //   e,
   //   role,
   //   email,
   //   password,
   //   name,
   //   organizationName,
   //   hospitalName,
   //   website,
   //   address,
   //   phone
   // );
  } catch (error) {
    console.log(error);
  }
};
