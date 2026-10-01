import { AuthGuard } from '@app/guards'
import '@app/styles/globals.css'
import { ProfileNavigation } from '@features/profile-navigation'

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<AuthGuard>
			<main>
				<ProfileNavigation />
				{children}
			</main>
		</AuthGuard>
	)
}

export default ProfileLayout
