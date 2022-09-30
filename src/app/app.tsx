import React, { useState } from "react"
import { delay } from "./helpers"
import { ModalProviderContext, useModal } from "./modal-context"

const App: React.FC = () => {
    return (
        <ModalProviderContext>
            <h1>React: stale data and closures</h1>
            <Component />
        </ModalProviderContext>
    )
}

export const Component: React.FC = () => {
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(1)
    const { openModal, closeModal } = useModal()

    const onIncrementCounter = () => {
        setCount(count + offset)
    }

    const onIncrementOffset = () => {
        setOffset(offset + 1)
    }

    const onIncrementDelayed = async () => {
        await delay(5000)
        setCount(count + offset)
    }

    const onOpen = () => {
        openModal({
            content: (
                <div>
                    <h3>Hello</h3>
                    <button onClick={() => closeModal()}>Close me</button>
                </div>
            ),
            onClose: () => {
                onIncrementCounter()
            },
        })
    }

    const onClose = () => {
        closeModal()
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

            <br />

            <button onClick={onOpen}>Open</button>

            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default App
