import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function GetSubExpenses({id}) {
  const [allSubExpanses, setAllSubExpanses] = useState([]);
  useEffect(() => {
    getAllSubExpenses();
  }, [id]);

  const getAllSubExpenses = async () => {
    try {
      let result = await fetch(
        `http://localhost:8080/subExpenses/allSubExpenses/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      console.log("SubExpense API Response:", result);
      setAllSubExpanses(Array.isArray(result) ? result : []);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubExpense = async (subExpenseId) => {
    try {
      const result = await fetch(
        `http://localhost:8080/subExpenses/deleteSubExpenses/${subExpenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.ok) {
        getAllSubExpenses();
        alert("Expense is deleted");
      } else {
        alert("Failed to delete sub-expense");
      }
    } catch (error) {
      console.log("Error deleting sub-expense:", error);
    }
  };
  

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
         {
          allSubExpanses.length===0?<div className="col-md-12 text-center fs-2">Sub Expenses are not added</div>:
          <div className="col-md-12">
          {/* Table Wrapper for Responsiveness */}
          <div
            className="table-responsive"
            style={{ overflowX: "auto", maxWidth: "100%" }}
          >
            <table className="table table-bordered table-hover w-100">
              <thead className="text-center">
                <tr>
                  <th scope="col">S no.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {
                allSubExpanses.map((subExp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{subExp.name || subExp.subExpenseName}</td>
                    <td>{subExp.amount || subExp.subExpenseAmount}</td>
                    <td>{new Date(subExp.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-outline-danger" onClick={()=>deleteSubExpense(subExp._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
         }
        </div>
      </div>

      {/* CSS to Prevent Horizontal Scroll on Body */}
      <style>
        {`
          body {
            overflow-x: hidden; /* Prevents body-wide scrollbar */
          }
          .container-fluid {
            max-width: 100vw; /* Ensures the container does not exceed viewport */
          }
          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
          }
        `}
      </style>
    </>
  );
}
