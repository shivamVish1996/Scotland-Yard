package com.scotlandyard.model;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class ScotlandYardManager {

    private Map<String, ScotlandYard> scotlandYardGames;

    public ScotlandYardManager() {
        scotlandYardGames = new ConcurrentHashMap<>();
    }

//    public synchronized ScotlandYard createGame(String gameId, String playerName, boolean isMrX) {
//        ScotlandYard game = new ScotlandYard();
//        game.setGameId(gameId);
//
//        int initialLocation = Util.getRandomInitialLocation(game.getInitialPositions());
//
//        if (isMrX) {
//            MrX mrX = new MrX(playerName, initialLocation);
//            game.setMrX(mrX);
//        } else {
//            game.setDetectives(new ArrayList<>(5));
//            game.getDetectives().add(new Detective(playerName, initialLocation));
//        }
//        game.getInitialPositions().remove(Integer.valueOf(initialLocation));
//
//        scotlandYardGames.put(gameId, game);
//        return game;
//    }

    public synchronized ScotlandYard createGame(String gameId) {
        ScotlandYard game = new ScotlandYard();
        game.setGameId(gameId);
        scotlandYardGames.put(gameId, game);
        return game;
    }

    public synchronized ScotlandYard joinGame(String gameId, String playerName, boolean isMrX) {
        ScotlandYard game;
        if (scotlandYardGames.containsKey(gameId)) {
            game = scotlandYardGames.get(gameId);
        } else {
            log.error("ScotlandYard game not found");
            return null;
        }

        if (game.getGameState().equals(GameState.WAITING_FOR_PLAYER)) {
            int initialLocation = Util.getRandomInitialLocation(game.getInitialPositions());
            if (isMrX) {
                if (game.getMrX() != null) {
                    log.error("There is already one Mr X in the game");
                    return game;
                }
                MrX mrX = new MrX(playerName, initialLocation);
                game.setMrX(mrX);
            } else {
                Piece piece = game.getPieces().get(0);
                if (game.getDetectives() == null) {
                    game.setDetectives(new ArrayList<>());
                }
                List<Detective> detectives = game.getDetectives();
                if (detectives.size() == 5) {
                    return game;
                }
                detectives.add(new Detective(playerName, initialLocation, piece));
                game.getPieces().remove(piece);
            }
            game.getInitialPositions().remove(Integer.valueOf(initialLocation));
            return game;
        }
        return game;
    }

    public ScotlandYard startGame(String gameId) {
        ScotlandYard game = null;
        if (scotlandYardGames.containsKey(gameId)) {
            game = scotlandYardGames.get(gameId);
            if (game.getGameState().equals(GameState.WAITING_FOR_PLAYER)) {
                game.setGameState(GameState.START);
            }
        }
        return game;
    }

    public ScotlandYard makeMove(String gameId, String piece, Move move) {
        ScotlandYard game = null;
        if (scotlandYardGames.containsKey(gameId)) {
            game = scotlandYardGames.get(gameId);
            if (game.getGameState().equals(GameState.START) && game.getTurn().name().equals(piece)) {

                // if MrX's move
                if (Piece.MrX.name().equals(piece)) {
                    MrX mrX = game.getMrX();
                    mrX.makeMove(move);
                    game.setRoundNumber(game.getRoundNumber() + 1);
                    // if detectives move
                } else {
                    List<Detective> detectives = game.getDetectives();
                    for (Detective detective : detectives) {
                        if (detective.getPiece().name().equals(piece)) {
                            detective.makeMove(move);
                            break;
                        }
                    }
//                    checkIfDetectiveCaughtMrX(detective);
//                    mrX.receiveTicketFromDetective(detective);
                }

                // next player will play
                Piece currentTurn = game.getTurn();
                game.setTurn(currentTurn.next());
            }
        }
        return game;
    }
}
