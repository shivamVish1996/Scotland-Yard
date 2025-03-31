import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import React, {useEffect} from "react";
import {Text} from "@chakra-ui/react";

// const salesData = [
//     {
//         name: 'Round 1',
//         MrX: 78,
//         A: 128,
//         B: 32,
//         C: 71,
//         D: 167,
//         E: 23
//     },
//     {
//         name: 'Round 2',
//         MrX: 56,
//         A: 67,
//         B: 78,
//         C: 89,
//         D: 100,
//         E: 111
//     },
//     {
//         name: 'Round 3',
//         MrX: 89,
//         A: 67,
//         B: 43,
//         C: 65,
//         D: 154,
//         E: 123
//     },
//     {
//         name: 'Round 4',
//         MrX: 145,
//         A: 128,
//         B: 189,
//         C: 167,
//         D: 158,
//         E: 177
//     },
//     {
//         name: 'Round 5',
//         MrX: 65,
//         A: 56,
//         B: 176,
//         C: 43,
//         D: 87,
//         E: 33
//     },
//     {
//         name: 'Round 6',
//         MrX: 156,
//         A: 148,
//         B: 175,
//         C: 47,
//         D: 82,
//         E: 198
//     },
//     {
//         name: 'Round 7',
//         MrX: 178,
//         A: 67,
//         B: 45,
//         C: 98,
//         D: 49,
//         E: 61
//     },
//     {
//         name: 'Round 8',
//         MrX: 189,
//         A: 194,
//         B: 156,
//         C: 56,
//         D: 38,
//         E: 24
//     },
//     {
//         name: 'Round 9',
//         MrX: 23,
//         A: 45,
//         B: 76,
//         C: 167,
//         D: 23,
//         E: 11
//     }
// ];

export function GraphPOC() {
    const [salesData, setSalesData] = React.useState([]);

    useEffect(() => {

        let data = {
            "type": "game.move",
            "gameId": "z3xl7",
            "turn": "MrX",
            "winner": null,
            "content": null,
            "sender": null,
            "detectives": [{
                "name": "Nitish",
                "currentLocation": 37,
                "tickets": {
                    "TAXI": 7,
                    "BUS": 8,
                    "UNDERGROUND": 4
                },
                "trace": [{
                    "fromLocation": 34,
                    "toLocation": 35,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 35,
                    "toLocation": 36,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 36,
                    "toLocation": 37,
                    "ticket": "TAXI"
                }
                ],
                "piece": "A"
            }, {
                "name": "Sudeep",
                "currentLocation": 158,
                "tickets": {
                    "TAXI": 7,
                    "BUS": 8,
                    "UNDERGROUND": 4
                },
                "trace": [{
                    "fromLocation": 155,
                    "toLocation": 156,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 156,
                    "toLocation": 157,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 157,
                    "toLocation": 158,
                    "ticket": "TAXI"
                }
                ],
                "piece": "B"
            }, {
                "name": "Samir",
                "currentLocation": 29,
                "tickets": {
                    "TAXI": 7,
                    "BUS": 8,
                    "UNDERGROUND": 4
                },
                "trace": [{
                    "fromLocation": 26,
                    "toLocation": 27,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 27,
                    "toLocation": 28,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 28,
                    "toLocation": 29,
                    "ticket": "TAXI"
                }
                ],
                "piece": "C"
            }, {
                "name": "Vaibhav",
                "currentLocation": 120,
                "tickets": {
                    "TAXI": 8,
                    "BUS": 7,
                    "UNDERGROUND": 4
                },
                "trace": [{
                    "fromLocation": 117,
                    "toLocation": 118,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 118,
                    "toLocation": 119,
                    "ticket": "BUS"
                }, {
                    "fromLocation": 119,
                    "toLocation": 120,
                    "ticket": "TAXI"
                }
                ],
                "piece": "D"
            }, {
                "name": "Shivam",
                "currentLocation": 141,
                "tickets": {
                    "TAXI": 7,
                    "BUS": 8,
                    "UNDERGROUND": 4
                },
                "trace": [{
                    "fromLocation": 138,
                    "toLocation": 139,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 139,
                    "toLocation": 140,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 140,
                    "toLocation": 141,
                    "ticket": "TAXI"
                }
                ],
                "piece": "E"
            }
            ],
            "mrX": {
                "name": "Shivam",
                "currentLocation": 94,
                "tickets": {
                    "TAXI": 2,
                    "BUS": 2,
                    "UNDERGROUND": 3,
                    "BLACK": 5,
                    "LABEL": 1,
                    "DOUBLE": 2
                },
                "trace": [{
                    "fromLocation": 91,
                    "toLocation": 92,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 92,
                    "toLocation": 93,
                    "ticket": "TAXI"
                }, {
                    "fromLocation": 93,
                    "toLocation": 94,
                    "ticket": "BUS"
                }
                ],
                "piece": "MrX"
            },
            "gameState": "START",
            "move": null,
            "roundNumber": 3
        }
        console.log('data - ', data)

        let detectives = data.detectives
        let mrX = data.mrX;
        let numberOfRounds = data.roundNumber;

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

            setSalesData(
                [
                    ...salesData, json
                ]
            );
            json = {}
        }

        console.log('salesData - ', salesData)

    }, []);


    return (
        <>
            <Text fontSize='3xl'>Graph</Text>
            <LineChart
                width={1100}
                height={600}
                data={salesData}
            >
                <CartesianGrid strokeDasharray="5 5"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                {/*<Legend />*/}
                <Legend layout="vertical" verticalAlign="middle" align="left"/>
                <Line type="monotone" dataKey="MrX" stroke="red" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="A" stroke="green" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="B" stroke="black" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="C" stroke="brown" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="D" stroke="blue" activeDot={{r: 7}}/>
                <Line type="monotone" dataKey="E" stroke="purple" activeDot={{r: 7}}/>
            </LineChart>
        </>
    );
}
