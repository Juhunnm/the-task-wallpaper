import { writeWallpaperQuery } from "@/lib/query";
import { useLocation, useNavigate } from "react-router";

export default function useUpdateWallpaperQuery() {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  return (params: Record<string, string>) => {
    const nextSearch = writeWallpaperQuery(search, params);

    navigate(
      {
        pathname,
        search: nextSearch,
      },
      { replace: true },
    );
  };
}
