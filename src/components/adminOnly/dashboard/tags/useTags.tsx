import { useDataFetcher } from "../tables-common/useTablesDataFetcher";
import { getFilteredTags } from "@/actions/admin/tags-actions";

import { adminTagsType } from '@/Schemas/tags';


export const useTags = () => {
  return useDataFetcher<adminTagsType>(getFilteredTags);
};