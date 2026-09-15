'use client'

import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import { PasswordInput } from '@shared/ui/password-input'
import { TextInput } from '@shared/ui/text-input'
import { Camera } from 'lucide-react'
import { useRef } from 'react'
import type { TEditForm } from '../model'
import { BirthDateSelects } from './birth-date-selects'
import styles from './profile-form.module.css'

type TProfileFormProps = {
	form: TEditForm
	initialForm: TEditForm | null
	avatarUrl: string | undefined
	onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChange: (form: TEditForm) => void
	onSave: () => void
	onCancel: () => void
	error: string | null
}

export const ProfileForm: React.FC<TProfileFormProps> = ({
	form,
	initialForm,
	avatarUrl,
	onAvatarChange,
	onChange,
	onSave,
	onCancel,
	error,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleRevertOnBlur = (field: keyof TEditForm) => {
		if (!form[field]?.trim() && initialForm) {
			onChange({ ...form, [field]: initialForm[field] })
		}
	}

	const isEmailChanged = form.email !== initialForm?.email

	const handleAvatarClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault()
				onSave()
			}}
		>
			<div className={styles.avatarSection}>
				<button
					type="button"
					className={styles.avatarButton}
					aria-label="Изменить аватар"
					onClick={handleAvatarClick}
				>
					<div className={styles.avatarWrapper}>
						<Avatar size="lg" name={form.name} avatarUrl={avatarUrl} />
						<div className={styles.cameraOverlay}>
							<Camera size={24} />
						</div>
					</div>
				</button>
			</div>
			<div className={styles.fieldsSection}>
				<fieldset className={styles.userData}>
					<legend className={styles.legend}>
						<h3 id="profile-title" className={styles.title}>
							Ваши данные
						</h3>
					</legend>

					<TextInput
						wrapperClassName={styles.field}
						labelClassName={styles.label}
						label="Имя:"
						type="text"
						value={form.name}
						onChange={(e) => onChange({ ...form, name: e.target.value })}
						onBlur={() => handleRevertOnBlur('name')}
						placeholder="Введите ваше имя"
						className={styles.customInput}
					/>

					<TextInput
						wrapperClassName={styles.field}
						labelClassName={styles.label}
						label="Электронная почта:"
						type="email"
						value={form.email}
						onChange={(e) => onChange({ ...form, email: e.target.value })}
						onBlur={() => handleRevertOnBlur('email')}
						placeholder="Введите вашу почту"
						className={styles.customInput}
					/>

					{isEmailChanged && (
						<span className={styles.hint}>
							Для смены email потребуется текущий пароль
						</span>
					)}

					<div className={styles.dateField}>
						<div className={styles.label}>Дата рождения:</div>
						<BirthDateSelects
							day={form.day}
							month={form.month}
							year={form.year}
							onChange={(field, value) => onChange({ ...form, [field]: value })}
						/>
					</div>

					{isEmailChanged && (
						<div className={styles.passwordField}>
							<PasswordInput
								wrapperClassName={styles.field}
								className={styles.customInputWrapper}
								inputClassName={styles.customInput}
								labelClassName={styles.label}
								label="Текущий пароль:"
								type="password"
								value={form.current_password}
								onChange={(e) =>
									onChange({ ...form, current_password: e.target.value })
								}
								placeholder="Введите пароль для подтверждения"
							/>
						</div>
					)}

					{error && <div className={styles.error}>{error}</div>}
				</fieldset>
			</div>

			<div className={styles.actionButtons}>
				<Button
					onClick={onSave}
					variant="default"
					type="submit"
					size="sm"
					className={styles.actionButton}
				>
					Сохранить
				</Button>
				<Button
					onClick={onCancel}
					variant="outline"
					type="button"
					size="sm"
					className={styles.actionButton}
				>
					Отмена
				</Button>
			</div>

			{/* Скрытый input для выбора файла */}
			<input
				ref={fileInputRef}
				id="avatar-upload"
				type="file"
				accept="image/*"
				onChange={onAvatarChange}
				className={styles.fileInputHidden}
				aria-hidden="true"
				tabIndex={-1}
			/>
		</form>
	)
}
