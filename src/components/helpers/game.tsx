import { IComic, IGameHelper, IGroup, IHero } from "../utils/types";

const GAME_STATE = {
    READY: 'READY',
    PLAYING: 'PLAYING',
    DONE: 'DONE',
    DURATION: 30 // 30 seconds
}

const COMICS = {
    DC: 'DC',
    MARVEL: 'MARVEL'
}

const reposition = (data: Array<any>, from: number, to: number): Array<any> => {

    let temp: Array<any> = []
    let result: Array<any> = [];

    temp = [...data];

    // remove item from the {from} index and save
    const item = data.splice(from, 1)[0];

    if(item){

        result = [...data]; // spread out the remaining items
        result.splice(to, 0, item) // add the item back

    }else{
        result = [...temp]
    }

    return result;

}

const shuffle = (data: Array<any>): Array<any> => {
    // Knuth shuffle algorithm
    let currList: Array<any> = data;
    let currIndex: number = data.length;
    let tempVal: any = {}
    let randIndex: number = 0;

    // while there remains elements in the array to shuffle
    while(0 !== currIndex){

        // pick an element...
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1; // decrement the current length

        //... and swap it with the current element
        tempVal = currList[currIndex];
        currList[currIndex] = currList[randIndex];
        currList[randIndex] = tempVal;

    }

    return currList;
}

const getTimeLeft = (d: number): number => {
    let r: number = d / 1000;
    return 0;
}

const getSeconds = (d: number): number => {
    return 0;
}

const getGroup = (data: Array<IComic>): IGroup => {

    let result: IGroup = { dc: [], marvel: [] }

    const dcComic = data.find((x) => x.id === COMICS.DC.toLowerCase())
    const mvComic = data.find((x) => x.id === COMICS.MARVEL.toLowerCase())

    if(dcComic){
        result.dc = dcComic.heroes;
    }

    if(mvComic){
        result.marvel = mvComic.heroes;
    }

    return result;

}

const sortHeroes = (data: Array<IHero>): Array<IHero> => {

    let order = data.sort((a, b) => {

        if(a.name < b.name) { return -1 }
        else if(a.name > b.name ) { return 1 }
        else { return 0 }

    })

    return order;
}

const calculateScore = (data: Array<IHero>, groups: IGroup): number => {

    const MAX_POINT = data.length;

    let dcSum: number = 0;
    let mvSum: number = 0;

    // get the original lists
    let dcList = data.filter((x) => x.comic === COMICS.DC.toLowerCase())
    let mvList = data.filter((x) => x.comic === COMICS.MARVEL.toLowerCase())

    groups.dc.map((hero, index) => {

        const exist = dcList.find((x) => (x.id === hero.id && x.comic === hero.comic));
        

        if(exist){

            // find the hero index from alphabetical sorting
            const hIndex = sortHeroes(data).findIndex((x) => x.id === hero.id)
            // calculate penalty
            const penalty = hIndex === index ? MAX_POINT : Math.abs(( MAX_POINT - (index - hIndex)) )

            // calculate sum
            dcSum = dcSum + penalty;

        }else{
            dcSum = dcSum + 0;
        }

    })

    groups.marvel.map((hero, index) => {

        const exist = mvList.find((x) => (x.id === hero.id && x.comic === hero.comic));

        if(exist){

            // find the hero index from alphabetical sorting
            const hIndex = sortHeroes(data).findIndex((x) => x.id === hero.id)
            // calculate penalty
            const penalty = hIndex === index ? MAX_POINT : Math.abs(( MAX_POINT - (index - hIndex) ))
            // calculate sum
            mvSum = mvSum + penalty;

        }else{
            mvSum = mvSum + 0;
        }

    })

    return ( mvSum + dcSum );
}

const totalScore = (data: Array<IHero>, groups: IGroup, time: number): number => {

    const score = calculateScore(data, groups);
    const total = score ? (score + time) : 0;

    return total;
}

const game: IGameHelper = {
    GAME_STATE: GAME_STATE,
    COMICS: COMICS,
    shuffle: shuffle,
    reposition: reposition,
    getTimeLeft: getTimeLeft,
    getSeconds: getSeconds,
    getGroup: getGroup,
    sortHeroes: sortHeroes,
    calculateScore: calculateScore,
    totalScore: totalScore
}

export default game;