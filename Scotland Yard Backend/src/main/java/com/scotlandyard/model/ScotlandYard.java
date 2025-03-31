package com.scotlandyard.model;

import java.util.*;

public class  ScotlandYard {
    private List<Detective> detectives;
    private MrX mrX;
    private String gameId;
    private Piece turn;
    private String winner;
    private GameState gameState;
    private List<Integer> initialPositions;
    private List<Piece> pieces;
    private int roundNumber;

    static Scanner sc = new Scanner(System.in);

    public ScotlandYard() {
        initialPositions = new ArrayList<>(Constants.POSSIBLE_STARTING_LOCATIONS);
        pieces = new ArrayList<>(Constants.ALL_POSSIBLE_PIECES);
        roundNumber = 0;
//        List<Integer> initialLocations = Util.getRandomInitialLocations();
//
//        mrX = new MrX("MrX", initialLocations.get(0));
//        detectives = new ArrayList<>(5);
//        detectives.add(new Detective("D1", initialLocations.get(1)));
//        detectives.add(new Detective("D2", initialLocations.get(2)));
//        detectives.add(new Detective("D3", initialLocations.get(3)));
//        detectives.add(new Detective("D4", initialLocations.get(4)));
//        detectives.add(new Detective("D5", initialLocations.get(5)));
        turn = Piece.MrX;
        gameState = GameState.WAITING_FOR_PLAYER;
//        gameId = UUID.randomUUID().toString();
    }

    public void start() {
        boolean isMrXLocationReveal;
        for (int currentRound = 1; currentRound <= Constants.NUMBER_OF_ROUNDS; currentRound++) {
            printPlayersDetails();
            isMrXLocationReveal = Constants.MR_X_LOCATION_REVEAL_ROUND_NUMBERS.contains(currentRound);
            play(mrX);
            for (Detective detective : detectives) {
                if (isMrXLocationReveal) {
                    System.out.println("MrX [" + mrX.getName() + "] is at " + mrX.getCurrentLocation());
                }
                printDetectivesCurrentLocation();
                play(detective);
                checkIfDetectiveCaughtMrX(detective);
                mrX.receiveTicketFromDetective(detective);
            }
        }
        System.out.println("Game Over");
        System.out.println("MrX won");
        printPlayersDetails();
    }

    private void printPlayersDetails() {
        System.out.println(mrX);
        for (Detective detective : detectives) {
            System.out.println(detective);
        }
        System.out.println();
    }

    private void play(Player player) {
        System.out.println(player.getName() + " is playing (current location is " + player.getCurrentLocation() + ")");
        int nextLocation = getNextLocation();
        Ticket ticket = getTicketUsed(player);
        Move move = new Move(nextLocation, ticket);
        player.makeMove(move);
    }

    private int getNextLocation() {
        boolean isLocationValid;
        int nextLocation;
        do {
            System.out.println("Enter next location - ");
            nextLocation = sc.nextInt();
            isLocationValid = checkIfLocationValid(nextLocation);
        } while (isLocationValid);
        return nextLocation;
    }

    private boolean checkIfLocationValid(int nextLocation) {
        if (nextLocation < 1 || nextLocation > 200) {
            System.out.println("Invalid location");
            return true;
        }
        for (Detective detective : detectives) {
            if (nextLocation == detective.getCurrentLocation()) {
                System.out.println("Location is occupied");
                return true;
            }
        }
        return false;
    }

    private static Ticket getTicketUsed(Player player) {
        Ticket ticketUsed = null;

        Map<Integer, Ticket> allValidTickets = new HashMap<>();
        Set<Ticket> availableTickets = player.getTickets().keySet();
        int i = 1;
        for (Ticket ticket : availableTickets) {
            allValidTickets.put(i, ticket);
            System.out.println(i++ + ". " + ticket.name());
        }
        do {
            System.out.println("Select ticket - ");
            int ticketNumber = sc.nextInt();
            if (allValidTickets.containsKey(ticketNumber)) {
                ticketUsed = allValidTickets.get(ticketNumber);
            } else {
                System.out.println("Invalid ticket number");
            }
        } while (ticketUsed == null);
        return ticketUsed;
    }

    private void printDetectivesCurrentLocation() {
        System.out.println();
        System.out.print("[");
        for (Detective detective : detectives) {
            System.out.print(" " + detective.getName() + "@" + detective.getCurrentLocation() + ",");
        }
        System.out.println("]");
    }

    private void checkIfDetectiveCaughtMrX(Detective detective) {
        if (detective.getCurrentLocation() == mrX.getCurrentLocation()) {
            System.out.println("Game Over");
            System.out.println("Detectives won");
            System.out.println("Detective [" + detective.getName() + "] caught MrX at location - " + detective.getCurrentLocation());
            printPlayersDetails();
            System.exit(0);
        }
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

    public MrX getMrX() {
        return mrX;
    }

    public void setMrX(MrX mrX) {
        this.mrX = mrX;
    }

    public List<Detective> getDetectives() {
        return detectives;
    }

    public void setDetectives(List<Detective> detectives) {
        this.detectives = detectives;
    }

    public List<Integer> getInitialPositions() {
        return initialPositions;
    }

    public void setInitialPositions(List<Integer> initialPositions) {
        this.initialPositions = initialPositions;
    }

    public List<Piece> getPieces() {
        return pieces;
    }

    public void setPieces(List<Piece> pieces) {
        this.pieces = pieces;
    }

    public Piece getTurn() {
        return turn;
    }

    public void setTurn(Piece turn) {
        this.turn = turn;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }
}