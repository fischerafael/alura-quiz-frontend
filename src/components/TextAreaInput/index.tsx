import styled from 'styled-components'
import { DefaultInputStyle } from '../../styles/InputStyle'

interface ITextInput {
    label: string
    placeholder?: string
    value?: any
    login?: boolean
    setValue?: (e: any) => void
}

const TextAreaInput: React.FC<ITextInput> = ({
    label,
    setValue,
    value,
    placeholder,
    login
}) => {
    if (login)
        return (
            <LoginTextAreaInputStyle>
                <span>{label}</span>
                <textarea
                    placeholder={placeholder}
                    onChange={(e: any) => setValue(e.target.value)}
                    value={value}
                />
            </LoginTextAreaInputStyle>
        )

    return (
        <HomeTextAreaInputStyle>
            <span>{label}</span>
            <textarea
                placeholder={placeholder}
                onChange={(e: any) => setValue(e.target.value)}
                value={value}
            />
        </HomeTextAreaInputStyle>
    )
}

export default TextAreaInput

export const DefaultTextAreaStyle = styled.label`
    background-color: ${({ theme }) => {
        return theme.colors.mainBg
    }};
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};

    border: 1px solid ${({ theme }) => theme.colors.primary};

    height: 50px;

    padding: 0 15px;

    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
        font-size: 10px;
        color: ${({ theme }) => theme.colors.secondary};
        margin-bottom: 3px;
    }

    textarea {
        background: transparent;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.colors.contrastText};
        resize: none;
        font: inherit;
        font-size: 12px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`
export const HomeTextAreaInputStyle = styled(DefaultTextAreaStyle)`
    background: transparent;
`
export const LoginTextAreaInputStyle = styled(DefaultTextAreaStyle)`
    margin: 7.5px 0;
`
