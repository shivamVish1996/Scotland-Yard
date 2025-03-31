package com.scotlandyard.model.dto;

import com.scotlandyard.model.*;

import java.util.List;

public class ScotlandYardMessage implements Message {
    private String type;
    private String gameId;
    private Piece turn;
    private String winner;
    private String content;
    private String sender;
    private List<Detective> detectives;
    private MrX mrX;
    private GameState gameState;
    private Move move;
    private int roundNumber;

    public ScotlandYardMessage() {
    }

    public ScotlandYardMessage(ScotlandYard game) {
        this.gameId = game.getGameId();
        this.mrX = game.getMrX();
        this.detectives = game.getDetectives();
        this.winner = game.getWinner();
        this.gameState = game.getGameState();
        this.turn = game.getTurn();
    }

    /**
     * Getters and Setters
     */
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public List<Detective> getDetectives() {
        return detectives;
    }

    public void setDetectives(List<Detective> detectives) {
        this.detectives = detectives;
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



    public Piece getTurn() {
        return turn;
    }

    public void setTurn(Piece turn) {
        this.turn = turn;
    }

    public Move getMove() {
        return move;
    }

    public void setMove(Move move) {
        this.move = move;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }
}
