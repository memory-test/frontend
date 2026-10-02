import { GuestGuard } from '@app/guards'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <GuestGuard>{children}</GuestGuard>
}

export default AuthLayout
