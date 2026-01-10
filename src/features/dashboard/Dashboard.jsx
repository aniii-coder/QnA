import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import Hero from '../hero/Hero';

const Dashboard = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', height:'100vh'}}>
      {/* hello */}
      <Sidebar />
      <Hero />
    </div>
  )
}

export default Dashboard;
