import React, { Component } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';

import CreateRoom from './CreateRoom'

export default class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {
            votes_to_skip: 2,
            guest_can_pause: false,
            is_host: false,
            showSettings: false
        }
        this.roomCode = this.props.match.params.roomCode;
        this.handleLeave = this.handleLeave.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.settings = this.settings.bind(this);
        this.settingsButton = this.settingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => {
                if (!res.ok) {
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

    handleLeave() {
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/leave-room', request_options)
            .then((res) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            })
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value
        });
    }

    settingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)} >
                    Settings
                </Button>
            </Grid>
        )
    }

    settings() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} aling="center">
                    <CreateRoom 
                        update={true} 
                        votes_to_skip={this.state.votes_to_skip} 
                        guest_can_pause={this.state.guest_can_pause} 
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)} >
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    render() {
        if(this.state.showSettings){
            return this.settings();
        }
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
                {this.state.is_host ? this.settingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.handleLeave}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
