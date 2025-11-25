import React, {useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {

    const [categoryName, setcategoryName] = useState('');
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
                  
                
    useEffect(() => {
        if(!adminUser){
        navigate('/admin-login');
        return;
        }
                
      },[]);

    const handleSubmit = async(e)=> {
        e.preventDefault();

        try{
    
        const response = await fetch('http://127.0.0.1:8000/api/add-category/', {
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({category_name :categoryName})
    
        });
    
        const data = await response.json();

        if (response.status === 201) 
        {
          toast.success(data.message);
        }
          
        else{
          
            toast.error("Something went wrong!!!");
        }
    }
    catch (error){
        console.error(error);
        toast.error("Error connecting to server");
    }
    
      };
    

  return (

    
    <AdminLayout>
        <ToastContainer position = "top-center" autoClose={2000}/>
        
        <div className='row'>
            <div className='col-md-8'>
                <div className='p-4 shadow-sm rounded'>
                    <h4 className='mb-4'>
                        <i className='fas fa-plus-circle text-primary me-2'></i>Add Category
                    </h4>

                    <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                              <label className='form-label'>
                                Category Name</label>
                              <input type ="text" className="form-control" value={categoryName} onChange={(e)=>setcategoryName(e.target.value)} placeholder="Enter Category Name" required/>
                            </div>
                    
                            
                            <button type="submit" className='btn btn-primary mt-2'>
                              <i className='fas fa-plus me-2'></i>Add Category
                            </button>
                          </form>
                </div>

            </div>

            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <i className='fas fa-utensils ' style={{fontSize:'180px', color:'#e5e5e5'}}></i>
            </div>

        </div>
            
    </AdminLayout>
    
  )
}

export default AddCategory