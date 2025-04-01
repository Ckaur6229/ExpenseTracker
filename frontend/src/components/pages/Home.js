import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const Home = () => {
  return (
    <>
    <Header/>
      <div className="container-fluid">
  <div className="row ">
    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center flex-column mt-3">
      <div className="p-5">
        <h1 className="fw-bold text-center lh-base">Track, Analyze, and Optimize Your Expenses Effortlessly</h1>
        <p className="pt-3 text-center">
        Start Creating Smart Budgets, Start Controlling Expenses, Start Achieving Financial Freedom
        </p>
        <div className=" pt-4 text-center">
          <button className='btnHome'>Get Started</button>
        </div>
      </div>
    </div>

    <div className="col-md-12 col-lg-6">
      <div>
        <img src="/assets/img/homeImg.png" className="img-fluid w-100" />
      </div>
    </div>

  </div>
</div>

<div className="container-fluid">
  {/* <div className="row">
    <div className="col text-light pt-3">
      <h1 className="fw-bold text-center text-black">Our Services</h1>
    </div>
  </div> */}
  <div className="row">
  <div className="col-lg-4 col-md-12 text-center p-5">
      <div className=" rounded-3" style={{boxShadow:"5px 0px 10px 1px black"}}>
        {/* <img src="icons8-person-30 (1).png" className="img-fluid pt-4" /> */}
        <h2>📊</h2>
        <h3 className="fw-bold" style={{color:"rgb(76, 72, 136)"}}>Achieve Complete Financial Awareness</h3>
        <p className="p-3">
        Get a detailed breakdown of where every penny goes—track daily expenses, categorize spending, and uncover hidden costs.
        Spot spending patterns and cut unnecessary expenses to improve your financial health.
        </p>
      </div>
    </div>
    <div className="col-lg-4 col-md-12 text-center p-5">
      <div className=" rounded-3" style={{boxShadow:"5px 0px 10px 1px black"}}>
        {/* <img src="icons8-person-30 (1).png" className="img-fluid pt-4" /> */}
        <h2>💰</h2>
        <h3 className="fw-bold" style={{color:"rgb(76, 72, 136)"}}>Take Control of Your Budget</h3>
        <p className="p-3">
        Set custom budgets for different categories (food, shopping, bills) and receive alerts before you overspend.
        Stay disciplined with real-time tracking and make adjustments on the go to avoid financial stress.
        </p>
      </div>
    </div>
    <div className="col-lg-4 col-md-12 text-center p-5">
      <div className="rounded-3" style={{boxShadow:"5px 0px 10px 1px black"}}>
        {/* <img src="icons8-bell-50 (2).png" className="img-fluid pt-4" /> */}
        <h2>🎯</h2>
        <h3 className="fw-bold" style={{color:"rgb(76, 72, 136)"}}>Achieve Your Financial Goals Faster</h3>
        <p className="p-3">
        Whether you're saving for a house, dream vacation, or emergency fund, your expense tracker keeps you on track.
        Gain deep financial insights, optimize your spending habits, and watch your savings effortlessly!
        </p>
      </div>
    </div>
  </div>
</div>

<Footer/>
    </>
  )
}

export default Home
