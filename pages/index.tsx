import styled from 'styled-components'
import { GetStaticProps } from 'next'

import Button from '../src/components/Button'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import QuizWidget from '../src/components/QuizWidget'
import api from '../src/services/api'
import { useEffect, useState } from 'react'

const AluraQuiz = ({ data }) => {
    const [initialData, setInitalData] = useState(data)

    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState(initialData || [])

    useEffect(() => {
        setFilteredData(
            initialData.filter(
                (item) =>
                    item.title.toLowerCase().includes(search) ||
                    item.title.includes(search)
            )
        )
    }, [search])

    return (
        <PageContainer>
            <HeroSectionContainer>
                <div className="hero-img">
                    <div className="linear-gradient-a"></div>
                    <img src={'home-image.jpeg'} alt="" />
                    <div className="linear-gradient-b"></div>
                </div>
                <div className="actions">
                    <img src={'logo-alura.svg'} alt="Logo Alura" />
                    <h1>
                        Responda e crie quizes sobre os mais variados assuntos
                    </h1>
                    <p>
                        O AluraQuiz permite que você crie quizes personalizados
                        e teste o conhecimento de seus amigos
                    </p>
                    <div className="cta-buttons">
                        <Input
                            label="Pesquisar Quiz Existente"
                            placeholder="Insira o título do quiz"
                            value={search}
                            setValue={setSearch}
                        />
                        <Button type={'secondary'}>CRIAR NOVO QUIZ</Button>
                    </div>
                </div>
            </HeroSectionContainer>
            <MainSectionContainer>
                {filteredData.lenght !== 0 &&
                    filteredData.map((item) => (
                        <QuizWidget
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            login={item.login}
                            background={item.background}
                            players={item.players}
                        />
                    ))}
            </MainSectionContainer>
            <GitHubCorner projectUrl="https://github.com/fischerafael/alura-quiz-frontend" />
        </PageContainer>
    )
}

export default AluraQuiz

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getQuizesService()

    async function getQuizesService() {
        try {
            const response = await api.get('/quiz')
            const { data } = response
            return data
        } catch (err) {
            return 'error'
        }
    }

    return {
        props: {
            data: data
        },
        revalidate: 60
    }
}

export const MainSectionContainer = styled.main`
    z-index: 10;

    margin-top: -50px;

    max-width: 1000px;
    width: 90%;

    min-height: 20vh;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;

    @media (max-width: 820px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    @media (max-width: 480px) {
        margin-top: 50px;
    }
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    min-height: 100vh;

    background: ${(props) => props.theme.colors.mainBg};

    padding-bottom: 50px;
`
export const HeroSectionContainer = styled.div`
    max-width: 1000px;
    width: 90%;

    min-height: 80vh;

    display: grid;
    grid-template-columns: 1fr 1fr;

    .hero-img {
        position: relative;

        .linear-gradient-a {
            position: absolute;

            background: linear-gradient(
                90deg,
                ${(props) => props.theme.colors.mainBg} 0%,
                rgba(0, 0, 0, 0) 100%
            );

            height: 100%;
            width: 80%;
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: 0%;
        }

        .linear-gradient-b {
            position: absolute;

            right: 0;
            top: 0;

            background: linear-gradient(
                -90deg,
                ${(props) => props.theme.colors.mainBg} 0%,
                rgba(0, 0, 0, 0) 100%
            );

            height: 100%;
            width: 80%;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        padding-left: 45px;
        padding-bottom: 45px;

        img {
            padding-bottom: 45px;
        }

        h1 {
            font-size: 36px;
        }

        p {
            font-size: 14px;
            padding-bottom: 24px;
        }

        .cta-buttons {
            width: 100%;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 15px;

            @media (max-width: 480px) {
                grid-template-columns: 1fr;
            }
        }
    }

    @media (max-width: 820px) {
        grid-template-columns: 1fr;

        .hero-img {
            display: none;
        }

        .actions {
            padding: 0;
        }
    }
`
