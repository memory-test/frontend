import type { TUserProfile } from './types'

// MOCK данные для тестирования
export const MOCK_PROFILE: TUserProfile = {
	id: 1,
	name: 'Валентина',
	email: 'privet@yandex.ru',
	birth_date: null,
	current_difficulty: 'medium',
	role: 'user',
	is_active: true,
	date_joined: '2023-10-01T12:00:00Z',
	avatar_url: '/images/promo.jpg',
}
