import styled from 'styled-components'

export const Widget = styled.div`
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => {
        return theme.colors.mainBg
    }};
    border-radius: ${({ theme }) => {
        return theme.borderRadius
    }};
    overflow: hidden;

    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

    h1,
    h2,
    h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 0;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.3;
        padding: 5px;
    }
`
export const WidgetHeader = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 32px;
    background-color: ${({ theme }) => theme.colors.primary};

    * {
        margin: 0;
    }
`
export const WidgetContent = styled.div`
    padding: 24px 32px 32px 32px;
    & > *:first-child {
        margin-top: 0;
    }
    & > *:last-child {
        margin-bottom: 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
`
export const WidgetQuestionContent = styled.div`
    padding: 24px 32px 32px 32px;
    h2 {
        margin: 0;
        font-size: 18px;
    }
    p {
        margin-top: 15px;
        margin-bottom: 0;
        padding: 0;
        line-height: 1;
        font-size: 12px;
    }
`
export const WidgetFooter = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 32px 32px 32px;
`
export const WidgetImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`
export const WidgetForm = styled.form``
export const WidgetTopic = styled.a`
    outline: 0;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => `${theme.colors.primary}40`};
    padding: 10px 15px;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: 0.3s;
    display: block;

    position: relative;

    &:hover,
    &:focus {
        opacity: 0.5;
    }

    input {
    }
`
