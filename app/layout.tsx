import '@app/styles/globals.css'
import { fontMain } from '@shared/fonts'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<body className={fontMain.variable}>{children}</body>
		</html>
	)
}

export default RootLayout
