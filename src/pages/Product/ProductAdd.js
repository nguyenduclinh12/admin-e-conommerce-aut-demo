import React, { useContext, useEffect, useState } from "react";
import "./ProductAdd.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, CircularProgress, Rating } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchDataFromApi, postData, postUploadImages } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

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

// multiple select
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

// end multiple select

const ProductAdd = () => {
  const [subCat, setSubCat] = useState([]);
  const [valSubCat, setValSubCat] = useState(null);

  const [ratingsValue, setRatingValue] = useState(1);
  const [isFeatured, setIsFeatured] = useState("");
  const [productRAMS, setProductRAMS] = useState([]);
  const [productSIZE, setProductSIZE] = useState([]);
  const [productWEIGHT, setProductWEIGHT] = useState([]);
  const [prodRAMSData, setProdRAMSData] = useState([]);
  const [prodWEIGHTData, setProdWEIGHTData] = useState([]);
  const [prodSIZEData, setProdSIZEData] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);

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
    discount: 0,
    productRAMS: [],
    productSIZE: [],
    productWEIGHT: [],
  });
  useEffect(() => {
    const getRams = async () => {
      const data = await fetchDataFromApi("/api/productRAMS");
      if (data) {
        setProdRAMSData(data);
      }
    };
    const getWeight = async () => {
      const data = await fetchDataFromApi("/api/productWEIGHT");
      if (data) {
        setProdWEIGHTData(data);
      }
    };
    const getSize = async () => {
      const data = await fetchDataFromApi("/api/productSIZE");
      if (data) {
        setProdSIZEData(data);
      }
    };
    getRams();
    getWeight();
    getSize();
  }, []);
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

  function FormDataImage() {
    const formData = new FormData();
    // them tung file vào FormData
    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("files", imgFiles[i]);
    }
    return formData;
  }

  const handleChangeCategory = async (event) => {
    // setCategoryVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      category: event.target.value,
    }));
    //get subcategory
    const resultSubcategory = await fetchDataFromApi(
      `/api/category/subcategory/${event.target.value}`
    );
    if (resultSubcategory.length !== 0) {
      setSubCat(resultSubcategory);
    }
  };

  const handleChangeSubCategory = async (event) => {
    setValSubCat(event.target.value);
  };

  const handleChangeIsFeaturedValue = (event) => {
    setIsFeatured(event.target.value);
    setFormFields(() => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };
  const handleChangeProductRAMS = (event) => {
    const {
      target: { value },
    } = event;
    setProductRAMS(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeProductSIZE = (event) => {
    const {
      target: { value },
    } = event;
    setProductSIZE(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeProductWEIGHT = (event) => {
    const {
      target: { value },
    } = event;
    setProductWEIGHT(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
      return false;
    }
    if (formFields.description === "") {
      context.setAlertBox({
        open: true,
        msg: "Description is missing",
        error: true,
      });
      return false;
    }
    if (formFields.brand === "") {
      context.setAlertBox({
        open: true,
        msg: "brand is missing",
        error: true,
      });
      return false;
    }
    if (formFields.price === 0 || formFields.price === "") {
      context.setAlertBox({
        open: true,
        msg: "Price is missing",
        error: true,
      });
      return false;
    }
    if (formFields.oldPrice === 0 || formFields.oldPrice === "") {
      context.setAlertBox({
        open: true,
        msg: "Old Price is missing",
        error: true,
      });
      return false;
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
    if (productRAMS.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "Product Rams is missing",
        error: true,
      });
      return;
    }
    if (productWEIGHT.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "Product Weight is missing",
        error: true,
      });
      return;
    }
    if (productSIZE.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "Product Size is missing",
        error: true,
      });
      return;
    }

    if (imgFiles.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "Image is missing",
        error: true,
      });
      return;
    }

    // upload image
    // thuc hien chuc nang upload file len server
    try {
      context.setProgress(40);
      setIsLoading(true);

      let resultUploadImage = { status: false, data: [] };
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

      if (resultUploadImage.status === true) {
        // // dành cho gán danh sách image link
        // formFields.images = imagesSelect;
        // dành cho dán danh sách image upload preview
        if (valSubCat !== null) {
          formFields.category = valSubCat;
        }
        formFields.images = resultUploadImage.data;
        formFields.productRAMS = productRAMS;
        formFields.productWEIGHT = productWEIGHT;
        formFields.productSIZE = productSIZE;
        const resultUpload = await postData("/api/products/create", formFields);

        if (resultUpload?.status === 201) {
          setFormFields({
            name: "",
            description: "",
            images: [],
            brand: "",
            price: 0,
            oldPrice: 0,
            category: null,
            countInStock: 0,
            discount: 0,
            rating: 0,
            isFeatured: null,
          });
          setImgFiles([]);
          context.setAlertBox({
            open: true,
            msg: "The Product is created !",
            error: false,
          });
          history("/product");
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: resultUpload?.response?.data?.error?.message,
          });
        }
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Upload Image Fails  ",
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
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>SUB CATEGORY</h6>
                      <Select
                        value={valSubCat}
                        onChange={handleChangeSubCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="subCategory"
                      >
                        <MenuItem value={null}>None</MenuItem>
                        {subCat?.length !== 0 &&
                          subCat.map((cat, index) => {
                            return (
                              <MenuItem
                                key={index}
                                className="text-capitalize"
                                value={cat._id}
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
                      <h6>PRODUCT RAMS</h6>
                      <Select
                        value={productRAMS}
                        onChange={handleChangeProductRAMS}
                        displayEmpty
                        className="w-100"
                        name="productRAMS"
                        multiple
                        MenuProps={MenuProps}
                      >
                        <MenuItem>None</MenuItem>
                        {prodRAMSData?.length !== 0 &&
                          prodRAMSData.map((ram, index) => (
                            <MenuItem key={index} value={ram.id}>
                              {ram.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>PRODUCT SIZE</h6>
                      <Select
                        value={productSIZE}
                        onChange={handleChangeProductSIZE}
                        displayEmpty
                        multiple
                        MenuProps={MenuProps}
                        className="w-100"
                        name="productSIZE"
                      >
                        <MenuItem>None</MenuItem>
                        {prodSIZEData?.length !== 0 &&
                          prodSIZEData.map((size, index) => (
                            <MenuItem key={index} value={size.id}>
                              {size.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>PRODUCT WEIGHT</h6>
                      <Select
                        value={productWEIGHT}
                        onChange={handleChangeProductWEIGHT}
                        displayEmpty
                        multiple
                        MenuProps={MenuProps}
                        className="w-100"
                        name="productWEIGHT"
                      >
                        <MenuItem>None</MenuItem>
                        {prodWEIGHTData?.length !== 0 &&
                          prodWEIGHTData.map((weight, index) => (
                            <MenuItem key={index} value={weight.id}>
                              {weight.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>
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
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
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

export default ProductAdd;
