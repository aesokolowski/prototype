package com.sokoportfolio.prototype.TicTacToe;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicTacToeController {
    private static final Logger log = LoggerFactory.getLogger(TicTacToeController.class);

    @Autowired
    TicTacToeService ticTacToeService;

    @PostMapping(path = "/api/tictactoe/easy")
    public ResponseEntity<Object> easyComputerTurn(@RequestBody TicTacToeBoard board) {
        String newBoard = ticTacToeService.easyComputerTurn(board.getBoard(), board.getPlayAs());
        TicTacToeBoard newTttBoard = new TicTacToeBoard(newBoard);

        log.info(board.getBoard());
        return new ResponseEntity<>(newTttBoard, HttpStatus.OK);
    }
}