import { Button, Card } from '@mui/material';
import React, { Component } from 'react';

class Tag extends React.Component {
    render() { 
        const btnStyle = {
            borderRadius: 10,
            border: '1px solid black',
            textDecoration: 'none',
            width: 'auto'
        }
        const tagStyle = {
            borderRadius: 15,
            border: '2px solid black'
        }
        return <Card
        width={50}
        height={30}>
            <p>
                {this.props.name}
            </p>

        </Card>;
    }
}
 
export default Tag;