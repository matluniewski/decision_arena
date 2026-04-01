import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { BuildPage } from "./routes/BuildPage";
import { ResultPage } from "./routes/ResultPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/build/:draftId" element={<BuildPage />} />
      <Route path="/result/:shareSlug" element={<ResultPage />} />
    </Routes>
  );
}
