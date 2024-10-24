import React from "react";
import Sidebar from "../../Components/Sidebar";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";


const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
    { id: 4, name: 'New users annually', value: '46,000' },
    { id: 5, name: 'New users annually', value: '46,000' },
    { id: 6, name: 'New users annually', value: '46,000' },

  ]
  
  export default function Stats() {
    return (
        <>

        <Sidebar/>

      
  <div className="container">
    <dl className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className="stat-item">
          <dt className="stat-name">{stat.name}</dt>
          <dd className="stat-value">{stat.value}</dd>
        </div>
      ))}
    </dl>
  </div>


      
      </>

    )
  }
  