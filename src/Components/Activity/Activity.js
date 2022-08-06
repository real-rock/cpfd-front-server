import { Component } from 'react';
import { Button, Grid } from '@mui/material';
import postActivity from '../../APIs/PostActivity/PostActivity';
import { korToEng } from '../../Commons/Dictionary/Dictionary';

const person = [
    '구준모',
    '손지인',
    '이광조',
    '허진석',
    '김완주',
    '박성범',
    '이기석',
    'GUEST1',
    'GUEST2',
    'GUEST3',
];

class Activity extends Component {
    render() {
        const onClick = () => {
            let t = this.props.name;
            if (person.includes(this.props.name) === true) {
                t = 'PERSON';
            }
            postActivity(korToEng[this.props.name], !this.props.isActive, t);
            this.props.onClickUpdate(
                korToEng[this.props.name],
                !this.props.isActive,
            );
        };

        return (
            <Button
                item
                sx={{
                    boxShadow: 2,
                    border: '10px',
                    padding: '8px',
                    margin: '8px',
                    fontWeight: '600',
                    fontSize: '20px',
                    color: this.props.isActive ? '#053C5E' : '#353535',
                    background: this.props.isActive ? '#BFDBF7' : '#E0E0E2',
                    '&:hover': {
                        background: this.props.isActive ? '#BFDBF7' : '#E0E0E2',
                    },
                }}
                onClick={onClick}
                key={this.props.keyId}
            >
                {this.props.name}
            </Button>
        );
    }
}

export default Activity;
