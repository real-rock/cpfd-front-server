import { Component } from 'react';
import { Box } from '@mui/material';

class ActivityPaper extends Component {
    render() {
        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap: '16px',
                    justifyContent: 'flex-start',
                }}
                columnGap={6}
            >
                {this.props.lists}
            </Box>
        );
    }
}

export default ActivityPaper;
