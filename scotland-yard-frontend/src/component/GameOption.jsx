import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import CreateGamePage from "./CreateGamePage";
import JoinGamePage from "./JoinGamePage";
import React from "react";

export function GameOption() {
    return (
        <Tabs isLazy isFitted variant='enclosed' borderColor='black'>
            <TabList>
                <Tab _selected={{color: 'white', bg: 'teal'}}>Host Game</Tab>
                <Tab _selected={{color: 'white', bg: 'teal'}}>Join Game</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <CreateGamePage/>
                </TabPanel>
                <TabPanel>
                    <JoinGamePage/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}