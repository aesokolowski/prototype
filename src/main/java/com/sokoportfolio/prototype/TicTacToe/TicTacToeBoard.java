package com.sokoportfolio.prototype.TicTacToe;

public class TicTacToeBoard {
    private String board;
    private Character playAs;

    public TicTacToeBoard() {
        /* empty default constructor */
    }

    public TicTacToeBoard(String board) {
        this.board = board;
        playAs = null;
    }

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    public Character getPlayAs() {
        return playAs;
    }

    public void setPlayAs(Character playAs) {
        this.playAs = playAs;
    }

    // TODO: equals, hashmap, toString
}