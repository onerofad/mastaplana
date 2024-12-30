import {useState, useEffect} from 'react'
import {Segment, Header, Button, Grid, Input, Form} from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker'

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const Alarmclock = () => {
  const [clockTime, setClockTime] = useState("00:00:00");
  // ^const [alarmTime, setAlarmTime] = useState("0");
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [aTime, setaTime] = useState("00:00:00");
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState("positive");
  const [play, setPlay] = useState('')

  useEffect(() => {
    let h = alarmTime.getHours();
    let m = alarmTime.getMinutes();
    let s = alarmTime.getSeconds();

    if (h.toString().length === 1) h = "0" + h;
    if (m.toString().length === 1) m = "0" + m;
    if (s.toString().length === 1) s = "0" + s;

    let atime = `${h}:${m}:${s}`;

    setaTime(atime)
   
   // alert(clockTime)
    if (status && clockTime === aTime) 
    {
      console.log("get up", clockTime, alarmTime);
      setPlay('https://res.cloudinary.com/du3ck2joa/video/upload/v1734954643/alarm_mastaplana/alarm2_cktu8c.wav')
      setStatus(false);
      setColor("positive")
    }
  }, [clockTime, alarmTime, status]);

  const updateClockTime = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    if (hours.toString().length === 1) hours = "0" + hours;
    if (minutes.toString().length === 1) minutes = "0" + minutes;
    if (seconds.toString().length === 1) seconds = "0" + seconds;

    let clockFormat = `${hours}:${minutes}:${seconds}`;
    setClockTime(clockFormat);
  };

  const handleAlarmTimeChange = (value) => {
    setAlarmTime(value);
  };

  const handleToggle = () => {
    setStatus(!status);
    setColor("negative")
  };

  const handleReset = () => {
    setAlarmTime(new Date());
    setStatus(false);
    setPlay('')
  };

  useEffect(() => {
    setInterval(updateClockTime, 1000);
  }, []);

  return (
    <Segment vertical style={{width: 250}}>
        <Grid textAlign="center">
            <Grid.Row columns={2} divided>
                <Grid.Column>
                    <Header content="Current Time" />
                    {clockTime}
                </Grid.Column>
                <Grid.Column>
                    <Header content="Alarm Time" />
                    {aTime}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {/*<Input
                        type="calendar"
                        step="1"
                        value={alarmTime}
                        onChange={handleAlarmTimeChange}
                        fluid
                    />*/}
                    <DateTimePicker
                        calendarIcon={null}
                        clearIcon={null} 
                        value={alarmTime}
                        onChange={(value) => handleAlarmTimeChange(value)}
                    />
                  
                </Grid.Column>
               
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form size='small'>
                      <Form.Input
                        placeholder="Enter Event"
                      />
                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                <audio src={play} autoPlay/>
                <Button color={color} onClick={handleToggle}>
                    {status ? "Stop Alarm" : "Start Alarm"}
                </Button>
                <Button secondary onClick={handleReset}>
                    Reset Alarm
                </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    </Segment>
    
    );
};