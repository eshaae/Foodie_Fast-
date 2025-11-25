import React, {useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link } from 'react-router-dom'
import {CSVLink } from 'react-csv'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'

const ManageUser = () => {
     const [users, setUsers] = useState([])
     const [allusers, setAllUsers] = useState([])
     const adminUser = localStorage.getItem('adminUser');
     const navigate = useNavigate();
    
      useEffect(() => {
        if(!adminUser){
        navigate('/admin-login');
        return;
        }

        //calling api
        //fetch () returns response as object
        fetch('http://127.0.0.1:8000/api/users/')
            .then(res => res.json()) //changing into json
        .then(data => {
            setUsers(data)
            setAllUsers(data)
        })
    
      },[]);
        
    
      const handleSearch = (s) => {
    
        const keyword = s.toLowerCase();
    
        if (!keyword) 
        {
            setUsers(allusers);
        }
    
        else{
              const filtered = allusers.filter((u) => 
               u.first_name.toLowerCase().includes(keyword) || 
               u.last_name.toLowerCase().includes(keyword)||
               u.email.toLowerCase().includes(keyword)
            )
                setUsers(filtered);
        }
    
      }
    
      const handleDelete = (id) => {
        if(window.confirm("Are you sure, You want to delete this user?")){
            fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`,{
                method:'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message);
                setUsers(users.filter(user=> user.id !== id));
            })
            .catch(err => console.error(err))
        }
      }
  return (
    <AdminLayout>
        <ToastContainer position="top-right" autoClose={2000} />
        <h3 className='text-center text-primary mb-4'>
            <i className='fas fa-list-alt me-1'></i>
            User List
            </h3>


        <h5 className='text-end text-muted'>
            <i className='fas fa-database me-1'></i>Total Usera
            <span className='ms-2 badge bg-success'>{users.length}</span>

        </h5>

        <div className='mb-3 d-flex  justify-content-between'>
            <input type='text' className='form-control w-50' placeholder='Search by name or email ' onChange={(e) => handleSearch(e.target.value)}></input>

            <CSVLink data ={users} className='btn btn-success' filename = {"users_list.csv"}>
                <i className='fas fa-file-csv me-2'></i>   Export to CSV
            </CSVLink>
        </div>

        <table className='table table-bordered table-hover table-striped'>
            <thead className='table-dark'>
                <tr>
                    <th>S.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                   users.map((u, index) => (
                <tr key={u.id}>
                    <td>{index+1}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.mobile}</td>
                    <td>{u.email}</td>
                    
                    <td>

                        <button onClick={() =>handleDelete(u.id)} className="btn btn-sm btn-danger">
                        <i className='fas fa-trash-alt  me-1'></i>Delete</button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </AdminLayout>
  )
}

export default ManageUser