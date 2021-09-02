# Typescript Exhaustive Checks of Union Types

In Typescript a "union type" is a type that can be a union of other types.

In this example we have a `Dog` type and a `Cat` type, and a `Pet` type which is a
union of the two:

```typescript
interface Cat {
    name: string,
    sound: 'meow'
}

interface Dog {
    name: string,
    sound: 'woof'
}

type Pet = Cat | Dog;
```

If we want to make sure that a function that gets passed a `Pet` handles both 
types of pets, we need to do a little trick with the Typescript type `never`

So for instance, if we have a switch statement like this:

```typescript
switch (pet.sound) {
    case 'meow':
        // do something with a Cat
    default: 
        // don't do anything
}
```

Then there's nothing Typescript can do to make sure we've handled both cats *and* dogs.

However, if in the default case we assign the pet to a variable of type `never`

```typescript
switch (pet.sound) {
    case 'meow':
        // do something with a cat
    default: 
        const _exhaustiveCheck: never = pet
}
```

Then Typescript will not compile, because in this code a Dog won't be able to be
assigned to a type of `never`.

We can fix it by just handling the case for dogs

```typescript
switch (pet.sound) {
    case 'meow':
        // do something with a cat
    case 'woof': 
        // do something with a dog
    default:
        const _exhaustiveCheck: never = pet;
}
```

It is important to note, that the default case should *NEVER* happen in our code, 
since all the known types of `Pet` have been handled. 

Will this prevent an actual runtime error? It depends on where the actual pet
objects come from. If they are loaded at runtime via a call to a database, 
a fetch call across the network, or loaded from a JSON file or something, then 
you could still get a runtime error, so this method is not 100% foolproof.

But it does help us avoid errors in our code, imagine someone adds a new `Pet` to the definition of Pet:

```typescript
interface Pig {
    name: string,
    sound: 'oink'
}

type Pet = Cat | Dog | Pig
```

By adding this type, the switch state will start throwing an error, letting the
developer who added the Pig type know where she needs to add code to handle the
Pig type.
