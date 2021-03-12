package com.sokoportfolio.prototype.TicTacToe;

import org.springframework.stereotype.Service;

@Service
public class TicTacToeServiceImpl implements TicTacToeService {
    @Override
    public String easyComputerTurn(String board) {
        StringBuilder newBoard = new StringBuilder(board);

        newBoard.setCharAt(0, '0');
        return newBoard.toString();
    }
}