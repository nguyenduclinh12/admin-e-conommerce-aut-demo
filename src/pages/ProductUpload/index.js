import React, { useState } from "react";
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
import { Button, Rating } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

  // const [formFields, setFormFields] = useState({
  //   name: "",
  //   images: [],
  //   color: "",
  // });

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
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

  // const onChangeInput = (e) => {
  //   setFormFields(() => ({
  //     ...formFields,
  //     [e.target.value]: e.target.value,
  //   }));
  // };
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

        <form action="" className="form">
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4">
                <h5>Basic Information</h5>
                <div className="form-group">
                  <h6>PRODUCT NAME</h6>
                  <input type="text" name="name" />
                </div>
                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea name="" id="" rows={5} cols={10}></textarea>
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
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="men" className="text-capitalize">
                          Men
                        </MenuItem>
                        <MenuItem value="women" className="text-capitalize">
                          Women
                        </MenuItem>
                        <MenuItem value="kids" className="text-capitalize">
                          Kids
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>SUB CATEGORY</h6>
                      <Select
                        value={subCatVal}
                        onChange={handleChangeSubCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
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
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>PRICE</h6>
                      <input type="text" name="price" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>OLD PRICE</h6>
                      <input type="text" name="oldPrice" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Is Featured</h6>
                      <Select
                        // onChange={handleChangeIsFeaturedValue}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          None
                        </MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>PRODUCT STOCK</h6>
                      <input type="text" name="countInStock" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input type="text" name="brand" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>DISCOUNT</h6>
                      <input type="text" name="discount" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>PRODUCT RAMS</h6>
                      <Select
                        multiple
                        value={productRams}
                        onChange={handleChangeProductRams}
                        displayEmpty
                        className="w-100"
                        MenuProps={MenuProps}
                      >
                        <MenuItem value={4}>4GB</MenuItem>
                        <MenuItem value={8}>8GB</MenuItem>
                        <MenuItem value={10}>10GB</MenuItem>
                        <MenuItem value={12}>12GB</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>RATINGS</h6>
                      <Rating name="simple-controlled" />
                    </div>
                  </div>
                </div>

                {/* <Button className="btn-blue btn-lg btn-big">
                  <FaCloudUploadAlt></FaCloudUploadAlt> &nbsp; PUBLISH AND VIEW
                </Button> */}
              </div>
            </div>
          </div>
          <div className="card p-4 mt-0">
            <div className="imagesUploadSec">
              <h5 className="mb-4">Media And Published</h5>
              <div className="imgUploadBox d-flex align-items-center">
                <div className="uploadBox">
                  <span className="remove">
                    <IoCloseSharp />
                  </span>
                  <div className="box">
                    <LazyLoadImage
                      alt={"image"}
                      effect="blur"
                      src={
                        "https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      }
                    ></LazyLoadImage>
                  </div>
                </div>
                <div className="uploadBox">
                  <input type="file" multiple="multiple" name="images" />
                  <div className="info">
                    <FaRegImages></FaRegImages>
                    <h5>image upload</h5>
                  </div>
                </div>
              </div>
              <br />
              <Button className="btn-blue btn-lg btn-big w-100" type="button">
                <FaCloudUploadAlt></FaCloudUploadAlt> &nbsp; PUBLISH AND VIEW
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
