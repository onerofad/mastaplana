import 'semantic-ui-css/semantic.min.css'
import { createMedia } from "@artsy/fresnel"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import LaunchPage from "./components/LaunchPage";
import SignIn from "./components/SignIn";
import Photos from './components/Photos';
import Audio from './components/Audio';
import Video from './components/Video';
import Document from './components/Document';
import VerifyEmail from './components/VerifyEmail';
import Community from './components/Community';
import { NoticeCenter } from './components/NoticeCenter';
import { useState, useEffect } from 'react';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024
    }
})

const App = () => {
    const [clockTime, setClockTime] = useState("00:00:00");
    const [yearformat, setyearformat] = useState("00/00/00")
      
    const [aTime, setaTime] = useState("09:45:00");
    const [dcal, setdcal] = useState("01/02/2025");
    const [description, setDescription] = useState("")
  
    const [play, setPlay] = useState('')

  useEffect(() => {
    if (clockTime === aTime && yearformat === dcal) 
    {
      setPlay('https://res.cloudinary.com/du3ck2joa/video/upload/v1734954643/alarm_mastaplana/alarm2_cktu8c.wav')
      alert("its time")
    }
  }, [clockTime, play]);

  const updateClockTime = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    let day = currentTime.getDate();
    let month = currentTime.getMonth() + 1;
    let year = currentTime.getFullYear();

    if (hours.toString().length === 1) hours = "0" + hours;
    if (minutes.toString().length === 1) minutes = "0" + minutes;
    if (seconds.toString().length === 1) seconds = "0" + seconds;

    let clockFormat = `${hours}:${minutes}:${seconds}`;
    setClockTime(clockFormat);

    if (day.toString().length === 1) day = "0" + day;
    if (month.toString().length === 1) month = "0" + month;
    if (year.toString().length === 1) year = "0" + year;

    let dateFormat = `${month}/${day}/${year}`;
    setyearformat(dateFormat)

  };

  useEffect(() => {
      setInterval(updateClockTime, 1000);
  }, []);

  return (
    <>
    <audio src={play} autoPlay />
    <MediaContextProvider>
      <Media at="mobile">
        <BrowserRouter>
          <Routes>
          <Route index element={<LaunchPage mobile />} />
            <Route path="/signup" element={<SignUp mobile />} />
            <Route path="/dashboard" element={<Dashboard mobile />} />
            <Route path="/signin" element={<SignIn mobile />} />
            <Route path="/photos" element={<Photos mobile />} />
            <Route path='/audio'  element={<Audio mobile />} />
            <Route path='/video'  element={<Video mobile />} />
            <Route path='/document' element={<Document mobile />} />
            <Route path='/community' element={<Community mobile />}  />
            <Route path='/verifyemail/:email' element={<VerifyEmail mobile />}  />
            <Route path='/notice_center' element={<NoticeCenter mobile />}  />

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
            <Route path="/photos" element={<Photos />} />
            <Route path='/audio' element={<Audio />} />
            <Route path='/video'  element={<Video />} />
            <Route path='/document' element={<Document />} />
            <Route path='/community' element={<Community />} />
            <Route path='/verifyemail/:email' element={<VerifyEmail />} />
            <Route path='/notice_center' element={<NoticeCenter />} />


          </Routes>
        </BrowserRouter>

      </Media>
    </MediaContextProvider>
    </>
  );
}

export default App;
