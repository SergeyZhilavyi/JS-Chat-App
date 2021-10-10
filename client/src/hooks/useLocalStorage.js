// Данный хук позволяет хранить (записывать и извлекать) значения в локальном хранилище браузера (local storage)
// Он будет использоваться для сохранения имени и идентификатора пользователя между сессиями браузера.
import { useState, useEffect } from "react";

// Хук принимает название ключа и, опционально, начальное значение
export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })

    useEffect(() => {
        const item = JSON.stringify(value)
        window.localStorage.setItem(key, item)
        // отключаем линтер, чтобы не получать предупреждений об отсутствии зависимости key
        // eslint-disable-next-line
    }, [value])

    return [value, setValue]
}