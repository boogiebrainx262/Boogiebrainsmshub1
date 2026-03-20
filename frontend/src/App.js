import React from "react";
import Wallet from "./pages/Wallet";

function App() {
  const userId = "123456789"; // replace with logged-in user ID

  return (
    <div>
      <h1>BoogieBrains SMS Hub</h1>
      <Wallet userId={userId} />
    </div>
  );
}

export default App;