import React, { Component } from 'react'
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import { Link } from 'react-router-dom'

export default class CreateRoom extends Component {
    defaultVotes = 2;
    constructor(props) {
        super(props);
        this.state = {
            guest_can_pause: true,
            votes_to_skip: this.defaultVotes,
        };
        this.handleRoomButton = this.handleRoomButton.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch('/api/create-room', requestOptions)
            .then((res) => res.json())
            .then((data) => this.props.history.push('/room/' + data.code));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                     <Typography component='h4' variant='h4'>
                        Create a Room
                     </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                     <FormControl component="fieldset">
                         <FormHelperText>
                             <div align="center">
                                 Guest Control of Playback State
                             </div>
                         </FormHelperText>
                         <RadioGroup row defaultValue='true' onChange={this.handleGuestCanPauseChange}>
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
                            defaultValue={this.defaultVotes} 
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
}
