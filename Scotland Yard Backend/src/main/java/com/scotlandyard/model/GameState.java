package com.scotlandyard.model;

public enum GameState {
    WAITING_FOR_PLAYER("Waiting for player."),
    START("Start"),
    MR_X_TURN("Mr. X's turn."),
    DETECTIVES_TURN("Detective's turn."),
    MR_X_WON("Mr. X won."),
    DETECTIVES_WON("Detectives won.");

    String description;

    GameState(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
