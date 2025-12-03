export const formatDate = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = diffMs / (1000 * 60);
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const calendarDiffDays = Math.floor(
    (nowDay.getTime() - dateDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  let prefix: string;

  if (diffMinutes < 1) {
    prefix = "Just now";
  } else if (diffMinutes < 60) {
    const mins = Math.floor(diffMinutes);
    prefix = mins === 1 ? "1 minute ago" : `${mins} minutes ago`;
  } else if (diffHours < 24) {
    const hours = Math.floor(diffHours);
    prefix = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (calendarDiffDays === 1) {
    prefix = "Yesterday";
  } else {
    const days = Math.ceil(diffDays);
    prefix = days === 1 ? "1 day ago" : `${days} days ago`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${prefix} (${day} ${month} ${year}) ${hours}:${minutes}`;
};
