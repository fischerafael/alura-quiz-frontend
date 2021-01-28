import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import { PageContainer } from '../..'
import api from '../../../src/services/api'

import Link from 'next/link'
import { MainButtonStyle } from '../../../src/components/Button'

const Questions = ({ data, questions }) => {
    console.log(data, questions)

    return (
        <PageContainer>
            <NavBarStyle>
                <Link href="/">
                    <a>
                        <img src={'/logo-alura.svg'} alt="Logo Alura" />
                    </a>
                </Link>
                <MainButtonStyle>Adicionar Questão</MainButtonStyle>
            </NavBarStyle>

            <ThreeColumnsBodyStyle>
                {questions.length > 0 &&
                    questions.map((question) => (
                        <QuestionCardStyle key={question._id}>
                            <CardHeaderStyle>
                                <h2>{question.title}</h2>
                            </CardHeaderStyle>
                            <CardBodyStyle>
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

export default Questions

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
    }

    button {
        max-width: 150px;
    }
`

export const ThreeColumnsBodyStyle = styled(DefaultContainerStyle)`
    border: none;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
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

    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 0 0
        ${({ theme }) => {
            return theme.borderRadius
        }}
        ${({ theme }) => {
            return theme.borderRadius
        }};

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
