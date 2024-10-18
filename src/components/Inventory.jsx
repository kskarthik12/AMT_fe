import React from 'react';
import { useState} from 'react';
import '../admin.css'
import Header from './Header'
import Sidebar from './Sidebar';
import Assets from './Assets';

function Inventory() {


  return <>
   <div className='grid-container'>
      <Header />
      <Sidebar />
      <Assets />
    </div>
    </>
};


export default Inventory