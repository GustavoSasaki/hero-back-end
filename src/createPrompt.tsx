import { Hero } from '@/pages/api/createHero';

export function createPrompt(hero: Hero) {
    const adjPrompt = createAdjectPrompt(hero)
    const pronoun = getPronoun(hero.gender)

    let prompt = adjPrompt + ` named as ${hero.name}.`
    prompt += `${pronoun} super power is ${hero.power}.`
    prompt += `And ${pronoun} alter ego is ${hero.power}.`

    return prompt
}

function createAdjectPrompt(hero: Hero) {
    const adjRandom = randomAdjectives[getRandomInt(randomAdjectives.length)]
    const adjRandom2 = randomAdjectives[getRandomInt(randomAdjectives2.length)]
    return `an ${hero.gender} ${adjRandom} ${adjRandom2} ${hero.age} super hero`
}

function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}
const randomAdjectives = ['strong','beautiful','ugly','big','small','bald']
const randomAdjectives2 = ['fat','slim','anorexic','stump','stylish','cool','emo','occultist','surfist','humble']

function getPronoun(genre: string) {
    if(genre == 'male')return 'His'
    if(genre == 'female')return 'Her'
    return 'It'
}