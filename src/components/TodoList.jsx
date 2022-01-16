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
        dueToAdd: ""
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
            this.state.dueToAdd = "";
            this.state.titleToAdd = "";
            this.state.tagsToAdd = [];
        }

    }

    addTag = () => {
        console.log(this.newTag.current.value);
        if (!this.state.tags.includes(this.newTag.current.value) && this.newTag.current.value != "") {
            this.setState(prevState => ({
                tags: [...prevState.tags,
                this.newTag.current.value]
            }));
        }
    }

    addTagToTask = (event) => {
        if (!this.state.tagsToAdd.includes(event.target.value)) {
            this.setState(prevState => ({
                tagsToAdd: [...prevState.tagsToAdd,
                event.target.value]
            }));
        }
    }

    sortHandler = (event) => {
        if (this.state.listItems.length > 0) {
            const temp = [...this.state.listItems];
            if (event.target.value == "dueSort") {
                temp.sort(this.dueSort);
            } else if (event.target.value == "completedSort") {
                temp.sort(this.completedSort);
            }
            this.setState({
                listItems: temp
            })
        }
        console.log("due dates");
    }

    dueSort = (a, b) => {
        if (a.due > b.due) {
            return 1;
        } else {
            return -1;
        }
    }

    completedSort = (a, b) => {
        if (a.completed == true && b.completed == false) {
            return 1;
        } else if (a.completed == false && b.completed == true) {
            return -1;
        } else {
            return 1;
        }
    }

    // dueAndCompletedSort = (a, b) => {

    // }

    removeTag = (tag) => {
        const index = this.state.tagsToAdd.indexOf(tag);
        console.log(this.state.listItems)
        if (index > -1) {
            const temp = this.state.tagsToAdd;
            temp.splice(index, 1);
            this.setState({
                tagsToAdd: temp
            })
        }
    }

    handleComplete = (event, isChecked) => {
        var temp = [...this.state.listItems];
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id == event.target.id) {
                temp[i].completed = isChecked;
                break;
            }
        }
        this.setState[{
            listItems: temp
        }]
    }



    render() {
        const listItem = this.state.listItems.map((item) =>
            <Card>
                <Grid container spacing={2}>
                    <Grid 
                    align="center"
                    justifyContent="center" 
                    item sm={2}>
                    </Grid>
                    <Grid item sm={10}>
                        <ListItem name={item.name} tags={item.tags} due={item.due}/>
                    </Grid>
                </Grid> 
            </Card>
        );

        const tagItems = this.state.tags.map((tag) => 
            <MenuItem value={tag}>{tag}</MenuItem>
        );

        const selectedTags = this.state.tagsToAdd.map((tag) =>
            <Grid item sm={3}>
                <Card>
                    {tag}
                    <span>
                        <Button id={tag} onClick={this.removeTag.bind(this, tag)}>x</Button>
                    </span>
                </Card>
            </Grid> 
        );

        return <div>
            <h1>Todo List</h1>
            <Grid padding={5} container spacing={2}>
                <Grid item md={6}>
                    <Grid item sm={12}>
                        <h2>Add a task</h2>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <InputLabel>Task Title</InputLabel>
                            <TextField onChange={this.handleTitleChange} sx={{ width: 1 }} inputRef={this.name}/>
                        </Grid>
                        <Grid item sm={4}>
                            <InputLabel>Due Date</InputLabel>
                            <TextField onChange={this.handleDueDateChange} sx={{ width: 1 }} inputRef={this.date} type="date"/>
                        </Grid>
                        <Grid item sm={4}>
                            <InputLabel>Tags</InputLabel>
                            <Select
                                value={"default_do_not_add"}
                                label="tags"
                                inputRef={this.tagToAdd}
                                onChange={this.addTagToTask}
                                sx={{ width: 1 }}
                            >
                            <MenuItem value={"default_do_not_add"}>Select a tag</MenuItem>
                            {tagItems}
                            </Select>    
                        </Grid>
                        <Grid item sm={12}>
                            <Grid container spacing={2}>
                                {selectedTags}
                            </Grid>
                        </Grid>     
                        <Grid item sm={12}>
                            <h4>Add a new tag</h4>
                        </Grid>
                        
                        <Grid item sm={8}>
                            <InputLabel>New Tag</InputLabel>
                            <TextField sx={{ width: 1 }} inputRef={this.newTag} />
                        </Grid>
                        <Grid item sm={4}>
                            <Button color='secondary' variant='contained' sx={{ width: 1, height: 1 }} onClick={this.addTag}>Add Tag</Button>
                        </Grid>
                        <Grid item sm={12}>
                            <Button sx={{ width: 1, height: 1 }} onClick={this.handleSubmit} variant="contained">Add Task</Button> 
                        </Grid>  
                    </Grid>
                </Grid>
                <Grid item md={6}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <ToggleButtonGroup
                            onChange={this.sortHandler}
                            aria-label="text formatting"
                            >
                            <ToggleButton value="dueSort" aria-label="bold">
                                Sort by Due Date
                            </ToggleButton>
                            <ToggleButton value="completedSort" aria-label="italic">
                                Sort by Completed
                            </ToggleButton>
                            <ToggleButton value="completedAndDueSort" aria-label="italic">
                                Sort by Completed and Due Date
                            </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item md={12}>
                            {listItem}
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
            </Grid>
            </div>
            ;
    }
}
 
export default TodoList;