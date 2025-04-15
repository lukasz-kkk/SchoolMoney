export const moneyToFloatingPoint = (value: number) => value / 100;
export const moneyToInteger = (value: number) => value * 100;
export const formatMoney = (value: number) =>
    new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
    }).format(moneyToFloatingPoint(value));
