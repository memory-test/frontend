import { CircleAlert } from 'lucide-react'
import type React from 'react'
import styles from './styles.module.css'
import type { TExerciseInstructionProps } from './types'

export const ExerciseInstruction: React.FC<TExerciseInstructionProps> = ({
	text,
}) => {
	return (
		<div className={styles.insctructionWrapper}>
			<CircleAlert
				size={32}
				strokeWidth={1.5}
				className={styles.insctructionIcon}
			/>
			<span className={styles.insctructionLabel}>Инструкция</span>
			<span className={styles.insctruction}>{text}</span>
		</div>
	)
}
