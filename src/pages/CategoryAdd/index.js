import React, { useContext, useState } from "react";
import "./ProductUpload.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

// breadcrumb code
const StyledBreadCrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const CategoryAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    color: "",
  });

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const addCategory = (e) => {
    e.preventDefault();
    // validate input form
    if (
      formFields.name !== "" &&
      formFields.images.length !== 0 &&
      formFields.color !== ""
    ) {
      setIsLoading(true);

      postData("/api/category/create", formFields).then((res) => {
        setIsLoading(false);
        const error = res?.response?.status;
        console.log(error);
        if (error) {
          // alert
          context.setAlertBox({
            open: true,
            error: true,
            msg: res?.response?.data.message,
          });
          // end alert
        }

        history("/category");
      });
    } else {
      // alert
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      // end alert
      return false;
    }
  };
  const addImgUrl = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: arr,
    }));
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Add Category</h5>
          <Breadcrumbs
            className="ml-auto breadcrumbs_"
            aria-label="breadcrumbs"
          >
            <StyledBreadCrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            ></StyledBreadCrumb>

            <StyledBreadCrumb
              label="Category"
              component="a"
              href="#"
            ></StyledBreadCrumb>

            <StyledBreadCrumb label="Category Add"></StyledBreadCrumb>
          </Breadcrumbs>
        </div>

        <form action="" className="form" onSubmit={addCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Category Name</h6>
                  <input type="text" name="name" onChange={changeInput} />
                </div>
                <div className="form-group">
                  <h6>Image Url</h6>
                  <input type="text" name="images" onChange={addImgUrl} />
                </div>
                <div className="form-group">
                  <h6>Color</h6>
                  <input type="text" name="color" onChange={changeInput} />
                </div>

                <br />
                <Button
                  className="btn-blue btn-lg btn-big w-100"
                  type="submit"
                  variant="contained"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" className="loader" />
                  ) : (
                    <>
                      <FaCloudUploadAlt></FaCloudUploadAlt> &nbsp; PUBLISH AND
                      VIEW
                    </>
                  )}
                </Button>
              
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryAdd;
