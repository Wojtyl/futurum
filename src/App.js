import "./App.css";
import Header from "./components/UI/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CampaignProvider from "./context/ContextProvider";
import CampaignForm from "./components/Forms/CampaignForm";
import ReadCampaigns from "./components/UI/ReadCampaigns";
import UpdateCampaign from "./components/UI/Update";

function App() {
  const handler = () => {
    console.log("lll");
  };
  return (
    <Router>
      <CampaignProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ReadCampaigns />} />
          <Route path="/create" element={<CampaignForm onCreate={handler} />} />
          <Route path="/update" element={<UpdateCampaign />} />
        </Routes>
      </CampaignProvider>
    </Router>
  );
}

export default App;
