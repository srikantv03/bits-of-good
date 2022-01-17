import { Button, Card } from '@mui/material';
import React, { Component } from 'react';

class Tag extends React.Component {
    render() { 
        return <Card
        width={50}
        height={30}
        sx={{backgroundColor: "#85adff"}}>
            <p>
                {this.props.name}
            </p>

        </Card>;
    }
}
 
export default Tag;