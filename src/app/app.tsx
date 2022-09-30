import React, { useState } from "react"
import { delay } from "./helpers"

const App: React.FC = () => {
    return (
        <div>
            <h1>React: stale data and closures</h1>
            <Component />
        </div>
    )
}

export const Component: React.FC = () => {
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(1)

    const onIncrementCounter = () => {
        setCount(count + offset)
    }

    const onIncrementOffset = () => {
        setOffset(offset + 1)
    }

    const onIncrementDelayed = async () => {
        // Press 'Increment counter' multiple times
        // while you're waiting 5sec and see what happens
        await delay(5000)
        setCount(count + offset)
    }

    return (
        <div>
            <button onClick={onIncrementCounter}>
                Increment Counter {count}
            </button>
            <button onClick={onIncrementOffset}>
                Increment Offset {offset}
            </button>
            <button onClick={onIncrementDelayed}>
                Increment Delayed {count}
            </button>
        </div>
    )
}

export default App
