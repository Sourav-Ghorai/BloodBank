import React, { useState } from "react";
import InputType from "./InputType";

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
  return (
    <>
      <form>
        <h2 className="text-center">{formTitle}</h2>
        <hr />
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
          lableText={"Role"}
          inputType={"text"}
          name={"role"}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <InputType
          lableText={"Name"}
          inputType={"text"}
          name={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputType
          lableText={"Organization Name"}
          inputType={"text"}
          name={"organizationName"}
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />

        <InputType
          lableText={"Hospital Name"}
          inputType={"text"}
          name={"hospitalName"}
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </form>
    </>
  );
}

export default Form;
