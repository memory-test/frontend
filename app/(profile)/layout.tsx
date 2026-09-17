import '@app/styles/globals.css'
import { ProfileNavigation } from '@features/profile-navigation'

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<main>
			<ProfileNavigation />
			{children}
		</main>
	)
}

export default ProfileLayout
