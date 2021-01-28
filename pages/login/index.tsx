import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { PageContainer } from '..'
import { MainButtonStyle } from '../../src/components/Button'

import Input from '../../src/components/Input'
import api from '../../src/services/api'
import { defaultTheme } from '../../src/services/default-theme'
import screenStates from '../../src/services/screen-states'
import { DefaultInputStyle } from '../../src/styles/InputStyle'
import {
    Widget,
    WidgetContent,
    WidgetHeader,
    WidgetImage
} from '../../src/styles/WidgetStyle'

const Login = () => {
    const router = useRouter()

    const [screenState, setScreenState] = useState('login')

    function handleLoginPage() {
        setScreenState('login')
    }

    function handleRegisterPage() {
        setScreenState('register')
    }

    const [titleRegister, setTitleRegister] = useState('')
    const [backgroundRegister, setBackgroundRegister] = useState('')
    const [descriptionRegister, setDescriptionRegister] = useState('')

    useEffect(() => {
        const lowerCase = titleRegister.toLowerCase()
        const splitTitle = lowerCase.split(' ')
        const sanitezed = splitTitle.map((word) => word.trim())
        const login = sanitezed.join('-')

        setLoginRegister(login)
    }, [titleRegister])

    const [loginRegister, setLoginRegister] = useState('')

    const [loginSession, setLoginSession] = useState('')
    const [errorLogin, setErrorLogin] = useState(false)

    async function handleCreateQuiz() {
        setScreenState('loading')
        try {
            const response = await api.post('/quiz', {
                login: loginRegister,
                title: titleRegister,
                background: backgroundRegister,
                description: descriptionRegister,
                theme: defaultTheme
            })

            const { data } = response

            const { _id } = data

            router.push(`/login/questions?quizid=${_id}`)
        } catch (err) {
            console.log(err)
            setScreenState('register')
        }
    }

    async function handleCreateSession() {
        setScreenState('loading')
        try {
            const response = await api.post('/session', {
                login: loginSession
            })

            const { data } = response

            const { _id } = data

            router.push(`/login/questions?quizid=${_id}`)
        } catch (err) {
            setScreenState('login')
            setLoginSession('')
            setErrorLogin(true)
            setTimeout(() => setErrorLogin(false), 2000)
            console.log(err)
        }
    }

    if (screenState === 'loading')
        return <RegisterPageContainer>Carregando...</RegisterPageContainer>

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
                                    backgroundRegister ||
                                    'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png'
                                }
                                alt="Imagem"
                            />
                            {titleRegister && (
                                <h2 className="quiz-url">
                                    URL: {loginRegister}
                                </h2>
                            )}

                            <Input
                                login={true}
                                label="Título do Quiz"
                                placeholder="dê um nome para seu quiz"
                                value={titleRegister}
                                setValue={setTitleRegister}
                            />
                            <Input
                                login={true}
                                label="Imagem do Quiz"
                                placeholder="copie e cole o endereço da imagem"
                                value={backgroundRegister}
                                setValue={setBackgroundRegister}
                            />
                            <Input
                                login={true}
                                label="Descrição"
                                placeholder="descreva brevemente seu quiz"
                                value={descriptionRegister}
                                setValue={setDescriptionRegister}
                            />
                        </WidgetContent>
                        {titleRegister &&
                            descriptionRegister &&
                            backgroundRegister && (
                                <MainButtonStyle onClick={handleCreateQuiz}>
                                    Criar
                                </MainButtonStyle>
                            )}
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
                        {errorLogin && (
                            <p style={{ color: 'red' }}>Esse quiz não existe</p>
                        )}
                        <Input
                            login={true}
                            label="Endereço do Quiz"
                            placeholder="informe a url do quiz"
                            value={loginSession}
                            setValue={setLoginSession}
                        />
                    </WidgetContent>
                    {loginSession && (
                        <MainButtonStyle onClick={handleCreateSession}>
                            Acessar
                        </MainButtonStyle>
                    )}
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

        span {
            font-size: 10px;
        }
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
