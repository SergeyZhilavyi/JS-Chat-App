// Данный хук  используется для вывода сообщения, или выполнения функции в момент перезагрузки, или закрытия страницы (вкладки браузера)
// В рамках данного приложения, он будет использоваться для отправки на сервер события «user:leave» для переключения статуса пользователя.
import { useEffect } from "react";


// Хук принимает один параметр — примитив или функцию.
export const useBeforeUnload = (value) => {
    const handleBeforeunload = (e) => {
        let returnValue

        if (typeof value === 'function') {
            returnValue = value(e)
        } else {
            returnValue = value
        }

        if (returnValue) {
            e.preventDefault()
            e.returnValue = returnValue
        }
        return returnValue
    }
    
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeunload)
        return () => window.removeEventListener('beforeunload', handleBeforeunload)
        // eslint-disable-next-line
    }, [])
}
