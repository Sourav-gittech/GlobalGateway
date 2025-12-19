// dd-mm-yy format
export const formatDateDDMMYY = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
};


// dd-mm-yyyy format
export const formatDateDDMMYYYY = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};


// dd-mm-yyyy hh:mm format
export const formatDateDDMMYYYYHHMM = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};


// dd/mm/yyyy, hh:mm:ss AM format
export const formatDateTimeMeridian = (dateString) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};