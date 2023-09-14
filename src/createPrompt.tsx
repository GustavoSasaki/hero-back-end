import { Hero } from '@/pages/api/createHero';

export function createPrompt(hero: Omit<Hero, 'description'>) {
    const adjPrompt = createAdjectPrompt(hero)
    const pronoun = getPronoun(hero.gender)

    let prompt = adjPrompt + ` named as ${hero.name}.`
    prompt += `${pronoun} super power is ${hero.power}.`
    prompt += `${pronoun} secret identity and real name is ${hero.alter_ego}.`

    return prompt
}

function createAdjectPrompt(hero: Omit<Hero, 'description'>) {
    const adjRandom = randomAdjectives[getRandomInt(randomAdjectives.length)]
    const adjRandom2 = randomAdjectives2[getRandomInt(randomAdjectives2.length)]
    const adjRandom3 = randomAdjectives3[getRandomInt(randomAdjectives3.length)]
    return `an ${hero.gender} ${adjRandom} ${adjRandom2} ${adjRandom3} ${hero.age} super hero`
}

function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}
const randomAdjectives = ['strong','beautiful','big','small','bald']
const randomAdjectives2 = ['fat','slim','anorexic','stylish','cool','emo','occultist','surfist','humble']
const randomAdjectives3 = ['anime','realistic','faithful','brash','witty','fantastic','berserk','minecraft']


function getPronoun(genre: string) {
    if(genre == 'male')return 'His'
    if(genre == 'female')return 'Her'
    return 'It'
}