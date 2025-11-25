import React, {useState} from 'react'

import {Link} from 'react-router-dom'
import { FaChevronUp, FaChevronDown, FaEdit, FaStar, FaSearch, FaThLarge, FaUser, FaList, FaFile } from 'react-icons/fa';

const AdminSidebar = () => {

    const [openMenus, setOpenMenus] = useState({
        category:false,
        food:false,
        orders:false
    })

    const toggleMenu = (menu) =>{
        setOpenMenus((prev) => ({...prev, [menu]:!prev[menu]}));
    }
  return (
    <div className='bg-dark text-white sidebar'>
        <div className='text-center p-3 border-bottom'>
            <img src="/images/admin.png" className='img-fluid rounded-circle mb-2' width="70" alt="admin images"/>
            <h6 className='mb-0'>Admin</h6>
        </div>

        <div className='list-group list-group-flush'>
            <Link to ="/admin-dashboard"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                <FaThLarge/>    Dashboard
            </Link>

        <div className='list-group list-group-flush'>
            <Link to="/manage_users"className='list-group-item list-group-item-action bg-dark text-white'>
                <FaUser/>    Registered Users
            </Link>
        </div>

        <button onClick= {()=>toggleMenu('category')}className='list-group-item list-group-item-action bg-dark text-white border-0'>
            <FaEdit/>    Food Category {openMenus.category ? <FaChevronUp/> : <FaChevronDown/>}
        </button> 

        {openMenus.category && (

        <div className='ps-4'>
            
            <Link to='/add-category' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Add Category
            </Link>

            <Link to='/manage-category'className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Manage Category
            </Link>
        </div>
        )}

        <button onClick= {()=>toggleMenu('food')}className='list-group-item list-group-item-action bg-dark text-white border-0'>
            <FaEdit/>        Food Menus {openMenus.category ? <FaChevronUp/> : <FaChevronDown/>}
        </button>

        {openMenus.food && (
        <div className='ps-4'>
            
            <Link to ='/add-food' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Add Food Item
            </Link>

            <Link to ='/manage-food' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Manage Food Item
            </Link>
        </div>
        )}  


        <button onClick= {()=>toggleMenu('orders')}className='list-group-item list-group-item-action bg-dark text-white border-0'>
            <FaList/>        Orders {openMenus.category ? <FaChevronUp/> : <FaChevronDown/>}
        </button>

        {openMenus.orders && (
        <div className='ps-4'>
            
            <Link to ="/order-not-confirmed"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Not Confirmed
            </Link>

            <Link to="/orders-confirmed"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Confirmed
            </Link>

             <Link to="/food_being_prepared"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Being prepared
            </Link>

             <Link to ="/foodpickup" className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Food Pickup
            </Link>

             <Link to ="/orders-delivered"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Delivered
            </Link>

             <Link to="/order-cancelled "className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  Cancelled
            </Link>

             <Link to ="/all-foods"className='list-group-item list-group-item-action bg-dark text-white border-0'>
                  All Orders
            </Link>
        </div>
        )}  

         <div className='list-group list-group-flush'>
            <Link to="/order-report"className='list-group-item list-group-item-action bg-dark text-white'>
                <FaFile/>    B/w Dates Report
            </Link>
        </div>


        <div className='list-group list-group-flush'>
            <Link to="/search-order" className='list-group-item list-group-item-action bg-dark text-white'>
                <FaSearch/>    Search
            </Link>
        </div>

        <div className='list-group list-group-flush'>
            <Link className='list-group-item list-group-item-action bg-dark text-white'>
                <FaStar/>    Manage Reviews
            </Link>
        </div>
        </div>

    </div>
  )
}

export default AdminSidebar;