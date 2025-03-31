import React, {useState} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
export default function HomePage() {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [roomIdForHost, setRoomIdForHost] = useState("");
    const [allPlayers, setAllPlayers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isRoomCreated, setIsRoomCreated] = useState(false);
    const [isRoomJoined, setIsRoomJoined] = useState(false);

    const connect = () => {
        let sock = new SockJS('http://localhost:8081/scotlandyard/ws')
        stompClient = over(sock)
        console.log("connecting...")
        stompClient.connect({},
            () => {
                setIsConnected(true);
                console.log("connected")
                console.log("sock - ", sock)

                //get session id
                let urlArray = sock._transport.url.split('/')
                let index = urlArray.length - 2
                let sessionId = urlArray[index]
                console.log("sessionId - ", sessionId);
            },
            err => console.log(err));
    }

    const onMessageReceived = (userInfo) => {
        console.log("message received")
        console.log(userInfo)
        let {name, sessionId, roomId, status} = JSON.parse(userInfo.body);
        console.log("name - ", name)
        console.log("sessionId - ", sessionId)
        console.log("roomId - ", roomId)
        console.log("status - ", status)
        if (status === "LEFT") {
            // remove player from player list
            setAllPlayers(prevPlayers => prevPlayers.filter((player) => player.id !== sessionId));
        } else if (status === "JOINED") {
            // add player to player list
            let newPlayer = {
                id: sessionId,
                name: name
            };
            setAllPlayers(prevPlayers => [...prevPlayers, newPlayer]);
        }
    }

    function disconnect() {
        console.log("disconnecting...")
        if (stompClient !== null) {
            console.log("was connected")
            stompClient.disconnect();
        }
        console.log("disconnected");
        // setIsConnected(false)
    }

    function joinRoomAndNotifyOthers(roomId) {
        console.log("subscribing to a public topic or queue...")
        stompClient.subscribe(`/topic/room/${roomId}`, msg => onMessageReceived(msg))
        console.log("subscribed")

        stompClient.send(`/app/joinRoom/${roomId}`, {}, JSON.stringify({"name": name}));
    }

    function createRoom() {
        let createRoomId = (Math.random() + 1).toString(36).substring(7);
        console.log("created Room Id - ", createRoomId);
        stompClient.send(`/app/createRoom/${createRoomId}`);
        joinRoomAndNotifyOthers(createRoomId);
        setIsRoomCreated(true);
        setRoomIdForHost(createRoomId);
    }

    const handleRoomIdChanged = (event) => {
        const {value} = event.target;
        setRoomId(value);
    }

    function joinRoom() {
        joinRoomAndNotifyOthers(roomId);
        setIsRoomJoined(true);
    }

    const handleNameChanged = (event) => {
        const {value} = event.target;
        setName(value);
    }

    return (
        <div>
            {isConnected ?
                null
                :
                <div>
                    <input type="text"
                           value={name}
                           onChange={handleNameChanged}
                           placeholder="Enter your name"/>{" "}
                    <button type="button"
                            onClick={connect}
                            disabled={name.trim() === "" || name.trim().length === 0}
                    >Connect to a server
                    </button>
                    <br/></div>}

            {!isConnected ?
                null
                :
                <div>
                    {(isRoomCreated || isRoomJoined) ?
                        null
                        :
                        <div>
                            <br/>
                            <button type="button" onClick={createRoom}>Create Room</button>
                            <p>OR</p>
                            <input type="text"
                                   value={roomId}
                                   onChange={handleRoomIdChanged}
                                   placeholder="Enter the Room Code"/>{" "}
                            <button type="button"
                                    onClick={joinRoom}
                                    disabled={roomId.trim() === "" || roomId.trim().length === 0}
                            >Join Room
                            </button>
                            <br/>

                        </div>
                    }
                </div>
            }
            <br/>

            {isRoomCreated ? <div>Lobby [Room id - {roomIdForHost}]</div> : null}
            {isRoomJoined ? <div>Lobby [Room id - {roomId}]</div> : null}

            {(isRoomJoined || isRoomCreated) && allPlayers.length === 0 ?
                <p>Waiting for players...</p>
                :
                allPlayers.map(player => <p key={player.id}>{player.name}</p>)
            }
        </div>
    )
}