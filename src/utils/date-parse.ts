type Parsed = {
  year: number;
  month: number;
  monthName: string[];
  date: number;
  day: number;
  dayName: string[];
  hours: number;
  minutes: number;
  seconds: number;
  isCurrent: boolean;
};

type ParseDate = {
  value: Parsed;
  format: (a: string) => string;
};

export const REGEX_FORMAT =
  /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const months = [
  ["January", "Jan"],
  ["February", "Feb"],
  ["March", "Mar"],
  ["April", "Apr"],
  ["May", "May"],
  ["June", "June"],
  ["July", "July"],
  ["August", "Aug"],
  ["September", "Sept"],
  ["October", "Oct"],
  ["November", "Nov"],
  ["December", "Dec"],
];
const days = [
  ["Sunday", "Sun", "Su", "S"],
  ["Monday", "Mon", "Mo", "M"],
  ["Tuesday", "Tue", "Tu", "T"],
  ["Wednesday", "Wed", "We", "W"],
  ["Thursday", "Thu", "Th", "T"],
  ["Friday", "Fri", "Fr", "F"],
  ["Saturday", "Sat", "Sa", "S"],
];
const pad = (val: number | string, num = 2) => {
  return String(val).padStart(num, "0");
};

const parse = (str: string) => {
  const date = new Date(str);
  const currentDate = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    monthName: months[date.getMonth()],
    date: date.getDate(),
    day: date.getDay(),
    dayName: days[date.getDay()],
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    isCurrent: date.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0),
  };
};

const parseDate = (str: string): ParseDate => {
  const parsed: Parsed = parse(str);

  return {
    value: parsed,
    format: (pattern = "DD HH YYYY") => {
      const matches = (match: string) => {
        switch (match) {
          case "YY":
            return String(parsed.year).slice(-2);
          case "YYYY":
            return parsed.year;
          case "M":
            return parsed.month + 1;
          case "MM":
            return pad(parsed.month);
          case "MMM":
            return parsed.monthName[1];
          case "MMMM":
            return parsed.monthName[0];
          case "D":
            return parsed.date;
          case "DD":
            return pad(parsed.date);
          case "d":
            return parsed.dayName[3];
          case "dd":
            return parsed.dayName[2];
          case "ddd":
            return parsed.dayName[1];
          case "dddd":
            return parsed.dayName[0];
          case "H":
            return parsed.hours;
          case "HH":
            return pad(parsed.hours);
          case "m":
            return parsed.minutes;
          case "mm":
            return pad(parsed.minutes);
          case "s":
            return parsed.seconds;
          case "ss":
            return pad(parsed.seconds);
          default:
            break;
        }
        return null;
      };

      return pattern.replace(REGEX_FORMAT, (match, $1) => $1 || matches(match));
    },
  };
};

export default parseDate;
