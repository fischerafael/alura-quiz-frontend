import {
    Widget,
    WidgetContent,
    WidgetFooter,
    WidgetHeader
} from '../../styles/WidgetStyle'

import Button from '../Button'
import Input from '../Input'

import { useRouter } from 'next/router'
import { useState } from 'react'
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

            <QuizWidgetRanking>
                {players.length > 0 && (
                    <h2 className="ranking-title">Ranking</h2>
                )}
                {players.map((player) => (
                    <div className="ranking">
                        <h2>{player.name}</h2>
                        <div>
                            <h3>{player.score}</h3>
                            <p>pontos</p>
                        </div>
                    </div>
                ))}
            </QuizWidgetRanking>
        </Widget>
    )
}

export default QuizWidget

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
