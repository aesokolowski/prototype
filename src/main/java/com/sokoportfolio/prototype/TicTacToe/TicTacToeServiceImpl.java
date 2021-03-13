package com.sokoportfolio.prototype.TicTacToe;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class TicTacToeServiceImpl implements TicTacToeService {
    private static Random generateRandom = new Random(System.currentTimeMillis());

    @Override
    public String easyComputerTurn(String board, Character playAs) {
        Character notPlayAs = playAs == 'X' ? 'O' : 'X';
        StringBuilder newBoard = new StringBuilder(board);
        boolean invalid = true;

        do {
            int mutateAt = generateRandom.nextInt(9);

            if (!(board.charAt(mutateAt) == playAs || board.charAt(mutateAt) == notPlayAs)) {
                newBoard.setCharAt(mutateAt, playAs);
                invalid = false;
            }
        } while (invalid);

        return newBoard.toString();
    }
}