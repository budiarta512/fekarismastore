import moment from "moment";

export const getYear = (date: any) => {
  return moment(date).format("YYYY");
};

export const getDate = (date: any) => {
  return moment(date).locale("id").format("DD MMMM YYYY");
};

export const getDate2 = (date: any) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
