import React from "react";
import {
    Box,
    Typography,
    Grid,
    Container,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import FormikControl from "../../components/FormikControl";
import * as Yup from "yup";
import axios from "axios";

const Contact = () => {
    const initialValues = {
        name: "",
        email: "",
        subject: "",
        message: "",
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        subject: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        message: Yup.string()
            .min(5, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
    });

    const onSubmit = async (values, formik) => {
        try {
            const { data } = await axios.post("http://localhost:8000/message/contact", {
                ...values,
            });
            alert("Message sended");
            formik.setSubmitting(false);
            formik.resetForm();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <>
                            <Typography
                                id="contact"
                                mt={5}
                                variant="h2"
                                gutterBottom
                                sx={{
                                    marginBottom: "10px",
                                    textAlign: "center",
                                    fontSize: {
                                        lg: 60,
                                        sm: 40,
                                        xs: 30,
                                    },
                                    color: "#67645E",
                                }}>
                                Contact.
                            </Typography>
                            <Typography
                                variant="p"
                                component="div"
                                sx={{
                                    textAlign: "center",
                                    marginBottom: "25px",
                                    fontSize: "24px",
                                }}>
                                T. 123 - 456 - 7890 | info@my-domain.com
                            </Typography>

                            <Form>
                                <Stack
                                    sx={{
                                        padding: {
                                            lg: "0 200px",
                                            sm: "0 40px",
                                            xs: "0 20px",
                                        },
                                    }}
                                    alignItems="center">
                                    <FormikControl
                                        label="Name"
                                        name="name"
                                        id="name"
                                        control="input"
                                        type="text"
                                    />
                                    <FormikControl
                                        label="Email"
                                        name="email"
                                        id="email"
                                        control="input"
                                        type="text"
                                    />
                                    <FormikControl
                                        label="Subject"
                                        name="subject"
                                        id="subject"
                                        control="input"
                                        type="text"
                                    />
                                    <FormikControl
                                        label="Message"
                                        name="message"
                                        id="message"
                                        control="input"
                                        type="text"
                                    />
                                    <Stack alignItems="flex-end">
                                        <Button
                                            type="submit"
                                            id="submit"
                                            style={{
                                                backgroundColor: "#67645E",
                                                color: "white",
                                                padding: "8px 30px",
                                                border: "none",
                                                marginTop: "5px",
                                            }}
                                            disabled={formik.isSubmitting}>
                                            Submit
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default React.memo(Contact);
