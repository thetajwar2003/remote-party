import React, { Component } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';

import CreateRoom from './CreateRoom';
import MusicPlayer from './MusicPlayer';

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes_to_skip: 2,
            guest_can_pause: false,
            is_host: false,
            showSettings: false,
            spotifyAthenticated: false,
            song: {}
        };
        this.roomCode = this.props.match.params.roomCode;
        this.handleLeave = this.handleLeave.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.settings = this.settings.bind(this);
        this.settingsButton = this.settingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
    }

    componentDidMount() {
        // call the getCurrentSong function every second once the component mounts to update the sing playing
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCurrentSong() {
        fetch('/spotify/current-song')
            .then((res) => {
                if (!res.ok) return {};
                else return res.json();
            })
            .then((data) => {
                this.setState({ song: data });
                console.log(data);
            });
    }

    authenticateSpotify() {
        fetch('/spotify/is_authenticated')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    spotifyAuthenticated: data.status
                });
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((res) => res.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => {
                if (!res.ok) {
                    this.props.leaveRoomCallback();
                    this.props.history.push('/');
                }
                return res.json();
            })
            .then((data) => {
                this.setState({
                    votes_to_skip: data.votes_to_skip,
                    guest_can_pause: data.guest_can_pause,
                    is_host: data.is_host
                });
                if (this.state.is_host) this.authenticateSpotify();
            });
    }

    handleLeave() {
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/leave-room', request_options)
            .then((res) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            });
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
        );
    }

    settings() {
        return (
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
        );
    }

    render() {
        if (this.state.showSettings) {
            return this.settings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                {this.state.is_host ? this.settingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.handleLeave}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
