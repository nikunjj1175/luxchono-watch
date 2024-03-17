import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import "./style.scss";
import { actions } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import Textareas from "../Textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import Buttons from "../Buttons";
import { useRatingMutation } from "../../../api/Rating";
import { toast } from "react-toastify";

export default function RatingModal() {
  const DialogOpen = useSelector((state) => state.modal.Rating);

  console.log(DialogOpen, "DialogOpenDialogOpen");

  const navigate = useNavigate();

  const [ratingValue, setRatingValue] = useState(null);

  const onRatingChange = (event, newValue) => {
    setRatingValue(newValue); // Update local state
  };

  const [AddRating, { isLoading }] = useRatingMutation();

  const Ratings = useFormik({
    initialValues: {
      description: "",
    },

    validationSchema: Yup.object().shape({
      description: Yup.string()
        .trim()
        .required("Plase Enter Review Description"),
    }),

    onSubmit: async (values) => {
      actions.loder.setLoading(true);
      const body = {
        product: DialogOpen?.data?.product?._id,
        description: values?.description,
        star: ratingValue,
      };
      try {
        const response = await AddRating(body);
        const { statusCode, message } = await response?.data;
        if (statusCode === 200) {
          toast.success(message);
          onCancel();
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
      actions.loder.setLoading(false);
    },
  });

  const onCancel = () => {
    actions.modal.closeRatingModal();
    Ratings.resetForm();
    setRatingValue(null);
  };
  return (
    <Dialog
      open={DialogOpen.open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="rating"
    >
      <form onSubmit={Ratings.handleSubmit}>
        <div className="rating_content">
          <DialogContent>
            <div className="rating_div">
              <Rating
                name="half-rating"
                className="star"
                style={{ fontSize: "50px" }}
                precision={0.5}
                value={ratingValue}
                onChange={onRatingChange}
              />
            </div>

            <div className="dec_div">
              <Textareas
                width={"100%"}
                onChange={Ratings.handleChange}
                value={Ratings.values.description}
                helperText={
                  Ratings.touched.description && Ratings.errors.description
                }
                name={"description"}
                placeholder={"Enter description"}
                rows={2}
              />
            </div>

            <div style={{ marginTop: "1.4rem" }}>
              <Buttons
                type={"submit"}
                text={"Add"}
                variant={"contained"}
                className={"addButton"}
                disabled={ratingValue === null ? true : false}
              />
            </div>
          </DialogContent>
        </div>
      </form>
    </Dialog>
  );
}
