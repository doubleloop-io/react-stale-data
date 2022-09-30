import React, { ReactElement, useState } from "react"

let modalId = 0

type ModalProps = {
    content: ReactElement
    onClose?: () => void
}
type StackEntry = ModalProps & { id: number }

type ModalProviderProps = {
    openModal: (modal: ModalProps) => void
    closeModal: () => void
    lastModal: () => ModalProps | undefined
}

const ModalContext = React.createContext<ModalProviderProps>(
    {} as ModalProviderProps,
)

export const ModalProviderContext: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [stack, setStack] = useState<StackEntry[]>([])

    const lastModal = () => {
        return stack[stack.length - 1]
    }

    const openModal = (modal: ModalProps) => {
        modalId++
        setStack((prev) => [...prev, { ...modal, id: modalId }])
    }

    const closeModal = async () => {
        if (stack.length == 0) return
        const last = lastModal()
        setStack((prev) => [...prev].slice(0, prev.length - 1))
        last.onClose?.()
    }

    const value = { openModal, closeModal, lastModal }
    return (
        <ModalContext.Provider value={value}>
            {children}
            <ModalStack modals={stack} />
        </ModalContext.Provider>
    )
}

type ModalStackProps = { modals: StackEntry[] }
const ModalStack: React.FC<React.PropsWithChildren<ModalStackProps>> = ({
    modals,
}) => {
    return (
        <>
            {modals.map((p, index) => (
                <div key={index} className="modal">
                    <div>{p.id}</div>
                    {p.content}
                </div>
            ))}
        </>
    )
}

export const useModal = (): ModalProviderProps => React.useContext(ModalContext)
