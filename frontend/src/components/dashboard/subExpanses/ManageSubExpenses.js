import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const ManageSubExpenses = ({id}) => {
    const [showModal, setShowModal] = useState(false)
    const [updateData, setUpdateData] = useState();
    const nav=useNavigate();
    useEffect(() => {
       getParticularExp();
     }, []);

     const handleExpanse = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setUpdateData({
          ...updateData,
          [name]: value,
        });
      };
   
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
       setUpdateData(data)
     };

     const handleUpdatedExpense=async(e)=>{
        e.preventDefault()
        const result=fetch(`http://localhost:8080/expanses/updateExpense/${id}`,{
          method:"put",
          body: JSON.stringify(updateData),
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          }
        })
        // result=await result.json();
        if(result){
           alert("Expense updated successfully")
        }
        setShowModal(false);
        setUpdateData("")
     }

     const deleteExpense=async()=>{
      let result=await fetch(`http://localhost:8080/expanses/deleteExpense/${id}`,
        {
          method:"delete",
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          }
        }

      )
      result=await result.json();
      if(result){
          alert("Expense is deleted")
          nav('/expanse')
      }
     }
    
  return (
    <>
       <div className="row">
              <div className="col d-flex justify-content-between">
               <Link to="/expanse"> <button className="d-flex align-items-center justify-content-center btn btn-outline-secondary">
                  <FaArrowLeft />
                </button></Link>
                <div className="d-flex">
                  <button className="d-flex align-items-center justify-content-center mx-2 btn btn-outline-danger" onClick={deleteExpense}>
                    <FaTrash />
                  </button>
                  <button className="d-flex align-items-center justify-content-center btn btn-outline-secondary" 
                  onClick={()=>setShowModal(true)}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>

            {showModal && 
           <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)" }}>
           <div className="bg-white p-4 rounded shadow-lg" style={{ width: "350px" }}>
            <h3 className='text-end' style={{margin:"-20px -10px 0px 0px",cursor:"pointer"}} onClick={()=>setShowModal(false)}>&times;</h3>
           <form onSubmit={handleUpdatedExpense}>
             <h5 className="text-center">Edit Expense</h5>
             <div className="row pt-4">
               <p>Expanse name</p>
               <div className="col-lg-12">
                 <input
                   type="text"
                   name="expanseName"
                   placeholder="e.g. Home Decor"
                   className="form-control"
                   value={updateData.expanseName}
                   onChange={handleExpanse}
                   required
                 />
               </div>
             </div>
             <div className="row pt-3">
             <p>Expanse Amount</p>
               <div className="col-lg-12">
                 <input
                   type="number"
                   name="expanseAmount"
                   placeholder="e.g. ₹500"
                   className="form-control"
                   value={updateData.expanseAmount}
                   onChange={handleExpanse}
                   required
                 />
               </div>
             </div>
             <button
              type='submit'
               className="btn mt-3 d-block mx-auto w-100 text-white"
               style={{ backgroundColor: "rgb(76, 72, 136)" }}
             >
               Submit
             </button>
             </form>
           </div>
         </div>
          }
    </>
  )
}

export default ManageSubExpenses
