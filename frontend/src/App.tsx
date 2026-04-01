import { Route, Routes } from "react-router-dom";
import * as styles from "./App.css";
import { LandingPage } from "./routes/LandingPage";
import { BuildPage } from "./routes/BuildPage";
import { ResultPage } from "./routes/ResultPage";

export default function App() {
  return (
    <div className={styles.appRoot}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/build/:draftId" element={<BuildPage />} />
        <Route path="/result/:shareSlug" element={<ResultPage />} />
      </Routes>
    </div>
  );
}
