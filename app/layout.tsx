import '@app/styles/globals.css'
import { fontMain } from '@shared/fonts'
import { Header } from '@widgets/header'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<body className={fontMain.variable}>
				<Header />
				{children}
			</body>
		</html>
	)
}

export default RootLayout
