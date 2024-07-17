import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import moment from "moment";
import API from "../../services/API";

function Consumer() {
  const [inventory, setInventory] = useState([]);
  const { user } = useSelector((state) => state.auth);

  //get Inventory for hospital
  const getInventoryHospital = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital",{
         filters: {
            inventoryType: 'Out',
            hospital: user?._id
         }
      });
      if (data?.success) {
        setInventory(data.inventory);
      //   console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventoryHospital();
  }, []);
  return (
    <Layout>
      <div className="container mt-2">
        <table className="table ">
          <thead class="table-light">
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ml)</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Consumer;
