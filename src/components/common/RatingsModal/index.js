import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import Textareas from '../Textarea';
import { useFormik } from "formik";
import * as Yup from "yup";
import Buttons from '../Buttons';

export default function RatingModal() {

    const DialogOpen = useSelector((state) => state.modal.Rating);
    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeRatingModal();
    }
    const [ratingValue, setRatingValue] = useState(null);

    const onRatingChange = (event, newValue) => {
        setRatingValue(newValue); // Update local state
    };

    console.log(ratingValue, "ratingValueratingValue")

    const Ratings = useFormik({
        initialValues: {
            rating: '',
            description: '',
        },

        validationSchema: Yup.object().shape({

        }),

        onSubmit: async (values) => {
            console.log(values, "valuesvalues")
        },
    });

    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='rating'>
            <div className='rating_content'>
                <DialogContent >
                    <div className='rating_div'>
                        <Rating name="half-rating"
                        className='star'
                            style={{ fontSize: "50px" }}
                            precision={0.5}
                            value={ratingValue}
                            onChange={onRatingChange} />
                    </div>

                    <div className='dec_div'>
                        <Textareas
                            width={'100%'}
                            onChange={Ratings.handleChange}
                            value={Ratings.values.description}
                            helperText={Ratings.touched.description && Ratings.errors.description}
                            name={'Ratings'}
                            placeholder={"Enter description"}
                            rows={2} />
                    </div>

                    <div style={{ marginTop: "1.4rem" }}>
                        <Buttons
                            type={"submit"}
                            text={"Add"}
                            variant={"contained"}
                            className={"addButton"}
                        />
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}