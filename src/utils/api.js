import React from "react";
import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:4000" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    return await axios.post("http://localhost:4000" + url, formData);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const postUploadImages = async (url, formData) => {
  try {
    const res = await axios.post(`http://localhost:4000${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteFile = async (url, formData) => {
  try {
    const res = await axios.delete(`http://localhost:4000${url}`, formData);

    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const editData = async (url, updateFormData) => {
  try {
    return await axios.put(
      `http://localhost:4000${url}`,
      updateFormData
    );
  } catch (error) {
    return error;
  }
};

export const deleteData = async (url, id) => {
  try {
    const res  = await axios.delete(`http://localhost:4000${url}/${id}`);
    return res;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const UrlServe = "http://localhost:4000";
