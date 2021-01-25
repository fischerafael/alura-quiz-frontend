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
export const WidgetFooter = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 32px 32px 32px;
`
