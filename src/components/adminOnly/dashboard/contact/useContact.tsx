import { useDataFetcher } from "../tables-common/useTablesDataFetcher";
import { adminCategoryType } from '@/Schemas/categories';
import { getAllMessages } from "@/actions/admin/contact";
import { IContactTableData } from "@/Schemas/contactUs";

export const useContact = () => {
  return useDataFetcher<IContactTableData>(getAllMessages);
};