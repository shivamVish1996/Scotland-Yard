package com.scotlandyard.model;

import java.util.EnumMap;

public class MrX extends Player {

    public MrX(String name, int currentLocation) {
        super(name, currentLocation);
        piece = Piece.MrX;
        tickets = new EnumMap<>(Ticket.class);
        tickets.put(Ticket.TAXI, Constants.MR_X_TICKET_TAXI_INITIAL_COUNT);
        tickets.put(Ticket.BUS, Constants.MR_X_TICKET_BUS_INITIAL_COUNT);
        tickets.put(Ticket.UNDERGROUND, Constants.MR_X_TICKET_UNDERGROUND_INITIAL_COUNT);
        tickets.put(Ticket.BLACK, Constants.MR_X_TICKET_BLACK_INTIAL_COUNT);
        tickets.put(Ticket.LABEL, Constants.MR_X_TICKET_LABEL_INITIAL_COUNT);
        tickets.put(Ticket.DOUBLE, Constants.MR_X_TICKET_DOUBLE_INITIAL_COUNT);
    }

    @Override
    public String toString() {
        return "MrX{" +
                "name='" + name +
                ", currentLocation=" + currentLocation +
                ", tickets=" + tickets +
                ", trace=" + trace + '\'' +
                '}';
    }

    /**
     * Receive ticket from Detective and add it to MrX's ticket
     *
     * @param ticket ticket given by detective
     */
    public void receiveTicket(Ticket ticket) {
        getTickets().put(ticket, getTickets().get(ticket) + 1);
    }

    public void receiveTicketFromDetective(Detective detective) {
        Move move = detective.getTrace().get(detective.getTrace().size() - 1);
        receiveTicket(move.getTicket());
    }

}
