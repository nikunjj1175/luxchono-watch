import { Checkbox, Drawer, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Buttons from '../../common/Buttons';
import { useSelector } from 'react-redux';
import { actions } from '../../../redux/store';
import './style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AddAddressDrawer from '../AddAddressDrawer';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import DeleteAddressModal from '../DeleteAddressModal';
function AddressDrawer() {

    const DialogOpen = useSelector((state) => state.modal.Address);

    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeAddressDrawer();
    }

    const [selectedAddress, setSelectedAddress] = useState(null);

    const AddressCheckboxChange = (event) => {
        setSelectedAddress(event.target.name);
    }

    const location = useLocation();
    const { pathname } = location;

    console.log(pathname, "pathname")

    //setps

    return (
        <>
            <Drawer
                className='address_drawer'
                anchor="right"
                open={DialogOpen.open}
                onClose={onCancel}
                transitionDuration={1000}>


                <div className='addres_drawer_div' style={{ width: "400px" }}>
                    {/* ---------------- header ----------------- */}
                    <div className="address_drawer_header_wrapper">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "5px", height: "0px" }}>

                                <p className='addres_title'
                                    style={{
                                        color: '#212121',
                                        fontSize: '24px',
                                        fontWeight: "600",
                                        marginLeft: "0.5rem"
                                    }}>
                                    {`My Address`}
                                </p>
                                <HomeOutlinedIcon className='text-main address_icon' />
                            </div>
                            <div onClick={onCancel}>
                                <CloseIcon className="!cursor-pointer text-black mr-[0.5rem]" style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    </div>
                    {/* ---------------- header ----------------- */}

                    <div className='main_address_div' style={{ overflow: "auto", paddingBottom: "6rem" }}>
                        <div className='p-[0.5rem]'>
                            <Buttons onClick={() => actions.modal.openAddAddressDrawer()} startIcon={<AddCircleOutlineOutlinedIcon className='add_icon' />} text={"Add New Address"} variant={'outlined'} className={"add_address_btn"} />
                        </div>

                        <div className='flex flex-col gap-[4px] justify-center paperboxshadow  m-[1rem] p-[1rem]  address_box' >
                            <div className='flex justify-between items-center' >


                                <div className='flex gap-[5px] items-center' >
                                    <div>
                                        <HomeIcon />
                                    </div>
                                    <div>
                                        <span className='address_type'>{"Home"}</span>
                                    </div>

                                </div>

                                <div className='add_check_box flex justify-center text-center  items-center'>
                                    <Checkbox disableRipple checked={selectedAddress === '1'} name={'1'} onChange={AddressCheckboxChange} />
                                </div>

                            </div>
                            <div>
                                <div>
                                    <span className='text-main address_name'>{"Het"}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span className='address_line'>{"1 ruplai sco hirabaug varacha read suart  1 ruplai sco hirabaug varacha read suart  "}</span>
                                </div>

                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='address_phone'>{"7678866666"}</span>
                                <div onClick={() => actions.modal.openDeleteAddressDrawer()}>
                                    <DeleteOutlineOutlinedIcon className='text-red mr-[0.5rem] cursor-pointer delete_icon' />
                                </div>
                            </div>
                        </div>
                        {/* address are not available then show this div */}
                        {/* <div className='flex gap-[5[x]] flex-col items-center justify-center h-[65vh] p-[1rem] text-center w-[100%]'>
                            <div>
                                <NotListedLocationOutlinedIcon className='text-main not_add_icon' />
                            </div>
                            <div>
                                <span className='not_add_dec'>{"Delivery address not available , Please add"}</span>
                            </div>

                        </div> */}
                    </div>


                    {/* ----------------  footer ----------------- */}

                    <div className="address_drawer_footer">

                        <div className='flex gap-[10px] justify-end'>
                            <Buttons onClick={onCancel} type={'submit'} text={"Close"} variant={'outlined'} className={'address_close_btn'} />
                        </div>
                    </div>
                    {/* ----------------  footer ----------------- */}


                </div>

            </Drawer>

            <AddAddressDrawer />
            <DeleteAddressModal />
        </>
    );
}

export default AddressDrawer;
