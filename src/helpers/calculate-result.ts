function calculateResult(
    correctAnswer: number,
    time: number,
    totalQuestions: number
) {
    const timeInSecondes = (time / 1000) * 0.5
    const score = (100 * correctAnswer) / totalQuestions
    const finalScore = score - timeInSecondes

    if (+finalScore <= 0) return '0'

    const formattedScore = finalScore.toFixed(2)
    return formattedScore
}

export default calculateResult
