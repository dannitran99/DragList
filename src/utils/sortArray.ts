import { SelectTypes } from "../constants/selectValue";
import { IDataList } from "../types/listDrag";

const check = (
  item1: string | Date | number,
  item2: string | Date | number,
  type: string
) => {
  if (item1 < item2 && type === "desc") {
    return -1;
  }
  if (item1 < item2 && type === "asc") {
    return 1;
  }
  if (item1 > item2 && type === "desc") {
    return 1;
  }
  if (item1 > item2 && type === "asc") {
    return -1;
  }
  return 0;
};

export default function sortArray(arr: IDataList[], key: string) {
  switch (key) {
    case SelectTypes.NAME_ASC:
      return arr.sort((a: IDataList, b: IDataList) =>
        check(a.name.toUpperCase(), b.name.toUpperCase(), "asc")
      );
    case SelectTypes.NAME_DESC:
      return arr.sort((a: IDataList, b: IDataList) =>
        check(a.name.toUpperCase(), b.name.toUpperCase(), "desc")
      );
    case SelectTypes.DATE_ASC:
      return arr.sort((a: IDataList, b: IDataList) => {
        let timeA = a.create_at;
        let timeB = b.create_at;
        if (a.update_at) timeA = a.update_at;
        if (a.end_at) timeA = a.end_at;

        if (b.update_at) timeB = b.update_at;
        if (b.end_at) timeB = b.end_at;

        return check(timeA, timeB, "asc");
      });
    case SelectTypes.DATE_DESC:
      return arr.sort((a: IDataList, b: IDataList) => {
        let timeA = a.create_at;
        let timeB = b.create_at;
        if (a.update_at) timeA = a.update_at;
        if (a.end_at) timeA = a.end_at;

        if (b.update_at) timeB = b.update_at;
        if (b.end_at) timeB = b.end_at;

        return check(timeA, timeB, "desc");
      });
    default:
      break;
  }
  return [];
}
