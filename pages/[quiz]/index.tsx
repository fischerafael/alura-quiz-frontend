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
import calculateResult from '../../src/helpers/calculate-result'

const Quiz = ({ data, questions }) => {
    const [initialTime] = useState(Date.now())
    const [finalTime, setFinalTime] = useState(Date.now())
    const [answersArray, setAnswersArray] = useState([])

    const rightAnswers = answersArray.reduce((total, currentValue) => {
        const isRight = currentValue === 1
        if (isRight) {
            return total + 1
        }
        return total
    }, 0)

    const [screenState, setScreenState] = useState(screenStates.QUIZ)

    useEffect(() => {
        if (questions.length === 0) {
            setScreenState(screenStates.EMPTY)
            setTimeout(() => {
                router.push('/')
            }, 2000)
        }
    }, [])

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

        setScreenState(screenStates.LOADING)
        fakeLoading(500)
        setCurrentQuestion(nextQuestion)
    }

    function fakeLoading(time: number) {
        setTimeout(function () {
            setScreenState(screenStates.QUIZ)
        }, time)
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
                score: calculateResult(rightAnswers, finalTime, totalQuestions),
                time: finalTime
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    if (screenState === screenStates.EMPTY)
        return (
            <PageContainerLoading>
                <h2>
                    Ainda não existem perguntas cadastradas neste quiz! Tente
                    jogar outros!
                </h2>
            </PageContainerLoading>
        )

    if (screenState === screenStates.LOADING)
        return (
            <PageContainerLoading>
                <img src={'loading-transparent.gif'} alt="carregando" />
            </PageContainerLoading>
        )

    if (screenState === screenStates.QUIZ)
        return (
            <PageContainer>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <QuizContainer>
                    <img
                        src={'logo-alura.svg'}
                        alt="Logo Alura"
                        className="quiz-logo"
                    />
                    {question && (
                        <QuestinWidget
                            totalQuestions={totalQuestions}
                            questionIndex={currentQuestion}
                            question={question}
                            onSubmit={handleSubmitQuiz}
                            setAnswersArray={setAnswersArray}
                        />
                    )}
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
                    <img
                        src={'logo-alura.svg'}
                        alt="Logo Alura"
                        className="quiz-logo"
                    />
                    <Widget>
                        <WidgetHeader>
                            <h3>Resultado</h3>
                        </WidgetHeader>
                        <WidgetContent>
                            {rightAnswers === 0 && (
                                <p>{`Ei ${playername}, em ${(
                                    finalTime / 1000
                                ).toFixed(
                                    2
                                )} segundos você não acertou nenhuma pergunta`}</p>
                            )}
                            {rightAnswers === 1 && (
                                <p>{`Ei ${playername}, em ${(
                                    finalTime / 1000
                                ).toFixed(
                                    2
                                )} segundos você acertou ${rightAnswers} apenas uma pergunta`}</p>
                            )}
                            {rightAnswers > 1 && (
                                <p>{`Ei ${playername}, em ${(
                                    finalTime / 1000
                                ).toFixed(
                                    2
                                )} segundos você acertou ${rightAnswers} perguntas`}</p>
                            )}
                            <h2>{`Você fez ${calculateResult(
                                rightAnswers,
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
    padding-top: 15px;
    margin: auto 10%;
    @media screen and (max-width: 500px) {
        margin: auto;
        padding: 15px;
    }

    .quiz-logo {
        width: 50px;
    }
`

export const PageContainerLoading = styled(PageContainer)`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 50px;
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
