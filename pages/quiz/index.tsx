import React, { useState } from 'react'
import Head from 'next/head'
import { PageContainer } from '..'
import styled from 'styled-components'
import screenStates from '../../src/services/screen-states'
import QuestinWidget from '../../src/components/QuestionWidget'

const Quiz = () => {
    const [screenState, setScreenState] = useState(screenStates.QUIZ)

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
