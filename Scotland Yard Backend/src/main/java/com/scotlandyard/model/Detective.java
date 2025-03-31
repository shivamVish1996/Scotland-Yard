package com.scotlandyard.model;

import java.util.EnumMap;

public class Detective extends Player {

    public Detective(String name, int currentLocation, Piece piece) {
        super(name, currentLocation);
        this.piece = piece;
        tickets = new EnumMap<>(Ticket.class);
        tickets.put(Ticket.TAXI, Constants.DETECTIVE_TICKET_TAXI_INITIAL_COUNT);
        tickets.put(Ticket.BUS, Constants.DETECTIVE_TICKET_BUS_INITIAL_COUNT);
        tickets.put(Ticket.UNDERGROUND, Constants.DETECTIVE_TICKET_UNDERGROUND_INITIAL_COUNT);
    }

    @Override
    public String toString() {
        return "Detective{" +
                "name='" + name +
                ", currentLocation=" + currentLocation +
                ", tickets=" + tickets +
                ", trace=" + trace + '\'' +
                '}';
    }
}
