import { create } from 'zustand'
import type { IUser } from './types'

interface ISessionState {
	user: IUser | null
	isInitializing: boolean // <-- Флаг первоначальной загрузки
	setSession: (user: IUser) => void
	updateUser: (patch: Partial<IUser>) => void
	clearSession: () => void
	setInitializing: (value: boolean) => void // <-- Метод для управления флагом
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	setSession: (user) => set({ user, isInitializing: false }), // <-- При установке пользователя сбрасываем флаг
	updateUser: (patch) =>
		set((state) =>
			state.user ? { user: { ...state.user, ...patch } } : state,
		),
	clearSession: () => set({ user: null, isInitializing: false }), // <-- При очистке тоже сбрасываем
	isInitializing: true, // <-- ДОБАВЛЕНО: При старте приложения считаем, что идет инициализация
	setInitializing: (value) => set({ isInitializing: value }), // <-- ДОБАВЛЕНО: Метод для ручного управления
}))
