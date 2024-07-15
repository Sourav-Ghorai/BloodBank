import React, { useEffect } from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

function Register() {
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
}

export default Register;
