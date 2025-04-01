import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar';
import GetExpanses from './GetExpanses';

const Expanses = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showModal, setShowModal] = useState(false)

    const [addExpanse, setAddExpanse] = useState({
      expanseName:"",
      expanseAmount:"",
      userId:localStorage.getItem("userId")
    })

    const handleExpanse=(e)=>{
      let name=e.target.name;
      let value=e.target.value;

      setAddExpanse({
        ...addExpanse,
        [name]:value
      })

    }

    const submitExpanse = async (e) => {
      e.preventDefault();
      console.log(addExpanse);
      try {
        console.log(localStorage.getItem("token"))
        const response = await fetch(`http://localhost:8080/expanses/addExpanse`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(addExpanse),
        });
    
        // Log response status
        console.log("Response Status:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          alert("Error adding expense: " + (errorData.message || "Unknown error"));
          setShowModal(false)
          return;
        }
    
        // Log response body
        const resData = await response.json();
        console.log("Response Data:", resData);
    
        alert("Expense added successfully!");
        setShowModal(false);
        setAddExpanse({ expanseAmount: "", expanseName: "" });
    
      } catch (error) {
        console.error("Error in submitExpanse:", error);
        alert("Something went wrong. Check console for details.");
      }
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
        <div className="flex-grow-1 position-relative m-2">
          {isMobile && !sidebarOpen && (
            <button 
              className="btn position-absolute top-0 start-0 m-2"
              onClick={() => setSidebarOpen(true)}
              style={{backgroundColor:"rgb(76, 72, 136)",color:"white"}}
            >
              ☰
            </button>
          )}
          {/* Dashboard Cards */}
          <div className="container mt-5 overflow-auto" style={{ maxHeight: "90vh" }}>
            <div className="row">
              <div className="col-md-4 mt-2" onClick={()=>setShowModal(true)} style={{cursor:"pointer"}}>
                <div className="card mb-3 shadow text-center py-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">+</h5>
                    <p className="card-text">Create New Expense</p>
                  </div>
                </div>
              </div>

             <GetExpanses/>
               
            </div>
          </div>

          {/* Render Modal Only When `showModal` is True */}
          {showModal && 
           <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)" }}>
           <div className="bg-white p-4 rounded shadow-lg" style={{ width: "350px" }}>
            <h3 className='text-end' style={{margin:"-20px -10px 0px 0px",cursor:"pointer"}} onClick={()=>setShowModal(false)}>&times;</h3>
           <form onSubmit={submitExpanse}>
             <h5 className="text-center">Add Expense</h5>
             <div className="row pt-4">
               <p>Expense name</p>
               <div className="col-lg-12">
                 <input
                   type="text"
                   name="expanseName"
                   placeholder="e.g. abc"
                   className="form-control"
                   value={addExpanse.expanseName}
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
                   name="expanseAmount"
                   placeholder="e.g. 500"
                   className="form-control"
                   value={addExpanse.expanseAmount}
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
        </div>
      </div>
    </>
  )
}

export default Expanses
