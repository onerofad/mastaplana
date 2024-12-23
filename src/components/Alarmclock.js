import {useState, useEffect} from 'react'
import {Segment, Header, Button, Grid, Input} from 'semantic-ui-react'

export const Alarmclock = () => {
  const [clockTime, setClockTime] = useState("00:00:00");
  const [alarmTime, setAlarmTime] = useState("0");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (status && clockTime === alarmTime) {
      console.log("get up", clockTime, alarmTime);
      setStatus(false);
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
    //console.log("Clock: ", clockFormat);
    setClockTime(clockFormat);
  };

  const handleAlarmTimeChange = (e) => {
    console.log("alarm time: ", e.target.value);
    setAlarmTime(e.target.value);
  };

  const handleToggle = () => {
    setStatus(!status);
  };

  const handleReset = () => {
    setAlarmTime("0");
    setStatus(false);
  };

  useEffect(() => {
    setInterval(updateClockTime, 1000);
  }, []);

  return (
    <Segment vertical style={{width: 250}}>
        <Grid textAlign="center">
            <Grid.Row>
                <Grid.Column>
                    <Header content="Current Time" />
                    {clockTime}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Input
                        type="date"
                        step="1"
                        value={alarmTime}
                        onChange={handleAlarmTimeChange}
                        fluid
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                <Button positive onClick={handleToggle}>
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