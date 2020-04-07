// TYPESCRIPT

// 1. Типы

// string | number | boolean | undefined | null | any | string[] | number | [string, number] (Tuple) | Array<number> | void | never (для ошибок)

// 2. Собственные типы

type MyType = string;

// 3. Интерфейсы (для создания объектов)

interface Rect {
    readonly id: string
    color?: string
    size: {
        width: number
        height: number
    }
}

const rectShape: Rect = {
    id: '1',
    size: {
        width: 5,
        height: 5,
    },
}

// Можно указать к какому типу будет относиться объект
const rectShape2 = {} as Rect
// (Старая запись const rectShape2 = <Rect>{})

// 4. Наследования интерфейсов

interface RectWithArea extends Rect {
    getArea: () => number
}

const rectArea: RectWithArea = {
    id: '111',
    size: {
        width: 20,
        height: 20,
    },
    getArea: () => {
        const { width, height } = this.size

        return width * height
    }
}

// ------------------------

interface IClock {
    time: Date
    setTime(date: Date): void
}

class Clock implements IClock {
    time: Date = new Date()

    setTime(date: Date): void {
        this.time = date
    }
}

// ------------------------

interface IStyles {
    [key: string]: string
}

const css: IStyles = {
    marginTop: '2px',
    border: '1px solid black',
}

// 5. Enum (вспомогательная сущность, которая позволяет струтурировать код, в котором есть однотипные элементы)

enum Membership {
    Simple,
    Standart,
    Premium
}

const membership = Membership.Standart
console.log(membership) // 1

const membershipReverse = Membership[2]
console.log(membershipReverse) // Premium

enum SocialMedia {
    VK = 'Vkontakte',
    FB = 'Facebook'
}

// 6. Функции (В TS можно перегружать параметры функции и саму функцию,
// т.е вызывать функцию с разными параметрами и получать разный результат)

interface IMyPosition {
    x: number | undefined
    y: number | undefined
}

interface IMyPositionDefault extends IMyPosition {
    default: string
}

function position(): IMyPosition
function position(a: number): IMyPositionDefault
function position(a: number, b: number): IMyPosition

function position(a?: number, b?: number) {
    if (!a && !b) {
        return {
            x: undefined,
            y: undefined,
        }
    }

    if (a && !b) {
        return {
            x: a,
            y: undefined,
            default: a.toString(),
        }
    }

    return {
        x: a,
        y: b,
    }
}

console.log(position())
console.log(position(5))
console.log(position(1, 3))

// 7. Классы

class Car {
    readonly model: string
    numberOfWheels: number = 4

    constructor(theModel: string) {
        this.model = theModel
    }
}

// or

class Car2 {
    numberOfWheels: number = 4

    constructor(readonly model: string) {}
}

// 7.1 Модификаторы (protected | private | public)

class Animal {
    protected voice: string = '' // Доступны в Animal и во всех классах, наследуемых от Animal
    public color: string = 'black' // доступны везде
    // or
    // color: string = 'black'

    // Доступны только в Animal
    private go(): void {
        return console.log('Go')
    }
}

// 7.2 Абстрактные классы (Нужны, что бы от них наследоваться. ОНИ НЕ КОМПИЛИРУЮТСЯ)

abstract class Component {
    abstract render(): void
    abstract info(): string
}

class AppComponent extends Component {
    render(): void {
        console.log('Render')
    }

    info(): string {
        return 'Cool component'
    }
}

// 8. Generic (Когда тип подстраивается под передаваемый тип)

const arrayNumbers: Array<number> = [1, 2, 3]
const arrayStrings: Array<string> = ['1', '2', '3']

function reverse<T>(array: T[]): T[] {
    return array.reverse()
}

reverse(arrayNumbers)
reverse(arrayStrings)

// 9. Операторы

interface IPerson {
    name: string
    age: number
}

type PersonKey = keyof IPerson // 'name' | 'age'

type User = {
    id: number
    name: string
    email: string
    date: Date
}

type UserKeysNoMeta = Exclude<keyof User, 'id' | 'date'> // 'name' | 'email'
// or
// type UserKeysNoMeta = Pick<User, 'name' | 'email'> // 'name' | 'email'
