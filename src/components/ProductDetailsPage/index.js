import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "./style.scss"
import Buttons from '../common/Buttons';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ProductBox from '../common/ProductBox';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddToCartMutation, useGetCartProductQuery } from '../../api/Cart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { actions } from '../../redux/store';
import { toast } from 'react-toastify';
import { useGetLikeProductQuery, useGetProductQuery, useLikeProductMutation } from '../../api/Product';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CartDrawer from '../CartDrawer';
import LoginAlertModal from '../common/LoginAlertModal';


const ProductDetails = () => {

    const location = useLocation();

    const { state } = location;

    const productId = state?.productId;

    const navigate = useNavigate();



    const TOKEN = localStorage.getItem('lw-token');

    const [AddToCart, { isLoading: AddToCartFetching }] = useAddToCartMutation();

    const { data: CartProductApiData, isFetching: CartProductFetching } = useGetCartProductQuery();

    const { data: LikeProductApiData, isFetching: likeProductFetching } = useGetLikeProductQuery();

    const { data: SimilarProductApiData, isFetching: SimilarProductFetching } = useGetProductQuery({ size: 4 });

    const [similarProductData, setSimilarProductData] = useState([])

    const [LikeProduct, { isLoading }] = useLikeProductMutation();

    // const [likeProductData, setLikeProductData] = useState([]);

    const [cartProductDataLength, setCartProductDataLength] = useState(CartProductApiData?.data?.cartProducts?.length);

    const [showLikeButton, setShowLikeButton] = useState(LikeProductApiData?.data?.includes(productId));

    useEffect(() => {

        actions.loder.setLoading(SimilarProductFetching && CartProductFetching);
        setCartProductDataLength(CartProductApiData?.data?.cartProducts?.length);
        setShowLikeButton(LikeProductApiData?.data?.includes(productId))
        setSimilarProductData(SimilarProductApiData?.data)
        actions.loder.setLoading(SimilarProductFetching && CartProductFetching);

    }, [CartProductApiData, LikeProductApiData, SimilarProductApiData])

    const likeProducts = async () => {

        if (TOKEN) {
            setShowLikeButton(!showLikeButton)
            try {
                const body = {
                    pid: productId
                }
                const response = await LikeProduct(body);
            }
            catch (error) {
                console.log(error)
                setShowLikeButton(showLikeButton)
            }
        } else {
            actions.modal.openLoginAlertModal()
        }

    }

    const handleAddToCart = async () => {

        if (TOKEN) {
            const body = {
                pid: productId
            }

            actions.loder.setLoading(true);
            try {
                const response = await AddToCart(body);
                const { statusCode, message, } = response?.data;
                if (statusCode === 200) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            }
            catch (error) {
                console.log(error)
            }
            actions.loder.setLoading(false);
        } else {
            actions.modal.openLoginAlertModal()
        }


    }

    console.log(productId, "productId")

    const images = [
        { url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png" },
        { url: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png" },
        { url: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png" },
        { url: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png" },
    ]

    const ViewAllProduct = () => {
        navigate("/products")
    }

    return (
        <>
            <div style={{ marginTop: "5rem" }} className='product_details'>
                <Grid container spacing={4} className="pwatch_grid" >
                    <Grid item xs={12} lg={4} md={4} sm={12}  >
                        <div className='m-[1.5rem]'>
                            <Carousel
                                interval={7000}
                                showStatus={false}
                                showIndicators={false}
                                infiniteLoop={true}
                                autoPlay={true}
                                showArrows={false}>
                                {images.map((image, index) => (
                                    <div
                                        className="product_images"
                                        key={index}
                                        style={{ height: "500px", width: "500px", overflow: "hidden" }}>
                                        <img
                                            className="slider_image"
                                            src={image.url}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            alt={`Image ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </Grid>

                    <Grid item xs={12} lg={8} md={8} sm={12}  >

                        <div className='flex flex-col m-[1.5rem]'>
                            <div className='flex justify-between items-center'>

                                {showLikeButton ? (<div >
                                    <FavoriteIcon onClick={likeProducts} style={{ fontSize: "21px" }} className="text-main cursor-pointer" />
                                </div>) : (<div >
                                    <FavoriteBorderOutlinedIcon onClick={likeProducts} style={{ fontSize: "22px" }} className="text-main cursor-pointer" />
                                </div>)}
                                {/* <Buttons
                                    startIcon={<AddShoppingCartIcon style={{ fontSize: "24px" }} />}
                                    type={"submit"}
                                    text={"Add To Cart"}
                                    variant={"contained"}
                                    className={"add_cart_btn"}
                                /> */}

                                {TOKEN && <div className='flex' onClick={() => actions.modal.openCartDrawer()} >
                                    <ShoppingCartOutlinedIcon className='text-main add_cart_icon' />
                                    {<div className='bg-main rounded-[50%] items-center justify-center flex w-[20px] h-[20px]' style={{ marginLeft: "-12px", marginTop: "-5px" }}>
                                        <span className='text-[13px] text-white font-medium '>{cartProductDataLength}</span>
                                    </div>}
                                </div>}

                            </div>
                            <div className='mt-[1rem] flex flex-col gap-[-3px]'>
                                <span className='text-[25px]' style={{ fontWeight: "600" }}>{"Bell Ross RR-33"}</span>
                                <span className='!font-bold text-[15px]'>{"Men's Watch"}</span>
                            </div>
                            <div className=' mt-[0.5rem]'>
                                <span className='text-[18px] text-lighttext' style={{ fontWeight: "500" }}>
                                    {"Wireless Earbuds with upto 60 Hours Playback, 13mm Drivers, IWP Technology, 650mAh Charging Caserbuds with upto 60 Hours PlaybackWireless Earbuds with upto 60 Hours Playback, 13mm Drivers, IWP Technology, 650mAh Charging Caserbuds with upto 60 Hours Playback"}
                                </span>
                            </div>
                            <div>

                                <div className='mt-[0.7rem] flex gap-[10px] items-center'>
                                    <div >
                                        <Rating name="half-rating-read" value={3.5} precision={0.5} readOnly />
                                    </div>
                                    <div>
                                        <span>(3.5)</span>
                                    </div>
                                </div>

                            </div>
                            <div className="flex gap-[10px] items-center mt-[0.5rem]">
                                <span className='text-[23px]'> <span style={{ fontWeight: "700" }}>{"23,455 ₹"}</span></span>
                                <span className="text-hide !font-bold text-[20px]" style={{ textDecoration: "line-through" }}> 46900 ₹</span>

                                <span className='text-main text-[15px]' style={{ fontWeight: "700" }}>{"50 % off"}</span>
                            </div>
                            <div className='mt-[-5px]'>

                                <span className='text-[16px] text-secondary' style={{ fontWeight: "500" }}>{"Inclusive of all taxes"}</span>

                            </div>

                            <div className='mt-[0.7rem]'>
                                <div className='flex gap-[8px] items-center'>
                                    <span className='text-[20px] text-main' style={{ fontWeight: "600" }}>{"Bell & Ross"}</span>
                                    <span className='text-[15px] ' style={{ fontWeight: "600" }}>{"1 Yers warranty"}</span>
                                </div>
                            </div>

                            <div>
                                <span className='text-[15px]' style={{ fontWeight: "600" }}>{"delivered next 7 days"}</span>
                            </div>

                            <div className='mt-[1.5rem]'>
                                {/* <Buttons
                                    type={"submit"}
                                    text={"buy now"}
                                    variant={"outlined"}
                                    className={"by_now"}
                                /> */}
                                <Buttons
                                    onClick={handleAddToCart}
                                    startIcon={<AddShoppingCartIcon style={{ fontSize: "24px" }} />}
                                    type={"submit"}
                                    text={"Add To Cart"}
                                    variant={"contained"}
                                    className={"add_cart_btn"}
                                />

                            </div>

                        </div>

                    </Grid>
                </Grid>

                <div>
                    <div className="similar_div flex justify-between items-center">
                        <div className="flex gap-[3px] items-center">
                            <span className="similar_span underline  decoration-main" >{"Similar"}</span>
                            <span className="similar_span2">{"Watches"}</span>
                        </div>

                        <div className="flex  gap-[5px] view_div cursor-pointer" onClick={ViewAllProduct}>
                            <span className="text-hide !font-bold text-[16px] cursor-pointer">View All</span>
                            <div>
                                <ArrowCircleRightOutlinedIcon className="text-main " style={{ fontSize: "19px" }} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="swatch_div m-[1rem]">
                    <Grid container spacing={4} className="pwatch_grid" >
                        {similarProductData?.map((productItem, index) => {
                            return (
                                <>
                                    <Grid item xs={12} lg={3} md={4} sm={6}  >
                                        <ProductBox productItem={productItem} LikeProductApiData={LikeProductApiData} />
                                    </Grid>
                                </>
                            )
                        })}
                    </Grid>
                </div>

            </div>
            <CartDrawer />
            <LoginAlertModal />
        </>



    )
}

export default ProductDetails