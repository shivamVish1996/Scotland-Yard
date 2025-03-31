import {Button, Container, Flex, HStack, Spacer, Text, useToast, VStack} from "@chakra-ui/react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Lobby from "./component/Lobby";
import {GameOption} from "./component/GameOption";
import React, {useEffect, useReducer, useState} from "react";
import {GamePage} from "./component/GamePage";
import {LockIcon} from "@chakra-ui/icons";
import {LogoutPage} from "./component/LogoutPage";
import {PageNotFound} from "./component/PageNotFound";
import {GameResult} from "./component/GameResult";
import {GraphPOC} from "./component/GraphPOC";

function App() {

    const [playerName, setPlayerName] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        enterName()
    }, [playerName]);

    function enterName() {
        if (sessionStorage.getItem("playerName") === null) {
            let pName = null;
            do {
                pName = prompt("Enter your name (Make sure it's different from other players)")
            } while (pName === null || pName === undefined || pName === "");
            setPlayerName(pName);
            sessionStorage.setItem("playerName", pName);
            toast({
                title: "Logged in",
                description: `${pName} logged in successfully`,
                duration: 2500,
                isClosable: true,
                status: "success",
                position: "top",
                icon: <LockIcon/>
            })
        } else {
            setPlayerName(sessionStorage.getItem("playerName"));
        }
        // navigate('/gameOptions')
    }

    function wait(ms) {
        var start = Date.now(),
            now = start;
        while (now - start < ms) {
            now = Date.now();
        }
    }

    function logout() {
        sessionStorage.clear()
        setPlayerName('');
    }

    return (
        <Container maxW='1200px'>
            <VStack spacing='40px' alignItems='stretch'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Button marginTop='2px' px='10px' variant='outline'
                            colorScheme='teal' size='lg'
                            onClick={() => navigate('/gameOptions')}>
                        SCOTLAND YARD
                    </Button>
                    <Spacer/>
                    <HStack spacing='10px' alignItems='stretch'>
                        <Text fontSize='20px'>Welcome</Text>
                        <Text as='i' fontSize='20px' color='teal'>{playerName}</Text>
                        <Button colorScheme='teal' variant='outline' size='sm'
                                onClick={logout}>
                            Logout
                        </Button>
                    </HStack>
                </Flex>
                <Routes>
                    <Route path="/graph" element={<GraphPOC/>}/>
                    <Route path="/gameOptions" element={<GameOption/>}/>
                    <Route path="/lobby/:roomCode" element={<Lobby/>}/>
                    <Route path="/game/:roomCode" element={<GamePage/>}/>
                    <Route path="/game/result" element={<GameResult/>}/>
                    <Route path="/logout" element={<LogoutPage/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </VStack>
        </Container>

    );
}

export default App;
