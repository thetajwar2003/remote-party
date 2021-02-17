import React, { Component } from 'react'

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
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    votes_to_skip: data.votes_to_skip,
                    guest_can_pause: data.guest_can_pause,
                    is_host: data.is_host
                });
            });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <p>room</p>
            </div>
        )
    }
}
