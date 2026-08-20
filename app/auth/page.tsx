import Link from 'next/link'
import { createUrl, routerPath } from '@shared/lib/routes'

const AuthPage: React.FC = () => {
	return (
		<div>
			<h1>Авторизация</h1>
			<Link href={createUrl(routerPath.forgotPassword)}>Сбросить пароль</Link>
		</div>
	)
}

export default AuthPage
