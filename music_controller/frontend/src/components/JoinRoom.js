import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            error: "",
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEnterRoom = this.handleEnterRoom.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            code: e.target.value
        })
    }

    handleEnterRoom() {
        const request_options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
        };
        fetch('/api/join-room', request_options)
            .then((res) => {
                if (res.ok) {
                    this.props.history.push(`/room/${this.state.code}`);
                }
                else {
                    this.setState({
                        error: "Room not found."
                    });
                }
            }).catch((err) => { console.log(err); })
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                        </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={this.state.error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={this.state.code}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.handleEnterRoom}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
