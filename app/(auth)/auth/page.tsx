'use client'

import { LoginPage } from '@pages/login-page'
import { useState } from 'react'

const AuthPage: React.FC = () => {
	const [values, setValues] = useState({ email: '', password: '' })

	return (
		<LoginPage
			values={values}
			onChange={(name, value) => setValues((c) => ({ ...c, [name]: value }))}
			onSubmit={() => console.log('submit', values)}
		/>
	)
}

export default AuthPage
