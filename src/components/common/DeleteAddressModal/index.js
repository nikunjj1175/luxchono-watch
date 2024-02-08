import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';

export default function DeleteAddressModal() {

    const DialogOpen = useSelector((state) => state.modal.DeleteAddress);
    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeDeleteAddressDrawer();
    }

    const logout = () => {
        navigate('/home')
        onCancel();
        localStorage.removeItem("lw-token")
    }


    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='delete_address'>
            <div className='delete_add_content'>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>
                        {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center '>
                                <span className='text-black  delete_add_title mt-[0.2rem] text-start' style={{ fontSize: "22px", fontWeight: "600" }} >
                                    {"Are You Sure you want to Delete this Address?"}
                                </span>
                            </div>
                        </div>

                        <div className='btns flex gap-[10px] mt-[0.3rem]'>
                            <Buttons
                                onClick={onCancel}
                                type={"submit"}
                                text={"Cancel"}
                                variant={"outlined"}
                                className={"delete_cancel_btn"}
                            />
                            <Buttons
                                onClick={logout}
                                type={"submit"}
                                text={"Yes"}
                                variant={"contained"}
                                className={"delete_remove_btn"} />
                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}