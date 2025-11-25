import React, {useState} from 'react'

const CancelOrderModal = () => {
    const [remark, setRemark] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async() =>{
        if(!remark.trim()){
            setError('Please Provide a Reason for Cancellation.');
        }

        try{
            const response = await fetch(`http://127.0.0.1:8000/api/cancel_order/${orderNumber}/`, 
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    remark
                })
            });
                const result =  await response.json();
            if(response.ok ){
                let msg = result.message;
                if(paymentMode === 'online'){
                    msg += '\n Since you paid online, your amount will be refunded to  your account within 1 week.'
                }
                setMessage(msg);
                setRemark('');
                setError('');
            }
            else{
                 setError(result.message || 'Failed to cancel order');
            }
        }
        catch (err){
                  setError("Something went wrong");
        }
              
    }
  return (
    <div>
        <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default CancelOrderModal