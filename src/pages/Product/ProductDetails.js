import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import "./ProductDetails.css";
import UserAvatarImgComponent from "../../components/UserAvatarImgComponent";
import { Button, Rating } from "@mui/material";
import { FaReply } from "react-icons/fa6";
import { useRef } from "react";

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

const ProductDetails = () => {
  const productSliderBig = useRef();
  const productSliderSml = useRef();

  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToSlide = (index) => {
    productSliderBig.current.slickGoTo(index);
    productSliderSml.current.slickGoTo(index);
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
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

            <StyledBreadCrumb label="Products View"></StyledBreadCrumb>
          </Breadcrumbs>
        </div>
      </div>
      <div className="card productDetailsSection">
        <div className="row">
          <div className="col-md-5 p-3">
            <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Product Gallery</h6>
              <Slider
                {...productSliderOptions}
                ref={productSliderBig}
                className="sliderBig mb-2"
              >
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item">
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
              </Slider>
              <Slider
                {...productSliderSmlOptions}
                ref={productSliderSml}
                className="sliderSml"
              >
                <div className="item" onClick={() => goToSlide(1)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(2)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(3)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(4)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(5)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/06.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(6)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/06.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="item" onClick={() => goToSlide(7)}>
                  <img
                    src="https://mironcoder-hotash.netlify.app/images/product/single/06.webp"
                    alt=""
                    className="w-100"
                  />
                </div>
              </Slider>
            </div>
          </div>
          <div className="col-md-7 p-3">
            <div className="pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Product Details</h6>
              <h4>
                Formal suits for men wedding slim fit 3 piece dress business
                party jacket
              </h4>
              <div className="productInfo mt-4">
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <MdBrandingWatermark />
                    </span>
                    <span className="name">Brand</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Ecstasy</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Category</span>
                  </div>
                  <div className="col-sm-9">
                    <span className="d-flex">
                      :{" "}
                      <ul className="list list-inline tags sml">
                        <li className="list-inline-item">
                          <span>SUITE</span>
                        </li>
                        <li className="list-inline-item">
                          <span>PARTY</span>
                        </li>
                        <li className="list-inline-item">
                          <span>SUITE</span>
                        </li>
                        <li className="list-inline-item">
                          <span>SUITE</span>
                        </li>
                        <li className="list-inline-item">
                          <span>SUITE</span>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Tags</span>
                  </div>
                  <div className="col-sm-9">
                    <span className="d-flex">
                      :{" "}
                      <ul className="list list-inline tags sml">
                        <li className="list-inline-item">
                          <span>RED</span>
                        </li>
                        <li className="list-inline-item">
                          <span>BLUE</span>
                        </li>
                        <li className="list-inline-item">
                          <span>YELLOW</span>
                        </li>
                        <li className="list-inline-item">
                          <span>GREEN</span>
                        </li>
                        <li className="list-inline-item">
                          <span>VIOLET</span>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Color</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Size</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Price</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Stock</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Review</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="name">Published</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Man's</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h4 className="mt-4 mb-3">Product Description</h4>
          <p>
            You can specify how many digits to display either side of current
            page with the siblingCount prop, and adjacent to the start and end
            page number with the You can specify how many digits to display
            either side of current page with the siblingCount prop, and adjacent
            to the start and end page number with the You can specify how many
            digits to display either side of current page with the siblingCount
            prop, and adjacent to the start and end page number with the You can
            specify how many digits to display either side of current page with
            the siblingCount prop, and adjacent to the start and end page number
            with the You can specify how many digits to display either side of
            current page with the siblingCount prop, and adjacent to the start
            and end page number with the You can specify how many digits to
            display either side of current page with the siblingCount prop, and
            adjacent to the start and end page number with the You can specify
            how many digits to display either side of current page with the
            siblingCount prop, and adjacent to the start and end page number
            with the You can specify how many digits to display either side of
            current page with the siblingCount prop, and adjacent to the start
            and end page number with <the></the>
          </p>
          <br />
          <h6 className="mt-4 mb-3">Rating Analytics</h6>
          <div className="ratingSection">
            <div className="ratingRow d-flex align-items-center">
              <span className="col1">5 Star</span>

              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "70%" }}></div>
                </div>
              </div>

              <span className="col3">(22)</span>
            </div>
            <div className="ratingRow d-flex align-items-center">
              <span className="col1">4 Star</span>

              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "50%" }}></div>
                </div>
              </div>

              <span className="col3">(22)</span>
            </div>
            <div className="ratingRow d-flex align-items-center">
              <span className="col1">3 Star</span>

              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "30%" }}></div>
                </div>
              </div>

              <span className="col3">(22)</span>
            </div>
            <div className="ratingRow d-flex align-items-center">
              <span className="col1">2 Star</span>

              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "20%" }}></div>
                </div>
              </div>

              <span className="col3">(22)</span>
            </div>
            <div className="ratingRow d-flex align-items-center">
              <span className="col1">1 Star</span>

              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "10%" }}></div>
                </div>
              </div>

              <span className="col3">(22)</span>
            </div>
          </div>

          <br />
          <h6 className="mt-4 mb-4">Customer Reviews</h6>
          <div className="reviewsSection">
            <div className="reviewsRow">
              <div className="row">
                <div className="col-sm-7 d-flex">
                  <div className="d-flex align-items-start flex-column">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserAvatarImgComponent
                        img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        lg={true}
                      ></UserAvatarImgComponent>
                      <div className="info pl-3">
                        <h6>Miron Mahmud</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                  <div className="ml-auto">
                    <Button className="btn-blue btn-big ml-auto">
                      <FaReply /> &nbsp; Reply
                    </Button>
                  </div>
                </div>

                <p className="mt-3">
                  You can specify how many digits to display either side of
                  current page with the siblingCount prop, and adjacent to the
                  start and end page number with the You can specify how many
                  digits to display either side of current page with the
                  siblingCount prop, and adjacent to the start and end page
                  number with the You can specify how many digits to display
                  either side of current page with the siblingCount prop, and
                  adjacent to the start and end page number with the You can
                  specify how many digits to display either side of current page
                  with
                </p>
              </div>
            </div>

            <div className="reviewsRow reply">
              <div className="row">
                <div className="col-sm-7 d-flex">
                  <div className="d-flex align-items-start flex-column">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserAvatarImgComponent
                        img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        lg={true}
                      ></UserAvatarImgComponent>
                      <div className="info pl-3">
                        <h6>Miron Mahmud</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                  <div className="ml-auto">
                    <Button className="btn-blue btn-big ml-auto">
                      <FaReply /> &nbsp; Reply
                    </Button>
                  </div>
                </div>

                <p className="mt-3">
                  You can specify how many digits to display either side of
                  current page with the siblingCount prop, and adjacent to the
                  start and end page number with the You can specify how many
                  digits to display either side of current page with the
                  siblingCount prop, and adjacent to the start and end page
                  number with the You can specify how many digits to display
                  either side of current page with the siblingCount prop, and
                  adjacent to the start and end page number with the You can
                  specify how many digits to display either side of current page
                  with
                </p>
              </div>
            </div>
            <div className="reviewsRow reply">
              <div className="row">
                <div className="col-sm-7 d-flex">
                  <div className="d-flex align-items-start flex-column">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserAvatarImgComponent
                        img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        lg={true}
                      ></UserAvatarImgComponent>
                      <div className="info pl-3">
                        <h6>Miron Mahmud</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                  <div className="ml-auto">
                    <Button className="btn-blue btn-big ml-auto">
                      <FaReply /> &nbsp; Reply
                    </Button>
                  </div>
                </div>

                <p className="mt-3">
                  You can specify how many digits to display either side of
                  current page with the siblingCount prop, and adjacent to the
                  start and end page number with the You can specify how many
                  digits to display either side of current page with the
                  siblingCount prop, and adjacent to the start and end page
                  number with the You can specify how many digits to display
                  either side of current page with the siblingCount prop, and
                  adjacent to the start and end page number with the You can
                  specify how many digits to display either side of current page
                  with
                </p>
              </div>
            </div>
            <div className="reviewsRow">
              <div className="row">
                <div className="col-sm-7 d-flex">
                  <div className="d-flex align-items-start flex-column">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserAvatarImgComponent
                        img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        lg={true}
                      ></UserAvatarImgComponent>
                      <div className="info pl-3">
                        <h6>Miron Mahmud</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                  <div className="ml-auto">
                    <Button className="btn-blue btn-big ml-auto">
                      <FaReply /> &nbsp; Reply
                    </Button>
                  </div>
                </div>

                <p className="mt-3">
                  You can specify how many digits to display either side of
                  current page with the siblingCount prop, and adjacent to the
                  start and end page number with the You can specify how many
                  digits to display either side of current page with the
                  siblingCount prop, and adjacent to the start and end page
                  number with the You can specify how many digits to display
                  either side of current page with the siblingCount prop, and
                  adjacent to the start and end page number with the You can
                  specify how many digits to display either side of current page
                  with
                </p>
              </div>
            </div>
          </div>

          <br />
          <h6 className="mt-4 mb-4">Review Reply Form</h6>
          <form className="reviewForm">
            <textarea placeholder="write here" className="mb-4"></textarea>
            <Button className="btn-blue btn-big btn-lg w-100">
              drop your replies
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
