import React, { useState } from 'react'
import {
    Widget,
    WidgetForm,
    WidgetHeader,
    WidgetImage,
    WidgetQuestionContent,
    WidgetTopic
} from '../../styles/WidgetStyle'
import { MainButtonStyle } from '../Button'

const QuestinWidget = ({
    totalQuestions,
    questionIndex,
    question,
    onSubmit,
    setAnswersArray
}) => {
    const questionId = `question__${questionIndex}`

    const [selectedAlternative, setSelectedAlternative] = useState(undefined)
    const correctAlternative = +question.answer

    function isCorrect() {
        if (correctAlternative !== selectedAlternative) return 0
        return 1
    }

    function handleNextQuestion(e: any) {
        e.preventDefault()
        setAnswersArray((prevState: number[]) => [...prevState, isCorrect()])
        onSubmit()
    }

    return (
        <Widget>
            <WidgetHeader>
                <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
            </WidgetHeader>
            <WidgetImage src={question.image} alt="The Office" />
            <WidgetQuestionContent>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
            </WidgetQuestionContent>
            <WidgetForm as="label">
                {question.alternatives.map((alternative, alternativeIndex) => {
                    const alternativeId = `alternative__${alternativeIndex}`
                    return (
                        <WidgetTopic
                            key={alternativeIndex}
                            as="label"
                            htmlFor={alternativeId}
                        >
                            <input
                                type="radio"
                                id={alternativeId}
                                name={questionId}
                                onChange={() => {
                                    setSelectedAlternative(alternativeIndex)
                                }}
                            />
                            {alternative}
                        </WidgetTopic>
                    )
                })}
            </WidgetForm>
            <MainButtonStyle onClick={handleNextQuestion}>
                Confirmar
            </MainButtonStyle>
        </Widget>
    )
}

export default QuestinWidget
