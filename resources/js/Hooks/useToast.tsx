import { ReactNode, createContext, useContext } from 'react'
import { ToastOptions, toast as showToast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type ToastFunction = (message: string, options?: ToastOptions) => void

interface ToastContextType {
    toast: ToastFunction
    toastSuccess: ToastFunction
    toastError: ToastFunction
    toastWarning: ToastFunction
    toastSettings: ToastOptions
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

const toastSettings: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
}

const toast: ToastFunction = (message, options = {}) => {
    const settings = { ...toastSettings, ...options }
    showToast(message, settings)
}

const toastError: ToastFunction = (message, options = {}) => {
    const settings = { ...toastSettings, ...options }
    showToast.error(message, settings)
}

const toastSuccess: ToastFunction = (message, options = {}) => {
    const settings = { ...toastSettings, ...options }
    showToast.success(message, settings)
}

const toastWarning: ToastFunction = (message, options = {}) => {
    const settings = { ...toastSettings, ...options }
    showToast.warning(message, settings)
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ToastContext.Provider value={{ toast, toastError, toastWarning, toastSuccess, toastSettings }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    )
}
