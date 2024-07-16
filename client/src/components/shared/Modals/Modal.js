import React, { useState } from "react";
import InputType from "../Form/InputType";
import { toast } from "react-toastify";
import API from "../../../services/API";
import { useSelector } from "react-redux";

function Modal() {
  const [inventoryType, setInventoryType] = useState("In");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [donarEmail, setDonarEmail] = useState("");

  const { user } = useSelector((state) => state.auth);

  //Handle modal submission
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast("Please Provide all Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType,
        bloodGroup,
        quantity,
        donarEmail,
        email: user?.email,
        organization: user?._id,
      });
      if (data?.success) {
        window.location.reload();
        toast.success("Inventory added successfully");
      }
    } catch (error) {
      alert(error.response.data.message);
      window.location.reload();
      console.log(error);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Inventory type  */}
              <div className="d-flex mb-3">
                Blood Type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"In"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    In
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inRadio"
                    id="flexRadioDefault2"
                    value={"Out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Out
                  </label>
                </div>
              </div>

              {/* Blood Group */}
              <select
                className="form-select mb-2"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={"Select Blood Group"}>
                  Select Blood Group
                </option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
              </select>

              {/* Donar Email  */}
              <InputType
                lableText={inventoryType==='In'? "Donar Email" : "Hospital Email"}
                inputType="email"
                name="donarEmail"
                value={donarEmail}
                onChange={(e) => setDonarEmail(e.target.value)}
              />

              {/* Quantity */}
              <InputType
                lableText="Quantity (ml)"
                inputType="Number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleModalSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
