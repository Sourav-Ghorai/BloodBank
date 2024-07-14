import React from "react";
import Form from "../../components/shared/Form/Form";

function Register() {
  return (
    <div>
      <div className="row g-0">
        <div className="col-8 form-banner">
          <img src="./assets/images/banner2.jpg" alt="Banner img" />
        </div>
        <div className="col-4 form-container">
          <Form
            formTitle={"Register"}
            submitText={"Register"}
            formType={"register"}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
