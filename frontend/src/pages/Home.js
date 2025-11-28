import React, {useEffect, useState} from 'react'
import PublicLayout from '../components/PublicLayout';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useWishlist } from '../context/WishlistContext';

const Home = () => {
  const  [foods, setFoods] = useState([]);
  const  [wishlist, setWishlist] = useState([]);
  const {wishlistCount, setWishlistCount} = useWishlist();
  const  [ratings, setRatings] = useState({});
  const[hovered, setHovered] = useState(null);


  const userId = localStorage.getItem('userId');
      //useLocation().search stores value of ?q=burger
      
      //works only on page load
       useEffect(() => {
                         
                              //calling api
                              //fetch () returns response as object
                              fetch(`http://127.0.0.1:8000/api/random_foods/`)
                              .then(res => res.json()) //changing into json
                              .then(data => {
                                  setFoods(data)
                 
                          })
                         
          
            },[]);

            //works on page load and when userid is changed
          useEffect(() => {
            if(userId) {
                              //calling api
                              //fetch () returns response as object
                              fetch(`http://127.0.0.1:8000/api/wishlist/${userId}/`)
                              .then(res => res.json()) //changing into json
                              .then(data => {
                                const wishlistIds = data.map(item => item.food_id);
                                  setWishlist(wishlistIds)
                 
                          })
            }
                         
          
            },[userId]);
            
             useEffect(() => {
                         
                             
                          const fetchAllRatings = async () =>{
                            const allRatings= {};
                            for (let food of foods){
                              const res = await fetch(`http://127.0.0.1:8000/api/food_rating_summary/${food.id}`)

                              const data = await res.json();
                              allRatings[food.id] = data;
                            }
                            setRatings(allRatings);
                          }

                          if (foods.length > 0){
                            fetchAllRatings();
                          }
          
            },[foods]);




    const toogleWishlist = async(foodId) =>{
      //checking if user is logged in or not
      if (!userId)
      {
        toast.info("Please log in to use wishlist.");
        return;
      }

      const isWishlisted= wishlist.includes(foodId);//returns true if food id is present otherwise returns false in variable

      const endpoint = isWishlisted ? 'remove' : 'add';

      try{
        const response = await fetch(`http://127.0.0.1:8000/api/wishlist/${endpoint}/`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
          user_id : userId,
          food_id : foodId
        }),
        });

        if(response.ok ){
          setWishlist(prev => isWishlisted ? prev.filter(id=>id !== foodId): [...prev,foodId]
        );

      const updatedCount =  await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}/`);
      const wishlistData= await updatedCount.json();
      setWishlistCount(wishlistData.length);

        toast.success(isWishlisted ? 'Removed from Wishlist': 'Add toWishlist');
        }
        else{
          toast.error('Failed to update wishlist');
        }
        }

      
    

      catch(error)
      {
        toast.error("something went wrong");
      }
    }
  
  return (
    <PublicLayout>
       <ToastContainer position="top-center" autoClose={2000} />
    <section className ='hero py-5 text-center' style={{backgroundImage:"url('/images/interior2.jpg')"}}>
      <div style={{
        backgroundColor:"rgba(1,1,1, 0)", padding:"40px 20px", 
        borderRadius: "10px", 

      }}>
      <h1> Foodie_Fast </h1>
      <p className='lead'> Experience authentic Nepali cuisine in the heart of the city.</p>
      <form method="GET" action="/search" className='d-flex mt-3' style={{maxWidth:'600px', margin:'0 auto'}}>
      <input type='text' name='q' placeholder='I would like to eat...' className='form-control'
      style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
        
      <button className='btn btn-warning px-4'
      style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Search</button>

      </form>
      </div>
    </section>

    <section className='py-5'>
      <div className='container '>
        <h2 className='text-center mb-4'> Most Loved Dishes This Month
        <span className='badge bg-danger ms-2'>Top Picks</span>
        </h2>

        <div className='row mt-4'>
            {foods.length ===0 ? (
            <p className='text-center'>

                No foods found
                
            </p>
            ) : (
                foods.map((food,index) =>(
                 <div className='col-md-4 mb-4'>
                <div className='card hovereffect'>
                  <div className='position-relative'>
                    <img src= {`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{height:'250px'}} alt='search_img'/>
                    <i className={`${wishlist.includes(food.id) ? "fas": "far"} fa-heart heart-anim position-absolute top-0 end-0 m-2 text-danger`}
                    style={{
                      cursor: "pointer",
                      background:"white",
                      fontSize:"20px",
                      padding:"3px",
                      borderRadius:"50%"
                    }}
                    onClick={() => toogleWishlist(food.id)}
                    ></i>
                  </div>
                    <div className='card-body ' >
                        <h5 className='card-title'>
                            <Link to={`/food/${food.id}`}>{food.item_name}</Link>
                        </h5>   
                        <p className='card-text text-muted'> {food.item_description?.slice(0,40)}...</p>


                        {ratings[food.id] &&(
                          <div className='mb-2'
                            onMouseEnter={() =>setHovered(food.id)}
                            onMouseLeave={() =>setHovered(null)}
                           > 

                            <div>
                              <span className='text-warning'>
                                {Array(Math.round(ratings[food.id].average)).fill().map((_,i) => (
                                  <i key={i} className='fas fa-star'></i>
                                ))}

                                  {Array(5- Math.round(ratings[food.id].average)).fill().map((_,i) => (
                                  <i key={i} className='far fa-star'></i>
                                ))}
                              </span>

                              <small className='text-muted ms-2'>
                                {ratings[food.id].average} ({ratings[food.id].total_reviews} ratings)
                              </small>
                             </div>
                          </div>
                        )}












                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='fw-bold'>Rs. {food.item_price}</span>
                            {food.is_available ? (<Link to={`/food/${food.id}`} className='btn btn-outline-primary btn-sm'>
                                <i className='fas fa-shopping-basket me-1'></i>Order Now
                            </Link>) : (
                                <div title='This food item is not available right now. Please try again later'>
                                    <button className='btn btn-outline-secondary btn-sm'>
                                        <i className='fas fa-times-circle me-1'></i>Currently Not Available
                                    </button>
                                </div>
                            )}
                            

                        </div>
                    </div>
                </div> 
            </div>
            ))
            )}
            
        </div>
      </div>

    </section>

    <section className='py-5 bg-dark text-white'>
      <div className='container text-center'>
        <h2>Order easily.</h2>
        <div className='row mt-4'>
          <div className='col-md-4'>
            <h4>Pick a dish</h4>
            <p>Explore options.</p>
            </div>
       

            <div className='col-md-4'>
            <h4>Pick a dish</h4>
            <p>Explore options.</p>
            </div>

            <div className='col-md-4'>
            <h4>Pick a dish</h4>
            <p>Explore options.</p>
            </div>
       
        </div>
        <p>Ready to Satisfy your hunger</p>
      </div>

    </section>

    <section className='py-5 bg-warning text-center text-dark'>
      <h4>
        Order Simply.
      </h4>
      <Link to='/food-menu' className='btn btn-dark btn-lg '>
      Browse Menu</Link>
    </section>

    </PublicLayout>
  )
}

export default Home;