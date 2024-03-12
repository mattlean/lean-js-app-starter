import { createContext } from 'react'

const ErrorMessageContext = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
>(['', () => {}])

export default ErrorMessageContext
