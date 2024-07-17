import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

function DonarList() {
  const [donar, setDonar] = useState([]);

  //get donars
  const getDonar = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setDonar(data.list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  }, []);

  //Handle Delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure? Want To Delete This Donar",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-2">
        <table className="table ">
          <thead class="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {donar.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organizationName + "(ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>
                  <i
                    class="fa-solid fa-trash-can"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(record._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default DonarList;
