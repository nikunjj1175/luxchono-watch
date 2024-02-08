import { Drawer, Step, StepLabel, Stepper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Buttons from '../common/Buttons';
import { useSelector } from 'react-redux';
import { actions } from '../../redux/store';
import './style.scss';
import demop from "../../assets/image/demop.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveProductDrawer from '../common/RemoveProductModal/index';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddQuantityMoadl from '../common/AddQuantityMoadl';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddressDrawer from '../common/AddressDrawer';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useGetCartProductQuery } from '../../api/Cart';
import Loader from '../common/Loader';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useMakeOrderMutation, useMakeOrderQuery } from '../../api/Order';
import { toast } from 'react-toastify';

function CartDrawer() {
    const DialogOpen = useSelector((state) => state.modal.Cart);

    const { data: CartProductApiData, isFetching: CartProductFetching } = useGetCartProductQuery({}, { skip: !DialogOpen?.open });
    const [MakeOrder, { isLoading: MakeOrderFetching }] = useMakeOrderMutation();

    const [makeOrderData, setMakeOrderData] = useState([]);
    const [cartProductData, setCartProductData] = useState([]);
    const [cartTotalSummary, setCartTotalSummary] = useState()
    const [orderSummaryData, setOrderSummaryData] = useState([]);
    const [orderSummaryProduct, setOrderSummaryProduct] = useState([])
        ; const navigate = useNavigate()

    console.log(orderSummaryData, "orderSummaryData")


    useEffect(() => {
        setCartProductData(CartProductApiData?.data?.cartProducts);
        setCartTotalSummary(CartProductApiData?.data)
    }, [CartProductApiData])

    //make order body data
    useEffect(() => {
        const makesOrders = cartProductData?.map((item) => {
            return {
                pid: item?.product?._id,
                quantity: item?.quantity,
            }
        })

        setMakeOrderData(makesOrders)
    }, [cartProductData, CartProductApiData])



    //makeOrder -------------------->setp-1
    const handleMakeOrder = async () => {
        try {
            actions.loder.setLoading(true);
            const response = await MakeOrder(makeOrderData);
            const { statusCode, message, data } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                setOrderSummaryData(data)

                console.log(data?.orderProducts, "data?.orderProducts")
                setOrderSummaryProduct(data?.orderProducts)
                handleNext();
            } else {
                toast.error(message);
            }
            actions.loder.setLoading(false);

        }
        catch (error) {
            console.log(error)
        }
    }


    //setps
    const orderStepsArr = ["Add Cart", "Summary", "Payment"];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    //go to home
    const gotohome = () => {
        navigate("/home")
        actions.modal.closeCartDrawer();
    }


    //oncancel
    const onCancel = () => {
        actions.modal.closeCartDrawer();
    }

    return (
        <>
            <Drawer
                className='cart_drawer'
                anchor="right"
                open={DialogOpen.open}
                onClose={onCancel}
                transitionDuration={1000}>


                <div className='cart_drawer_div' style={{ width: "400px" }}>
                    {/* ---------------- header ----------------- */}
                    <div className="cart_drawer_header_wrapper">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "5px", height: "0px" }}>

                                <p className='cart_title'
                                    style={{
                                        color: '#212121',
                                        fontSize: '24px',
                                        fontWeight: "600",
                                        marginLeft: "0.5rem"
                                    }}>
                                    {`${activeStep === 0 ? `Cart` : `Order Summary`}`}
                                </p>
                                {activeStep === 0 ? (<ShoppingBagIcon className='text-main' />) : (<ShoppingCartOutlinedIcon className='text-main' style={{ fontSize: "25px" }} />)}
                            </div>
                            <div onClick={onCancel}>
                                <CloseIcon className="!cursor-pointer text-black mr-[0.5rem]" style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    </div>
                    {/* ---------------- header ----------------- */}


                    {CartProductFetching ? (
                        <div className='flex justify-center items-center h-[90vh]'>
                            <Loader height={"50"} width={"50"} />
                        </div>) : (cartProductData?.length ? (<>
                            <div style={{ overflow: "auto", paddingBottom: "14rem" }}>


                                {/* ---------------- cart div ----------------- */}
                                {activeStep === 0 && <div className='cart_products p-[0.8rem]' style={{ cursor: "pointer" }}>
                                    {activeStep !== 0 && <div>
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {orderStepsArr.map((label, i) => (
                                                <Step key={label} style={{ fontSize: '16px' }}>
                                                    <StepLabel key={i}>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </div>}

                                    {cartProductData?.map((cartItem, row) => {
                                        return (
                                            <>
                                                <div className='w-[100%]  paperboxshadow  flex mb-[1rem] '  >
                                                    <div className='flex items-center'>
                                                        <div className='cart_img flex items-center' >
                                                            <div>
                                                                <img className='w-[100%] h-[100%] object-cover' src={cartItem?.product?.thumbnail}></img>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: '0.4rem' }}>
                                                        <div style={{ display: "flex", justifyContent: "end" }} onClick={() => actions.modal.openRemoveDialog(cartItem)} >
                                                            <DeleteForeverIcon style={{ cursor: "pointer" }} className='text-red cart_delete_icon' />
                                                        </div>

                                                        <div className='flex flex-col gap-[2px]' >
                                                            <div >
                                                                <span className='text-black text-[18px] cart_name' style={{ fontWeight: "600" }}>{cartItem?.product?.name}</span>
                                                            </div>
                                                            <div>
                                                                <span className='text-main text-[16px] cart_price' style={{ fontWeight: "600" }}>{`${cartItem?.product?.price} ₹`}</span>
                                                            </div>
                                                            <div>
                                                                <Buttons onClick={() => actions.modal.openAddQuantityDialog(cartItem)} type={'submit'} text={`Qty ${cartItem?.quantity}`} variant={'outlined'} className={'quantity_btn'} endIcon={<KeyboardArrowDownIcon style={{ fontSize: "18px" }} />} />
                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>}
                                {/* ---------------- cart div ----------------- */}




                                {/* ---------------- summary div ----------------- */}
                                {activeStep === 1 && <div className='cart_products p-[0.8rem]' style={{ cursor: "pointer" }}>
                                    {activeStep !== 0 && <div>
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {orderStepsArr.map((label, i) => (
                                                <Step key={label} style={{ fontSize: '16px' }}>
                                                    <StepLabel key={i}>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </div>}


                                    {/*-------------------address are available then show this div------------------------ */}
                                    <div className='address_div paperboxshadow h-[9rem] mt-[1rem] p-[0.7rem]' >
                                        <div className='flex items-center justify-between '>
                                            <span className='addres_heading'>{"Shipping Address"}</span>
                                            <div className='change_btn' onClick={() => actions.modal.openAddressDrawer()} >
                                                <span className='change_text'>Change</span>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-[2px] mt-[0.3rem]' >
                                            <span className='text-main add_name' >{"het"}</span>
                                            <span className='text-black add_address'>{"1 rupli scocitey"}</span>
                                            <span className='text-black add_phon'>{"7880529184"}</span>
                                        </div>
                                    </div>
                                    {/*-------------------address are available then this div------------------------ */}



                                    {/*-------------------address not are available then show this div------------------------ */}
                                    <div >
                                        <Buttons onClick={() => actions.modal.openAddressDrawer()} startIcon={<AddCircleOutlineOutlinedIcon className='cart_add_icon' />} text={"Add New Address"} variant={'outlined'} className={"cart_add_address_btn"} />
                                    </div>
                                    {/*-------------------address not are available then show this div------------------------ */}


                                    {orderSummaryProduct?.map((orderItem) => {

                                        console.log(orderItem, "orderItem")
                                        return (
                                            <>
                                                <div className='w-[100%] paperboxshadow h-[9rem] flex mb-[1rem] mt-[1rem]'>

                                                    <div className='flex items-center'>
                                                        <div className='cart_img flex items-center' >
                                                            <div>
                                                                <img className='w-[100%] h-[100%] object-cover' src={orderItem?.product?.thumbnail}></img>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: '0.4rem', justifyContent: "center" }}>

                                                        <div className='flex flex-col gap-[4px]' >
                                                            <div >
                                                                <span className='text-black text-[18px] cart_name' style={{ fontWeight: "600" }}>{`${orderItem?.product?.name}`}</span>
                                                            </div>
                                                            <div>
                                                                <span className='text-main text-[16px] cart_price' style={{ fontWeight: "600" }}>{`${orderItem?.product?.price}₹`}</span>
                                                            </div>
                                                            <div className='flex items-center gap-[5px]'>
                                                                <Buttons type={'submit'} text={`Qty ${orderItem?.quantity} `} variant={'outlined'} className={'quantity_btn'} endIcon={<KeyboardArrowDownIcon style={{ fontSize: "18px" }} />} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

                                </div>}
                                {/* ---------------- summary div ----------------- */}


                            </div>


                            {/* ----------------  footer ----------------- */}
                            <div className="drawer_footer">
                                <div className='mt-[0.4rem]'>
                                    <div className='items_menus flex flex-col gap-[5px]'>
                                        <div className='flex justify-between'  >
                                            <span className='cart_item text-[15px]' style={{ fontWeight: "600" }}>
                                                {activeStep === 0 ?
                                                    (`Sub Total (${cartTotalSummary?.cartProducts?.length} items)`) :
                                                    activeStep === 1 && (`Sub Total (${orderSummaryData?.orderProducts?.length} items)`)}

                                            </span>

                                            <>{console.log(orderSummaryData?.orderProducts?.length, "orderSummaryData?.orderProducts?.length")}</>
                                            <span className='cart_item text-[15px]' style={{ fontWeight: "600" }}>
                                                {activeStep === 0 ?
                                                    (`${cartTotalSummary?.cartTotalAmount?.toLocaleString('en-IN')} ₹`) :
                                                    activeStep === 1 && (`${orderSummaryData?.totalAmount?.toLocaleString('en-IN')} ₹`)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between ' >
                                            <span className='cart_discount text-[15px]' style={{ fontWeight: "600" }}>{"Discount"}</span>
                                            <span className='cart_discount text-[15px]' style={{ fontWeight: "600" }}>
                                                {activeStep === 0 ?
                                                    (`${cartTotalSummary?.cartDiscountAmount?.toLocaleString('en-IN')} ₹`) :
                                                    activeStep === 1 && (`${orderSummaryData?.discountAmount?.toLocaleString('en-IN')} ₹`)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between ' >
                                            <span className='cart_charge text-[15px]' style={{ fontWeight: "600" }}>{"Shipping Charge"}</span>
                                            <span className='cart_charge text-[15px]' style={{ fontWeight: "600" }}>
                                                {activeStep === 0 ?
                                                    (`${cartTotalSummary?.shippingCharge?.toLocaleString('en-IN') || 0} ₹`) :
                                                    (`${orderSummaryData?.shippingCharge?.toLocaleString('en-IN') || 0} ₹`)}

                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between bg-main text-white p-[0.5rem] total_price'>
                                        <span className='cart_total text-[16px]' style={{ fontWeight: "600" }}>{"Total"}</span>
                                        <span className='cart_total text-[16px]' style={{ fontWeight: "600" }}>
                                            {activeStep === 0 ?
                                                (`${cartTotalSummary?.cartPaymentAmount?.toLocaleString('en-IN')} ₹`) :
                                                (`${orderSummaryData?.paymentAmount?.toLocaleString('en-IN')} ₹`)}
                                        </span>
                                    </div>
                                </div>

                                {activeStep === 1 && <div className='flex justify-center'>
                                    <span className='flex items-center gap-[3px] delivered_title text-[15px]' style={{ fontWeight: "600" }}>
                                        <span >Delivered on</span>
                                        <span className='text-main underline  decoration-main'>Feb 11,2024</span>
                                    </span>
                                </div>}

                                <div className='flex gap-[10px] justify-end'>
                                    {activeStep === 0 && <Buttons onClick={handleMakeOrder} type={'submit'} text={"Place Order"} variant={'outlined'} className={'place_order_btn'} />}

                                    {activeStep === 1 &&
                                        <>
                                            <Buttons onClick={handleBack} type={'submit'} text={"Back"} variant={'outlined'} className={'order_back'} />
                                            <Buttons onClick={handleNext} type={'submit'} text={"Continue"} variant={'contained'} className={'continue'} />
                                        </>
                                    }
                                </div>
                            </div>

                            {/* ----------------  footer ----------------- */}


                        </>) : (<div className='flex flex-col gap-[5px] items-center  justify-center h-[98vh]'>
                            <div>
                                <ProductionQuantityLimitsIcon className='text-main noitem_icon' />
                            </div>
                            <div>
                                <span className='text-black text-[23px] noitem_title'>Your cart is Empty</span>
                            </div>
                            <div className='flex text-center '>
                                <span className='text-lighttext text-[17px] noitem_dec'>Looks like you havent's added anything to your cart yet</span>
                            </div>
                            <div className='flex text-center mt-[2rem]' onClick={gotohome}>
                                <span className='text-main text-[17px] noitem_link underline  decoration-main cursor-pointer'>Continue Shopping</span>
                            </div>
                        </div>)

                    )}

                </div>

            </Drawer>
            <RemoveProductDrawer />
            <AddQuantityMoadl />
            <AddressDrawer />



        </>
    );
}

export default CartDrawer;
