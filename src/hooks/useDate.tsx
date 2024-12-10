export default function useDate(dateStr: string) {
  const date = new Date(dateStr);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
}