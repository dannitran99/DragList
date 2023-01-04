export interface IDataList {
  name: string;
  description?: string;
  status: string;
  create_at: Date | string;
  update_at?: Date | string;
  end_at?: Date | string;
}
