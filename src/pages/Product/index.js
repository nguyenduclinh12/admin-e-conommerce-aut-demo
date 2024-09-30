import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Product.css";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  Chip,
  emphasize,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Pagination from "@mui/material/Pagination";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  UrlServe,
} from "./../../utils/api";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
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


export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "100%" },
};

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    color: "",
  });

  // function handleClose
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(20);
    fetchDataFromApi("/api/products").then((res) => {
      console.log(res);
      setProductList(res);
      context.setProgress(100);
    });
  }, []);

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const addImgUrl = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: arr,
    }));
  };
  // edit Product
  const editProduct = (id) => {
    setFormFields({
      name: "",
      images: "",
      color: "",
    });
    setOpen(true);
    setEditId(id);
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      // setEditFields({name:res.name, images:res.images, color:res.color});
      setFormFields({
        name: res.name,
        images: res.images,
        color: res.color,
      });
    });
  };

  const ProductEditFun = (e) => {
    e.preventDefault();
    context.setProgress(40);
    setIsLoading(true);
    editData(`/api/products/${editId}`, formFields).then((res) => {
      fetchDataFromApi("/api/products").then((res) => {
        setProductList(res);
        setIsLoading(false);
        setOpen(false);
      });
      context.setProgress(100);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Update Product Success !",
      });
    });
  };
  // delete Product
  const deleteProduct = async (id) => {
    context.setProgress(40);
    const resultDelete = await deleteData(`/api/products`, id);
    console.log(resultDelete);
    if (resultDelete?.status === 200) {
      const productList = await fetchDataFromApi("/api/products");
      if (productList) {
        setProductList(productList);
      }
      context.setProgress(100);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Delete Product Success !",
      });
    }
  };

  // handle change
  const handleChange = (event, value) => {
    context.setProgress(40);
    fetchDataFromApi(`/api/Product?page=${value}`).then((res) => {
      setProductList(res);
      context.setProgress(100);
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-4">
          <h3>Product List</h3>

          <div className="ml-auto d-flex align-items-center">
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
                label="Product"
                component="a"
                href="#"
              ></StyledBreadCrumb>

              <StyledBreadCrumb label="Product List"></StyledBreadCrumb>
            </Breadcrumbs>
            <Link to="/product/upload">
              <Button className="btn-blue ml-3 pl-3 pr-3">Product</Button>
            </Link>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>IMAGE</th>
                  <th style={{ width: "100px" }}> Product Name</th>
                  <th>Price</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(productList) &&
                  productList?.length !== 0 &&
                  productList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Checkbox>
                              <span>#{index + 1}</span>
                            </Checkbox>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img">
                                <img
                                  src={`${UrlServe}/${item.images[0]}`}
                                  alt=""
                                  className="w-100"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>

                        <td>{item.price}</td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            {/* <Link to="/product/details">
                              <Button className="secondary" color="secondary">
                                <FaEye></FaEye>
                              </Button>
                            </Link> */}

                            <Link to={`/product/edit/${item.id}`}>
                              <Button
                                className="success"
                                color="success"

                                // onClick={() => editProduct(item.id)}
                              >
                                <FaPencilAlt></FaPencilAlt>
                              </Button>
                            </Link>

                            <Button
                              className="error"
                              color="error"
                              onClick={() => deleteProduct(item.id)}
                            >
                              <MdDelete></MdDelete>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex tableFooter">
              <Pagination
                count={productList?.totalPages}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        className="editModal"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;

            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <form>
          <DialogContent>
            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Product Name"
                type="text"
                fullWidth
                value={formFields.name}
                onChange={changeInput}
              />
            </div>
            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="images"
                name="images"
                label="Product Image"
                type="text"
                fullWidth
                value={formFields.images}
                onChange={addImgUrl}
              />
            </div>
            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="color"
                name="color"
                label="Product Color"
                type="text"
                fullWidth
                value={formFields.color}
                onChange={changeInput}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="button" onClick={ProductEditFun} variant="contained">
              {isLoading === true ? (
                <CircularProgress color="inherit" className="loader" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Product;
