export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  };

  return date.toLocaleString("en-US", options);
};
