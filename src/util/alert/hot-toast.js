import toast from "react-hot-toast";

const hotToast = (message, type = "success") => {
    if (type === "success") {
        toast.success(message, {
            className: "text-center",
        });
    } else if (type === "error") {
        toast.error(message, {
            className: "text-center",
        });
    } else {
        toast(message, {
            className: "text-center",
        });
    }
};

export default hotToast;