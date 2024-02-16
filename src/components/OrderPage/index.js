import React from 'react'
import "./style.scss"
import { Grid, IconButton } from '@mui/material'
import TextFields from '../common/TextFields'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AddressDrawer from '../common/AddressDrawer';
import { actions } from '../../redux/store';
import LogoutModal from '../common/LogoutModal';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import demop from "../../assets/image/demop.png";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import OrderDetailsModal from '../common/OrderDetailsModal';
import { handleStatusesBadge } from '../common/customBadge';
import CloseIcon from '@mui/icons-material/Close';

export default function OrderPage() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/home")
    }

    return (
        <>
            <div className='mt-[5rem] '>
                <div className='order_div lex flex-col p-[1.5rem] '>
                    <div className='flex flex-row gap-[5px] items-center '>
                        <div>
                            <span className='order_heading text-[25px]' >My Order</span>
                        </div>
                        <div >
                            <LocalMallOutlinedIcon className='bag_icon text-main' />
                        </div>
                    </div>

                    <div className='oinfo_div mt-[0.3rem]'>
                        <div>
                            <span className='order_desc_heading text-[18px]'>Mange and control your order</span>
                        </div>

                        <div className='mt-[1.3rem] '>
                            <Grid container spacing={4} style={{ minHeight: "50vh" }} >
                                <Grid item xs={12} lg={3} md={6} sm={6}  >
                                    <div className=' paperboxshadow h-[10rem] flex mb-[1rem] justify-between '  >
                                        <div className='flex items-center gap-[10px]'>
                                            <div className='order_img ' >
                                                <img className='w-[100%] h-[100%] object-cover' src={demop}></img>
                                            </div>
                                            <div className='flex flex-col '>
                                                <span className='order_name text-black'>Fossil gen 3 Watch</span>
                                                <span className='order_price text-main'>$200</span>
                                                <span className='order_quantity text-black'>Quantity : 1</span>
                                                <span className='order_time text-lighttext'>Oct 31,2023 at 11:00 AM</span>
                                            </div>
                                        </div>

                                        <div className='flex items-center more_icon_div' >
                                            <IconButton onClick={() => actions.modal.openOrderDetailsModal()}>
                                                <KeyboardArrowRightIcon className='more_icon text-main' />
                                            </IconButton>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    {/* order not available then show this dev */}
                    {/* <div className='flex justify-center items-center' style={{ height: "50vh" }} >
                        <div className='flex flex-col justify-center items-center not_found_div'>
                            <div>
                                <ErrorOutlineOutlinedIcon className='not_found_icon text-main' />
                            </div>
                            <div>
                                <span className='not_found_heading'>Any Order not available</span>
                            </div>
                            <div >
                                <span onClick={goToHomePage} className='text-main not_found_link underline  decoration-main cursor-pointer'>continue to shopping</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <OrderDetailsModal />

        </>

    )
}
