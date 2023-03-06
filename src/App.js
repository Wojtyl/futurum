import "./App.css";
import Header from "./components/UI/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ReadCampaigns from "./components/UI/ReadCampaigns";
import UpdateCampaign from "./components/UI/Update";
import Create from "./components/UI/Create";
import BalanceForm from "./components/Forms/BalanceForm";
import axios from "axios";
import { useEffect, useState } from "react";
import CampaignContext from "./context/CampaignsContext";

function App() {
  const [balance, setBalance] = useState("");
  const getBalanceHandler = () => {
    axios
      .get("https://6401dcb30a2a1afebef3c3de.mockapi.io/balance")
      .then((res) => {
        setBalance(res.data[0].balance);
      });
  };

  useEffect(() => {
    getBalanceHandler();
  }, []);

  return (
    <CampaignContext.Provider value={{ balanceHandler: getBalanceHandler }}>
      <Router>
        <Header balance={balance} />
        <Routes>
          <Route path="/" element={<ReadCampaigns />} />
          <Route
            path="/create"
            element={<Create onCreate={getBalanceHandler} />}
          />
          <Route path="/update" element={<UpdateCampaign />} />
          <Route
            path="/balance"
            element={<BalanceForm onUpdate={getBalanceHandler} />}
          />
        </Routes>
      </Router>
    </CampaignContext.Provider>
  );
}

export default App;
