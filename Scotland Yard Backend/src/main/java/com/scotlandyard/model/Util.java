package com.scotlandyard.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Util {

    private static final Random random = new Random();

    private Util() {
    }

    public static List<Integer> getRandomInitialLocations() {
        List<Integer> list = new ArrayList<>(Constants.POSSIBLE_STARTING_LOCATIONS);
        Random r = new Random();
        List<Integer> newList = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            int randomIndex = r.nextInt(list.size());
            int randomElement = list.get(randomIndex);
            list.remove(randomIndex); // Remove the selected element so that other players won't get the same location
            newList.add(randomElement);
        }
        return newList;
    }

    public static int getRandomInitialLocation(List<Integer> initialLocations) {
        int randomIndex = random.nextInt(initialLocations.size());
        return initialLocations.get(randomIndex);
    }

    public static Piece getRandomPiece(List<Piece> pieces) {
        int randomIndex = random.nextInt(pieces.size());
        return pieces.get(randomIndex);
    }
}
