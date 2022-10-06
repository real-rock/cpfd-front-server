import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TableContainer,
    TableHead,
    Paper,
    TableRow,
    Table,
    TableCell,
    TableBody,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import { Box } from '@mui/system';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { engToKor } from '../Commons/Dictionary/Dictionary';
import getInoutLogsToFile from '../APIs/GetInoutLog/GetInoutLogsToFile';
import { baseUrl } from '../APIs/BaseUrl';

export function ActivityLog() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const response = await axios.get(baseUrl + '/logs/activity');
            setData(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    if (!data) return null;
    console.log(data);

    return (
        <Box sx={{ mt: '100px' }}>
            <Grid container direction="row" justifyContent="space-between">
                <Typography variant="h4" sx={{ p: '20px' }}>
                    Activity Logs
                </Typography>
                <Button
                    sx={{
                        height: '16px',
                        p: '20px',
                        marginTop: '40px',
                        marginRight: '40px',
                        fontWeight: 'bold',
                        color: '#999999',
                        background: '#BFDBF7',
                    }}
                    startIcon={<DownloadForOfflineIcon />}
                    onClick={getInoutLogsToFile}
                >
                    Download csv
                </Button>
            </Grid>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">On/Off</TableCell>
                            <TableCell align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    {engToKor[row["name"]]}
                                </TableCell>
                                <TableCell align="center">{row["created_at"]}</TableCell>
                                <TableCell align="center">{row["action"].toString()}</TableCell>
                                <TableCell align="center">{row["type"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
