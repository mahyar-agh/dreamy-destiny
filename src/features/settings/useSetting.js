import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const {
    isLoading,
    data: setting,
    error,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { isLoading, error, setting };
}
