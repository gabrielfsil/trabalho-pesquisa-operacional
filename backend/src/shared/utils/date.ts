const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatMonth(vars: object) {
  var month = "";

  for (let [key, value] of Object.entries(vars)) {
    if (value === 1) {
      const [dia, mes, ano] = key.split("/");

      month = months[Number(mes) - 1];
    }
  }

  return month;
}
