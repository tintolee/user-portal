export const currencyConverter = (amt: number) => {
  if (isNaN(amt)) {
    amt = 0;
  }
  const num = amt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return num;
};

/** This is a function to format numbers to currency */
export function currencyConverter2(n: number, currency: string, decimalPlaces?: 0 | 2) {
  return (
    currency +
    n.toFixed(decimalPlaces || 0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    })
  );
}
