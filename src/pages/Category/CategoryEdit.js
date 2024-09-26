import React, { useContext, useEffect, useState } from "react";
import "./CategoryAdd.css";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteFile,
  editData,
  fetchDataFromApi,
  postData,
  postUploadImages,
  UrlServe,
} from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Sync } from "@mui/icons-material";

/* liên quan đến upload và delete image của category gồm các vấn đề sau
 1. khi tạo mới 
    * cat upload hình ảnh.  có state chứa danh sách hình ảnh preview trước ở local nhưng khi upload lên thì sẽ là một state chứa danh sách dạng file image để push vào form 
    * trước khi supmit form sẽ upload hinh ảnh lên trước và lấy danh sách trả về từ handle upload image theo định dạng (uploads/category/image.jpg) để truyền vào form lưu vào csdl
 2. khi update
    * có state chưa danh sách hình ảnh lưu trong csdl được lấy từ row get_by_id  và một state chứa danh sách hình ảnh nếu người dùng select thêm mới .
    * sau đó trước khi thực hiện update category ta xoá các ảnh nếu có đã bị remove ở giao diện update và upload các ảnh mới được thêm vào nếu có
    * sau đó ta merger 2 danh sách đó lại theo định dạng để lưu vào csdl (uploads/category/image.jpg) 
*/

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

const CategoryEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filesEdit, setFilesEdit] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [previews, setPreviews] = useState();
  const [imageDelete, setImageDelete] = useState([]);
  // const [catData, setCatData] = useState([]);
  const history = useNavigate();
  const context = useContext(MyContext);
  let { id } = useParams();
  const [formFields, setFormFields] = useState({
    name: "",
    parent: null,
    images: [],
    color: "",
  });

  // image file select
  useEffect(() => {
    if (!imgFiles) return;
    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
      // if (imgFiles[i].includes("uploads") !== true) {
      tmp.push({
        imgPreview: URL.createObjectURL(imgFiles[i]),
        imgOriginal: imgFiles[i].name,
      });
      // } else {
      //   tmp.push({
      //     imgPreview: UrlServe + "/" + imgFiles[i],
      //     imgOriginal: UrlServe + "/" + imgFiles[i],
      //   });
      // }
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);
    // free memory
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgFiles]);

  // get category data by id
  useEffect(() => {
    context.setProgress(40);
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      setFormFields({
        name: res.name,
        parent: res.parent,
        color: res.color,
      });

      setFilesEdit(res.images);
    });
    context.setProgress(100);
  }, []);
  console.log(formFields);

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  // handle format link image
  const handleFormatImages = (imagesToServer) => {
    try {
      return [...filesEdit, ...imagesToServer];
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // handle select image list
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
    } catch (error) {
      console.log(error);
    }
  };

  // delete image Category Edit . because format image link (uploads/category/name.jpg) from server not same with image link form local ()
  const handelDeleteCatImageEdit = (fileName, event) => {
    try {
      setFilesEdit((prevImgFiles) =>
        prevImgFiles.filter((img) => img !== fileName)
      );
      setImageDelete((prevImgFiles) => [...prevImgFiles, fileName]);
    } catch (err) {
      console.log(err);
    }
  };
  // set cat value select
  const handleChangeCategory = (event) => {
    setFormFields(() => ({
      ...formFields,
      parent: event.target.value,
    }));
  };

  // delete image from server
  const deleteImageServer = async () => {
    try {
      // khi sử dụng await thì không cần dùng .then()
      const result = await deleteFile("/api/deleteFiles/imageList", {
        data: { images: imageDelete },
      });
      if (result?.status === 200 || result?.response?.data?.code === "ENOENT") {
        return true;
      }
      return result;
    } catch (err) {
      console.log(err);
      return err.response ? err.response : err;
    }
  };

  // submit create category
  const editCategory = async (e) => {
    e.preventDefault();
    // validate input form
    if (formFields.name !== "" && formFields.color !== "") {
      try {
        setIsLoading(true);

        // delete file in server
        if (imageDelete.length !== 0) {
          const resultDeleteImage = await deleteImageServer();
          setImageDelete([]);
          if (resultDeleteImage !== true) {
            console.log(resultDeleteImage);
            throw resultDeleteImage?.response?.data?.message;
          }
        }
        let resultUploadImage = { status: false, data: [] };
        if (imgFiles.length !== 0) {
          // upload image
          const formData = new FormData();
          for (let i = 0; i < imgFiles.length; i++) {
            formData.append("files", imgFiles[i]);
          }

          // upload file image
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
        }

        // merger image deleted list vs resultUploadImage
        formFields.images = handleFormatImages(resultUploadImage.data);

        await editData(`/api/category/${id}`, formFields).then((res) => {
          if (res?.response?.status) {
            throw res?.response?.data.message;
          }

          context.setAlertBox({
            open: true,
            msg: "The Category is Updated !",
            error: false,
          });
        });
      } catch (error) {
        context.setAlertBox({
          open: true,
          msg: `The Category Update  Fails : ${error}`,
          error: true,
        });
      }
    } else {
      // alert
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the fields",
      });
      // end alert
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Edit Category</h5>
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

        <form action="" className="form" onSubmit={editCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Category Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={formFields.name}
                    onChange={changeInput}
                  />
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
                  <input
                    type="text"
                    name="color"
                    value={formFields.color}
                    onChange={changeInput}
                  />
                </div>
              </div>

              <div className="card p-4 mt-0">
                <div className="imagesUploadSec">
                  <h5 className="mb-4">Media And Published</h5>
                  <div className="imgUploadBox d-flex align-items-center">
                    {filesEdit?.length !== 0 &&
                      filesEdit?.map((img, index) => (
                        <div className="uploadBox" key={index}>
                          <span
                            className="remove"
                            onClick={(event) =>
                              handelDeleteCatImageEdit(img, event)
                            }
                          >
                            <IoCloseSharp />
                          </span>
                          <div className="box">
                            <LazyLoadImage
                              alt={"image"}
                              effect="blur"
                              name="images"
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

export default CategoryEdit;
