import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { PageContainer } from '..'
import styled from 'styled-components'
import screenStates from '../../src/services/screen-states'
import QuestinWidget from '../../src/components/QuestionWidget'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import api from '../../src/services/api'
import {
    Widget,
    WidgetContent,
    WidgetHeader
} from '../../src/styles/WidgetStyle'
import { MainButtonStyle } from '../../src/components/Button'

const Quiz = ({ data, questions }) => {
    const [initialTime] = useState(Date.now())
    const [finalTime, setFinalTime] = useState(Date.now())
    const [correctAnswers, setCorrectAnswers] = useState(0)

    console.log('ranking', initialTime, finalTime, correctAnswers)

    const [screenState, setScreenState] = useState(screenStates.QUIZ)

    const router = useRouter()
    const { playername } = router.query

    const totalQuestions = questions.length
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const question = questions[currentQuestion]

    function handleSubmitQuiz() {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion === totalQuestions) {
            setScreenState(screenStates.RESULT)
            setFinalTime(Date.now() - initialTime)
            return
        }
        setCurrentQuestion(nextQuestion)
    }

    function addCorrectAnswer() {
        setCorrectAnswers(correctAnswers + 1)
    }

    async function handleReplay(e) {
        e.preventDefault()
        await postScoreToQuiz()
        router.push('/')
    }

    async function postScoreToQuiz() {
        try {
            const response = await api.post(`/quiz/${data.login}/addplayer`, {
                name: playername,
                score: calculatePoints(
                    correctAnswers,
                    finalTime,
                    totalQuestions
                ),
                time: finalTime
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    if (screenState === screenStates.QUIZ)
        return (
            <PageContainer>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <QuizContainer>
                    <img src={'logo-alura.svg'} alt="Logo Alura" />
                    <QuestinWidget
                        totalQuestions={totalQuestions}
                        questionIndex={currentQuestion}
                        question={question}
                        onSubmit={handleSubmitQuiz}
                        addCorrectAnswer={addCorrectAnswer}
                    />
                </QuizContainer>
            </PageContainer>
        )

    if (screenState === screenStates.RESULT)
        return (
            <PageContainer>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <ResultContainer>
                    <img src={'logo-alura.svg'} alt="Logo Alura" />
                    <Widget>
                        <WidgetHeader>
                            <h3>Resultado</h3>
                        </WidgetHeader>
                        <WidgetContent>
                            <p>{`Parabéns ${playername}, você acertou ${correctAnswers} questões em ${(
                                finalTime / 1000
                            ).toFixed(2)} segundos`}</p>
                            <h2>{`Você fez ${calculatePoints(
                                correctAnswers,
                                finalTime,
                                totalQuestions
                            )} pontos.`}</h2>
                        </WidgetContent>
                        <MainButtonStyle onClick={handleReplay}>
                            Jogar outros quizes
                        </MainButtonStyle>
                    </Widget>
                </ResultContainer>
            </PageContainer>
        )
}

export default Quiz

export function calculatePoints(
    correctAnswer: number,
    time: number,
    totalQuestions: number
) {
    const absoluteScore = correctAnswer * 100 - time / 1000
    const finalScore = absoluteScore / totalQuestions
    const formattedPoints = finalScore.toFixed(2)
    if (+formattedPoints <= 0) return '0'
    return formattedPoints
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const login = context.params.quiz as string

    const data = await getQuiz(login)
    const questions = await getQuestions(login)

    async function getQuiz(quiz: string) {
        try {
            const response = await api.get(`/quiz/${quiz}`)
            const { data } = response
            return data
        } catch (err) {
            return err
        }
    }

    async function getQuestions(quiz: string) {
        try {
            const response = await api.get(`/quiz/${quiz}/questions`)
            const { data } = response
            return data
        } catch (err) {
            return err
        }
    }

    if (!data.login) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            data,
            questions
        }
    }
}

export const QuizContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    @media screen and (max-width: 500px) {
        margin: auto;
        padding: 15px;
    }
`

export const ResultContainer = styled.div`
    width: 90%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        margin: auto;
        padding: 15px;
    }
`
