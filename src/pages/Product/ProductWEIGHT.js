import React, { useContext, useEffect, useState } from "react";
import "./ProductAdd.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { MyContext } from "../../App";
import { MdDelete } from "react-icons/md";

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

const ProductWEIGHT = () => {
  // const [catData, setCatData] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [productWEIGHTList, setProductWEIGHTList] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formFields, setFormFields] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    fetchDataFromApi("/api/productWEIGHT").then((res) => {
      setProductWEIGHTList(res);
      console.log(res);
    });
  }, []);

  // store data

  const editProductWEIGHT = (item) => {
    try {
      setIsUpdate(true);
      setFormFields({ id: item.id, name: item.name });

      console.log(formFields);
    } catch (err) {
      context.setAlertBox({
        open: true,
        msg: err.message,
        error: true,
      });
    }
  };
  const deleteProductWEIGHT = async (id) => {
    try {
      if (id === null || id === undefined || id === "") {
        throw new Error("Missing id for delete");
      }
      const result = await deleteData(`/api/productWEIGHT`, id);
      if (result?.status === 200) {
        const listRams = await fetchDataFromApi(`/api/productWEIGHT`);

        if (listRams?.length !== 0) {
          setProductWEIGHTList(listRams);
        } else {
          throw new Error("Error fetching ProductWEIGHT data");
        }
        context.setAlertBox({
          open: true,
          msg: result.data?.message,
          error: false,
        });
        return;
      }
      throw new Error(
        result?.data.message || "Error during Delete ProductWEIGHT "
      );
    } catch (err) {
      context.setAlertBox({
        open: true,
        msg: err.message,
        error: true,
      });
    }
  };
  const handleChangeInput = (event) => {
    setFormFields(() => ({
      ...formFields,
      name: event.target.value,
    }));
    console.log(formFields);
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

    try {
      context.setProgress(40);
      setIsLoading(true);

      // // dành cho gán danh sách image link
      // formFields.images = imagesSelect;
      let resultUpload = null;

      if (isUpdate) {
        console.log(formFields);
        resultUpload = await editData(
          `/api/productWEIGHT/${formFields.id}`,
          formFields
        );
        setIsUpdate(false);
      } else {
        resultUpload = await postData("/api/productWEIGHT/create", formFields);
      }
      console.log(resultUpload);
      if (resultUpload?.status === 200) {
        console.log(resultUpload);
        setFormFields({ id: "", name: "" });

        const listWEIGHT = await fetchDataFromApi("/api/productWEIGHT");
        if (listWEIGHT) {
          setProductWEIGHTList(listWEIGHT);
        }
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Upload Product Success !",
        });
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Upload Product ProductWEIGHT Fails  ",
        });
      }

      // end upload image
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: " : " + error,
      });
    }

    setIsLoading(false);
    context.setProgress(100);
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product WEIGHT Upload</h5>
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
                <div className="form-group">
                  <h6>PRODUCT WEIGHT:</h6>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChangeInput}
                    value={formFields.name}
                  />
                </div>
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
            <div className="col-sm-3"></div>
          </div>
        </form>
        {Array.isArray(productWEIGHTList) && productWEIGHTList?.length !== 0 ? (
          <div className="row">
            <div className="col-sm-9">
              <div className="table-responsive mt-3">
                <table className="table table-bordered v-align">
                  <thead className="thead-dark">
                    <tr>
                      <th>NAME</th>

                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productWEIGHTList?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>

                          <td>
                            <div className="actions d-flex align-items-center">
                              <Button
                                className="success"
                                color="success"
                                onClick={() => editProductWEIGHT(item)}
                              >
                                <FaPencilAlt></FaPencilAlt>
                              </Button>

                              <Button
                                className="error"
                                color="error"
                                onClick={() => deleteProductWEIGHT(item.id)}
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
                  {/* <Pagination
      count={productList?.totalPages}
      color="primary"
      className="pagination"
      showFirstButton
      showLastButton
      onChange={handleChange}
    /> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProductWEIGHT;
