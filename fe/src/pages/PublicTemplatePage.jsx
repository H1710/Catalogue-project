import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const PublicTemplate = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const handleChangeThumbnail = (e) => {
        const target = e.target;
        const files = target.files;
        if (files) {
            const file = files[0];
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, "Name must be at least 5 characters")
            .matches(/^[^\d]/, "Name cannot start with a number")
            .required("Name is required"),
        tag: Yup.string()
            .matches(/^[^\d]/, "Tag cannot start with a number")
            .required("Tag is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            tag: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
        },
    });

    const handleCancel = () => {
        navigate(`/design/${id}`);
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-10 text-center">
            <form className="h-[500px]">
                <h1 className="font-bold text-4xl">Your Template</h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="top-10"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Tag"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="top-10"
                    name="tag"
                    value={formik.values.tag}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.tag && Boolean(formik.errors.tag)}
                    helperText={formik.touched.tag && formik.errors.tag}
                />
                <div className="mt-16">
                    <input
                        type="file"
                        className="w-full rounded py-2 px-4 outline-none text-sm"
                        accept="image/*"
                        onChange={handleChangeThumbnail}
                        required
                    />
                </div>
                <Button sx={{ backgroundColor: "rgb(115, 0, 230)" }} className="top-[50px] w-[100px] bg-purple-800" variant="contained">
                    Save
                </Button>
                <Button
                    className="top-[50px] w-[100px] bg-purple-800 text-purple-800 left-4"
                    variant="outlined"
                    onClick={handleCancel}
                    style={{ color: 'purple', borderColor: 'purple' }}>
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default PublicTemplate;
