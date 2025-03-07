import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, ScrollToTop } from "./pages";
import { Header} from "./pages";
import Invoice from "./components/Invoice";

export default function App() {

  return (
    <>
  {/* // <><BrowserRouter>
  //     <ScrollToTop />
  //     <Header />
  //     <React.Fragment>
  //       <Home />
  //       <Footer />
  //     </React.Fragment>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={<Home />}
  //       ></Route>
  //     </Routes>
  //   </BrowserRouter> */}
    <BrowserRouter>
        <ScrollToTop />
        <Header /> {/* Header outside the Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Invoice" element={<Invoice />} /> {/* Route for /Invoice */}
        </Routes>
    </BrowserRouter>
  </>
  );
}
