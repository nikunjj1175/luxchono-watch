import React from 'react'
import "./style.scss"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';

export default function PaymentOrderPage() {

  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/home")

  }

  return (
    <div className='mt-[5rem] '>

      <div className='paymentOrder'>
        <div className='flex flex-col h-[60vh] justify-center  items-center gap-[5px]' >
          <div>
            <TaskAltIcon className='text-main conform_icon' />
          </div>
          <div>
            <span className='conform_heading text-black'>{"Order Placed"}</span>
          </div>
          <div className='flex text-center'>
            <span className='conform_dec text-black'>{"Your Order placed successfully , check Your Order list Thank you"}</span>
          </div>
          <div>
            <span className='conform_date text-black flex gap-[5px] '>
              <span className='text-main'>Order Date</span>
              <span className='text-black'>Feb 06,2024</span>
            </span>
          </div>

          <div className="mt-[2rem]" onClick={goToHome} >
            <span className='conform_link text-main underline  decoration-main cursor-pointer'>{"Back to home"}</span>
          </div>

        </div>
      </div>

    </div>
  )
}
