import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Container,
    HStack,
    IconButton,
    Spacer,
    Stack,
    StackDivider,
    Text,
    Tooltip,
    useClipboard
} from "@chakra-ui/react";
import stompClient from "../context/Socket";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CopyIcon} from "@chakra-ui/icons";

export default function Lobby() {
    const {roomCode} = useParams()
    const navigate = useNavigate();
    const [gameInfo, setGameInfo] = useState({});
    const [host, setHost] = useState(false)
    const [shouldStart, setShouldStart] = useState(false);
    const {state} = useLocation();
    const {onCopy, value, setValue, hasCopied} = useClipboard('')

    function onMessageReceived(msg) {
        console.log("Lobby")
        let gameInfoTemp = JSON.parse(msg.body);
        console.log(gameInfoTemp);
        setGameInfo({...gameInfoTemp});
        console.log('gameInfo - ', gameInfo);

        if (sessionStorage.getItem("playerRole") === "MR_X") {
            sessionStorage.setItem("playerPiece", "MrX");
        } else {
            if (gameInfoTemp && gameInfoTemp.detectives && gameInfoTemp.detectives.length > 0) {
                let detectives = gameInfoTemp.detectives;
                for (let detective of detectives) {
                    if (detective.name === sessionStorage.getItem("playerName")) {
                        sessionStorage.setItem("playerPiece", detective.piece);
                        break;
                    }
                }
            }
        }

        if (gameInfoTemp && gameInfoTemp.mrX && gameInfoTemp.detectives && gameInfoTemp.detectives.length >= 1) {
            setShouldStart(true)
        }
        if (gameInfoTemp && gameInfoTemp.gameState && gameInfoTemp.gameState === 'START') {
            navigate(`/game/${roomCode}`, {state: gameInfoTemp});
        }
    }

    useEffect(() => {
        const {isHost, isMrX} = state;
        sessionStorage.setItem('isHost', isHost)
        console.log('sessionStorage.get(isHost) - ', sessionStorage.getItem('isHost'));
        setHost(isHost)
        delete state['isHost']

        if (isMrX) {
            sessionStorage.setItem("playerRole", "MR_X");
        } else {
            sessionStorage.setItem("playerRole", "DETECTIVE");
        }

        setGameInfo({...state});
        setValue(roomCode)
        stompClient.subscribe(`/queue/game.${roomCode}`, msg => onMessageReceived(msg))
        stompClient.send('/app/game.join', {}, JSON.stringify(state));
    }, []);

    function startGame() {
        stompClient.send('/app/game.start', {}, JSON.stringify({'gameId': roomCode}));
    }

    return (
        <>
            <Text fontSize='3xl'>Lobby</Text>
            <HStack gap='10px' alignItems='center' justifyContent='center'>
                <Text fontSize='lg'>Game Code - {roomCode}</Text>
                <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'} placement='right-start' closeDelay={1000}
                         hasArrow arrowSize={10}>
                    <IconButton
                        colorScheme='teal'
                        variant='outline'
                        size='sm'
                        icon={<CopyIcon/>}
                        onClick={onCopy}
                    />
                </Tooltip>
            </HStack>
            <Container>
                <Card>
                    <CardBody>
                        <Stack divider={<StackDivider/>} spacing='2'>
                            {gameInfo && gameInfo.mrX && gameInfo.mrX.name &&
                                (
                                    <Box
                                    bg={sessionStorage.getItem('playerName') === gameInfo.mrX.name ? 'green.100' : ''}
                                    >
                                        <HStack>
                                            <Text as='i' fontSize='lg'>
                                                {gameInfo.mrX.name}{" "}
                                                ({gameInfo.mrX.piece})
                                                {sessionStorage.getItem('playerName') === gameInfo.mrX.name ? ' (You)' : ''}
                                                {sessionStorage.getItem('isHost') === true ? ' (Host)' : ''}
                                            </Text><Spacer/>
                                            <Badge colorScheme='red' variant='outline'>Mr. X</Badge>
                                        </HStack>
                                    </Box>
                                )
                            }
                            {gameInfo && gameInfo.detectives &&
                                gameInfo.detectives.map(detective =>
                                    (
                                        <Box
                                            key={detective.currentLocation}
                                            bg={sessionStorage.getItem('playerName') === detective.name ? 'green.100' : ''}
                                        >
                                            <HStack>
                                                <Text as='i' fontSize='lg'>
                                                    {detective.name}{" "}
                                                    ({detective.piece})
                                                    {sessionStorage.getItem('playerName') === detective.name ? ' (You)' : ''}
                                                    {sessionStorage.getItem('isHost') === true ? ' (Host)' : ''}
                                                </Text><Spacer/>
                                                <Badge colorScheme='green' variant='outline'>Detective</Badge>
                                            </HStack>
                                        </Box>
                                    )
                                )
                            }
                        </Stack>
                    </CardBody>
                </Card>
                {host ?
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        marginTop='10px'
                        onClick={startGame}
                        isDisabled={!shouldStart}
                    > Start Game </Button>
                    : <Text as='i' fontSize='lg'>Waiting for Host to start the game...</Text>
                }
            </Container>
        </>
    )
}