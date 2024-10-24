import React from "react";
import Header from "../Components/Header/Header";
import Card from "../Components/Card";
import Footer from "../Components/Footer";

export default function Home() {
    return (
        <>
        <div>
            <Header />
        <header className="showcase">
        <div className="showcase-top">
            <div className="logo-text">ACMEDIA</div>
            {/* <a href="#" className="btn btn-rounded">Sign In</a> */}
        </div>
        <div className="showcase-content">
            <h1>Classic Monster Movies</h1>
            <p>Watch Anytime. Anywhere.</p>
            <a href="#" className="btn btn-xl">
           see Movies
            <i className="fas fa-chevron-right btn-icon"></i>
            </a>
        </div>
        </header>


    <div className="work-with-us-container">
      <img 
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" 
        alt="" 
        className="background-image" 
      />
      <div className="work-with-us-content">
        <div className="header-content">
          <h2>Cinema</h2>
          <p>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        </div>
        <div className="links-container">
          <a href="#">Open roles &rarr;</a>
          <a href="#">Internship program &rarr;</a>
          <a href="#">Our values &rarr;</a>
          <a href="#">Meet our leadership &rarr;</a>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <dt>Offices worldwide</dt>
            <dd>12</dd>
          </div>
          <div className="stat-item">
            <dt>Full-time colleagues</dt>
            <dd>300+</dd>
          </div>
          <div className="stat-item">
            <dt>Hours per week</dt>
            <dd>40</dd>
          </div>
          <div className="stat-item">
            <dt>Paid time off</dt>
            <dd>Unlimited</dd>
          </div>
        </div>
      </div>
    </div>
  




            <Footer />
        </div>
        </>
    );
}
