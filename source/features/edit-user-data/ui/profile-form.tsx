'use client'

import { AvatarUpload } from '@shared/ui/avatar-upload'
import { Button } from '@shared/ui/button'
import { PasswordInput } from '@shared/ui/password-input'
import { TextInput } from '@shared/ui/text-input'
import type { TEditForm } from '../model'
import { BirthDateSelects } from './birth-date-selects'
import styles from './profile-form.module.css'

type TProfileFormProps = {
	form: TEditForm
	initialForm: TEditForm | null
	avatarUrl: string | undefined
	onAvatarChange: (url: string) => void
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
	const handleRevertOnBlur = (field: keyof TEditForm) => {
		if (!form[field]?.trim() && initialForm) {
			onChange({ ...form, [field]: initialForm[field] })
		}
	}

	const isEmailChanged = form.email !== initialForm?.email

	const handleAvatarUpload = (file: File) => {
		const url = URL.createObjectURL(file)
		onAvatarChange(url)
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
				<AvatarUpload
					avatarUrl={avatarUrl}
					name={form.name}
					size="lg"
					onChange={handleAvatarUpload}
				/>
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
		</form>
	)
}
