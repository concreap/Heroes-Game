import React, { useEffect, useContext, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import GameContext from '../../context/game/gameContext';
import { IGameContext, IHero, ISeedData } from '../utils/types';
import gameService from '../helpers/game';
import Column from './Column';
import seedData from '../helpers/seedData';

const Home = (props: any) => {

    const gameContext = useContext<IGameContext>(GameContext);
    const [gameScore, setGameScore] = useState<number>(0);
    const [dbData, setDbData] = useState(seedData);

    useEffect(() => {


    }, [])

    const handleDragEnd = (result: any) =>{

        // result = {
        //     combine: null,
        //     destination: {
        //         droppableId: 'col-1',
        //         index: 0
        //     },
        //     source: {
        //         droppableId: 'col-1',
        //         index: 0
        //     },
        //     mode: 'FLUID',
        //     reason: 'DROP',
        //     draggableId: 'task-1',
        //     type: 'DEFAULT'
        // }

        const { destination, source, draggableId, type } = result;

        if(!destination){
            return;
        }

        if(destination.droppableId === source.droppableId && source.index === destination.index){
            return;
        }

        let currList: ISeedData = gameContext.seed;

        // source {column}
        let start: Array<IHero> = gameContext.bench;

        // destination {column}
        const end = currList.comics.find((x) => x.id === destination.droppableId);
        const eIndex = currList.comics.findIndex((x) => x.id === destination.droppableId);

        if(start && end){

            const hero = currList.heroes.find((x) => x.id === draggableId)
            const heroIndex = currList.heroes.findIndex((x) => x.id === draggableId)

            if(source.droppableId === destination.droppableId){

                let heroList = end.heroes;
                const result = gameService.reposition(heroList, source.index, destination.index);

                end.heroes = result;

                currList.comics.splice(eIndex, 1, end);
                gameContext.setSeed(currList);

            }

            if(source.droppableId !== destination.droppableId && hero && heroIndex >= 0){

                const exist = end.heroes.find((x) => x.id === hero.id);

                if(!exist){

                    let startHeroes = start;
                    let endHeroes = end.heroes;

                    // startHeroes.splice(heroIndex, 1);
                    start = startHeroes.filter((x) => x.id !== hero.id);

                    endHeroes.push(hero);
                    end.heroes = endHeroes;

                    currList.comics.splice(eIndex, 1, end);

                    gameContext.setBench(start);
                    gameContext.setSeed(currList);

                }

                

            }

        }

    }

    const startGame = () => {

        gameContext.setGameState(gameService.GAME_STATE.PLAYING)
        gameContext.setBench(gameService.shuffle(seedData.heroes));
        gameContext.setDuration(30);
        setDbData(seedData)

        // trigger gameLoop
        gameLoop(gameService.GAME_STATE.DURATION);
    }

    const endGame = (t: any) => {

        clearInterval(t);
        clearTimeout(t);

        // set game state
        gameContext.setGameState(gameService.GAME_STATE.DONE);

        // calculate score
        const score = gameService.totalScore(gameContext.seed.heroes, gameService.getGroup(gameContext.seed.comics), gameContext.duration)
        setGameScore(score);
    } 

    const gameLoop = (dur: number) => {

        let timer = window.setInterval(() => {

            if(dur == -1){

                clearInterval(timer);
                clearTimeout(timer);

                // trigger the endGame function
                endGame(timer);

            }else{

                gameContext.setDuration(dur);
                gameContext.setTimer(timer);

                dur--;

            }

        }, 1000)

    }

    const resetGame = () => {

        let currList = gameContext.seed;
        let cList = currList.comics;

        cList = cList.map((x) => {
            return { id: x.id, name: x.name, heroes: [] }
        });

        currList.comics = cList;

        // set states
        gameContext.setSeed(currList);
        gameContext.setBench([]);
        gameContext.setTimer(0);
        gameContext.setDuration(0);
        gameContext.setGameState(gameService.GAME_STATE.READY);

    }

    const handleStart = (e: any) => {

        if(e) { e.preventDefault() }

        if(gameContext.gameState === gameService.GAME_STATE.READY){
            startGame();
        }else if(gameContext.gameState === gameService.GAME_STATE.DONE){
            resetGame();
        }else if(gameContext.gameState === gameService.GAME_STATE.PLAYING){
            endGame(gameContext.timer)
        }

    }

    return(
        <>
            <section className='section'>

                

                    <div className='container'>

                        <div className='wrapper'>

                            <div className='inner-box info'>

                                <div className='wrap-box'>

                                    <h1>{ gameContext.gameState === gameService.GAME_STATE.PLAYING ? 'Now Playing...' : 'Line Up Heroes' }</h1>

                                    {
                                        gameContext.gameState === gameService.GAME_STATE.READY &&
                                        <>
                                            <p>
                                                Welcome to "Line Up Heroes" Game <br />
                                                Drag and Drop the heroes in the correct comic list to get 12 points for each hero. Sort them alphabetically and quickly for better scores.
                                            </p>
                                        </>
                                    }

                                    {
                                        gameContext.gameState !== gameService.GAME_STATE.READY &&
                                        <>
                                            <div className='time-box'>
                                                <p>{ gameContext.duration }</p>
                                                <span>Time left</span>
                                            </div>
                                        </>
                                    }

                                </div>

                                <div className='line'></div>

                                {
                                    gameContext.gameState === gameService.GAME_STATE.DONE &&
                                    <>
                                        <div className='time-box'>
                                            <p>{ gameScore }</p>
                                            <span>Total Score</span>
                                        </div>
                                    </>
                                }

                                <div className='control'>
                                    <Link onClick={(e) => handleStart(e)} to="" className='btn'>
                                        { gameContext.gameState === gameService.GAME_STATE.DONE ? 'Reset Game' : gameContext.gameState === gameService.GAME_STATE.PLAYING ? 'End Game' : 'Start Game'}
                                    </Link>
                                </div>

                            </div>
                            
                            <DragDropContext
                            onDragEnd={handleDragEnd}
                            onDragStart={() => {}}
                            onDragUpdate={() => {}}
                            >
                                <div className={`inner-box game-box ${gameContext.gameState === gameService.GAME_STATE.DONE ? 'disabled' : ''}`}>

                                    {
                                        gameContext.seed.comics.map((comic, index) => 
                                            <>
                                                <Column 
                                                    id={comic.id}
                                                    title={ index === 0 ? gameService.COMICS.MARVEL : gameService.COMICS.DC } 
                                                    heroes={comic.heroes}
                                                />

                                                {
                                                    index === 0 &&
                                                    <Column id={'bench'} title='Bench' heroes={gameContext.bench} />
                                                }
                                            </>
                                        )
                                    }
                                </div>

                            </DragDropContext>

                        </div>

                    </div>

                

            </section>
        </>
    )

}

export default Home;