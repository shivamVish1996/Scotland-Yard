package com.scotlandyard.model;

import java.util.List;
import java.util.Set;

public class Constants {

    public static final int DETECTIVE_TICKET_TAXI_INITIAL_COUNT = 10;
    public static final int DETECTIVE_TICKET_BUS_INITIAL_COUNT = 8;
    public static final int DETECTIVE_TICKET_UNDERGROUND_INITIAL_COUNT = 4;

    public static final int MR_X_TICKET_TAXI_INITIAL_COUNT = 4;
    public static final int MR_X_TICKET_BUS_INITIAL_COUNT = 3;
    public static final int MR_X_TICKET_UNDERGROUND_INITIAL_COUNT = 3;
    public static final int MR_X_TICKET_BLACK_INTIAL_COUNT = 5;
    public static final int MR_X_TICKET_LABEL_INITIAL_COUNT = 1;
    public static final int MR_X_TICKET_DOUBLE_INITIAL_COUNT = 2;

    public static final List<Integer> POSSIBLE_STARTING_LOCATIONS = List.of(13, 26, 34, 50, 53, 62, 91, 94, 103, 112, 117, 132, 138, 141, 155, 174, 197, 198);

    public static final int NUMBER_OF_ROUNDS = 5;

    public static final Set<Integer> MR_X_LOCATION_REVEAL_ROUND_NUMBERS = Set.of(3);
    public static final List<Piece> ALL_POSSIBLE_PIECES =
            List.of(Piece.A, Piece.B, Piece.C, Piece.D, Piece.E);
}
