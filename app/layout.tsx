import '@app/styles/globals.css'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
