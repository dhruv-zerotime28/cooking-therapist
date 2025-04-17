import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Iadmin{
    id : string,
    name : string,
    email : string,
}

interface StoreState {
  admin : Iadmin | null;
  addAdminDetails: (adminInfo : Iadmin) => void;
  removeAdminDetails: () => void;
}

const useStore = create<StoreState>()(
    persist(
      (set) => ({
        admin: null, 
        addAdminDetails: (adminInfo) => set({ admin: adminInfo }),
        removeAdminDetails: () => set({ admin: null }),
      }),
      { name: "admin-storage" } 
    )
  );

export default useStore;
