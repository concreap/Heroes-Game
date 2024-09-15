import { ISeedData } from "../utils/types";

const comics = [
    {
        id: 'marvel',
        name: 'Marvel',
        heroes: []
    },
    {
        id: 'dc',
        name: 'DC Studio',
        heroes: []
    }
]

const heroes = [
    {
        id: 'hero-1',
        name: 'Superman',
        comic: 'dc'
    },
    {
        id: 'hero-2',
        name: 'Batman',
        comic: 'dc'
    },
    {
        id: 'hero-3',
        name: 'Flash',
        comic: 'dc'
    },
    {
        id: 'hero-4',
        name: 'Aquaman',
        comic: 'dc'
    },
    {
        id: 'hero-5',
        name: 'Wonder Woman',
        comic: 'dc'
    },
    {
        id: 'hero-6',
        name: 'Green Lantern',
        comic: 'dc'
    },
    {
        id: 'hero-7',
        name: 'Iron Man',
        comic: 'marvel'
    },
    {
        id: 'hero-8',
        name: 'Spiderman',
        comic: 'marvel'
    },
    {
        id: 'hero-9',
        name: 'Captain America',
        comic: 'marvel'
    },
    {
        id: 'hero-10',
        name: 'Thor',
        comic: 'marvel'
    },
    {
        id: 'hero-11',
        name: 'Hulk',
        comic: 'marvel'
    },
    {
        id: 'hero-12',
        name: 'Black Widow',
        comic: 'marvel'
    }
]

const seedData: ISeedData = {
    comics: comics,
    heroes: heroes
}

export default seedData;