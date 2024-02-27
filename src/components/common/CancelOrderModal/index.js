import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import WarningIcon from '@mui/icons-material/Warning';

export default function CancelOrderModal() {
    const DialogOpen = useSelector((state) => state.modal.CancelOrder);
    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeCancelOrderModal();
    }

    const cancelOrder = () => {
        navigate('/home')
        onCancel();
    }

    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='cancel_order'>
            <div className='cancel_order_content'>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>
                        {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
                        <div className='flex flex-col'>
                            <div className='flex  flex-col justify-center gap-[3px] '>
                                <div className='flex items-center gap-[10px]'>
                                    <WarningIcon className='text-main warning_icon' />
                                    <span className='text-black cancel_item_title mt-[0.2rem] text-start' style={{ fontSize: "20px", fontWeight: "600" }} >
                                        {"Cancel order"}
                                    </span>

                                </div>

                                <span className='text-lighttext cancel_item_dec mt-[0.2rem] text-start' style={{ fontSize: "17px", fontWeight: "600" }} >
                                    {"Are You sure you want to cancel this Order?"}
                                </span>
                            </div>
                        </div>

                        <div className='btns flex gap-[10px] mt-[0.3rem]'>
                            <Buttons
                                onClick={onCancel}
                                type={"submit"}
                                text={"Cancel"}
                                variant={"outlined"}
                                className={"cancel_btn"} />
                            <Buttons
                                onClick={cancelOrder}
                                type={"submit"}
                                text={"Yes"}
                                variant={"contained"}
                                className={"yes_btn"} />
                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}