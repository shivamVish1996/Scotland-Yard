import {Button, HStack, Switch, Text, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import stompClient from "../context/Socket";
import {useNavigate} from "react-router-dom";

export default function CreateGamePage() {
    const [isMrX, setIsMrX] = useState(false);
    const navigate = useNavigate();

    function createRoom() {
        console.log("CREATE ROOM");
        let roomCode = (Math.random() + 1).toString(36).substring(7);
        console.log("room created - ", roomCode);
        let playerName = sessionStorage.getItem("playerName");
        stompClient.send('/app/game.create', {}, JSON.stringify({'gameId': roomCode, 'playerName': playerName}));
        joinRoom(roomCode, playerName);
    }

    function joinRoom(roomCode, playerName) {
        let joinInfo = {
            'gameId': roomCode,
            'playerName': playerName,
            'isMrX': isMrX,
            'isHost': true
        }
        // sessionStorage.setItem('isHost', true)
        navigate(`/lobby/${roomCode}`, {state: joinInfo});
    }

    const handleIsMrXChanged = (event) => setIsMrX(event.target.checked);

    return (
        <VStack spacing="18px">
            <HStack spacing="22px">
                <Text fontSize='1xl'>Want to be Mr. X?</Text>
                <Switch colorScheme='teal' size='md' onChange={handleIsMrXChanged}/>
            </HStack>
            <Button colorScheme='teal' variant='outline' onClick={createRoom}>
                Create Game
            </Button>
        </VStack>
    )
}