'use client'

import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TModalState } from './types'

export const DeleteAccount = () => {
	const [modalState, setModalState] = useState<TModalState>('close')

	// TODO: написать обработчик, когда появятся хуки tanstack
	// const handleConfirmDelete

	const renderModalContent = () => {
		switch (modalState) {
			case 'confirm':
				return (
					<>
						<Modal.Title>Вы уверены, что хотите удалить аккаунт?</Modal.Title>
						<Modal.Description>
							Восстановить аккаунт не получится
						</Modal.Description>
						<div className={styles.modal__btnWrapper}>
							<Button size="sm" variant="outline">
								Удалить
							</Button>
							<Modal.Close asChild>
								<Button size="sm">Отмена</Button>
							</Modal.Close>
						</div>
					</>
				)
			case 'success':
				return (
					<>
						<Modal.Title>Аккаунт удалён</Modal.Title>
						<Link href="/">
							<Button size="sm">На главную</Button>
						</Link>
					</>
				)
			case 'error':
				return <>Ошибка</>
			default:
				return null
		}
	}

	return (
		<section>
			<h3 className={styles.sectionTitle}>Управление аккаунтом</h3>
			<div className={styles.wrapper}>
				<span>Удалить аккаунт</span>
				<Button
					onClick={() => {
						setModalState('confirm')
					}}
					size="sm"
				>
					Удалить
				</Button>
			</div>

			<Modal
				open={modalState !== 'close'}
				onOpenChange={(isOpen) => {
					if (!isOpen) setModalState('close')
				}}
			>
				{renderModalContent()}
			</Modal>
		</section>
	)
}
