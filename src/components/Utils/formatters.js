export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const formatCryptoAddress = (address) => {
  if (!address) {
    return "";
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function formatBalance({ decimals, value, symbol }) {
  const actualValue = Number(value) / Math.pow(10, decimals);
  const formattedValue = actualValue.toFixed(3);
  return `${formattedValue}${symbol}`;
}

export function truncateToTwoDecimals(num) {
  const numStr = num.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  const truncatedDecimal = decimalPart ? decimalPart.substring(0, 2) : "00";
  return `${integerPart}.${truncatedDecimal}`;
}
