const MyModal = ({ setShowModal }) => {
    return (
      <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="bg-white p-4 rounded shadow-lg" style={{ width: "350px" }}>
          <h5 className="text-center">Enter Details</h5>
          <div className="row pt-4">
            <div className="col-lg-12">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-lg-12">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
          </div>
          <button
            className="btn mt-3 d-block mx-auto w-100 text-white"
            type="button"
            style={{ backgroundColor: "rgb(76, 72, 136)" }}
            onClick={() => setShowModal(false)} // Ensure modal hides
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
  