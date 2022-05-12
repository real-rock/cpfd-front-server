import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ToggleButton({
    label,
    initState,
    handleState,
    setActivateData,
}) {
    const [state, setState] = React.useState([
        initState['pm1'],
        initState['pm2_5'],
        initState['pm10'],
    ]);

    const handlePmOneByOne = (event, newData) => {
        if (event.target.checked) {
            setActivateData(prev => {
                let newArr = prev.filter(e => {
                    return e.key !== newData.key;
                });
                return [...newArr, newData];
            });
        } else {
            setActivateData(prev => {
                return prev.filter(e => {
                    return e.key !== newData.key;
                });
            });
        }

        handleState(prev => {
            let newObj = { ...prev };
            newObj[label][newData.pm] = event.target.checked;
            return newObj;
        });
    };

    const handleAllPm = (event, newData) => {
        if (event.target.checked) {
            setActivateData(prev => {
                let newArr = prev.filter(e => {
                    return e.label !== label;
                });
                return newArr.concat(newData);
            });
        } else {
            setActivateData(prev => {
                return prev.filter(e => {
                    return e.label !== label;
                });
            });
        }

        handleState(prev => {
            let newObj = { ...prev };
            newObj[label]['pm1'] = event.target.checked;
            newObj[label]['pm2_5'] = event.target.checked;
            newObj[label]['pm10'] = event.target.checked;
            return newObj;
        });
    };

    const handleChange1 = event => {
        setState([
            event.target.checked,
            event.target.checked,
            event.target.checked,
        ]);
        handleAllPm(event, [
            { label: label, pm: 'pm1', key: label + '_PM1' },
            { label: label, pm: 'pm2_5', key: label + '_PM2.5' },
            { label: label, pm: 'pm10', key: label + '_PM10' },
        ]);
    };

    const handlePm1 = event => {
        setState([event.target.checked, state[1], state[2]]);
        handlePmOneByOne(event, {
            label: label,
            pm: 'pm1',
            key: label + '_PM1',
        });
    };

    const handlePm2_5 = event => {
        setState([state[0], event.target.checked, state[2]]);
        handlePmOneByOne(event, {
            label: label,
            pm: 'pm2_5',
            key: label + '_PM2.5',
        });
    };

    const handlePm10 = event => {
        setState([state[0], state[1], event.target.checked]);
        handlePmOneByOne(event, {
            label: label,
            pm: 'pm10',
            key: label + '_PM10',
        });
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="PM1"
                control={<Checkbox checked={state[0]} onChange={handlePm1} />}
            />
            <FormControlLabel
                label="PM2.5"
                control={<Checkbox checked={state[1]} onChange={handlePm2_5} />}
            />
            <FormControlLabel
                label="PM10"
                control={<Checkbox checked={state[2]} onChange={handlePm10} />}
            />
        </Box>
    );

    return (
        <div>
            <FormControlLabel
                label={label}
                control={
                    <Checkbox
                        checked={state[0] && state[1] && state[2]}
                        indeterminate={
                            state[0] !== state[1] ||
                            state[1] !== state[2] ||
                            state[0] !== state[2]
                        }
                        onClick={handleChange1}
                    />
                }
            />
            {children}
        </div>
    );
}
