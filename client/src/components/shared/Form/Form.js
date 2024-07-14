import React, { useEffect, useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authServices";

function Form({ formType, submitText, formTitle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (role === "donar" || role === "admin") {
      setHospitalName("");
      setOrganizationName("");
    } else if (role === "hospital") {
      setName("");
      setOrganizationName("");
    } else if (role === "organization") {
      setName("");
      setHospitalName("");
    }
  }, [role]);
  
  return (
    <>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, role, email, password);
          else if (formType === "register")
            return handleRegister(
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
            );
        }}
      >
        <h2 className="text-center">{formTitle}</h2>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="orginizationRadio"
              value={"organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Organization
            </label>
          </div>
        </div>

        {(() => {
          if (formType === "login") {
            return (
              <>
                <InputType
                  lableText={"Email"}
                  inputType={"email"}
                  name={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                  lableText={"Password"}
                  inputType={"password"}
                  name={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            );
          } else {
            return (
              <>
                {(role === "donar" || role === "admin") && (
                  <InputType
                    lableText={"Name"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                {role === "organization" && (
                  <InputType
                    lableText={"Organization Name"}
                    inputType={"text"}
                    name={"organizationName"}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                )}
                {role === "hospital" && (
                  <InputType
                    lableText={"Hospital Name"}
                    inputType={"text"}
                    name={"hospitalName"}
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                )}
                <InputType
                  lableText={"Email"}
                  inputType={"email"}
                  name={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                  lableText={"Password"}
                  inputType={"password"}
                  name={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputType
                  lableText={"Website"}
                  inputType={"text"}
                  name={"website"}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <InputType
                  lableText={"Address"}
                  inputType={"text"}
                  name={"address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputType
                  lableText={"Phone"}
                  inputType={"text"}
                  name={"phone"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            );
          }
        })()}

        <div className="d-flex mt-3 flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Don't have an Account! Please{" "}
              <Link to={"/register"}>Register</Link>{" "}
            </p>
          ) : (
            <p>
              Already have an Account! Please <Link to={"/login"}>Login</Link>
            </p>
          )}
          <button type="submit" className="btn btn-primary ms-2">
            {submitText}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
