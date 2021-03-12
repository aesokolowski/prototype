package com.sokoportfolio.prototype.TicTacToe;

import java.util.Objects;

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

    // trying out newfangled JDK 7+ way I didn't learn about in college
    @Override
    public boolean equals(Object object) {
        if (object == this)
            return true;
        
        if (object == null || object.getClass() != getClass())
            return false;

        TicTacToeBoard ticTacToeBoard = (TicTacToeBoard) object;
        
        return Objects.equals(board, ticTacToeBoard.board) && Objects.equals(playAs, ticTacToeBoard.playAs);
    }

    // same as equals, trying out newer "canonical" way instead of old 17/31 way
    @Override
    public int hashCode() {
        return Objects.hash(board, playAs);
    }

    @Override
    public String toString() {
        return "TicTacToeBoard{board=\"" + board + "\",playAs='" + playAs + "'}";
    }
}