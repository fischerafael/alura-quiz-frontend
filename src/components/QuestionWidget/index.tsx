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
    addCorrectAnswer
}) => {
    const questionId = `question__${questionIndex}`

    const [answer, setAnswer] = useState(0)

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
                                onChange={() => setAnswer(alternativeIndex)}
                            />
                            {alternative}
                        </WidgetTopic>
                    )
                })}
            </WidgetForm>
            <MainButtonStyle
                onClick={(e) => {
                    e.preventDefault
                    if (answer === +question.answer) {
                        addCorrectAnswer()
                    }
                    onSubmit()
                }}
            >
                Confirmar
            </MainButtonStyle>
        </Widget>
    )
}

export default QuestinWidget
