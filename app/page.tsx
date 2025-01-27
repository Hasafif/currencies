import CurrencyPriceComponent from "./components/CurrencyPrice";
export default function Home() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  return (
    <>
      <CurrencyPriceComponent />
    </>
  );
}
