import styled from 'styled-components'

const Input = () => {
    return (
        <InputStyle>
            <span>Pesquisar</span>
            <input type="text" placeholder="Ex: Friends, Javascript" />
        </InputStyle>
    )
}

export default Input

export const InputStyle = styled.label`
    background-color: ${({ theme }) => {
        return theme.colors.mainBg
    }};
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};

    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 0 15px;

    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
        font-size: 10px;
        color: ${({ theme }) => theme.colors.secondary};
        margin-bottom: 3px;
    }

    input {
        background: transparent;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.colors.contrastText};
    }
`
