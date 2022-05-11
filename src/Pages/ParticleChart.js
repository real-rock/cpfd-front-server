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

export const ParticleChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                로딩중..
            </Typography>
        );
    if (error)
        return (
            <Typography variant="h2" sx={{ p: '40px', marginTop: '100px' }}>
                에러 발생
            </Typography>
        );
    if (!data) return null;
    console.log(data);
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
                    <ResponsiveContainer width="75%" height={400}>
                        <LineChart
                            margin={{ top: 100, right: 20, bottom: 5, left: 0 }}
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
                                domain={['auto', 'auto']}
                                padding={{ left: 20, right: 20 }}
                                tickFormatter={unixTime =>
                                    moment(unixTime * 1000).format(
                                        'YYYY-MM-DD HH:mm',
                                    )
                                }
                                type="number"
                            />
                            <YAxis />
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
                    <Stack item spacing={2}>
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
                    </Stack>
                    <Box item>
                        <Stack spacing={2}>
                            <Stack direction="row">
                                <ToggleButton
                                    label="107"
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="120"
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="121"
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="124"
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="134"
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="181"
                                    data={data}
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="196"
                                    data={data}
                                    setActivateData={setActivateData}
                                />
                                <ToggleButton
                                    label="199"
                                    data={data}
                                    setActivateData={setActivateData}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    );
};
