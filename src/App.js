import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Pages/Main";
import Article from "./Pages/Article";

import "./styles.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" name={"Main"} element={<Main />} />
        <Route index name={"Main"} element={<Main />} />
        <Route path=":title" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}
