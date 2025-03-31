import {Button, FormControl, HStack, Input, Switch, Text, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function JoinGamePage() {
    const [roomCode, setRoomCode] = useState("");
    const [isMrX, setIsMrX] = useState(false);
    const navigate = useNavigate();

    function joinRoom(roomCode, playerName) {
        let joinInfo = {
            'gameId': roomCode,
            'playerName': playerName,
            'isMrX': isMrX,
            'isHost': false
        }
        navigate(`/lobby/${roomCode}`, {state: joinInfo});
    }

    function joinGame() {
        console.log("JOIN GAME")
        let playerName = sessionStorage.getItem('playerName');
        joinRoom(roomCode, playerName);
    }

    const handleRoomCodeChanged = (event) => setRoomCode(event.target.value)
    const handleIsMrXChanged = (event) => setIsMrX(event.target.checked);

    return (
        <VStack spacing="18px">
            <FormControl isRequired>
                <Input
                    placeholder="Paste the Game Code"
                    width='auto'
                    value={roomCode}
                    onChange={handleRoomCodeChanged}/>
            </FormControl>
            <HStack spacing="22px">
                <Text fontSize="1xl">Want to be Mr. X?</Text>
                <Switch colorScheme="teal" size="md" onChange={handleIsMrXChanged}/>
            </HStack>
            <Button colorScheme="teal" variant="outline" onClick={joinGame}
                    isDisabled={roomCode.trim() === "" || roomCode.trim().length === 0}>
                Join Game
            </Button>
        </VStack>
    );
}