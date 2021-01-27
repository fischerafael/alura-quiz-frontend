import React, { useState } from 'react'
import Head from 'next/head'
import { PageContainer } from '..'
import styled from 'styled-components'
import screenStates from '../../src/services/screen-states'
import QuestinWidget from '../../src/components/QuestionWidget'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import api from '../../src/services/api'

const Quiz = ({ data }) => {
    const [screenState, setScreenState] = useState(screenStates.QUIZ)

    console.log(data)

    return (
        <PageContainer>
            <Head>
                <title>Quiz</title>
            </Head>
            <QuizContainer>
                <img src={'logo-alura.svg'} alt="Logo Alura" />
                <QuestinWidget />
            </QuizContainer>
        </PageContainer>
    )
}

export default Quiz

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await getQuiz(context.params.quiz as string)

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
            data
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
