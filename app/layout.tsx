import { QueryProvider } from '@app/providers'
import '@app/styles/globals.css'
import { HighContrastInitializer } from '@features/accessibility-settings/change-contrast'
import { FontSizeInitializer } from '@features/accessibility-settings/change-font-size'
import { fontMain } from '@shared/fonts'
import { Header } from '@widgets/header'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<body className={fontMain.variable}>
				<FontSizeInitializer />
				<HighContrastInitializer />
				<QueryProvider>
					<Header />
					{children}
				</QueryProvider>
			</body>
		</html>
	)
}

export default RootLayout
