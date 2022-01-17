import { Card, Grid } from '@mui/material';
import React, { Component } from 'react';
import Tag from './Tag';

class ListItem extends React.Component {
    render() {
        const tags = this.props.tags.map((tag) =>
            <Grid item >
                <Card sx={{padding: 2}}>
                    {tag}
                </Card>
            </Grid> 
        );
        return (

                    <Grid container spacing={2}>
                        <Grid item sm={2}>
                            
                        </Grid>
                        <Grid item md={4}>
                            <h2>{this.props.name}</h2>
                        </Grid>
                        <Grid item md={6}>
                            <h3>Due: {this.props.due}</h3>
                        </Grid>
                        
                        <Grid container spacing={2}>
                            {tags}
                        </Grid>
                    </Grid>

                );
    }
}
 
export default ListItem;