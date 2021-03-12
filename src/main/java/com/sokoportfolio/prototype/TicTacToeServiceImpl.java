package com.sokoportfolio.prototype.TicTacToe;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class TicTacToeServiceImpl implements TicTacToeService {
    private static Random generateRandom = new Random(System.currentTimeMillis());

    @Override
    public String easyComputerTurn(String board) {
        System.out.println("hello service");
        StringBuilder newBoard = new StringBuilder(board);
        boolean invalid = true;

        do {
            int mutateAt = generateRandom.nextInt(9);

            if (!(board.charAt(mutateAt) == 'O' && board.charAt(mutateAt) == 'X')) {
                newBoard.setCharAt(mutateAt, 'O');
                invalid = false;
            }
        } while (invalid);

        return newBoard.toString();
    }
}