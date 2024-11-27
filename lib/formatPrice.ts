type Args = {
  price: number;
  currency?: string;
};

export function formatPrice({ price, currency = "CAD" }: Args) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
  }).format(price);
}
