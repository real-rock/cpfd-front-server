import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ToggleButton from '../Components/ToggleButton/ToggleButton';
import { DatePicker } from '../Components/DatePicker/DatePicker';
import { getParticleData } from '../APIs/GetParticleData/GetParticleData';
import { Colors } from '../Commons/Colors/Colors';
import moment from 'moment';
import getParticleFile from '../APIs/GetParticleData/GetParticleFile';
import { particlesInfo } from '../Commons/Dictionary/Dictionary';
import { Machines } from '../Commons/Machines';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { LoadingButton } from '@mui/lab';

export const ParticleChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pState, setPState] = useState(particlesInfo);

    const [startDate, setStartDate] = React.useState(
        new Date('2022-05-07T09:39:00'),
    );
    const [endDate, setEndDate] = React.useState(new Date());

    const [activateData, setActivateData] = React.useState([]);

    useEffect(() => {
        getParticleData(startDate, endDate, setData, setError, setLoading);
    }, []);

    if (loading)
        return (
            <Typography variant="h2" sx={{ p: '40px', marginTop: '100px' }}>
                Loading...
            </Typography>
        );

    if (error)
        return (
            <Typography variant="h2" sx={{ p: '40px', marginTop: '100px' }}>
                Something went wrong!
            </Typography>
        );
    console.log(pState);
    if (!data) return null;
    return (
        <Box sx={{ margin: '20px', marginTop: '100px' }}>
            <Typography variant="h2">Particle Chart</Typography>
            <Paper
                sx={{
                    marginTop: '30px',
                }}
                elevation={3}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    rowGap={6}
                    sx={{ p: '20px' }}
                >
                    <ResponsiveContainer width="75%" height={600}>
                        <LineChart
                            margin={{ top: 80, right: 20, bottom: 5, left: 0 }}
                        >
                            {activateData.map((s, index) => (
                                <Line
                                    type="linear"
                                    dataKey={s.pm}
                                    data={data[s.label]}
                                    name={s.key}
                                    key={s.key}
                                    dot={false}
                                    strokeWidth={1.5}
                                    stroke={Colors[index]}
                                />
                            ))}
                            <XAxis
                                dataKey="time"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={unixTime =>
                                    moment(unixTime * 1000).format(
                                        'YYYY-MM-DD HH:mm',
                                    )
                                }
                                padding={{ left: 20, right: 20 }}
                                type="number"
                            />
                            <YAxis domain={[0, dataMax => dataMax * 1.2]} />
                            <Tooltip
                                labelFormatter={unixTime =>
                                    moment(unixTime * 1000).format(
                                        'YYYY-MM-DD HH:mm',
                                    )
                                }
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={10}
                                iconSize={24}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <Stack item spacing={2} sx={{ marginTop: '80px' }}>
                        <DatePicker
                            label="Start Date"
                            date={startDate}
                            setDate={setStartDate}
                        />
                        <DatePicker
                            label="End Date"
                            date={endDate}
                            setDate={setEndDate}
                        />
                        <Button
                            sx={{
                                boxShadow: 2,
                                fontWeight: '600',
                                fontSize: '20px',
                                color: '#053C5E',
                                background: '#BFDBF7',
                            }}
                            onClick={() => {
                                getParticleData(
                                    startDate,
                                    endDate,
                                    setData,
                                    setError,
                                    setLoading,
                                );
                            }}
                        >
                            Apply
                        </Button>
                        <LoadingButton
                            loading={downloadLoading}
                            sx={{
                                boxShadow: 2,
                                fontWeight: '600',
                                fontSize: '20px',
                                color: '#053C5E',
                                background: '#BFDBF7',
                            }}
                            startIcon={<DownloadForOfflineIcon />}
                            onClick={() => {
                                getParticleFile(
                                    startDate,
                                    endDate,
                                    setDownloadLoading,
                                );
                            }}
                        >
                            Download csv
                        </LoadingButton>
                    </Stack>
                    <Stack
                        item
                        direction="row"
                        sx={{ p: '20px', marginLeft: '40px' }}
                    >
                        {Machines.map(id => {
                            return (
                                <ToggleButton
                                    label={id}
                                    initState={pState[id]}
                                    handleState={setPState}
                                    setActivateData={setActivateData}
                                />
                            );
                        })}
                    </Stack>
                </Grid>
            </Paper>
        </Box>
    );
};
