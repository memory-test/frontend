import { Button } from '@shared/ui/button'
import Image from 'next/image'
import styles from './styles.module.css'

export const AuthSocialButtons: React.FC = () => (
	<>
		<span className={styles.divider}>или</span>

		<Button
			type="button"
			variant="outline"
			size="lg"
			icon={<Image src="/logo-yandex.svg" alt="" width={24} height={24} />}
		>
			Войти через Яндекс
		</Button>
		<Button
			type="button"
			variant="outline"
			size="lg"
			icon={<Image src="/logo-ok.svg" alt="" width={24} height={24} />}
		>
			Войти через Одноклассники
		</Button>
	</>
)
