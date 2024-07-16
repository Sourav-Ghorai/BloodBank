import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment';

function Organization() {
   const [organization, setOrganization] = useState([]);

   //get donars
   const getOrganization = async () => {
     try {
       const { data } = await API.get("/inventory/get-organization");
       if (data?.success) {
         setOrganization(data.organizations);
       }
     } catch (error) {
       console.log(error);
     }
   };

   useEffect(() => {
     getOrganization();
   }, []);
   return (
     <Layout>
       <div className="container mt-2">
         <table className="table ">
           <thead class="table-light">
             <tr>
               <th scope="col">Organization Name</th>
               <th scope="col">Email</th>
               <th scope="col">Phone</th>
               <th scope="col">Address</th>
               <th scope="col">Date</th>
             </tr>
           </thead>
           <tbody>
             {organization.map((record) => (
               <tr key={record._id}>
                 <td>{record.organizationName}</td>
                 <td>{record.email}</td>
                 <td>{record.phone}</td>
                 <td>{record.address}</td>
                 <td>
                   {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </Layout>
   );
}

export default Organization