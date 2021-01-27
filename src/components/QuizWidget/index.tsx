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
}

const QuizWidget: React.FC<IQuizWidget> = ({
    title,
    description,
    login,
    background
}) => {
    const router = useRouter()
    const [name, setName] = useState('')

    function quizNavigateHandler(e: any) {
        e.preventDefault()
        alert(`Clicou no ${title}`)
        router.push(`/quiz?name=${name}`)
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
                    label="Nome do Jogador"
                    value={name}
                    setValue={setName}
                />
                {name.length < 3 ? null : (
                    <Button type="widget" onClick={quizNavigateHandler}>
                        Responder
                    </Button>
                )}
            </WidgetFooter>
        </Widget>
    )
}

export default QuizWidget

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
