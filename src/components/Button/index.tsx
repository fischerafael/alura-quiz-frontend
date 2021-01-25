import styled from 'styled-components'

interface IButton {
    type: 'main' | 'secondary'
    text: string
}

const Button: React.FC<IButton> = ({ type, text }) => {
    if (type === 'main') return <MainButtonStyle>{text}</MainButtonStyle>
    return <SecondaryButtonStyle>{text}</SecondaryButtonStyle>
}

export default Button

export const ButtonStyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};
    border: none;

    font-size: 12px;
    font-weight: bold;

    margin: 0 3px;

    cursor: pointer;
    transition: 0.5s;

    &:hover {
        background: ${({ theme }) => {
            return theme.colors.secondary
        }};
    }
`
export const MainButtonStyle = styled(ButtonStyle)`
    background: ${({ theme }) => {
        return theme.colors.primary
    }};
    color: ${({ theme }) => {
        return theme.colors.contrastText
    }};
    &:hover {
        background: ${({ theme }) => {
            return theme.colors.secondary
        }};
    }
`
export const SecondaryButtonStyle = styled(ButtonStyle)`
    background: ${({ theme }) => {
        return theme.colors.secondary
    }};
    color: ${({ theme }) => {
        return theme.colors.contrastText
    }};
    &:hover {
        background: ${({ theme }) => {
            return theme.colors.primary
        }};
    }
`
