const digits = (digit) =>
  (digit.toString().length === 1) ? `0${digit}` : digit;

// errado na tela conferir se é no banco ou na formatação

module.exports = (date) => {
  const d = new Date(date);
  return `${digits(d.getUTCMonth() + 1)}/${digits(d.getUTCDate())}`
};
