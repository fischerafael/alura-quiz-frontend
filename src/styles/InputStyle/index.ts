import styled from 'styled-components'

export const DefaultInputStyle = styled.label`
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

    input {
        background: transparent;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.colors.contrastText};
    }
`
