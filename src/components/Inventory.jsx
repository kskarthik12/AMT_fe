import React from 'react';
import { useState} from 'react';
import '../admin.css'
import Header from './Header'
import Sidebar from './Sidebar';
import Assets from './Assets';

function Inventory() {

 const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return <>
   <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Assets />
    </div>
    </>
};


export default Inventory