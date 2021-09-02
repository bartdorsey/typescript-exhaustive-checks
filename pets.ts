// A dog an a cat are the same, except for the sound they make

interface Cat {
    name: string,
    sound: 'meow'
}

interface Dog {
    name: string,
    sound: 'woof'
}

// A pet is a union type of Cat OR Dog. 
type Pet = Cat | Dog;

function makeSound(pet: Pet) {
    switch(pet.sound) {
        case 'meow':
            return `${pet.name} makes the sound ${pet.sound}`
        default:
            // By assigning the pet to a variable of type never, 
            // we make this switch statement "exhaustive"
            // In other words, Typescript does not expect this code
            // to ever be reached, and when it *IS* reached it throws a 
            // type error.
            // To fix this we need to add a case for pet.sound === 'woof'

            // If you compile this you get `Type 'Dog' is not assignable to type 'never'
            const _exhaustiveCheck: never = pet;
    }
}

function makeSoundWithIfElse(pet: Pet) {
    if (pet.sound === 'meow') {
        return `${pet.name} makes the sound ${pet.sound}`;
    } else {
        // Doing this on an if else is the same thing,
        // This ensures our function checks for every type of pet.
        // And it also fails because we don't handle the Dog type
        const _exhaustiveCheck: never = pet;
    }
}

function fixedMakeSound(pet: Pet) {
    // This version checks for Dogs, so the default case is never reached, and
    // therefore the assignment of the pet to a type of "never" never happens
    // and this compiles.
    switch(pet.sound) {
        case 'meow':
            return `Cat ${pet.name} makes the sound ${pet.sound}`
        case 'woof':
            return `Dog ${pet.name} makes the sound ${pet.sound}` 
        default:
            const _exhaustiveCheck: never = pet;
    }
}

function fixedMakeSoundWithIfElse(pet: Pet) {
    // Same thing but with an if else.
    if (pet.sound === 'meow') {
        return `Cat ${pet.name} makes the sound ${pet.sound}`;
    } else if (pet.sound === 'woof') {
        return `Dog ${pet.name} makes the sound ${pet.sound}` 
    } else {
        const _exhaustiveCheck: never = pet;
    }
}