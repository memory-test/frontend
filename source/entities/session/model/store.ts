import { create } from 'zustand'
import type { IUser } from './types'

export interface ISessionState {
	user: IUser | null
	isInitializing: boolean // <-- Флаг первоначальной загрузки
	setSession: (user: IUser) => void
	clearSession: () => void
	setInitializing: (value: boolean) => void // <-- Метод для управления флагом
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	isInitializing: true, // <-- ДОБАВЛЕНО: При старте приложения считаем, что идет инициализация
	setSession: (user) => set({ user, isInitializing: false }), // <-- При установке пользователя сбрасываем флаг
	clearSession: () => set({ user: null, isInitializing: false }), // <-- При очистке тоже сбрасываем
	setInitializing: (value) => set({ isInitializing: value }), // <-- ДОБАВЛЕНО: Метод для ручного управления
}))
