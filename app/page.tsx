import CurrencyPriceComponent from "./components/CurrencyPrice";
export default function Home() {
  return (
    <>
    <p>{process.env.DATABASE_URL}</p>
      <CurrencyPriceComponent />
    </>
  );
}
