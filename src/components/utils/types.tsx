export interface IGameContext {
    seed: ISeedData,
    bench: Array<IHero>,
    gameState: string,
    duration: number,
    timer: number,
    setSeed(data: any): void,
    setGameState(s: string): void,
    setDuration(d: number): void,
    setTimer(t: number): void,
    setBench(data: Array<IHero>): void
}

export interface IGroup {
    dc: Array<IHero>,
    marvel: Array<IHero>
}

export interface IGameHelper{
    GAME_STATE: {
        READY: string,
        PLAYING: string,
        DONE: string,
        DURATION: number
    },
    COMICS: {
        DC: string,
        MARVEL: string
    }
    shuffle(data: Array<any>): Array<any>,
    reposition(data:Array<any>, from: number, to: number): Array<any>,
    getTimeLeft(d: number): number,
    getSeconds(d: number): number,
    getGroup(data: Array<IComic>): IGroup,
    calculateScore(d: Array<IHero>, groups: IGroup): number,
    sortHeroes(d: Array<IHero>): Array<IHero>
    totalScore(data: Array<IHero>, groups: IGroup, time: number): number
}

export interface ISeedData {
    comics: Array<IComic>,
    heroes: Array<IHero>
}

export interface IComic {
    id: string,
    name: string,
    heroes: Array<IHero>
}

export interface IHero {
    id: string,
    name: string,
    comic: string
}