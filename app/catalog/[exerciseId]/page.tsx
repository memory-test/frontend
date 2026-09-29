import { ExerciseInstructionPage } from '@pages/exercise-instruction-page'
import { notFound } from 'next/navigation'

type TProps = {
	params: Promise<{ exerciseId: string }>
}

const InstructionPage = async ({ params }: TProps) => {
	const { exerciseId } = await params
	const id = Number(exerciseId)

	if (!Number.isInteger(id) || id <= 0) {
		notFound()
	}

	return <ExerciseInstructionPage id={id} />
}

export default InstructionPage
