import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import { createMedia } from "@artsy/fresnel"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import LaunchPage from "./components/LaunchPage";
import SignIn from "./components/SignIn";

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
          <Route index element={<LaunchPage mobile />} />
            <Route path="/signup" element={<SignUp mobile />} />
            <Route path="/dashboard" element={<Dashboard mobile />} />
            <Route path="/signin" element={<SignIn mobile />} />
          </Routes>
        </BrowserRouter>

      </Media>

      <Media greaterThan="mobile">
        <BrowserRouter>
          <Routes>
            <Route index element={<LaunchPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn/>} />


          </Routes>
        </BrowserRouter>

      </Media>
    </MediaContextProvider>

  );
}

export default App;
