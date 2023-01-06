import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataList } from "../../types/listDrag";

import { addItem, listGetAll } from "../actions/dragList";

interface IListDrag {
  data: IDataList[];
  idSelect: string;
}

const initialState: IListDrag = {
  data: [],
  idSelect: "",
};

export const listDrag = createSlice({
  name: "listDrag",
  initialState,
  reducers: {
    setId: (state, { payload }: PayloadAction<string>) => {
      state.idSelect = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      listGetAll.fulfilled,
      (state, { payload }: PayloadAction<IDataList[]>) => {
        state.data = payload;
      }
    );
    builder.addCase(listGetAll.rejected, () => {
      console.log("err");
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
export const { setId } = listDrag.actions;
export default listDrag.reducer;
