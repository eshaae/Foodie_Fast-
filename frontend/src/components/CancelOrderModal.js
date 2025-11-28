import React, {useState} from 'react'

const CancelOrderModal = ({show, handleClose,orderNumber,paymentMode} ) => {
    const [remark, setRemark] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async() =>{
        if(!remark.trim()){
            setError('Please Provide a Reason for Cancellation.');
           return;
        }

        try{
            const response = await fetch(`http://127.0.0.1:8000/api/cancel_order/${orderNumber}/`, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    remark
                }),
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
              
    };
  return (
    <div>
        <div class={`modal fade ${show ? 'show d-block' : ''}`} tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cancel Order #{orderNumber}</h5>
        <button type="button" class="btn-close" onClick={handleClose}></button>
      </div>
      <div class="modal-body">
        {message ? (
          <div className='alert alert-success'>
            {message}
          </div>
        ) :(
            <>
            <label className='form-label'>Reason for Cancellation</label>
            <textarea className='form-control' rows='4' value={remark}
            onChange={(e) => setRemark(e.target.value)} placeholder='Enter reason here...'
            > </textarea>
              {error && <div className='text-danger mt-2'>{error}</div>}

           
            </>
        )}
      </div>
      <div classNme="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        <button type="button" className="btn btn-danger" onClick={handleSubmit}>Cancel Order</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default CancelOrderModal