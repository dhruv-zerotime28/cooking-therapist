import { useDataFetcher } from "../tables-common/useTablesDataFetcher";
import { adminCategoryType } from '@/Schemas/categories';
import { getAllCategories } from "@/actions/admin/categories-actions";


export const useCategory = () => {
  return useDataFetcher<adminCategoryType>(getAllCategories);
};