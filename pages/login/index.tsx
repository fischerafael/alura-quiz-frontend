import Head from 'next/head'
import React, { useState } from 'react'
import styled from 'styled-components'

import { PageContainer } from '..'
import { MainButtonStyle } from '../../src/components/Button'

import Input from '../../src/components/Input'
import { DefaultInputStyle } from '../../src/styles/InputStyle'
import {
    Widget,
    WidgetContent,
    WidgetHeader,
    WidgetImage
} from '../../src/styles/WidgetStyle'

const Login = () => {
    const [screenState, setScreenState] = useState('login')

    function handleLoginPage() {
        setScreenState('login')
    }

    function handleRegisterPage() {
        setScreenState('register')
    }

    if (screenState === 'register')
        return (
            <RegisterPageContainer>
                <Head>
                    <title>Cadastrar Quiz</title>
                </Head>
                <FormLoginContainer>
                    <img
                        src={'logo-alura.svg'}
                        alt="Logo Alura"
                        className="quiz-logo"
                    />
                    <Widget>
                        <WidgetHeader>
                            <h3>Criar novo quiz</h3>
                        </WidgetHeader>
                        <WidgetContent>
                            <LoginWidgetImage
                                src={
                                    'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png'
                                }
                                alt="The Office"
                            />
                            <h2 className="quiz-url">quiz-url</h2>
                            <Input
                                login={true}
                                label="Título do Quiz"
                                placeholder="dê um nome para seu quiz"
                            />
                            <Input
                                login={true}
                                label="Imagem do Quiz"
                                placeholder="copie e cole o endereço da imagem"
                            />
                            <Input
                                login={true}
                                label="Descrição"
                                placeholder="descreva brevemente seu quiz"
                            />
                        </WidgetContent>
                        <MainButtonStyle>Criar</MainButtonStyle>
                    </Widget>
                    <p
                        className="change-screen-state"
                        onClick={handleLoginPage}
                    >
                        Acessar quiz existente
                    </p>
                </FormLoginContainer>
            </RegisterPageContainer>
        )

    return (
        <LoginPageContainer>
            <Head>
                <title>Acessar Quiz</title>
            </Head>
            <FormLoginContainer>
                <img
                    src={'logo-alura.svg'}
                    alt="Logo Alura"
                    className="quiz-logo"
                />
                <Widget>
                    <WidgetHeader>
                        <h3>Acessar Quiz</h3>
                    </WidgetHeader>
                    <WidgetContent>
                        <Input
                            login={true}
                            label="Endereço do Quiz"
                            placeholder="informe a url do quiz"
                        />
                    </WidgetContent>
                    <MainButtonStyle>Acessar</MainButtonStyle>
                </Widget>
                <p className="change-screen-state" onClick={handleRegisterPage}>
                    Cadastrar novo quiz
                </p>
            </FormLoginContainer>
        </LoginPageContainer>
    )
}

export default Login

export const LoginInput = styled(DefaultInputStyle)`
    margin: 7.5px 0;
`
export const LoginWidgetImage = styled(WidgetImage)`
    width: 100%;
    max-width: 350px;
`
export const FormLoginContainer = styled.div`
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

export const LoginPageContainer = styled(PageContainer)`
    display: flex;
    align-items: center;
    justify-content: center;

    .change-screen-state {
        margin: 0;

        padding: 0;

        font-size: 14px;

        cursor: pointer;

        transition: 0.5s;

        &:hover {
            color: ${({ theme }) => {
                return theme.colors.secondary
            }};
        }
    }

    .quiz-url {
        margin-bottom: 15px;
    }
`

export const RegisterPageContainer = styled(PageContainer)`
    display: flex;
    align-items: center;
    justify-content: center;

    .change-screen-state {
        margin: 0;
        margin-top: -10px;
        padding: 0;

        font-size: 14px;

        cursor: pointer;

        transition: 0.5s;

        &:hover {
            color: ${({ theme }) => {
                return theme.colors.secondary
            }};
        }
    }

    .quiz-url {
        margin-bottom: 15px;
    }
`
