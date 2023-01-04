import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDataList } from "../../types/listDrag";

export const listGetAll = createAsyncThunk("list/get", async () => {
  const getData = localStorage.getItem("dataList");
  if (getData) return JSON.parse(getData);
  const data = await axios.get("data.json").then((json) => {
    return json.data;
  });
  return data;
});

export const addItem = createAsyncThunk(
  "list/add",
  async (data: IDataList[], { rejectWithValue }) => {
    localStorage.setItem("dataList", JSON.stringify(data));
    return data;
  }
);
