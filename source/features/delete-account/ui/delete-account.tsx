'use client'

import { useDeleteCurrentUser } from '@entities/user'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TDeleteAccountProps } from './types'

export const DeleteAccount: React.FC<TDeleteAccountProps> = ({
	titleAs: Title = 'h3',
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const deleteMutation = useDeleteCurrentUser()
	const router = useRouter()

	const handleOpenChange = (open: boolean) => {
		if (!open && deleteMutation.isPending) return

		setIsOpen(open)

		if (!open) {
			deleteMutation.reset()
		}
	}

	const renderModalContent = () => {
		if (deleteMutation.isPending) {
			return (
				<>
					<Modal.Title>Удаляем аккаунт</Modal.Title>
					<Modal.Description>Это займет несколько секунд</Modal.Description>
				</>
			)
		}

		if (deleteMutation.isSuccess) {
			return (
				<>
					<Modal.Title>Аккаунт удалён</Modal.Title>
					<Button size="sm" onClick={() => router.replace('/')}>
						На главную
					</Button>
				</>
			)
		}

		if (deleteMutation.isError) {
			return (
				<>
					<Modal.Title>Не удалось удалить аккаунт</Modal.Title>
					<Modal.Description>{deleteMutation.error.message}</Modal.Description>
					<div className={styles.modal__btnWrapper}>
						<Button
							size="sm"
							variant="outline"
							onClick={() => deleteMutation.mutate()}
						>
							Повторить
						</Button>
						<Modal.Close asChild>
							<Button size="sm">Отмена</Button>
						</Modal.Close>
					</div>
				</>
			)
		}

		return (
			<>
				<Modal.Title>Вы уверены, что хотите удалить аккаунт?</Modal.Title>
				<Modal.Description>Восстановить аккаунт не получится</Modal.Description>
				<div className={styles.modal__btnWrapper}>
					<Button
						size="sm"
						variant="outline"
						onClick={() => deleteMutation.mutate()}
					>
						Удалить
					</Button>
					<Modal.Close asChild>
						<Button size="sm">Отмена</Button>
					</Modal.Close>
				</div>
			</>
		)
	}

	return (
		<section>
			<Title className={styles.sectionTitle}>Управление аккаунтом</Title>
			<div className={styles.wrapper}>
				<span>Удалить аккаунт</span>
				<Button onClick={() => setIsOpen(true)} size="sm">
					Удалить
				</Button>
			</div>

			<Modal
				open={isOpen}
				onOpenChange={handleOpenChange}
				hideClose={deleteMutation.isPending}
			>
				{renderModalContent()}
			</Modal>
		</section>
	)
}
