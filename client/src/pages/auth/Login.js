import React from "react";
import Form from "../../components/shared/Form/Form";

function Login() {
  return (
    <div>
      <div className="row g-0">
        <div className="col-8 form-banner">
          <img src="./assets/images/banner1.jpg" alt="Banner img" />
        </div>
        <div className="col-4 form-container">
          <Form formTitle={"Login"} submitText={"Login"} formType={'login'} />
        </div>
      </div>
    </div>
  );
}

export default Login;
