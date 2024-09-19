import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProductUpload.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, CircularProgress, Rating } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import {
  deleteFile,
  fetchDataFromApi,
  postData,
  postUploadImages,
  UrlServe,
} from "./../../utils/api";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductUpload = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [subCatVal, setSubCatVal] = useState("");
  const [ratingsValue, setRatingValue] = useState(1);
  const [productRams, setProductRams] = useState([]);
  const [isFeatured, setIsFeatured] = useState("");
  const [catData, setCatData] = useState([]);
  const context = useContext(MyContext);
  const [imagesSelect, setImagesSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState([]);

  // upload product images
  const [selectedImages, setSelectedImages] = useState([]);
  // const [uploadProgress, setUploadProgress] = useState(0);
  // end upload product images
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    countInStock: 0,
    rating: 0,
    isFeatured: false,
  });

  const productImagesRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      context.setProgress(100);
    });
  }, []);

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      category: event.target.value,
    }));
  };
  const handleChangeSubCategory = (event) => {
    setSubCatVal(event.target.value);
  };

  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;
    setProductRams(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeIsFeaturedValue = (event) => {
    setIsFeatured(event.target.value);
    setFormFields(() => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };

  // upload images
  const handleFileSelect = async (event) => {
    context.setProgress(40);
    const fileList = event.target.files; // day la  object Filelist
    const fileArray = Array.from(fileList); // chuyen fileList thanh mang
    // const fileNames = fileArray.map((file) => ({ name: file.name }));

    // thuc hien chuc nang upload file len server
    try {
      const formData = new FormData();
      // them tung file vào FormData
      for (let i = 0; i < fileArray.length; i++) {
        formData.append("files", fileArray[i]);
      }
      postUploadImages("/api/products/uploadFiles", formData).then((res) => {
        if (res?.status && res?.status === 200) {
          const newImages = Object.values(res.data.files).slice(
            0,
            res.data.files.length
          );

          setSelectedImages((prevSelectedImages) => [
            ...prevSelectedImages,
            ...newImages,
          ]);

          context.setAlertBox({
            open: true,
            error: false,
            msg: "Upload Images Success !",
          });
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Upload File Fails : ",
          });
        }
      });
      context.setProgress(100);
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Upload File Fails : " + error,
      });
    }

    // lay cac tep
    // console.log(fileNames); // xuat ra mang ten cac file
  };
  // end upload iamges
  // delete image uploaded
  const handleDeleteProductImage = (fileName, event) => {
    // Lấy block div chứa hình ảnh

    deleteFile("/api/deleteFiles/image", {
      data: { fileName },
    }).then((res) => {
      if (res.status === 200) {
        // xoá bằng cách remove khỏi state và cập nhật lại
        setSelectedImages((prevSelectedImages) =>
          prevSelectedImages.filter((img) => img.filename !== fileName)
        );

        // // cách 2 xoá bằng cách ẩn đi
        // const uploadBox = event.currentTarget.closest(".uploadBox");
        // if (uploadBox) {
        //   // Thay đổi thuộc tính CSS để ẩn block
        //   uploadBox.style.display = "none";
        // }
      }
    });
  };
  // end delete image uploaded

  // upload image for add link
  const addProductImages = () => {
    console.log(productImagesRef.current.value);
    if (productImagesRef.current.value !== "") {
      setImagesSelect((prevImagesSelect) => [
        ...prevImagesSelect,
        productImagesRef.current.value,
      ]);

      const imgGrid = document.querySelector("#imgGrid");
      const imgData = `
              <div class="img">
                <img src="${productImagesRef.current.value}" alt="" class="w-100"/>
              </div>
    `;
      imgGrid.insertAdjacentHTML("beforeend", imgData);
      productImagesRef.current.value = "";
    }
  };
  // end upload image for add link

  const addErrorMessage = (newMessage) => {
    setErrorsMessage((prevMessages) => {
      if (prevMessages.includes(newMessage)) {
        return prevMessages;
      } else {
        return [...prevMessages, newMessage];
      }
    });
  };
  // store data
  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      addErrorMessage("Name is missing");
    }
    if (formFields.description === "") {
      addErrorMessage("Description is missing");
    }
    if (formFields.brand === "") {
      addErrorMessage("brand is missing");
    }
    if (formFields.price === 0 || formFields.price === "") {
      addErrorMessage("Price is missing");
    }
    if (formFields.oldPrice === 0 || formFields.oldPrice === "") {
      addErrorMessage("Old Price is missing");
    }
    if (formFields.category === 0 || formFields.category === "") {
      addErrorMessage("category is missing");
    }
    if (formFields.countInStock === "" || formFields.countInStock === 0) {
      addErrorMessage("Count In Stock is missing");
    }
    if (formFields.isFeatured === 0) {
      addErrorMessage("Is Featured is missing");
    }
    if (formFields.images.length === 0) {
      addErrorMessage("Image is missing");
    }

    if (errorsMessage?.length !== 0) {
      errorsMessage.forEach((message, index) => {
        context.setAlertBox({
          open: true,
          msg: message,
          error: true,
        });
      });
    } else {
      setIsLoading(true);
      formFields.images = imagesSelect;
      postData("/api/products/create", formFields).then((res) => {
        context.setAlertBox({
          open: true,
          msg: "The Product is created !",
          error: false,
        });
        setIsLoading(false);

        setFormFields({
          name: "",
          description: "",
          images: [],
          brand: "",
          price: 0,
          oldPrice: 0,
          category: "",
          countInStock: 0,
          rating: 0,
          isFeatured: false,
        });
      });
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product Upload</h5>
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
              label="Products"
              component="a"
              href="#"
            ></StyledBreadCrumb>

            <StyledBreadCrumb label="Product Upload"></StyledBreadCrumb>
          </Breadcrumbs>
        </div>

        <form action="" className="form" onSubmit={handleSubmitForm}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <h5>Basic Information</h5>
                <div className="form-group">
                  <h6>PRODUCT NAME</h6>
                  <input
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formFields.name}
                  />
                </div>
                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    value={formFields.description}
                    name="description"
                    id=""
                    rows={5}
                    cols={10}
                    onChange={inputChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <Select
                        value={categoryVal}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="category"
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {Array.isArray(catData?.categoryList) &&
                          catData?.categoryList?.length !== 0 &&
                          catData?.categoryList?.map((cat, index) => {
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
                  </div>
                  {/* <div className="col">
                    <div className="form-group">
                      <h6>SUB CATEGORY</h6>
                      <Select
                        value={subCatVal}
                        onChange={handleChangeSubCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="subCategory"
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem className="text-capitalize" value="jeans">
                          Jeans
                        </MenuItem>
                        <MenuItem className="text-capitalize" value="shirts">
                          Shirts
                        </MenuItem>
                      </Select>
                    </div>
                  </div> */}

                  <div className="col">
                    <div className="form-group">
                      <h6>Is Featured</h6>
                      <Select
                        value={isFeatured}
                        onChange={handleChangeIsFeaturedValue}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="isFeatured"
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        onChange={inputChange}
                        value={formFields.price}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>OLD PRICE</h6>
                      <input
                        type="text"
                        name="oldPrice"
                        onChange={inputChange}
                        value={formFields.oldPrice}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>DISCOUNT PRICE</h6>
                      <input
                        type="text"
                        name="discount"
                        onChange={inputChange}
                        value={formFields.discount}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>PRODUCT STOCK</h6>
                      <input
                        type="text"
                        name="countInStock"
                        onChange={inputChange}
                        value={formFields.countInStock}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input
                        type="text"
                        name="brand"
                        onChange={inputChange}
                        value={formFields.brand}
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <h6>PRODUCT RAMS</h6>
                      <Select
                        multiple
                        value={productRams}
                        onChange={handleChangeProductRams}
                        displayEmpty
                        className="w-100"
                        MenuProps={MenuProps}
                        name="productRams"
                      >
                        <MenuItem value={4}>4GB</MenuItem>
                        <MenuItem value={8}>8GB</MenuItem>
                        <MenuItem value={10}>10GB</MenuItem>
                        <MenuItem value={12}>12GB</MenuItem>
                      </Select>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>RATINGS</h6>
                      <Rating
                        name="simple-controller"
                        value={ratingsValue}
                        onChange={(event, newValue) => {
                          setRatingValue(newValue);
                          setFormFields(() => ({
                            ...formFields,
                            rating: newValue,
                          }));
                        }}
                      ></Rating>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <h6>PRODUCT STOCK</h6>
                      <input type="text" name="productStock" />
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6 className="text-uppercase">Product Images</h6>
                      <div className="position-relative inputBtn">
                        <input
                          type="text"
                          ref={productImagesRef}
                          style={{ paddingRight: "100px" }}
                          name="images"
                          onChange={inputChange}
                        />
                        <Button className="btn-blue" onClick={addProductImages}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <Button className="btn-blue btn-lg btn-big">
                  <FaCloudUploadAlt></FaCloudUploadAlt> &nbsp; PUBLISH AND VIEW
                </Button> */}
              </div>
            </div>
            <div className="col-sm-3">
              <div className="stickyBox">
                <h4>Product Images</h4>
                <div className="imgGrid d-flex" id="imgGrid"></div>
              </div>
            </div>
          </div>
          <div className="card p-4 mt-0">
            <div className="imagesUploadSec">
              <h5 className="mb-4">Media And Published</h5>
              <div className="imgUploadBox d-flex align-items-center">
                {selectedImages?.length !== 0 &&
                  selectedImages.map((img, index) => (
                    <div className="uploadBox" key={index}>
                      <span
                        className="remove"
                        onClick={(event) =>
                          handleDeleteProductImage(img.filename, event)
                        }
                      >
                        <IoCloseSharp />
                      </span>
                      <div className="box">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          name="images[]"
                          src={`${UrlServe}/${img.path}`}
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

              <Button className="btn-blue btn-lg btn-big w-100" type="submit">
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
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
