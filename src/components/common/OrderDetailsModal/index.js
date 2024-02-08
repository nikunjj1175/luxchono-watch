import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { Box, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from 'bootstrap';
import { handleStatusesBadge } from '../customBadge';
import CloseIcon from '@mui/icons-material/Close';
import CancelOrderModal from '../CancelOrderModal';

export default function OrderDetailsModal() {

    const DialogOpen = useSelector((state) => state.modal.OrderDetails);

    console.log(DialogOpen, "DialogOpen")
    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeOrderDetailsModal();
    }

    const logout = () => {
        navigate('/home')
        onCancel();
        localStorage.removeItem("lw-token")
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            label: 'Ordered',
            description: `Feb 06,2024 02:26 PM`,
        },
        {
            label: 'Shipped',
            description: 'Feb 06,2024 02:26 PM',
        },
        {
            label: 'Out For Delivery',
            description: `Feb 06,2024 02:26 PM`,
        },
        {
            label: 'Delivered',
            description: `Feb 06,2024 02:26 PM`,
        },
    ];


    return (
        <>
            <Dialog
                open={DialogOpen.open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='order_details'>
                <div className='order_details_content'>
                    <DialogContent >
                        <div className='flex flex-col'>
                            {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}

                            <div className='flex  justify-end' onClick={onCancel}>
                                <CloseIcon className='text-black cursor-pointer  close_icon' />
                            </div>
                            <div className='flex flex-col'>

                                <div className='flex flex-col gap-[2px] '>
                                    <span className='order_heading flex gap-[5px]' >
                                        <span className='text-black'>{"Order Id"}</span>
                                        <span className='text-main'>{"#483273477"} </span>
                                    </span>

                                    <div className='flex gap-[5px] text-[14px]' style={{ fontWeight: "600" }} >
                                        <span className='text-black '>{"Fossil gen 3 Watch"}</span>
                                    </div>

                                    <span className='flex gap-[5px] text-[14px]' style={{ fontWeight: "600" }} >
                                        <span className='text-black '>{"3 quantity : "}</span>
                                        <span className='text-main '>{"3000$"} </span>
                                    </span>

                                    <span className='mt-[0.3rem]'>
                                        <span style={handleStatusesBadge("Pending")}>
                                            {"Pending"}
                                        </span>
                                    </span>

                                </div>

                                <div className='flex mt-[0.7rem]'>

                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel>
                                                    <span className='order_status'>{step.label}</span>
                                                </StepLabel>
                                                <StepContent>
                                                    <span className='text-main text-[13px]'>{step.description}</span>
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>

                                </div>
                            </div>

                            <div className='btns flex gap-[10px] mt-[2rem] items-center justify-center'>


                                <Buttons
                                    onClick={() => actions.modal.openCancelOrderModal()}
                                    text={"Cancel Order"}
                                    variant={"contained"}
                                    className={"cancel_btn"}
                                />

                            </div>
                        </div>
                    </DialogContent>
                </div>

            </Dialog >

            <CancelOrderModal />
        </>

    );
}