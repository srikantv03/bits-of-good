import { Button, Card, Grid, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Checkbox } from '@mui/material';
import React, { Component } from 'react';
import ListItem from './ListItem';
import Tag from './Tag';


class TodoList extends React.Component {
    state = {
        listItems: [],
        tags: [],
        tagsToAdd: [],
        titleToAdd: "",
        dueToAdd: "",
        sortState: [],
        tag: ""
    }

    constructor(props) {
        super(props);

        this.newTag = React.createRef();
        this.name = React.createRef();
        this.date = React.createRef();
        this.tagToAdd = React.createRef();

    }

    handleTitleChange = (event) => {
        this.setState({titleToAdd: event.target.value});
    }

    handleDueDateChange = (event) => {
        this.setState({dueToAdd: event.target.value});
    }

    handleSubmit = async () => {
        const newTags = [...this.state.tagsToAdd];
        if (this.state.dueToAdd != "" && this.state.name != "") {
            await this.setState({ listItems: [...this.state.listItems,
                {name: this.state.titleToAdd,
                tags: newTags,
                due: this.state.dueToAdd,
                completed: false,
                id: this.state.listItems.length}]
            });
            this.setState({
                dueToAdd: "",
                titleToAdd: "",
                tagsToAdd: []
            });
            this.sortValues();
           
        }
        

    }

    addTagToTask = async () => {
        if (!this.state.tagsToAdd.includes(this.newTag.current.value) && this.newTag.current.value != "") {
            await this.setState(prevState => ({
                tagsToAdd: [...prevState.tagsToAdd,
                    this.newTag.current.value]
            }));
            this.setState({
                tag: ""
            });
        }
        
    }

    sortHandler = async (event) => {
        if (this.state.listItems.length > 0) {
            const i = this.state.sortState.indexOf(event.target.value);
            if (i != -1) {
                let tempSort = [...this.state.sortState];
                tempSort.splice(i, 1);
                await this.setState({sortState: tempSort});
            } else {
                await this.setState({sortState: [
                    ...this.state.sortState,
                    event.target.value
                ]})
            }
            this.sortValues();
        }
    }

    sortValues = () => {
        const temp = [...this.state.listItems];
        if (this.state.sortState.length == 1) {
            if (this.state.sortState[0] == "dueSort") {
                temp.sort(this.dueSort);
            } else if (this.state.sortState[0] == "completedSort") {
                temp.sort(this.completedSort);
            }
            this.setState({
                listItems: temp
            })
        } else if (this.state.sortState.length == 2) {
            temp.sort(this.dueAndCompletedSort);
            this.setState({
                listItems: temp
            }) 
        }
        
    }

    dueSort = (a, b) => {
        if (a.due > b.due) {
            return 1;
        } else {
            return -1;
        }
    }

    completedSort = (a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        } else if (!a.completed && b.completed) {
            return -1;
        } else {
            return 1;
        }
    }

    dueAndCompletedSort = (a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        } else if (!a.completed && b.completed) {
            return -1;
        } else {
            if (a.due > b.due) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    removeTag = (tag) => {
        const index = this.state.tagsToAdd.indexOf(tag);

        if (index > -1) {
            const temp = this.state.tagsToAdd;
            temp.splice(index, 1);
            this.setState({
                tagsToAdd: temp
            })
        }
    }

    handleComplete = async (event) => {
        var temp = [...this.state.listItems];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id == event.target.id) {
                temp[i].completed = event.target.checked;
                break;
            }
        }
        await this.setState[{
            listItems: temp
        }];
        this.sortValues();
    }

    handleTagChange = (event) => {
        this.setState({
            tag: event.target.value
        })
    }



    render() {
        const cardStyle = {
            padding: 6,
            border: '0px',
            margin: 5
        }
        const listItem = this.state.listItems.map((item) =>
            <div key={item.id}>
            <Card style={cardStyle}>
                <Grid justifyContent="center" align="center" container spacing={2}>
                    <Grid 
                    align="center"
                    justifyContent="center" 
                    item sm={2}>
                        <input className="checkbox"
                        type="checkbox"
                        defaultChecked={item.completed}
                        onChange={this.handleComplete}
                        id={item.id} />
                    </Grid>
                    <Grid item sm={10}>
                        <ListItem name={item.name} tags={item.tags} due={item.due}/>
                    </Grid>

                </Grid> 
            </Card>
            </div>
        );
        const selectedTags = this.state.tagsToAdd.map((tag) =>
            <Grid item>
                <Card sx={{padding: 2}}>
                    {tag}
                    <span>
                        <Button sx={{margin: 0}} id={tag} onClick={this.removeTag.bind(this, tag)}>x</Button>
                    </span>
                </Card>
            </Grid> 
        );

        return <div>
            <h1>Bits of Good - To-do List</h1>
            <h4>Srikant Vasudevan</h4>
            <Grid padding={5} container spacing={2}>
                <Grid item md={6}>
                    <Card>
                    <Grid container>
                    <Grid item sm={12}>
                        <h2>Add a task</h2>
                    </Grid>
                    <Grid container padding={5} spacing={2}>
                        <Grid item sm={12}>
                            <InputLabel htmlFor="title">Task Title</InputLabel>
                            <TextField value={this.state.titleToAdd} onChange={this.handleTitleChange} sx={{ width: 1 }} inputRef={this.name} name="title" id="title"/>
                        </Grid>
                        <Grid item sm={12}>
                            <InputLabel>Due Date</InputLabel>
                            <TextField value={this.state.dueToAdd} onChange={this.handleDueDateChange} sx={{ width: 1 }} inputRef={this.date} type="date"/>
                        </Grid>

                        <Grid item sm={12}>
                            <Grid container spacing={2}>
                                {selectedTags}
                            </Grid>
                        </Grid> 
                        
                        <Grid item sm={8}>
                            <InputLabel>New Tag</InputLabel>
                            <TextField value={this.state.tag} onChange={this.handleTagChange} sx={{ width: 1 }} inputRef={this.newTag} />
                        </Grid>
                        <Grid item sm={4}>
                            <Button color='secondary' variant='contained' sx={{ width: 1, height: 1}} onClick={this.addTagToTask}>Add Tag</Button>
                        </Grid>
                        <Grid item sm={12}>
                            <Button sx={{ width: 1, height: '90px' }} onClick={this.handleSubmit} variant="contained">Add Task</Button> 
                        </Grid>  
                    </Grid>
                    </Grid>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card sx={{height: 1, width: 1}}>
                    <Grid padding={2} container spacing={2}>
                        <Grid item sm={12}>
                            <ToggleButtonGroup
                            color="primary"
                            value={this.state.sortState}
                            onChange={this.sortHandler}
                            aria-label="text formatting"
                            >
                                <ToggleButton value="dueSort" aria-label="bold">
                                    Sort by Due Date
                                </ToggleButton>
                                <ToggleButton value="completedSort" aria-label="italic">
                                    Sort by Completed
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item sm={12}>
                            {listItem}
                        </Grid>
                        
                    </Grid>
                    </Card>
                    
                </Grid>
            </Grid>
            </div>
            ;
    }
}
 
export default TodoList;