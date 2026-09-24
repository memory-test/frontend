import { ExercisePage } from '@pages/exercise-page'
import { notFound } from 'next/navigation'

type TPops = {
	params: Promise<{ exerciseId: string }>
}

const ProcessPage = async ({ params }: TPops) => {
	const { exerciseId } = await params
	const id = Number(exerciseId)

	if (!Number.isInteger(id) || id <= 0) {
		notFound()
	}

	return <ExercisePage exerciseId={id} />
}

export default ProcessPage
