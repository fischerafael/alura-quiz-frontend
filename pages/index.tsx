import styled from 'styled-components'
import Button from '../src/components/Button'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'

const AluraQuiz = () => {
    return (
        <PageContainer>
            <HeroSectionContainer>
                <div className="hero-img">
                    <div className="linear-gradient-a"></div>
                    <img src={'home-image.jpeg'} alt="" />
                    <div className="linear-gradient-b"></div>
                </div>
                <div className="actions">
                    <img src={'logoALura.svg'} alt="Logo Alura" />
                    <h1>
                        Crie e responda quizes sobre os mais variados assuntos
                    </h1>
                    <p>
                        O AluraQuiz permite que você crie quizes personalizados
                        e teste o conhecimento de seus amigos
                    </p>
                    <div className="cta-buttons">
                        <Input />
                        <Button type={'secondary'} text={'PESQUISAR'} />
                        <Button type={'main'} text={'CRIAR'} />
                    </div>
                </div>
            </HeroSectionContainer>
            <MainSectionContainer>
                <Widget>
                    <WidgetHeader>oi</WidgetHeader>
                    <WidgetContent>oi</WidgetContent>
                </Widget>
                <Widget>
                    <WidgetHeader>oi</WidgetHeader>
                    <WidgetContent>oi</WidgetContent>
                </Widget>
                <Widget>
                    <WidgetHeader>oi</WidgetHeader>
                    <WidgetContent>oi</WidgetContent>
                </Widget>
            </MainSectionContainer>
            <GitHubCorner projectUrl="" />
        </PageContainer>
    )
}

export default AluraQuiz

export const MainSectionContainer = styled.main`
    z-index: 10;

    margin-top: -50px;

    max-width: 1000px;
    width: 100%;

    min-height: 20vh;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    min-height: 100vh;

    background: ${(props) => props.theme.colors.mainBg};
`
export const HeroSectionContainer = styled.div`
    max-width: 1000px;
    width: 100%;

    height: 80vh;

    display: grid;
    grid-template-columns: 1fr 1fr;

    .hero-img {
        position: relative;

        .linear-gradient-a {
            position: absolute;

            background: linear-gradient(
                90deg,
                ${(props) => props.theme.colors.mainBg} 0%,
                rgba(0, 0, 0, 0) 100%
            );

            height: 100%;
            width: 50%;
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: 0%;
        }

        .linear-gradient-b {
            position: absolute;

            right: 0;
            top: 0;

            background: linear-gradient(
                -90deg,
                ${(props) => props.theme.colors.mainBg} 0%,
                rgba(0, 0, 0, 0) 100%
            );

            height: 100%;
            width: 50%;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        padding-left: 45px;
        padding-bottom: 45px;

        img {
            padding-bottom: 45px;
        }

        h1 {
            font-size: 36px;
        }

        p {
            font-size: 14px;
            padding-bottom: 24px;
        }

        .cta-buttons {
            width: 100%;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
    }
`
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
