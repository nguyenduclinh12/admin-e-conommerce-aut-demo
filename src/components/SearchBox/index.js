import React from "react";
import { IoSearch } from "react-icons/io5";
import "./SearchBox.css";

const SearchBox = () => {
  return (
    <div className="searchBox position-relation d-flex align-items-center">
      <IoSearch className="mr-2"></IoSearch>
      <input type="text" placeholder="Search here..." />
    </div>
  );
};

export default SearchBox;
