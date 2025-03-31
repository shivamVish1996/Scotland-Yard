package com.scotlandyard.model;

import java.util.*;

public abstract class Player {

    protected String name;
    protected int currentLocation;
    protected EnumMap<Ticket, Integer> tickets;
    protected List<Move> trace;
    protected Piece piece;

    public Piece getPiece() {
        return piece;
    }

    public void setPiece(Piece piece) {
        this.piece = piece;
    }

    protected Player(String name, int currentLocation) {
        this.name = name;
        this.currentLocation = currentLocation;
        trace = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public int getCurrentLocation() {
        return currentLocation;
    }

    public List<Move> getTrace() {
        return trace;
    }

    public EnumMap<Ticket, Integer> getTickets() {
        return tickets;
    }

    public void setCurrentLocation(int currentLocation) {
        this.currentLocation = currentLocation;
    }

    public void makeMove(Move move) {
        //get previous location
        int previousLocation = getCurrentLocation();

        //update current location
        setCurrentLocation(move.getToLocation());

        Ticket ticket = move.getTicket();

        //update ticket count
        int count = getTickets().get(ticket);
        int newCount = count - 1;
        if (newCount == 0) {
            getTickets().remove(ticket);
        } else {
            getTickets().put(ticket, newCount);
        }

        // add the move in the trace
        move.setFromLocation(previousLocation);
        getTrace().add(move);
    }
}
