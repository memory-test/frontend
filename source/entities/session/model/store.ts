import { create } from 'zustand'
import type { ISessionState } from './types'

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	isInitializing: true, // <-- ДОБАВЛЕНО: При старте приложения считаем, что идет инициализация
	setSession: (user) => set({ user, isInitializing: false }), // <-- При установке пользователя сбрасываем флаг
	clearSession: () => set({ user: null, isInitializing: false }), // <-- При очистке тоже сбрасываем
	setInitializing: (value) => set({ isInitializing: value }), // <-- ДОБАВЛЕНО: Метод для ручного управления
}))
