import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Component/shared/Spinner";
import Layout from "../Component/shared/Layout/Layout";
import Modal from "../Component/shared/Modal/Modal";
import API from "../Services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span className="text-red-500">{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-6 px-4">
          <h4
            className="text-lg font-semibold text-gray-700 cursor-pointer mb-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-plus text-green-500 py-4"></i>
            Add Inventory
          </h4>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left font-semibold text-sm">Blood Group</th>
                  <th className="py-3 px-4 text-left font-semibold text-sm">Inventory Type</th>
                  <th className="py-3 px-4 text-left font-semibold text-sm">Quantity</th>
                  <th className="py-3 px-4 text-left font-semibold text-sm">Donor Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-sm">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{record.bloodGroup}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{record.inventoryType}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{record.quantity} (ML)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{record.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
