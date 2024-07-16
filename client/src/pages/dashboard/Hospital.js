import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';

function Hospital() {
  const [hospital, setHospital] = useState([]);

  //get donars
  const getHospital = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospital");
      if (data?.success) {
        setHospital(data.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);
  return (
    <Layout>
      <div className="container mt-2">
        <table className="table ">
          <thead class="table-light">
            <tr>
              <th scope="col">Hospital Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {hospital.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Hospital