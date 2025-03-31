package com.scotlandyard.model;

public class Move {
    private int fromLocation;
    private int toLocation;
    private Ticket ticket;

    public Move(int toLocation, Ticket ticket) {
        this.toLocation = toLocation;
        this.ticket = ticket;
    }

    @Override
    public String toString() {
        return "{" + fromLocation +
                "->" + toLocation +
                "," + ticket +
                '}';
    }


    public int getFromLocation() {
        return fromLocation;
    }

    public int getToLocation() {
        return toLocation;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setFromLocation(int fromLocation) {
        this.fromLocation = fromLocation;
    }

    public void setToLocation(int toLocation) {
        this.toLocation = toLocation;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}
