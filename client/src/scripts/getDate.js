const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const date = new Date();

const currentDate = date.getDate();
let currentMonth = date.getMonth();

const dayOfWeek = date.getDay();
const monthNumber = date.getMonth();

const day = daysOfWeek[dayOfWeek];
const month = months[monthNumber];
const year = date.getFullYear();

export default { currentDate, currentMonth, day, month, year };
