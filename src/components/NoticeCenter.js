import { Grid, Segment, Container, Dropdown, Icon, Header, Table, Button } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useGetAlarmsQuery } from "../features/api/apiSlice";

export const NoticeCenter = ({mobile}) => {

      const [clockTime, setClockTime] = useState("00:00:00");
      const [yearformat, setyearformat] = useState("00/00/00")
    
      const [aTime, setaTime] = useState("07:40:00");
      const [dcal, setdcal] = useState("01/02/2025");
      const [description, setDescription] = useState("")

      const [play, setPlay] = useState('')

      //const [count, setcount] = useState(0)
      const {data:all_alarms, isSuccess} = useGetAlarmsQuery()

      let alarm_details
      let count = 0
      if(isSuccess){
        const currentAlarms = all_alarms.filter(e => e.email === sessionStorage.getItem("email"))
            alarm_details = currentAlarms.map(alarm => (              
                <Table.Row>
                    <Table.Cell>{alarm.description}</Table.Cell>
                    <Table.Cell>{alarm.dcal + "  " + alarm.aTime}</Table.Cell>
                    <Table.Cell><Button><Icon name="trash" /></Button></Table.Cell>
                </Table.Row>
            ))

      }
    
      useEffect(() => {
        if (clockTime === aTime && yearformat === dcal) 
        {
          setPlay('https://res.cloudinary.com/du3ck2joa/video/upload/v1734954643/alarm_mastaplana/alarm2_cktu8c.wav')
          alert("its time")
        }
      }, [clockTime]);
    
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
    
    const navigate = useNavigate()
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 10 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 8 : 8} verticalAlign="middle">
                            <Header 
                                as={ mobile ? 'h4' : 'h1'} 
                                inverted 
                                content="NOTICE CENTER" 
                                color="#fff" 
                                style={{
                                    fontFamily: 'Spicy Rice',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </Grid.Column>
                        {/*<Grid.Column width={ mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>*/}
                        <Grid.Column width={ mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment vertical floated="right" style={{ 
                                alignSelf: 'right', 
                                alignContent: 'center',
                                width: 50, 
                                height: 50, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown 
                                    text={
                                        sessionStorage.getItem("fname").charAt(0).toUpperCase()
                                        + " " +
                                        sessionStorage.getItem("lname").charAt(0).toUpperCase()
                                    } 
                                    inline
                                >
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate("/signin")}>
                                        Log out
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column>
                            <Grid textAlign="center">
                                <Grid.Column>
                                    <Segment vertical style={{padding: 20, borderRadius: 10, backgroundColor: '#fff'}}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <div style={{overflow: 'auto'}}>
                                                    <Table basic="very" unstackable>
                                                        <Table.Header>
                                                            <Table.HeaderCell>
                                                                Event Description
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Event sheduled time
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Action
                                                            </Table.HeaderCell>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {
                                                                alarm_details
                                                            }
                                                            </Table.Body>
                                                    </Table>

                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>     
                </Grid>
        </Segment>
        </Container>
    )

}
