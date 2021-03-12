package com.sokoportfolio.prototype.TicTacToe;

public class TicTacToeBoard {
    private String board;

    public TicTacToeBoard() {
        /* empty default constructor */
    }

    public TicTacToeBoard(String board) {
        this.board = board;
    }

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    // TODO: equals, hashmap, toString
}