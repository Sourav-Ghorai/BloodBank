import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Modals/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [inventory, setInventory] = useState([]);

//   const {user} = useSelector(state => state.auth)
const navigate = useNavigate()

  const getInventory = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setInventory(data.inventory);
        // console.log(inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
         {/* If Admin navigate to admin page  */}
         {user?.role==='admin' && navigate('/admin')}
          {/* If a donar then navigate to organization page  */}
          {user?.role === "donar" && navigate("/organization")}

          <h5
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
            className="d-flex"
          >
            <i className="fa-solid fa-plus text-success py-4"></i>{" "}
            <span className="d-flex align-items-center justify-content-center ms-2">Add Inventory</span>
          </h5>
          <Modal />

          <table className="table ">
            <thead class="table-light">
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity (ml)</th>
                <th scope="col">Donar Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}</td>
                  <td>{record.email}</td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
