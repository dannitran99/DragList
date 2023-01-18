import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataList } from "../../types/listDrag";

import { addItem, listGetAll } from "../actions/dragList";

interface IListDrag {
  data: IDataList[];
  filter: null | IDataList[];
  idSelect: string;
  idDrag: string;
  loading: boolean;
}

const initialState: IListDrag = {
  loading: false,
  data: [],
  filter: null,
  idSelect: "",
  idDrag: "",
};

export const listDrag = createSlice({
  name: "listDrag",
  initialState,
  reducers: {
    setIdSelect: (state, { payload }: PayloadAction<string>) => {
      state.idSelect = payload;
    },
    setIdDrag: (state, { payload }: PayloadAction<string>) => {
      state.idDrag = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listGetAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      listGetAll.fulfilled,
      (state, { payload }: PayloadAction<IDataList[]>) => {
        state.data = payload;
        state.loading = false;
      }
    );
    builder.addCase(listGetAll.rejected, (state) => {
      console.log("err");
      state.loading = false;
    });
    builder.addCase(
      addItem.fulfilled,
      (state, { payload }: PayloadAction<IDataList[]>) => {
        state.data = payload;
      }
    );
  },
});

export const selectUser = (state: { list: IListDrag }) => state.list;
export const { setIdSelect, setIdDrag } = listDrag.actions;
export default listDrag.reducer;
