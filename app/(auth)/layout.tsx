import { GuestGuard } from '@app/guards'
import { Suspense } from 'react'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<Suspense fallback={null}>
			<GuestGuard>{children}</GuestGuard>
		</Suspense>
	)
}

export default AuthLayout
