import React, { useReducer } from 'react';

import TaskContext from './gameContext';
import TaskReducer from './gameReducer';

import {
    SET_BENCH,
    SET_DURATION,
    SET_GAME_STATE,
    SET_SEED,
    SET_TIMER
} from '../types';

import seedData from '../../components/helpers/seedData';
import game from '../../components/helpers/game';
import { IHero } from '../../components/utils/types';

const GameState = (props: any) => {

    const initialState = {
        seed: seedData,
        bench: [],
        gameState: game.GAME_STATE.READY,
        timer: 0,
        duration: 0
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const setSeed = (data: any) => {

        dispatch({
            type: SET_SEED,
            payload: data
        })

    }

    const setBench = (data: Array<IHero>) => {
        dispatch({
            type: SET_BENCH,
            payload: data
        })
    }

    const setGameState = (s: string) => {
        dispatch({
            type: SET_GAME_STATE,
            payload: s
        })
    }

    const setDuration = (d: number) => {
        dispatch({
            type: SET_DURATION,
            payload: d
        })
    }

    const setTimer = (t: number) => {
        dispatch({
            type: SET_TIMER,
            payload: t
        })
    }


    return <TaskContext.Provider
        value={{
            seed: state.seed,
            bench: state.bench,
            gameState: state.gameState,
            timer: state.timer,
            duration: state.duration,
            setSeed,
            setBench,
            setGameState,
            setTimer,
            setDuration
        }}
    >
        { props.children }
    </TaskContext.Provider>

}

export default GameState;