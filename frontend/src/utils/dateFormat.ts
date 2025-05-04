import dayjs from "dayjs";

export const formatISODate = (date: Date | string | dayjs.Dayjs) => dayjs(date).startOf("day").format("YYYY-MM-DD");

export const dateToDateOnlyISOString = (date: Date) => date.toISOString().slice(0, 10);
