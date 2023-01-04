import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataList } from "../../types/listDrag";

import { addItem, listGetAll } from "../actions/dragList";

interface IListDrag {
  data: IDataList[];
}

const initialState: IListDrag = {
  data: [],
};

export const listDrag = createSlice({
  name: "listDrag",
  initialState,
  reducers: {},
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
export const {} = listDrag.actions;
export default listDrag.reducer;
