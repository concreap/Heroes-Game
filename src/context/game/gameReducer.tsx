import {
    SET_BENCH,
    SET_DURATION,
    SET_GAME_STATE,
    SET_SEED,
    SET_TIMER
} from '../types';

const reducer = (state: any, action: any) => {

    switch(action.type){

        case SET_SEED: 
        return {
            ...state,
            seed: action.payload
        }
        case SET_BENCH: 
        return {
            ...state,
            bench: action.payload
        }
        case SET_TIMER: 
        return {
            ...state,
            timer: action.payload
        }
        case SET_GAME_STATE: 
        return {
            ...state,
            gameState: action.payload
        }
        case SET_DURATION: 
        return {
            ...state,
            duration: action.payload
        }

    }

}

export default reducer;