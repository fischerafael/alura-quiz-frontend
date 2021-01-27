import React from 'react'
import {
    Widget,
    WidgetForm,
    WidgetHeader,
    WidgetImage,
    WidgetQuestionContent,
    WidgetTopic
} from '../../styles/WidgetStyle'

const QuestinWidget = () => {
    return (
        <Widget>
            <WidgetHeader>
                <h3>Pergunta 3 de 5</h3>
            </WidgetHeader>
            <WidgetImage
                src="https://cdn.ome.lt/EtOkRh4EAWJSpsDL7Or8lSphlcM=/1200x630/smart/extras/conteudos/office.png"
                alt="The Office"
            />
            <WidgetQuestionContent>
                <h2>Com quem a Pam namora?</h2>
                <p>Pam, a secretária, namora com alguém</p>
            </WidgetQuestionContent>
            <WidgetForm>
                <WidgetTopic>Jim</WidgetTopic>
                <WidgetTopic>Andy</WidgetTopic>
            </WidgetForm>
        </Widget>
    )
}

export default QuestinWidget
