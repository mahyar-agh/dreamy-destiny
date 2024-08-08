import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),

    onSuccess: (data) => {
      toast.success(`Booking # successfully deleted`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },

    onError: () =>
      toast.error(`There was a problem while deleting this booking!`),
  });

  return { deleteBooking, isDeleting };
}
