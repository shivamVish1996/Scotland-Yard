package com.scotlandyard.model;

public enum Piece {
    MrX(99, "BLACK"),
    A(0, "CYAN"),
    B(1, "BLUE"),
    C(2, "ORANGE"),
    D(3, "MAGENTA"),
    E(4, "PINK");

    public final int num;
    public final String color;

    Piece(int n, String c) {
        num = n;
        color = c;
    }

    public Piece next() {
        if (this == A)
            return B;
        else if (this == B)
            return C;
        else if (this == C)
            return D;
        else if (this == D)
            return E;
        else if (this == E)
            return MrX;
        else
            return A;
    }



}