import React, { useState } from "react"

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

    return (
        <div>
            <button onClick={onIncrementCounter}>
                Increment Counter {count}
            </button>
            <button onClick={onIncrementOffset}>
                Increment Offset {offset}
            </button>
        </div>
    )
}

export default App
