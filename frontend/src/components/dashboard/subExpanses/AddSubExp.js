import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import GetSubExpenses from "./GetSubExpenses";
import ManageSubExpenses from "./ManageSubExpenses";

const AddSubExp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const [showModal, setShowModal] = useState(false)
  const nav=useNavigate()

  const { id } = useParams();
  const [cardData, setCardData] = useState();
  const [addSubExpense, setAddSubExpense] = useState({
    subExpenseName: "",
    subExpenseAmount: "",
  });

  const handleExpanse = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddSubExpense({
      ...addSubExpense,
      [name]: value,
    });
  };

  const submitExpanse = async (e) => {
    e.preventDefault();
    console.log(addSubExpense);
    try {
      const response = await fetch(
        `http://localhost:8080/subExpenses/add/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-Type": "application/json",
          },
          body: JSON.stringify(addSubExpense),
        }
      );
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(
          "Error adding expense: " + (errorData.message || "Unknown error")
        );
        return;
      }

      // Log response body
      const resData = await response.json();
      console.log("Response Data:", resData);

      alert("Expense added successfully!");
      setAddSubExpense({ subExpenseAmount: "", subExpenseName: "" });
      // nav(`/addSubExpanse/${id}`)/

      let prevExp=0;
      let newExp=prevExp+addSubExpense.subExpenseAmount;
      console.log(newExp)
      

    } catch (error) {
      console.log("Expanse", error);
    }
  };

  useEffect(() => {
    getParticularExp();
  }, []);

  const getParticularExp = async () => {
    const response = await fetch(
      `http://localhost:8080/expanses/expense/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setCardData(data);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      setSidebarOpen(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <div className="container mt-5 ">
            <ManageSubExpenses id={id}/>
            <div className="row">
            <div className="col-md-6 mt-2 ">
            <div className="shadow border p-3 border-radius">
                {/* <div
                  className="card mb-3 shadow py-3"
                  style={{ cursor: "pointer" }}
                > */}
                  <div className="card-body d-flex justify-content-between py-0">
                    <div className="">
                      <h5 className="card-title fw-bold mb-0">
                        {" "}
                        {cardData ? cardData.expanseName : "Expanse Name"}
                      </h5>
                      <p
                        className="text-light-emphasis"
                        style={{ fontSize: "13px" }}
                      >
                        {cardData ? new Date(cardData.createdAt).toLocaleDateString():"date"}
                      </p>
                    </div>
                    <p
                      className="card-title fw-bold"
                      style={{ color: "rgb(76, 72, 136)" }}
                    >
                      ₹{cardData ? cardData.expanseAmount : "Amount"}
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-between py-0">
                    <p
                      className="text-light-emphasis"
                      style={{ fontSize: "13px" }}
                    >
                      ₹{cardData ? cardData.totalSpent : "0"} spent
                    </p>
                    <p
                      className="text-light-emphasis"
                      style={{ fontSize: "13px" }}
                    >
                      ₹{cardData? (cardData.expanseAmount-cardData.totalSpent):'0'} remaining
                    </p>
                  </div>
                  <div
                    className="progress"
                    style={{ height: "10px", marginTop: "-6px" }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${cardData && cardData.totalSpent ? (cardData.totalSpent / cardData.expanseAmount) * 100 : 0}%`,
                        backgroundColor: "rgb(76, 72, 136)",
                      }}
                    ></div>
                  </div>
                {/* </div> */}
              </div>
              </div>

              <div className="col-md-6 mt-2 ">
                <div className="shadow border p-3 border-radius">
                  <form onSubmit={submitExpanse}>
                    <h5 className="text-center fw-bold">Add Sub Expense</h5>
                    <div className="row pt-4">
                      <p>Expense name</p>
                      <div className="col-lg-12">
                        <input
                          type="text"
                          name="subExpenseName"
                          placeholder="e.g. abc"
                          className="form-control"
                          value={addSubExpense.subExpenseName}
                          onChange={handleExpanse}
                          required
                        />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <p>Expense Amount (₹)</p>
                      <div className="col-lg-12">
                        <input
                          type="number"
                          name="subExpenseAmount"
                          placeholder="e.g. 500"
                          className="form-control"
                          value={addSubExpense.subExpenseAmount}
                          onChange={handleExpanse}
                          required
                        />
                      </div>
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
            </div>
          </div>

          <GetSubExpenses id={id}/>
        </div>
      </div>
    </>
  );
};

export default AddSubExp;
