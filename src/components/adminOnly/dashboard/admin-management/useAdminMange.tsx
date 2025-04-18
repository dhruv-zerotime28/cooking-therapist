import { useDataFetcher } from "../tables-common/useTablesDataFetcher";
import { adminTableType } from '@/Schemas/admin';
import { getAllAdmins } from '@/actions/admin/manage-admin-actions';


export const useAdminManage = () => {
  return useDataFetcher<adminTableType>(getAllAdmins);
};