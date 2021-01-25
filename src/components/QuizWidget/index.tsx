import {
    Widget,
    WidgetContent,
    WidgetFooter,
    WidgetHeader
} from '../../styles/WidgetStyle'
import Button from '../Button'

interface IQuizWidget {
    title: string
    description: string
    login: string
}

const QuizWidget: React.FC<IQuizWidget> = ({ title, description, login }) => {
    return (
        <Widget>
            <WidgetHeader>{title}</WidgetHeader>
            <WidgetContent>{description}</WidgetContent>
            <WidgetFooter>
                <Button type="main">Responder</Button>
            </WidgetFooter>
        </Widget>
    )
}

export default QuizWidget
