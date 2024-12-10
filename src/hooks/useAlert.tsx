import { toast } from "sonner";

export const useAlert = (message:string, isError: boolean) => {
  const alert = () => {
    if (isError) {
      return toast.error(message);
    }
    else {
      return toast.success(message)
    }
  }

  alert()
}