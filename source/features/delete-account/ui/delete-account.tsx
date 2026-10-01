'use client'

import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import { PasswordInput } from '@shared/ui/password-input'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { DELETE_ERROR_MESSAGE } from '../model/constants'
import { useDeleteAccountForm } from '../model/use-delete-account-form'
import styles from './styles.module.css'
import type { TDeleteAccountProps } from './types'

export const DeleteAccount: React.FC<TDeleteAccountProps> = ({
	titleAs: Title = 'h3',
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const {
		register,
		onSubmit,
		passwordError,
		hasRequestError,
		deleteMutation,
		resetState,
	} = useDeleteAccountForm()

	const router = useRouter()

	const handleOpenChange = (open: boolean) => {
		if (!open && deleteMutation.isPending) return

		setIsOpen(open)

		if (!open) {
			resetState()
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

		if (hasRequestError) {
			return (
				<>
					<Modal.Title>Не удалось удалить аккаунт</Modal.Title>
					<Modal.Description>{DELETE_ERROR_MESSAGE}</Modal.Description>

					<div className={styles.modal__btnWrapper}>
						<Button size="sm" variant="outline" onClick={onSubmit}>
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
			<form className={styles.form} noValidate onSubmit={onSubmit}>
				<Modal.Title>Вы уверены, что хотите удалить аккаунт?</Modal.Title>
				<Modal.Description>Восстановить аккаунт не получится</Modal.Description>
				<PasswordInput
					label="Пароль"
					placeholder="Введите пароль"
					autoComplete="current-password"
					wrapperClassName={styles.passwordField}
					errorMessage={passwordError}
					{...register('password')}
				/>
				<div className={styles.modal__btnWrapper}>
					<Button type="submit" size="sm" variant="outline">
						Удалить
					</Button>
					<Modal.Close asChild>
						<Button size="sm">Отмена</Button>
					</Modal.Close>
				</div>
			</form>
		)
	}

	return (
		<section>
			<Title className={styles.sectionTitle}>Управление аккаунтом</Title>
			<div className={styles.wrapper}>
				<span className={styles.actionDescription}>Удалить аккаунт</span>
				<Button
					className={styles.actionButton}
					onClick={() => setIsOpen(true)}
					size="sm"
				>
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
