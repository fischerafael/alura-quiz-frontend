import {
    Widget,
    WidgetContent,
    WidgetFooter,
    WidgetHeader
} from '../../styles/WidgetStyle'

import Button from '../Button'
import Input from '../Input'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface IQuizWidget {
    title: string
    description: string
    login: string
    background: string
    players: {
        time: number
        score: number
        name: string
    }[]
}

const QuizWidget: React.FC<IQuizWidget> = ({
    title,
    description,
    login,
    background,
    players
}) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [rankedPlayers, setRankedPlayers] = useState(players)

    useEffect(() => {
        const rankedScores = players.sort((a, b) => b.score - a.score)
        const topFiveScores = rankedScores.slice(0, 5)
        setRankedPlayers(topFiveScores)
    }, [])

    function quizNavigateHandler(e: any) {
        e.preventDefault()
        router.push(`/${login}?playername=${name}`)
    }

    return (
        <Widget>
            <QuizWidgetHeader style={{ backgroundImage: `url(${background})` }}>
                <h2>{title}</h2>
                <div className="linear"></div>
            </QuizWidgetHeader>
            <WidgetContent>{description}</WidgetContent>
            <WidgetFooter>
                <Input
                    label="Digite seu nome"
                    value={name}
                    setValue={setName}
                    placeholder="3 letras no mínimo"
                />
                {name.length < 3 ? null : (
                    <Button type="widget" onClick={quizNavigateHandler}>
                        Responder
                    </Button>
                )}
            </WidgetFooter>
            {players.length > 0 && (
                <QuizWidgetRankingStyle>
                    <WidgetHeader>
                        <h2>Top 5</h2>
                    </WidgetHeader>
                    <QuizWidgetRankingContainer>
                        <div className="ranking-container">
                            {rankedPlayers.map((player, index) => (
                                <div className="ranking-card" key={index}>
                                    {index === 0 ? (
                                        <span style={{ background: 'yellow' }}>
                                            1
                                        </span>
                                    ) : index === 1 ? (
                                        <span style={{ background: 'grey' }}>
                                            2
                                        </span>
                                    ) : index === 2 ? (
                                        <span
                                            style={{
                                                background: '#cd7f32'
                                            }}
                                        >
                                            3
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}

                                    <p className="ranking-username">
                                        {player.name}
                                    </p>
                                    <div className="ranking-score">
                                        <h3 className="ranking-score-point">
                                            {player.score}
                                        </h3>
                                        <p className="ranking-score-label">
                                            pontos
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </QuizWidgetRankingContainer>
                </QuizWidgetRankingStyle>
            )}
        </Widget>
    )
}

export default QuizWidget

export const QuizWidgetRankingStyle = styled.div`
    background: ${({ theme }) => theme.colors.mainBg};
`
export const QuizWidgetRankingContainer = styled.div`
    padding: 32px;

    .ranking-container {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        border-radius: ${({ theme }) => theme.borderRadius};
        padding: 0 6px;

        .ranking-card {
            background: ${({ theme }) => theme.colors.primary};

            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            grid-gap: 6px;

            margin: 6px 0;

            transition: 0.5s;

            &:hover {
                background: ${({ theme }) => theme.colors.secondary};
            }

            span {
                width: 25px;
                height: 25px;
                border-radius: 12.5px;
                align-self: center;
                justify-self: center;
                background: ${({ theme }) => theme.colors.contrastText};

                display: flex;
                align-items: center;
                justify-content: center;

                font-weight: bold;
                font-size: 10px;
            }

            .ranking-username {
                font-weight: bold;
                font-size: 12px;
                align-self: center;
                justify-self: flex-start;
            }

            .ranking-score {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .ranking-score-point {
                    font-size: 12px;
                    font-weight: bold;
                    padding: 0;
                    margin: 0;
                }

                .ranking-score-label {
                    font-size: 10px;
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
`
export const QuizWidgetRanking = styled.div`
    padding: 0 32px;
    padding-bottom: 18px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    .ranking-title {
        align-self: flex-start;
        margin: 0;
        padding: 0;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .ranking {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 32px;

        width: 100%;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        border-radius: ${({ theme }) => theme.borderRadius};

        h2 {
            font-size: 14px;
            line-height: 1;
        }

        div {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;

            width: 100%;

            align-items: flex-end;

            h3 {
                margin-top: 15px;
                margin-bottom: 0;

                padding: 0;
                line-height: 1;
            }

            p {
                font-size: 10px;
                padding: 0;
                line-height: 1;
            }
        }
    }
`

export const QuizWidgetHeader = styled.header`
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    height: 200px;

    background-image: url('home-image.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    margin: 0;
    z-index: 99;

    .linear {
        position: absolute;

        z-index: 100;

        height: 100px;
        width: 100%;
        background: linear-gradient(0deg, black, rgba(0, 0, 0, 0));
    }

    h2 {
        z-index: 101;
        padding: 18px 32px;
    }
`
