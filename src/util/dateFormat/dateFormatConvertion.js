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

    return `${month}/${day}/${year}`;
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


// dd/mm/yyyy at  hh:mm AM format
export const formatDateTimeMeridianWithoutSecond = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const formatted = new Intl.DateTimeFormat("en-IN", options).format(date);

    return formatted.replace(",", " at");
};


// yyyy format 
export const getYear = (dateString) => {
    if (!dateString) return "N/A";

    return new Date(dateString).getFullYear();
}


// ISO format
export const buildISOFormat = (date, time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const appointment = new Date(date);
    appointment.setHours(hours, minutes, 0, 0);

    return appointment.toISOString();
};


export const getDateAndTimeFromISO = (isoString) => {
  const date = new Date(isoString);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return {
    selectedDate: date,
    selectedTime: `${displayHour}:${minutes} ${period}`,
  };
};