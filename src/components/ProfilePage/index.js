import React, { useState } from 'react'
import "./style.scss"
import { Grid } from '@mui/material'
import TextFields from '../common/TextFields'
import HomeIcon from '@mui/icons-material/Home';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AddressDrawer from '../common/AddressDrawer';
import { actions } from '../../redux/store';
import LogoutModal from '../common/LogoutModal';

export default function ProfilePage() {

    const [checkbox] = useState(false);
    return (
        <>
            <div className='mt-[5rem] '>
                <div className='profile_div lex flex-col p-[1rem]'>
                    <div >
                        <span className='profile_heading text-[28px]' >My Account</span>
                    </div>
                    <div>
                        <span onClick={() => actions.modal.openLogoutModal()} className='login_link text-[18px] underline decoration-lighttext cursor-pointer' >Logout</span>
                    </div>

                    <div className='pinfo_div mt-[1rem]'>
                        <div>
                            <span className='info_heading text-[20px]'>personal information</span>
                        </div>

                        <div className='mt-[0.5rem]'>
                            <Grid container spacing={4}  >
                                <Grid item xs={12} lg={3} md={6} sm={6}  >
                                    <div className='flex flex-col gap-[5px]'>
                                        <span className='text_heading'>Name</span>
                                        <TextFields
                                            disabled={true}
                                            className={"nametext"}
                                            name={"name"}
                                            placeholder={"Name"}
                                            autoComplete={"off"}
                                        />

                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={3} md={6} sm={6} >
                                    <div className='flex flex-col gap-[5px]'>
                                        <span className='text_heading'>Email</span>
                                        <TextFields
                                            disabled={true}
                                            className={"nametext"}
                                            name={"email"}
                                            placeholder={"Email"}
                                            autoComplete={"off"}
                                        />

                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={3} md={6} sm={6} >
                                    <div className='flex flex-col gap-[5px]'>
                                        <span className='text_heading'>Phone</span>
                                        <TextFields
                                            disabled={true}
                                            className={"nametext"}
                                            name={"phone"}
                                            placeholder={"Phone"}
                                            autoComplete={"off"}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div className='mt-[1.5rem]'>
                            <Grid container spacing={4}  >
                                <Grid item xs={12} lg={3} md={6} sm={12}  >
                                    <div className='flex flex-col gap-[5px] bg-boxbac p-[0.5rem] rounded-[10px] cursor-pointer'>
                                        <div className='flex  gap-[5px] items-center'>
                                            <div>
                                                <span className='heading_text'>My Orders</span>
                                            </div>
                                            <div>
                                                <Inventory2OutlinedIcon className='info_icon ' />
                                            </div>

                                        </div>
                                        <div>
                                            <span className='heading_dec'>View and manage oredr</span>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} lg={3} md={6} sm={12} style={{ height: "32vh" }} >
                                    <div className='flex flex-col gap-[5px] bg-boxbac p-[0.5rem] rounded-[10px] cursor-pointer' onClick={() => actions.modal.openAddressDrawer()}>
                                        <div className='flex  gap-[5px] items-center'>
                                            <div>
                                                <span className='heading_text'>Manage Addressess</span>
                                            </div>
                                            <div>
                                                <FmdGoodOutlinedIcon className='info_icon ' />
                                            </div>
                                        </div>
                                        <div>
                                            <span className='heading_dec'>Edit,add or remove your delivery addresses</span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <AddressDrawer showCheckBox={checkbox} />
            <LogoutModal />
        </>


    )
}
