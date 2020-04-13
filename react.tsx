import React, { useState } from 'react'

interface IAppProps {
    onClick(value: string): void
}

// React.FC === React.FunctionalComponent. React.FC - generic-тип
const App: React.FC<IAppProps> = props => {
    // useState является generic-типом, но при необходимости, можно задать тип явно
    const [value, setValue] = useState<string>('')

    // События помечаем как ChangeEvent, он так же является generic-типом. Но нужно
    // явно указывать с каким типом события работаешь. Так как мы работаем с полем input,
    // указываем HTMLInputElement
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {

    }

    return (
        <div>
            <input
                onChange={changeHandler}
                onKeypress={keyPressHandler}
                type="text"
                value={value}
            />
        </div>
    )
}


