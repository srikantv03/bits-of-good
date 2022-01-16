import { Card, Grid } from '@mui/material';
import React, { Component } from 'react';
import Tag from './Tag';

class ListItem extends React.Component {
    render() { 
        const style = {
            borderRadius: 20,
            width: 200,
            border: '1px solid black'
        }

        var tags = "";
        for (let i = 0; i < this.props.tags.length; i++) {
            tags += `${this.props.tags[i]}, `;
        }
        tags = tags.substring(0, tags.length - 2);
        return (

                    <Grid container spacing={2}>
                        <Grid item sm={2}>
                            
                        </Grid>
                        <Grid item md={4}>
                            <h1>{this.props.name}</h1>
                        </Grid>
                        <Grid item md={6}>
                            <h3>{this.props.due}</h3>
                        </Grid>
                        
                        <Grid sx={{paddingLeft: '35px'}} container spacing={2}>
                            <Grid align="left" item sm={6}>
                                Tags: {tags}
                            </Grid>
                        </Grid>
                    </Grid>

                );
    }
}
 
export default ListItem;