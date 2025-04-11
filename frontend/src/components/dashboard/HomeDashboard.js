import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const HomeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(false);
  const [budget, setBudget] = useState([]);
  const [allExpanses, setAllExpanses] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const nav = useNavigate();
  useEffect(() => {
    getAllExpanses();
  }, []);

  const getAllExpanses = async () => {
    try {
      console.log(localStorage.getItem("token"));
      let result = await fetch("http://localhost:8080/expanses/allExpanses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log("API Response:", result);
      const labels = result.map((expense) => expense.expanseName); 
      const data = result.map((expense) => expense.expanseAmount); 
      
      const sortedExpanses = result.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
       setChartData({
      labels,
      datasets: [
        {
          label: "Expenses",
          data,
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          ],
        },
      ],
    });
      setAllExpanses(Array.isArray(sortedExpanses) ? sortedExpanses: []);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const mobileView = window.innerWidth <= 768;
  //     setIsMobile(mobileView);
  //     setSidebarOpen(!mobileView);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    try {
      const response = await fetch(`http://localhost:8080/budget/getBudget`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("API Response:", result);
      // console.log("Budget Id",result._id)

      setBudget(result);
    } catch (error) {
      console.error("Error fetching budget:", error);
      // setBudget([]); // Ensure budget is always an array
    }
  };

  const handleBudget = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setBudget({
      ...budget,
      [name]: value,
    });
  };

  const submitBudget = async (e) => {
    e.preventDefault();

    // if (budget.length === 0 || !budget[0].id) {
    //     alert("Budget ID is missing!");
    //     return;
    // }

    try {
      const response = await fetch(
        `http://localhost:8080/budget/updateBudget/${budget._id}`,
        {
          method: "PUT",
          body: JSON.stringify(budget),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Budget updated successfully");
        getBudget();
        setShowModal(false);
      } else {
        alert("Failed to update budget");
      }
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const navExpanse=(id)=>{
    console.log("Navigating to:", `/addSubExpanse/${id}`);
    nav(`/addSubExpanse/${id}`)
  }

  return (
    <>
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow-1 position-relative m-2 overflow-auto">
          {isMobile && !sidebarOpen && (
            <button
              className="btn position-absolute top-0 start-0 m-2"
              onClick={() => setSidebarOpen(true)}
              style={{ backgroundColor: "rgb(76, 72, 136)", color: "white" }}
            >
              ☰
            </button>
          )}
          {/* Dashboard Cards */}
          <div className="container mt-5">
            {/* {
             budget.map((currBudget,index)=>( */}
            <div className="row">
              <div className="col-md-4 mt-2">
                <div className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">
                      Budget
                      <AiFillEdit
                        className="text-secondary "
                        style={{ marginLeft: "230px", cursor: "pointer" }}
                        onClick={() => setShowModal(true)}
                      />
                    </h5>
                    <p className="card-text">₹{budget.amount}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">Expanses</h5>
                    <p className="card-text">₹{budget.totalExpense}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">Balance</h5>
                    <p className="card-text">
                      ₹{budget.amount - budget.totalExpense}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {
             allExpanses.length===0?<div className="row">
              <div className="col-md-6 mt-3 fs-2">No Data Found</div>
             </div>: <div className="row">
              <div className="col-md-6 mt-3">
                <Doughnut data={chartData} />
              </div>

              <div className="col-md-6 mt-2 ">
                <span className="fw-bold fs-3">Latest Expenses</span>
                {allExpanses.map((exp, index) => (
                  <div
                    className="card my-3 shadow py-3"
                    style={{ cursor: "pointer" }}
                    onClick={()=>navExpanse(exp._id)}
                  >
                    <div className="card-body d-flex justify-content-between py-0">
                      <div className="">
                        <h5 className="card-title fw-bold mb-0">
                          {exp.expanseName}
                        </h5>
                        <p
                          className="text-light-emphasis"
                          style={{ fontSize: "13px" }}
                        >
                         {new Date(exp.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p
                        className="card-title fw-bold"
                        style={{ color: "rgb(76, 72, 136)" }}
                      >
                        ₹{exp.expanseAmount}
                      </p>
                    </div>
                    <div className="card-body d-flex justify-content-between py-0">
                      <p
                        className="text-light-emphasis"
                        style={{ fontSize: "13px" }}
                      >
                        ₹{exp.totalSpent} spent
                      </p>
                      <p
                        className="text-light-emphasis"
                        style={{ fontSize: "13px" }}
                      >
                        ₹{exp.expanseAmount - exp.totalSpent} remaining
                      </p>
                    </div>
                    <div
                      className="progress mx-3"
                      style={{ height: "10px", marginTop: "-6px" }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            exp.totalSpent
                              ? (exp.totalSpent / exp.expanseAmount) * 100
                              : 0
                          }%`,
                          backgroundColor: "rgb(76, 72, 136)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            }
            {/* <div className="container"> */}
           
            {/* </div> */}
            {/* ))
            } */}
          </div>

          {showModal && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div
                className="bg-white p-4 rounded shadow-lg"
                style={{ width: "350px" }}
              >
                <h3
                  className="text-end"
                  style={{ margin: "-20px -10px 0px 0px", cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </h3>
                <form onSubmit={submitBudget}>
                  <h5 className="text-center">Edit Budget</h5>
                  <div className="row pt-4">
                    <p>Enter Budget (₹)</p>
                    <input
                      type="number"
                      name="amount"
                      placeholder="e.g. 1000"
                      className="form-control"
                      value={budget.amount}
                      onChange={handleBudget}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn mt-3 d-block mx-auto w-100 text-white"
                    style={{ backgroundColor: "rgb(76, 72, 136)" }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
