import React, { useContext, useEffect, useState } from "react";
import "./CategoryAdd.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchDataFromApi, postData, postUploadImages } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Sync } from "@mui/icons-material";

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
  // const [files, setFiles] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [previews, setPreviews] = useState();
  const history = useNavigate();
  const context = useContext(MyContext);

  // image file select
  useEffect(() => {
    if (!imgFiles) return;
    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
      tmp.push({
        imgPreview: URL.createObjectURL(imgFiles[i]),
        imgOriginal: imgFiles[i].name,
      });
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);
    // free memory
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgFiles]);

  const [formFields, setFormFields] = useState({
    name: "",
    parent: null,
    images: [],
    color: "",
  });

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  // set cat value select
  const handleChangeCategory = (event) => {
    setFormFields(() => ({
      ...formFields,
      parent: event.target.value,
    }));
  };
  // upload images
  const handleFileSelect = async (event) => {
    context.setProgress(40);
    const fileArray = Array.from(event.target.files);
    // const fileNames = fileArray.map((file) => file.name);

    setImgFiles((prevImgFiles) => [...prevImgFiles, ...fileArray]);
    // setFiles((prevFiles) => [...prevFiles, ...fileNames]);
    context.setProgress(100);
  };

  // delete image preview
  const handelDeleteCatImagePreview = (fileName, event) => {
    try {
      setImgFiles((prevImgFiles) =>
        prevImgFiles.filter((img) => img.name !== fileName)
      );
      // setFiles((prevFiles) => prevFiles.filter((img) => img.name !== fileName));
    } catch (error) {}
  };

  // submit create category
  const addCategory = async (e) => {
    e.preventDefault();
    // validate input form
    if (
      formFields.name !== "" &&
      imgFiles.length !== 0 &&
      formFields.color !== ""
    ) {
      try {
        setIsLoading(true);
        // upload image
        const formData = new FormData();
        for (let i = 0; i < imgFiles.length; i++) {
          formData.append("files", imgFiles[i]);
        }
        let resultUploadImage = { status: false, data: [] };

        await postUploadImages("/api/category/uploadFiles", formData).then(
          (res) => {
            if (res?.status === 200) {
              resultUploadImage.status = true;
              resultUploadImage.data = res.data.files;
            } else {
              context.setAlertBox({
                open: true,
                error: true,
                msg: "Upload File Fails !",
              });
            }
          }
        );
        if (resultUploadImage.status === true) {
          formFields.images = resultUploadImage.data;
          console.log(formFields);
          postData("/api/category/create", formFields).then((res) => {
            if (res?.response?.status) {
              // alert
              context.setAlertBox({
                open: true,
                error: true,
                msg: res?.response?.data.message,
              });
              // end alert
              return;
            }
            setIsLoading(false);
            setFormFields({
              name: "",
              color: "",
              images: [],
            });
            setImgFiles([]);
            context.setAlertBox({
              open: true,
              msg: "The Category is created !",
              error: false,
            });

            history("/category");
          });
        }
      } catch (error) {
        context.setAlertBox({
          open: true,
          msg: `The Category Create Fails : ${error}`,
          error: false,
        });
        return;
      }
    } else {
      // alert
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      // end alert
      return;
    }
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
                  <h6>Parent</h6>
                  <Select
                    value={formFields.parent}
                    onChange={handleChangeCategory}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="w-100"
                    name="category"
                  >
                    <MenuItem value={null}>None</MenuItem>
                    {Array.isArray(context.catData?.categoryList) &&
                      context.catData?.categoryList?.length !== 0 &&
                      context.catData?.categoryList?.map((cat, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={cat._id}
                            className="text-capitalize"
                          >
                            {cat.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>

                <div className="form-group">
                  <h6>Color</h6>
                  <input type="text" name="color" onChange={changeInput} />
                </div>
              </div>

              <div className="card p-4 mt-0">
                <div className="imagesUploadSec">
                  <h5 className="mb-4">Media And Published</h5>
                  <div className="imgUploadBox d-flex align-items-center">
                    {previews?.length !== 0 &&
                      previews?.map((img, index) => (
                        <div className="uploadBox" key={index}>
                          <span
                            className="remove"
                            onClick={(event) =>
                              handelDeleteCatImagePreview(
                                img.imgOriginal,
                                event
                              )
                            }
                          >
                            <IoCloseSharp />
                          </span>
                          <div className="box">
                            <LazyLoadImage
                              alt={"image"}
                              effect="blur"
                              name="images[]"
                              src={img.imgPreview}
                            ></LazyLoadImage>
                          </div>
                        </div>
                      ))}
                    <div className="uploadBox">
                      <input
                        type="file"
                        multiple="multiple"
                        name="images"
                        onChange={handleFileSelect}
                      />

                      <div className="info">
                        <FaRegImages></FaRegImages>
                        <h5>image upload</h5>
                      </div>
                    </div>
                  </div>

                  <br />

                  <Button
                    className="btn-blue btn-lg btn-big w-100"
                    type="submit"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryAdd;
