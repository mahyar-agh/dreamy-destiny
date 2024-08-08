import { useQuery } from "@tanstack/react-query";
import { apiCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: apiCabins,
  });

  return { isLoading, error, cabins };
}
