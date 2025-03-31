import {Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

export function GameResult() {
    const {state} = useLocation();
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        console.log("INSIDE USEEFFECT")
        let detectives = state.detectives
        let mrX = state.mrX;
        let numberOfRounds = state.roundNumber;

        let mrXLocation, detectiveLocation;
        for (let i = 0; i <= numberOfRounds; i++) {
            let json = {};
            json['name'] = `Round ${i}`;
            console.log('round - ', i)
            if (i === numberOfRounds) {
                mrXLocation = mrX.currentLocation;
            } else {
                mrXLocation = mrX.trace[i].fromLocation;
            }
            json['MrX'] = mrXLocation;
            for (let detective of detectives) {
                if (i === numberOfRounds) {
                    detectiveLocation = detective.currentLocation;
                } else {
                    detectiveLocation = detective.trace[i].fromLocation;
                }
                json[detective.piece] = detectiveLocation;
            }
            console.log('json - ', json)

            setSalesData([
                ...salesData,
                json
            ]);
            json   ={}
        }

        console.log('salesData - ', salesData)
    }, []);

    return (
        <>
            <Text fontSize='3xl'>Game Result</Text>

            <LineChart
                width={1100}
                height={600}
                data={salesData}
            >
                <CartesianGrid strokeDasharray="5 5"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend layout="vertical" verticalAlign="middle" align="left"/>
                <Line type="monotone" dataKey="MrX" stroke="red" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="A" stroke="green" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="B" stroke="black" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="C" stroke="brown" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="D" stroke="blue" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="E" stroke="purple" activeDot={{r: 7}}/>
            </LineChart>
        </>
    )
}