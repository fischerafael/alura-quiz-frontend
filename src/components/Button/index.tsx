import styled from 'styled-components'

interface IButton {
    type: 'main' | 'secondary'
}

const Button: React.FC<IButton> = ({ type, children }) => {
    if (type === 'main') return <MainButtonStyle>{children}</MainButtonStyle>
    return <SecondaryButtonStyle>{children}</SecondaryButtonStyle>
}

export default Button

export const ButtonStyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    height: 40px;
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};
    border: none;

    font-size: 12px;
    font-weight: bold;

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
