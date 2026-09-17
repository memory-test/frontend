export type TAvatarUploadProps = {
	avatarUrl?: string
	name?: string
	size?: 'sm' | 'md' | 'lg'
	onChange?: (file: File) => void
}
