import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Header from "../../components/shared/Layout/Header";
import moment from "moment";

function Analytics() {
  const [bloodData, setBloodData] = useState([]);
  const [inventory, setInventory] = useState([]);

  const colors = [
    "#508D4E",
    "#A0937D",
    "#088395",
    "#E0A75E",
    "#758694",
    "#939185",
    "#8D493A",
    "#677D6A",
  ];

  //Get Blood record

  const getBloodData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodgroup-details");
      if (data?.success) {
        setBloodData(data.bloodGroupData);
      //   console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodData();
  }, []);

  //Get recent inventory record
  const getInventory = async () => {
    try {
      const { data } = await API.get("/inventory/recent-inventory");
      if (data?.success) {
        setInventory(data.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row justify-content-around p-2 flex-wrap">
        {bloodData.map((record, i) => (
          <div
            className="card p-2 m-2"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h3
                className="card-title bg-light text-dark text-center mb-3 p-1"
                style={{ borderRadius: "4px" }}
              >
                {record.bloodGroup}
              </h3>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available : <b>{record.availableBlood}</b> (ML)
            </div>
          </div>
        ))}
      </div>

      <div className="container mt-2">
        <h3 className="my-3">Recent Blood Record</h3>
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
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Analytics;
