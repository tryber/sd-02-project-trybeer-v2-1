const digits = (digit) => ((digit.toString().length === 1) ? `0${digit}` : digit);

const orderDateFormatter = (date) => {
  const d = new Date(date);
  return `${digits(d.getUTCMonth() + 1)}/${digits(d.getUTCDate())}`;
};

const chatDateFormatter = (date) => {
  const d = new Date(date);
  return `${digits(d.getUTCHours() + 1)}:${digits(d.getUTCMinutes())}`;
};

module.exports = {
  chatDateFormatter,
  orderDateFormatter,
}
