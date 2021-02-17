import React, { Component } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';

export default class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {
            votes_to_skip: 2,
            guest_can_pause: false,
            is_host: false,
        }
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.handleLeave = this.handleLeave.bind(this);
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => {
                if(!res.ok) {
                    this.props.leaveRoomCallback();
                    this.props.history.push('/');
                }
                return res.json()
            })
            .then((data) => {
                this.setState({
                    votes_to_skip: data.votes_to_skip,
                    guest_can_pause: data.guest_can_pause,
                    is_host: data.is_host
                });
            });
    }

    handleLeave(){
        const request_options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/api/leave-room', request_options)
            .then((res) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votes_to_skip.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {this.state.guest_can_pause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {this.state.is_host.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.handleLeave}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
