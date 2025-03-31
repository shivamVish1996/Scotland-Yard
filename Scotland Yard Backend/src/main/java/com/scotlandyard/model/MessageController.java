package com.scotlandyard.model;

import com.scotlandyard.model.dto.JoinMessage;
import com.scotlandyard.model.dto.ScotlandYardMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    /**
     * Template for sending messages to clients through the message broker.
     */
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final ScotlandYardManager scotlandYardManager = new ScotlandYardManager();

    @MessageMapping("/game.create")
//    @SendTo("/queue/game.state")
    public ScotlandYard createGame(@Payload JoinMessage message, SimpMessageHeaderAccessor headerAccessor) {
        String gameId = message.getGameId();
        ScotlandYard game = scotlandYardManager.createGame(gameId);
        headerAccessor.getSessionAttributes().put("gameId", game.getGameId());
        headerAccessor.getSessionAttributes().put("playerName", message.getPlayerName());

        ScotlandYardMessage gameMessage = gameToMessage(game);
        gameMessage.setType("game.created");
        messagingTemplate.convertAndSend("/queue/game." + game.getGameId(), gameMessage);
        return game;
    }

    @MessageMapping("/game.join")
//    @SendTo("/queue/game.state")
    public ScotlandYard joinGame(@Payload JoinMessage message, SimpMessageHeaderAccessor headerAccessor) {
        String gameId = message.getGameId();
        String playerName = message.getPlayerName();
        boolean isMrX = message.getIsMrX();
        ScotlandYard game = scotlandYardManager.joinGame(gameId, playerName, isMrX);

        headerAccessor.getSessionAttributes().put("gameId", game.getGameId());
        headerAccessor.getSessionAttributes().put("playerName", message.getPlayerName());

        ScotlandYardMessage gameMessage = gameToMessage(game);
        gameMessage.setType("game.joined");
        messagingTemplate.convertAndSend("/queue/game." + game.getGameId(), gameMessage);
        return game;
    }

    @MessageMapping("/game.start")
    public ScotlandYard startGame(@Payload JoinMessage message) {
        String gameId = message.getGameId();
        ScotlandYard game = scotlandYardManager.startGame(gameId);
        ScotlandYardMessage gameMessage = gameToMessage(game);
        gameMessage.setType("game.started");
        messagingTemplate.convertAndSend("/queue/game." + game.getGameId(), gameMessage);
        return game;
    }

    @MessageMapping("/game.move")
    public ScotlandYard makeMove(@Payload ScotlandYardMessage message) {
        String gameId = message.getGameId();
        String piece = message.getSender();
        Move move = message.getMove();
        ScotlandYard game = scotlandYardManager.makeMove(gameId, piece, move);
        ScotlandYardMessage gameMessage = gameToMessage(game);
        gameMessage.setType("game.move");
        messagingTemplate.convertAndSend("/queue/game." + game.getGameId() + "/move", gameMessage);
        return game;
    }

    private ScotlandYardMessage gameToMessage(ScotlandYard game) {
        ScotlandYardMessage message = new ScotlandYardMessage();
        message.setGameId(game.getGameId());
        message.setMrX(game.getMrX());
        message.setDetectives(game.getDetectives());
        message.setGameState(game.getGameState());
        message.setWinner(game.getWinner());
        message.setTurn(game.getTurn());
        message.setRoundNumber(game.getRoundNumber());
        return message;
    }


}
