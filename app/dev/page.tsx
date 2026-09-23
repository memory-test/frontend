'use client'

import { QueryParamsControl } from '@features/query-params-control'
import { createUrl, routerPath } from '@shared/lib/routes'
import { ExerciseResult } from '@shared/ui/exercise-result'
import Link from 'next/link'
import { Suspense } from 'react'

const MOCK_DATE_ISO = '2026-09-22T22:48:00.000Z'

const HomePage: React.FC = () => {
	return (
		<div style={{ marginTop: '84px' }}>
			<ExerciseResult
				exerciseName="Запомни изображение"
				date={MOCK_DATE_ISO} // Передаем константу
				resultPercent={45}
				timeSpent="00:25"
				userAmountRightAnswer={'17'}
				allAmountRightAnswer={'20'}
				onReset={() => console.log('reset')}
				onComplete={() => console.log('complete')}
			/>

			<nav>
				<ul>
					<li>
						<Link href={createUrl(routerPath.auth)}>Авторизация</Link>
					</li>
					<li>
						<Link href={createUrl(routerPath.profile)}>Профиль</Link>
					</li>
				</ul>
			</nav>
			<Suspense fallback="loading...">
				<QueryParamsControl />
			</Suspense>
		</div>
	)
}

export default HomePage
