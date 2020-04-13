// 1. Generic-типы

function mergeObject<A extends object, B extends object>(a: A, b: B) {
    return Object.assign({}, a, b)
}

const merged = mergeObject({ test1: 1 }, { test2: 2 })
console.log(merged)

// Ошибка, агрументы функции должны быть объектами
// const merged2 = mergeObject('test1', 'test2')
const merged2 = mergeObject({ test1: 1 }, { test2: 2 })

//----------------------------------------------------------------------

interface ICount {
    length: number
}

function withCount<T extends ICount>(value: T): { value: T, count: string } {
    return {
        value,
        count: `text ${value.length}`,
    }
}

// console.log(withCount('test'))
// console.log(withCount([1, 2, 3]))
// console.log(withCount({ length: 20 }))

//----------------------------------------------------------------------

function getObjectKey<T extends object, R extends keyof T>(object: T, key: R) {
    return object[key]
}

const person = {
    name: 'Test',
    age: 27,
}

// console.log(getObjectKey(person, 'name'))
// console.log(getObjectKey(person, 'age'))
// console.log(getObjectKey(person, 'job')) // error, нет такого ключа в person

//----------------------------------------------------------------------

// Например, данный ласс работает только с примитивами
class Collection<T extends string | number| boolean> {
    constructor(private _items: T[]) {}

    add(item: T) {
        this._items = [
            ...this._items,
            item,
        ]
    }

    remove(item: T) {
        this._items = this._items.filter(element => element !== item)
    }

    get items(): T[] {
        return this._items
    }
}

const strings = new Collection<string>(['1', '2', '3'])

strings.add('4') // ['1', '2', '3', '4']
strings.remove('1') // ['2', '3', '4']
strings.items // ['2', '3', '4']

//----------------------------------------------------------------------

interface ICar {
    model: string
    year: number
}

function createAndValidateCar(model: string, year: number): ICar {
    // Временно создаем объект и в нем временно не хватает ключей model и year
    const car: Partial<ICar> = {}

    if (model.length > 3) {
        car.model = model
    }

    if (year > 2000) {
        car.year = year
    }

    return car as ICar
}

createAndValidateCar('Ford', 2001)

//----------------------------------------------------------------------

const cars: Readonly<Array<string>> = ['Ford', 'Audi']
// cars.shift() // Error, массив можно только читать

// 2. Namespace

namespace Test {
    export type Type1 = string

    export interface IInterface {
        onClick(): void
    }
}

/// <reference path="namespaces.ts" />

namespace Test {
    class MyClass {

    }
}
