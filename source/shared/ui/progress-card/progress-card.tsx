import { Progress } from 'radix-ui'
import styles from './styles.module.css'
import type { TProgressCardProps } from './types'

export const ProgressCard: React.FC<TProgressCardProps> = ({
	icon,
	title,
	percentRate,
}) => {
	const safePercentRate = Math.min(Math.max(percentRate, 0), 100)

	return (
		<article className={styles.progressCard}>
			<div className={styles.iconWrapper}>{icon}</div>
			<div className={styles.progressWrapper}>
				<div className={styles.textWrapper}>
					<div className={styles.titleWrapper}>
						<span className={styles.title}>{title}</span>
					</div>
					<span>{`${safePercentRate}%`}</span>
				</div>
				<Progress.Root
					max={100}
					value={safePercentRate}
					className={styles.progressRoot}
				>
					<Progress.Indicator
						className={styles.progressIndicator}
						style={{ transform: `translateX(-${100 - safePercentRate}%)` }}
					/>
				</Progress.Root>
			</div>
		</article>
	)
}
