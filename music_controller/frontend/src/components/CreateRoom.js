import React, { Component } from 'react'
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup, Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'

export default class CreateRoom extends Component {
    static defaultProps = {
        votes_to_skip: 2,
        guest_can_pause: true,
        update: false,
        roomCode: null,
        updateCallback: () => { },
    }
    constructor(props) {
        super(props);
        this.state = {
            guest_can_pause: this.props.guest_can_pause,
            votes_to_skip: this.props.votes_to_skip,
            code: this.props.roomCode,
            errMsg: "",
            successMsg: "",
        };
        this.handleRoomButton = this.handleRoomButton.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votes_to_skip: e.target.value
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guest_can_pause: e.target.value === 'true' ? true : false
        });
    }

    handleRoomButton() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        fetch('/api/create-room', requestOptions)
            .then((res) => res.json())
            .then((data) => this.props.history.push('/room/' + data.code));
    }

    handleUpdateButton() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        fetch('/api/update-room', requestOptions)
            .then((res) => {
                if(res.ok) {
                    this.setState({
                        successMsg: "Room updated successfully"
                    })
                }
                else{
                    this.setState({
                        errMsg: "Error updating room..."
                    })
                }
                this.props.updateCallback();
            });
    }

    renderCreateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleRoomButton}>
                    Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderUpdateButtons() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleUpdateButton}>
                    Update A Room
                    </Button>
                </Grid>
            </Grid>
        )
    }

    render() {
        const title = this.props.update ? "Update Room" : "Create a Room"
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errMsg != "" || this.state.successMsg != ""}>
                        {this.state.successMsg != "" ? (
                            <Alert 
                                severity="success" 
                                onClose={() => {
                                    this.setState({ successMsg: "" })
                                }}
                            >
                                {this.state.successMsg}
                            </Alert>
                        ) : (
                            <Alert 
                                severity="error" 
                                onClose={() => {
                                    this.setState({ successMsg: "" })
                                }}
                            >
                                {this.state.errMsg}
                            </Alert>
                        )}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                             </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={this.props.guest_can_pause.toString()} onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel
                                value="true"
                                control={
                                    <Radio color="primary" />
                                }
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />

                            <FormControlLabel
                                value="false"
                                control={
                                    <Radio color="secondary" />
                                }
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={this.state.votes_to_skip}
                            inputProps={{
                                min: 1,
                                style: {
                                    textAlign: "center"
                                }
                            }}
                            onChange={this.handleVotesChange}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes required to skip song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        )
    }
}
