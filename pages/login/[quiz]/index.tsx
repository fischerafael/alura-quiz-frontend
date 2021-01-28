import { GetServerSideProps } from 'next'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { PageContainer } from '../..'

import api from '../../../src/services/api'

import Link from 'next/link'
import { MainButtonStyle } from '../../../src/components/Button'
import {
    Widget,
    WidgetContent,
    WidgetHeader
} from '../../../src/styles/WidgetStyle'
import Input from '../../../src/components/Input'

const Questions = ({ data, questions }) => {
    const [existingQuestins, setExistingQuestions] = useState(questions)

    const [screenState, setScreenState] = useState('main')

    useEffect(() => {
        async function getQuestions(login) {
            try {
                const response = await api.get(`/quiz/${login.login}/questions`)
                const { data } = response
                setExistingQuestions(data)
            } catch (err) {
                return err
            }
        }
        getQuestions(data)
    }, [screenState])

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionImage, setQuestionImage] = useState('')
    const [questionDescription, setQuestionDescription] = useState('')
    const [questionAlternative, setQuestionAlternative] = useState('')

    const [questionAlternatives, setQuestionAlternatives] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(undefined)

    function handleAddAlternative(e: any) {
        e.preventDefault()

        setQuestionAlternatives([...questionAlternatives, questionAlternative])
        setQuestionAlternative('')
    }

    async function handleSubmitQuestion(e) {
        e.preventDefault()
        setScreenState('loading')
        try {
            const response = await api.post(
                `/quiz/questions`,
                {
                    title: questionTitle,
                    image: questionImage,
                    description: questionDescription,
                    answer: correctAnswer,
                    alternatives: questionAlternatives
                },
                {
                    headers: {
                        quiz: data._id
                    }
                }
            )

            setScreenState('main')
        } catch (err) {
            console.log(err)
            setScreenState('new-question')
        }
    }

    if (screenState === 'loading')
        return <PageContainer>Carregando...</PageContainer>

    if (screenState === 'new-question')
        return (
            <PageContainer>
                <Widget>
                    <WidgetHeader>Preencha os campos a seguir</WidgetHeader>
                    <WidgetContent>
                        <Input
                            login={true}
                            label="Pergunta"
                            placeholder="Escreva sua pergunta"
                            value={questionTitle}
                            setValue={setQuestionTitle}
                        />
                        <Input
                            login={true}
                            label="Imagem da pergunta"
                            placeholder="Copia uma imagem que represente a pergunta"
                            value={questionImage}
                            setValue={setQuestionImage}
                        />
                        <Input
                            login={true}
                            label="Dica"
                            placeholder="Dê uma dica"
                            value={questionDescription}
                            setValue={setQuestionDescription}
                        />

                        {questionAlternatives.length < 4 ? (
                            <Input
                                login={true}
                                label="Adicionar alternativa"
                                placeholder="Escreva uma alternativa"
                                value={questionAlternative}
                                setValue={setQuestionAlternative}
                            />
                        ) : null}
                        {questionAlternatives.length < 4 &&
                        questionAlternative !== '' ? (
                            <MainButtonStyle onClick={handleAddAlternative}>
                                Adicionar
                            </MainButtonStyle>
                        ) : null}

                        <AlternativesFormStyle>
                            {questionAlternatives.length === 4 ? (
                                <p className="alternatives-title">
                                    Quantidade máxima de alternativas alcançada
                                </p>
                            ) : (
                                <p className="alternatives-title">
                                    Alternativas (selecione a correta)
                                </p>
                            )}

                            {questionAlternatives &&
                                questionAlternatives.map((alternative, index) =>
                                    correctAnswer === index ? (
                                        <span
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCorrectAnswer(index)
                                            }}
                                            style={{
                                                background: 'green'
                                            }}
                                        >
                                            {index + 1} - {alternative}
                                        </span>
                                    ) : (
                                        <span
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCorrectAnswer(index)
                                            }}
                                        >
                                            {index + 1} - {alternative}
                                        </span>
                                    )
                                )}
                        </AlternativesFormStyle>
                        {correctAnswer !== undefined &&
                            questionTitle &&
                            questionDescription &&
                            questionImage && (
                                <MainButtonStyle onClick={handleSubmitQuestion}>
                                    Cadastrar Pergunta
                                </MainButtonStyle>
                            )}
                    </WidgetContent>
                </Widget>
            </PageContainer>
        )

    if (screenState === 'main')
        return (
            <PageContainer>
                <NavBarStyle>
                    <Link href="/">
                        <a>
                            <img src={'/logo-alura.svg'} alt="Logo Alura" />
                        </a>
                    </Link>
                    <MainButtonStyle
                        onClick={() => setScreenState('new-question')}
                    >
                        Adicionar Questão
                    </MainButtonStyle>
                </NavBarStyle>

                <ThreeColumnsBodyStyle>
                    {existingQuestins.length > 0 &&
                        existingQuestins.map((question) => (
                            <QuestionCardStyle key={question._id}>
                                <CardHeaderStyle>
                                    <h2>{question.title}</h2>
                                </CardHeaderStyle>

                                <CardBodyStyle>
                                    <img src={question.image} alt="" />
                                    {question.alternatives.length > 0 &&
                                        question.alternatives.map(
                                            (alternative, index) =>
                                                index === +question.answer ? (
                                                    <div
                                                        style={{
                                                            background: 'green'
                                                        }}
                                                    >
                                                        {alternative}
                                                    </div>
                                                ) : (
                                                    <div>{alternative}</div>
                                                )
                                        )}
                                </CardBodyStyle>
                            </QuestionCardStyle>
                        ))}
                </ThreeColumnsBodyStyle>
            </PageContainer>
        )
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

async function getQuestions(quiz: string) {
    try {
        const response = await api.get(`/quiz/${quiz}/questions`)
        const { data } = response
        console.log(data)
        return data
    } catch (err) {
        return err
    }
}

export default Questions

export const AlternativesFormStyle = styled.div`
    min-width: 300px;
    max-width: 900px;
    width: 100%;

    display: flex;
    flex-direction: column;

    margin-bottom: 15px;

    p {
        margin: 6px 0;
        padding: 0;
    }

    span {
        background: ${({ theme }) => theme.colors.secondary};
        min-height: 40px;

        display: flex;
        padding: 0 18px;
        align-items: center;
        justify-content: flex-start;

        margin: 3px 0;

        cursor: pointer;
        transition: 0.5s;

        &:hover {
            background: ${({ theme }) => theme.colors.primary};
        }
    }
`

export const DefaultContainerStyle = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};
    padding: 18px 32px;
    max-width: 900px;
    width: 90%;
`

export const NavBarStyle = styled(DefaultContainerStyle)`
    border: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 15vh;

    img {
        width: 50px;

        @media (max-width: 480px) {
            width: 25px;
        }
    }

    button {
        max-width: 150px;

        @media (max-width: 480px) {
            width: 100px;
            font-size: 10px;
        }
    }
`

export const ThreeColumnsBodyStyle = styled(DefaultContainerStyle)`
    border: none;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;

    @media (max-width: 620px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`

export const QuestionCardStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    min-height: 35vh;

    background-color: transparent;
`
export const CardHeaderStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 0 32px;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;

    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => {
            return theme.borderRadius
        }}
        ${({ theme }) => {
            return theme.borderRadius
        }}
        0 0;

    h2 {
        font-size: 14px;
    }
`

export const CardBodyStyle = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    padding: 6px;

    width: 100%;

    border-radius: 0 0;

    border: 1px solid ${({ theme }) => theme.colors.primary};

    img {
        width: 100%;
        object-fit: cover;
        height: 100px;
        margin-bottom: 6px;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 40px;
        background: blue;
        width: 100%;

        margin: 3px;
        padding: 0 6px;

        font-size: 10px;
    }
`
