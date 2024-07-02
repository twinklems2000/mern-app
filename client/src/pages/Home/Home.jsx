import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = () => {
    axios
      .get("http://localhost:9000/getAllUsers")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("userData", userData);

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:9000/getAllUsers/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      getAllUserData();
    }
  };

  return (
    <>
      {userData?.length > 0 ? (
        <table className="border-collapse border border-slate-400 m-auto py-6">
          <thead>
            <tr className="text-base">
              <th className="border border-slate-300 p-4  bg-slate-200">
                Name
              </th>
              <th className="border border-slate-300 p-4  bg-slate-200">
                Email
              </th>
              <th className="border border-slate-300 p-4  bg-slate-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-300 p-4">{item?.name}</td>
                  <td className="border border-slate-300 p-4">{item?.email}</td>
                  <td
                    className="border border-slate-300 p-4 cursor-pointer"
                    onClick={() => handleDelete(item?._id)}
                  >
                    🗑️
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="text-2xl py-6">No Records Found 🤷‍♀️</h1>
      )}
    </>
  );
};

export default Home;
