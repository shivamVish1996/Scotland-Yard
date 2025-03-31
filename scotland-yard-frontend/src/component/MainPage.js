import React, {useEffect, useState} from 'react'
import {Container, Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";

export default function MainPage() {


    return (
        <Container maxW='1200px'>
            <VStack spacing='40px' alignItems='stretch'>

                <Outlet/>
            </VStack>
        </Container>
    )
}