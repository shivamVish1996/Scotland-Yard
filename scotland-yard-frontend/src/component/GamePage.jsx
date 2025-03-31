import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    FormControl,
    Grid,
    GridItem,
    HStack,
    NumberInput,
    NumberInputField,
    Spacer,
    Stack,
    StackDivider,
    Tab,
    TabList,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import stompClient from "../context/Socket";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export function GamePage() {
    const {roomCode} = useParams()
    const {state} = useLocation();
    const navigate = useNavigate();
    const [gameInfo, setGameInfo] = useState({});
    const [detective, setDetective] = useState({});
    const [turn, setTurn] = useState(false);
    const [nextLocation, setNextLocation] = useState(-1);
    const [ticket, setTicket] = useState(null);

    function onMessageReceived(msg) {
        let gameInfoTemp = JSON.parse(msg.body);
        console.log('gameInfoTemp - ', gameInfoTemp);
        setGameInfo({...gameInfoTemp});

        gameInfoTemp.detectives.forEach(detective => {
            if (detective.piece === gameInfoTemp.turn)
                setDetective(detective)
        })
    }

    useEffect(() => {
        console.log("INSIDE USEEFFECT")
        stompClient.subscribe(`/queue/game.${roomCode}/move`, msg => onMessageReceived(msg))
        setGameInfo({...state});
        console.log('state', state)
        console.log('gameInfo', gameInfo);

        state.detectives.forEach(detective => {
            if (detective.piece === state.turn)
                setDetective(detective)
        })
    }, []);

    const handleNextLocationChanged = (event) => setNextLocation(event.target.value)

    function makeMove() {
        console.log(nextLocation)
        console.log(ticket)
        let moveMsg = {
            'gameId': roomCode,
            'sender': sessionStorage.getItem('playerPiece'),
            'move': {
                'toLocation': nextLocation,
                'ticket': ticket
            }
        }
        stompClient.send('/app/game.move', {}, JSON.stringify(moveMsg));
        setNextLocation(1)
        setTicket(null);
    }

    function navigateToGameResult() {
        // transform gameInfo json
        // to show in graph
        navigate('/game/result', {state: gameInfo});
    }

    return (
        <>
            <Text fontSize='3xl'>Game Page</Text>
            <Button float='left' colorScheme='teal' variant='outline' onClick={navigateToGameResult}>
                End Game
            </Button>
            <Grid
                // h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={1}
                borderTopWidth='2px'
                borderTopColor='teal'
                paddingTop='10px'
            >
                <GridItem rowSpan={2} colSpan={2} borderRightColor='teal' borderRightWidth='2px'>
                    <Card>
                        <CardBody>
                            <Stack divider={<StackDivider/>} spacing='2'>
                                {gameInfo && gameInfo.mrX && gameInfo.mrX.name &&
                                    (
                                        <Box
                                            bg={gameInfo.turn === 'MrX' ? 'green.100' : ''}
                                        >
                                            <HStack>
                                                <Text as='i' fontSize='lg'>
                                                    {gameInfo.mrX.name}{" "}
                                                    ({gameInfo.mrX.piece})
                                                    {sessionStorage.getItem('playerName') === gameInfo.mrX.name ? ' (You)' : ''}
                                                </Text>
                                                <Spacer/>
                                                <Badge colorScheme='red' variant='outline'>Mr. X</Badge>
                                            </HStack>
                                        </Box>
                                    )
                                }
                                {gameInfo && gameInfo.detectives &&
                                    gameInfo.detectives.map(detective =>
                                        (
                                            <Box key={detective.piece}
                                                 bg={gameInfo.turn === detective.piece ? 'green.100' : ''}
                                            >
                                                <HStack>
                                                    <Text as='i' fontSize='lg'>
                                                        {detective.name}{" "}
                                                        ({detective.piece})
                                                        {sessionStorage.getItem('playerName') === detective.name ? ' (You)' : ''}
                                                    </Text>
                                                    <Spacer/>
                                                    <Badge colorScheme='green' variant='outline'>Detective</Badge>
                                                </HStack>
                                            </Box>
                                        )
                                    )
                                }
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={3} paddingTop='15px'>
                    {
                        gameInfo.turn === sessionStorage.getItem('playerPiece')
                            ? <VStack spacing="30px">

                                {
                                    gameInfo.turn === 'MrX'
                                        ? <HStack>
                                            <Text fontSize="lg">
                                                Your Current Location - {gameInfo.mrX.currentLocation}
                                            </Text>
                                        </HStack>
                                        :
                                        <HStack>
                                            <Text fontSize="lg">
                                                Your Current Location - {detective.currentLocation}
                                            </Text>
                                        </HStack>
                                }
                                <>
                                    <Text>Detectives locations</Text>
                                    <HStack spacing='24px'>
                                        {
                                            gameInfo && gameInfo.detectives &&
                                            gameInfo.detectives.map(detective =>
                                                (
                                                    <Box w='50px' h='75px' borderColor={gameInfo.turn === 'MrX'
                                                        ? 'red.800':'green.800'} borderWidth='2px'
                                                         alignContent='center'
                                                         bgColor={
                                                             gameInfo.turn === 'MrX'
                                                                 ? 'red.200'
                                                                 : detective.piece===sessionStorage.getItem('playerPiece')
                                                                     ? 'green.200'
                                                                 :''
                                                         }
                                                    >
                                                        <VStack>
                                                            <Text>{detective.piece}</Text>
                                                            <Text>{detective.currentLocation}</Text>
                                                        </VStack>
                                                    </Box>
                                                )
                                            )
                                        }
                                    </HStack>
                                </>
                                <Divider/>
                                <FormControl isRequired>
                                    <NumberInput>
                                        <NumberInputField
                                            placeholder='Enter your next location'
                                            width='auto'
                                            value={nextLocation}
                                            onChange={handleNextLocationChanged}/>
                                    </NumberInput>
                                </FormControl>
                                <>
                                    <Text fontSize="lg">
                                        Select Ticket
                                        <Text fontSize='xs' color='orange.500'>*Number refers to the count of ticket(s)
                                            left</Text>
                                    </Text>
                                    <HStack spacing='15px'>
                                        <Tabs variant='unstyled'>
                                            <TabList>
                                                {
                                                    gameInfo.turn === 'MrX'
                                                        ?
                                                        (gameInfo && gameInfo.mrX && gameInfo.mrX.tickets
                                                            && Object.keys(gameInfo.mrX.tickets).map((key, index) => {
                                                                return (
                                                                    <Tab
                                                                        _selected={{color: 'white', bg: 'teal.500'}}
                                                                        key={index}
                                                                        onClick={() => setTicket(key)}
                                                                    >
                                                                        <VStack>
                                                                            <Text>{key}</Text>
                                                                            <Text>{gameInfo.mrX.tickets[key]}</Text>
                                                                        </VStack>
                                                                    </Tab>
                                                                );
                                                            }))
                                                        : (detective && detective.tickets
                                                            && Object.keys(detective.tickets).map((key, index) => {
                                                                return (
                                                                    <Tab
                                                                        _selected={ticket !== null ? {
                                                                            color: 'white',
                                                                            bg: 'teal.500'
                                                                        } : {}}
                                                                        key={index}
                                                                        onClick={() => setTicket(key)}
                                                                    >
                                                                        <VStack>
                                                                            <Text>{key}</Text>
                                                                            <Text>{detective.tickets[key]}</Text>
                                                                        </VStack>
                                                                    </Tab>
                                                                );
                                                            }))
                                                }
                                            </TabList>
                                        </Tabs>
                                    </HStack>
                                </>
                                <Button
                                    colorScheme={nextLocation < 0 || nextLocation > 201 || ticket === null ? 'red' : 'teal'}
                                    variant="outline"
                                    isDisabled={nextLocation < 0 || nextLocation > 201 || ticket === null}
                                    onClick={makeMove}>
                                    {/*<CheckIcon paddingRight='3px'/>*/}
                                    {nextLocation < 0 || nextLocation > 201 || ticket === null ? 'Invalid Input(s)' : 'Save'}
                                </Button>
                            </VStack>
                            : (
                                gameInfo.turn === 'MrX'
                                    ? <Text>Mr. X is playing...</Text>
                                    : <Text>Detective {detective.name} (Piece: {gameInfo.turn}) is playing</Text>
                            )
                    }
                </GridItem>
            </Grid>
        </>
    )
}