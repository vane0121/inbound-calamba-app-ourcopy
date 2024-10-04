const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date
    .toLocaleDateString("en-US", options)
    .replace(/,/g, "") // Replace commas with hyphens
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

const formatToDateInput = (dateString: string): string => {
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
};

const formateAge = (purchaseDateString: string): string => {
  const purchaseDate = new Date(purchaseDateString);
  const currentDate = new Date();

  if (purchaseDate > currentDate) {
    return "0Y 0M";
  }

  let years = currentDate.getFullYear() - purchaseDate.getFullYear();
  let months = currentDate.getMonth() - purchaseDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}Y ${months}M`;
};
const Utility = {
  formateAge,
  formatToDateInput,
  formatDate,
};
export { Utility };
