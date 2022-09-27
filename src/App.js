import "./styles.css";
import { useEffect, useState } from "react";
// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)
const coinsData = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  DOGEUSDT: "DogeCoin"
};

export default function App() {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((coin) => {
          if (Object.keys(coinsData).includes(coin.symbol)) {
            return true;
          }
        });
        console.log(filteredData);
        setCryptoData(filteredData);
      });
  });

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          {cryptoData.map((coins, i) => {
            return (
              <tr key={coins.symbol}>
                <td>{i + 1}</td>
                <td>{coinsData[coins.symbol]}</td>
                <td>${Number(coins.lastPrice).toLocaleString()}</td>
                <td
                  style={
                    Number(coins.priceChangePercent) > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {coins.priceChangePercent > 0 ? "▲" : "▼"}

                  {coins.priceChangePercent}
                </td>
              </tr>
            );
          })}

          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
