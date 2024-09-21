import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import { createMedia } from "@artsy/fresnel"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024
    }
})

function App() {
  return (
    <MediaContextProvider>
      <Media at="mobile">
        <BrowserRouter>
          <Routes>
           
          </Routes>
        </BrowserRouter>

      </Media>

      <Media greaterThan="mobile">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>

      </Media>
    </MediaContextProvider>

  );
}

export default App;
