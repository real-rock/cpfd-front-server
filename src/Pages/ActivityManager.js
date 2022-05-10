import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ActivityPaper from '../Components/ActivityPaper/ActivityPaper';
import Activity from '../Components/Activity/Activity';
import getInfo from '../APIs/GetInfo/GetInfo';
import { Component } from 'react';
import { engToKor } from '../Commons/Dictionary/Dictionary';

class ActivityManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: new Map(),
        };
    }

    componentDidMount() {
        let objMap = new Map();

        getInfo().then(data => {
            Object.entries(data).map(([k, v]) => {
                objMap.set(k, v);
            });
            this.setState({ map: objMap });
        });
    }

    onClickUpdate(key, val) {
        console.log(this.state.map);
        let newMap = this.state.map;
        newMap.set(key, val);
        this.setState({ map: newMap });
    }

    render() {
        let people = [
            'KooJunMo',
            'SonJiIn',
            'ParkSeungBum',
            'LeeGwangJo',
            'HeoJinSeok',
            'KimWanJoo',
            'GUEST1',
            'GUEST2',
            'GUEST3',
        ];
        let machines = ['AP', 'DOOR', 'WINDOW', 'AC', 'AC2'];
        const person = people.map((personName, index) => (
            <Activity
                name={engToKor[personName]}
                isActive={this.state.map.get(personName)}
                onClickUpdate={this.onClickUpdate.bind(this)}
                keyId={index}
            />
        ));
        const machine = machines.map((machineName, index) => (
            <Activity
                name={engToKor[machineName]}
                isActive={this.state.map.get(machineName)}
                onClickUpdate={this.onClickUpdate.bind(this)}
                keyId={index}
            />
        ));
        return (
            <MainContainer>
                <Typography variant="h4" sx={{ mt: '60px', mb: '30px' }}>
                    Activity Manager
                </Typography>
                <Box>
                    <Paper
                        sx={{
                            borderRadius: '10px',
                            display: 'flex',
                            padding: '40px',
                            columnGap: '120px',
                            justifyContent: 'flex-start',
                            opacity: '80%',
                        }}
                        elevation={6}
                    >
                        <Grid container direction="column">
                            <ActivityPaper lists={person} />
                        </Grid>
                        <Grid container direction="column">
                            <ActivityPaper lists={machine} />
                            <Button
                                xs={8}
                                sx={{
                                    boxShadow: 2,
                                    border: '10px',
                                    padding: '8px',
                                    margin: '8px',
                                    marginTop: '100px',
                                    fontWeight: '600',
                                    fontSize: '20px',
                                    color: '#053C5E',
                                    background: '#BFDBF7',
                                    '&:hover': {
                                        color: '#353535',
                                        background: '#E0E0E2',
                                    },
                                }}
                                href="activity/log"
                            >
                                로그 보기
                            </Button>
                        </Grid>
                    </Paper>
                </Box>
            </MainContainer>
        );
    }
}

const MainContainer = styled(Box)`
    height: 100vh;
    max-width: 100%;
    background-color: #e4edf7;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default ActivityManager;
