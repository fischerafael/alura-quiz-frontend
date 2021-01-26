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
}

const QuizWidget: React.FC<IQuizWidget> = ({ title, description, login }) => {
    const router = useRouter()
    const [name, setName] = useState('')

    function quizNavigateHandler(e: any) {
        e.preventDefault()
        alert(`Clicou no ${title}`)
        router.push(`/quiz?name=${name}`)
    }

    return (
        <Widget>
            <WidgetHeader>{title}</WidgetHeader>
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
