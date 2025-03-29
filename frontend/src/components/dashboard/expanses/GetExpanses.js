import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetExpanses = () => {
 const [allExpanses, setAllExpanses] = useState([])
 const nav=useNavigate()
  useEffect(() => {
    getAllExpanses();
  }, []);

  const getAllExpanses=async()=>{
    try {
      console.log(localStorage.getItem("token"))
      let result=await fetch("http://localhost:8080/expanses/allExpanses",{
        method:"GET",
        headers:{
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
    })
    result = await result.json()
    console.log("API Response:", result);
    setAllExpanses(Array.isArray(result) ? result : []);
    console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const navExpanse=(id)=>{
    console.log("Navigating to:", `/addSubExpanse/${id}`);
    nav(`/addSubExpanse/${id}`)
  }

  return (
    <>
     {
        allExpanses.map((exp,index)=>(
            <div className="col-md-4 mt-2" key={index}>
            <div className="card mb-3 shadow py-3" style={{cursor:"pointer"}} onClick={()=>navExpanse(exp._id)}>
              <div className="card-body d-flex justify-content-between py-0">
                <div className="">
                  <h5 className="card-title fw-bold mb-0">{exp.expanseName}</h5>
                  <p className="text-light-emphasis" style={{fontSize:"13px"}}>{new Date(exp.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="card-title fw-bold" style={{color:"rgb(76, 72, 136)"}}>₹{exp.expanseAmount}</p>
              </div>
              <div className="card-body d-flex justify-content-between py-0">
                <p className="text-light-emphasis" style={{fontSize:"13px"}}>₹{exp.totalSpent} spent</p>
                <p className="text-light-emphasis" style={{fontSize:"13px"}}>₹{exp.expanseAmount-exp.totalSpent} remaining</p>
              </div>
              <div className="progress mx-3" style={{height:"10px", marginTop:"-6px"}}>
                <div className="progress-bar" style={{width:`${exp.totalSpent?(exp.totalSpent/exp.expanseAmount)*100:0}%`,backgroundColor:"rgb(76, 72, 136)"}}>

                </div>
              </div>
            </div>
          </div>
        ))
     }
    </>
  );
};

export default GetExpanses;  












