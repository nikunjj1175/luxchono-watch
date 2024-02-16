import React, { useEffect, useState } from 'react'
import "./style.scss"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetOrderQuery } from '../../api/Order';
import { actions } from '../../redux/store';
import dayjs from 'dayjs';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPdf from './OrderPdf';


export default function PaymentOrderPage() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get('orderId');

  const { data: OrderApiData, isFetching: OrderFetching } = useGetOrderQuery(orderId);

  const [orderData, setOrderData] = useState([])

  console.log(orderData, "orderData")

  useEffect(() => {
    actions.loder.setLoading(OrderFetching);
    setOrderData(OrderApiData?.data)
    actions.loder.setLoading(OrderFetching);
  }, [OrderApiData])

  const navigate = useNavigate()

  const goToOrder = () => {
    navigate("/order")
  }


  return (
    <div className='mt-[5rem]  p-[1rem]'>

      <div className='paymentOrder'>
        <div className='flex flex-col h-[60vh] justify-center  items-center gap-[5px]' >
          {!OrderFetching &&
            <>
              <div>
                <TaskAltIcon className='text-main conform_icon' />
              </div>
              <div>
                <span className='conform_heading text-black'>{"Order Placed"}</span>
              </div>
              <div className='flex row gap-[4px] items-center' style={{ flexWrap: "nowrap" }}>
                <span className='text-black order_idt '>{"Order Id is"}</span>
                <span className='order_idi text-lighttext order_id '>{orderData?.orderId}</span>
              </div>
              <div className='flex text-center'>
                <span className='conform_dec text-black'>{"Your Order placed successfully , check Your Order list Thank you"}</span>
              </div>
              <div>
                <span className='conform_date text-black flex gap-[6px] '>
                  <span className='text-main'>Order Date</span>

                  {console.log(orderData?.date, "orderData?.date")}
                  <span className='text-black'>{dayjs(orderData?.date).format('MMM DD, YYYY')}</span>
                </span>
              </div>

              <div className="mt-[2rem]" onClick={goToOrder} >
                <span className='conform_link text-main underline  decoration-main cursor-pointer'>{"Check Order"}</span>
              </div>

              <div className="mt-[1rem]">
                <button className='pdf_download' onClick={() => { }}  >
                  <PDFDownloadLink document={<OrderPdf orderData={orderData} />} fileName="order_bill.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading Order...' : 'Download Order')}
                  </PDFDownloadLink>
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
