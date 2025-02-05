﻿import { GameType } from '../Models/GameType';
import { ScoreDetails } from './ScoreDetails';
import { SingleGame } from './SingleGame';
import { SessionState } from './SessionState';
import { NotificationEventing } from '../Notification/NotificationEventing';
import { GameOptions } from '../Models/GameOptions';
import { EligibleWords } from './EligibleWords';
import { NotificationWrapper } from '../Notification/NotificationWrapper';
import { NotificationType } from '../Models/NotificationType';
import { GuessResult } from '../Models/GuessResult';

import { GamePainterInterface } from '../Interfaces/GamePainterInterface';
import { ScoreHandlingInterface } from '../Interfaces/ScoreHandlingInterface';

export class Session {
    private currentGame: SingleGame;
    private eligibleWords: EligibleWords;

    private gamePainter: GamePainterInterface;
    private scoreHandler: ScoreHandlingInterface;

    type: GameType;
    state: SessionState;
    score: ScoreDetails;
    messaging: NotificationEventing;

    constructor(type: GameType, eligibleAnswers: string[], eligibleGuesses: string[],
        notificationTools: NotificationEventing, gamePainter: GamePainterInterface,
        scoreHandler: ScoreHandlingInterface, hardMode: boolean,
        maxGuesses?: number, timerEnabled?: boolean, timerLength?: number) {
        this.type = type;
        this.messaging = notificationTools;
        this.score = new ScoreDetails();
        this.state = new SessionState(hardMode, maxGuesses, timerEnabled, timerLength);
        this.gamePainter = gamePainter;
        this.scoreHandler = scoreHandler;
        this.eligibleWords = new EligibleWords(eligibleAnswers, eligibleGuesses);

        this.generateGame();
        this.state.startTime = this.currentGame.startTime;
    }

    next(input: string): GuessResult {
        let guessResult;
        if (this.state.active) {
            if (this.type === GameType.Single) {
                guessResult = this.currentGame.guessTrigger(input);

                if (!this.isCurrentGameActive()) {
                    this.score.updateScore(this.currentGame);
                    this.paintDetails();

                    this.scoreHandler.updateHighScores(this.type, this.score,
                        this.currentGame.solved(), this.currentGame.userGuesses.length);
                }
            } else {
                guessResult = this.currentGame.guessTrigger(input);

                if (this.currentGame.solved()) {
                    this.anotherGame();
                } else if (!this.isCurrentGameActive()) {
                    this.messaging.message = new NotificationWrapper(NotificationType.Error,
                        `The answer was '${this.currentGame.chosenWord.toUpperCase()}. Create a new session to play again.'`);

                    this.score.endTime = this.currentGame.endTime;

                    if (this.score.totalScore > 0) {
                        this.scoreHandler.updateHighScores(this.type, this.score);
                    }
                }
            }
        } else {
            this.messaging.message = new NotificationWrapper(NotificationType.Error,
                "The session has ended. To keep playing, you will need a new session.");
        }

        if (guessResult === GuessResult.Progress || guessResult === GuessResult.GameComplete) {
            this.paintBoard();
        }

        return guessResult;
    }

    isCurrentGameNew(): boolean {
        return this.currentGame !== undefined && this.currentGame.userGuesses.length === 0;
    }

    isCurrentGameActive(): boolean {
        this.state.active = this.currentGame.endTime === undefined;

        return this.state.active;
    }

    paintBoard(game?: SingleGame, onlyPaintLast?: boolean): void {
        game = game ?? this.currentGame;

        onlyPaintLast = onlyPaintLast ?? false;
        this.gamePainter.paintBoard(game.userGuesses.map(guess => guess.guess),
            game.userGuesses.map(guess => guess.characterStates), onlyPaintLast, game.endTime === undefined);
    }

    release() {
        this.currentGame.stopTimer();
    }

    private generateGame(): void {
        this.currentGame = new SingleGame(this.generateGameOptions(), this.eligibleWords, this.messaging,
            this.gamePainter, true);

        this.paintDetails();
        this.gamePainter.truncateBoard(this.currentGame.options.maxGuesses);
        this.paintBoard();
    }

    private generateGameOptions(): GameOptions {
        return new GameOptions(this.state.hardMode,
            this.state.maxGuesses,
            this.state.gameTimerLimitExists,
            this.state.gameTimerLength);
    }

    private paintDetails(): void {
        this.gamePainter.paintDetails(this.type, this.state, this.score);
    }

    private anotherGame(): void {
        this.state.gameHistory.push(this.currentGame);
        this.score.updateScore(this.currentGame);

        if (this.type === GameType.ProgressiveDifficulty) {
            this.state.getHarder(this.score.roundsCompleted);
        }

        this.generateGame();
    }
}