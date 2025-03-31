package com.scotlandyard.model.dto;

import lombok.Getter;
import lombok.Setter;

public class JoinMessage implements Message {
    private String type;
    private String gameId;
    private String playerName;
    private boolean isMrX;
    private String content;

    @Override
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @Override
    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public boolean getIsMrX() {
        return isMrX;
    }

    public void setIsMrX(boolean isMrX) {
        this.isMrX = isMrX;
    }

    @Override
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
