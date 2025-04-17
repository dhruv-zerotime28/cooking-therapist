'use client'

import { useState, useEffect } from "react";

export const useDataFetcher = <T,>(
  fetchFunction: (params: { search: string; page: number; sortField: string }) => Promise<T[]>,
  initialSortField = "createdAt"
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(initialSortField);
  const [error, setError] = useState<string | null>(null);
  const [refetch,setRefetch] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const res = await fetchFunction({ search, page, sortField });
        setData(res);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, sortField,refetch, fetchFunction]);

  const refreshData = () => setRefetch((prev) => prev + 1);

  return { data, loading, error,page, setPage, setSearch, setSortField ,refreshData};
};
