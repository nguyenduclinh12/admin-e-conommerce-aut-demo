import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProductAdd.css";
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
  editData,
  fetchDataFromApi,
  postData,
  postUploadImages,
  UrlServe,
} from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

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

const ProductEdit = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [ratingsValue, setRatingValue] = useState(1);
  const [isFeatured, setIsFeatured] = useState("");
  const [catData, setCatData] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [fileEdit, setFileEdit] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [previews, setPreviews] = useState();
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: 0,
    oldPrice: 0,
    category: null,
    countInStock: 0,
    rating: 0,
    isFeatured: null,
  });

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

  // get list category
  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(20);
    // get Product details
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setFileEdit(res.images);
      setFormFields({
        name: res.name,
        description: res.description,
        images: res.images,
        brand: res.brand,
        price: res.price,
        oldPrice: res.oldPrice,
        category: res.category,
        countInStock: res.countInStock,
        rating: res.rating,
        isFeatured: res.isFeatured,
      });
    });

    // get category list
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
    });
    context.setProgress(100);
  }, []);
  // upload images
  const handleFileSelect = async (event) => {
    context.setProgress(40);
    const fileArray = Array.from(event.target.files); // chuyen object Filelist thanh array
    // gán danh sách file để thực hiện hiển thị preview hình ảnh trước khi upload. dánh sách thêm sau được appent vào danh sách trước
    setImgFiles((prevImgFiles) => [...prevImgFiles, ...fileArray]);
    context.setProgress(100);
  };

  // delete image preview
  const handelDeleteProductImagePreview = (fileName, event) => {
    try {
      setImgFiles((prevImgFiles) =>
        prevImgFiles.filter((img) => img.name !== fileName)
      );
    } catch (error) {}
  };
  // remove image
  const handelDeleteProductImageEdit = (fileName, event) => {
    setFileEdit((prevImg) => prevImg.filter((img) => img !== fileName));
  };

  // lấy ra danh sách các ảnh bị xoá
  const getRemoveImages = () => {
    return formFields.images.filter((img) => !fileEdit.includes(img));
  };

  // delete image from server
  const deleteImageServer = async () => {
    try {
      // khi sử dụng await thì không cần dùng .then()

      if (getRemoveImages().length !== 0) {
        const result = await deleteFile("/api/deleteFiles/imageList", {
          data: { images: getRemoveImages() },
        });
        if (
          result?.status === 200 ||
          result?.response?.data?.code === "ENOENT"
        ) {
          return true;
        }
        return result;
      }
      return true;
    } catch (err) {
      console.log(err);
      return err.response ? err.response : err;
    }
  };

  function FormDataImage() {
    const formData = new FormData();
    // them tung file vào FormData
    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("files", imgFiles[i]);
    }
    return formData;
  }

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      category: event.target.value,
    }));
  };

  const handleChangeIsFeaturedValue = (event) => {
    setIsFeatured(event.target.value);
    setFormFields(() => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };
  // handle format link image
  const handleFormatImages = (imagesToServer) => {
    try {

      return [...fileEdit, ...imagesToServer];
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // upload image for add link
  // const addProductImages = () => {
  //   // console.log(productImagesRef.current.value);
  //   if (productImagesRef.current.value !== "") {
  //     setImagesSelect((prevImagesSelect) => [
  //       ...prevImagesSelect,
  //       productImagesRef.current.value,
  //     ]);

  //     const imgGrid = document.querySelector("#imgGrid");
  //     const imgData = `
  //             <div class="img">
  //               <img src="${productImagesRef.current.value}" alt="" class="w-100"/>
  //             </div>
  //   `;
  //     imgGrid.insertAdjacentHTML("beforeend", imgData);
  //     productImagesRef.current.value = "";
  //   }
  // };
  // // end upload image for add link

  // store data
  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.setAlertBox({
        open: true,
        msg: "Name is missing",
        error: true,
      });
      return;
    }
    if (formFields.description === "") {
      context.setAlertBox({
        open: true,
        msg: "Description is missing",
        error: true,
      });
      return;
    }
    if (formFields.brand === "") {
      context.setAlertBox({
        open: true,
        msg: "brand is missing",
        error: true,
      });
      return;
    }
    if (formFields.price === 0 || formFields.price === "") {
      context.setAlertBox({
        open: true,
        msg: "Price is missing",
        error: true,
      });
      return;
    }
    if (formFields.oldPrice === 0 || formFields.oldPrice === "") {
      context.setAlertBox({
        open: true,
        msg: "Old Price is missing",
        error: true,
      });
      return;
    }
    if (formFields.category === 0 || formFields.category === "") {
      context.setAlertBox({
        open: true,
        msg: "category is missing",
        error: true,
      });
      return false;
    }
    if (formFields.countInStock === "" || formFields.countInStock === 0) {
      context.setAlertBox({
        open: true,
        msg: "Count In Stock is missing",
        error: true,
      });
      return false;
    }
    if (formFields.isFeatured === 0) {
      context.setAlertBox({
        open: true,
        msg: "Is Featured is missing",
        error: true,
      });
      return;
    }

    // upload image
    // thuc hien chuc nang upload file len server
    try {
      context.setProgress(40);
      setIsLoading(true);

      // delete images
      const resultDeleteImage = await deleteImageServer();

      if (resultDeleteImage !== true) {
        throw resultDeleteImage?.response?.data?.message;
      }
      let resultUploadImage = { status: false, data: [] };

      if (imgFiles.length !== 0) {
        const resultImageUpload = await postUploadImages(
          "/api/products/uploadFiles",
          FormDataImage()
        );
        if (resultImageUpload?.status && resultImageUpload?.status === 200) {
          resultUploadImage.status = true;
          resultUploadImage.data = resultImageUpload.data.files;
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Upload File Fails : ",
          });
        }
      }
      // // dành cho gán danh sách image link
      // formFields.images = imagesSelect;
      // dành cho dán danh sách image upload preview

      formFields.images = handleFormatImages(resultUploadImage.data);


      const resultUpload = await editData(`/api/products/${id}`, formFields);
     
      if (resultUpload?.status === 200) {
        // setFormFields({
        //   name: "",
        //   description: "",
        //   images: [],
        //   brand: "",
        //   price: 0,
        //   oldPrice: 0,
        //   category: null,
        //   countInStock: 0,
        //   discount: 0,
        //   rating: 0,
        //   isFeatured: null,
        // });
        // setImgFiles([]);
        context.setAlertBox({
          open: true,
          msg: "The Product is Updated !",
          error: false,
        });
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Upload product Fails  ",
        });
      }

      // end upload image
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Upload File Fails : " + error,
      });
    }

    setIsLoading(false);
    context.setProgress(100);
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
                        value={formFields.category}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="category"
                      >
                        <MenuItem value={null}>None</MenuItem>
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

                  <div className="col">
                    <div className="form-group">
                      <h6>Is Featured</h6>
                      <Select
                        value={formFields.isFeatured}
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
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>RATINGS</h6>
                      <Rating
                        name="simple-controller"
                        value={formFields.rating}
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
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
          <div className="card p-4 mt-0">
            <div className="imagesUploadSec">
              <h5 className="mb-4">Media And Published</h5>
              <div className="imgUploadBox d-flex align-items-center">
                {fileEdit.length !== 0 &&
                  fileEdit.map((img, index) => (
                    <div className="uploadBox" key={index}>
                      <span
                        className="remove"
                        onClick={(event) =>
                          handelDeleteProductImageEdit(img, event)
                        }
                      >
                        <IoCloseSharp />
                      </span>
                      <div className="box">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          name="images[]"
                          src={`${UrlServe}/${img}`}
                        ></LazyLoadImage>
                      </div>
                    </div>
                  ))}

                {previews?.length !== 0 &&
                  previews?.map((img, index) => (
                    <div className="uploadBox" key={index}>
                      <span
                        className="remove"
                        onClick={(event) =>
                          handelDeleteProductImagePreview(
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

export default ProductEdit;
