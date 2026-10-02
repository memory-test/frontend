import styles from './styles.module.css'

export const PageSkeleton = () => {
	return (
		<main className={styles.main}>
			<div className={styles.loader}>
				<div className={styles.spinner} />
				<p className={styles.text}>Загрузка...</p>
			</div>
		</main>
	)
}
