import React, {useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderReport = () => {
    const [formData, setFormData] = useState({
        'from_date':'',
        'to_date':'',
        'status':'all_orders',
    })
    const [orders, setOrders] = useState([])
          const adminUser = localStorage.getItem('adminUser');
          const navigate = useNavigate();
          
        
          useEffect(() => {
            if(!adminUser){
                navigate('/admin-login');
                return;
            }
        
          },[]);
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
    }

 const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/order_between_dates/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
    
          const result = await response.json();
    
          if (response.status === 200) {
            setOrders(result)
            }
    
          else {
            toast.error(result.message || "Something went wrong");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error connecting to server");
        }
      };

  return (
     <AdminLayout>
        <ToastContainer position="top-right" autoClose={2000} />
        <div>
            <h3 className='text-center text-primary mb-4'>
                <i className='fas fa-list-alt me-1'></i>
                    Between Dates Reports
            </h3>

            <form onSubmit={handleSubmit} className='mb-4'>
                <div className='row mb-3'>
                    <div className='col-md-4'>
                        <label>From Date</label>
                        <input type='date' name='from_date' onChange={handleChange} className='form-control' required/>
                    </div>

                    <div className='col-md-4'>
                        <label>To Date</label>
                        <input type='date' name='to_date' onChange={handleChange} className='form-control' required/>
                    </div>

                    <div className='col-md-4'>
                        <label>Status</label>
                        <select name='status' onChange={handleChange} className='form-control'>
                            <option value="all_orders"> All </option>
                            <option value="order_not_confirmed"> Order Not Confirmed</option>
                            <option value="orders_confirmed"> Order Confirmed</option>
                            <option value="food_being_prepared"> Food Being Prepared</option>
                            <option value="food_delivered"> Food Delivered</option>
                            <option value="food_pickup"> Food Pickup</option>
                            <option value="order_cancelled"> Order Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>     
            </form>

        {orders.length > 0 && (
            <table className='table table-bordered table-hover table-striped'>
            <thead className='table-dark'>
                <tr>
                    <th>S.No</th>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    orders.map((order, index) => (
                <tr key={order.id}>
                    <td>{index+1}</td>
                    <td>{order.order_number}</td>
                    <td>{new Date(order.order_time).toLocaleString()}</td>
                    <td>
                        <a href={`/admin-view-order-detail/${order.order_number}`} className='btn btn-sm btn-info me-2'>
                        View Details</a>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
        )}
        
        </div>
    </AdminLayout>
  )
}

export default OrderReport