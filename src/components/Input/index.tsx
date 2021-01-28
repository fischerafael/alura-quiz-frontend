import styled from 'styled-components'
import { DefaultInputStyle } from '../../styles/InputStyle'

interface IInput {
    label: string
    placeholder?: string
    value?: any
    login?: boolean
    setValue?: (e: any) => void
}

const Input: React.FC<IInput> = ({
    label,
    setValue,
    value,
    placeholder,
    login
}) => {
    if (login)
        return (
            <LoginInputStyle>
                <span>{label}</span>
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={(e: any) => setValue(e.target.value)}
                    value={value}
                />
            </LoginInputStyle>
        )

    return (
        <HomeInputStyle>
            <span>{label}</span>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e: any) => setValue(e.target.value)}
                value={value}
            />
        </HomeInputStyle>
    )
}

export default Input

export const HomeInputStyle = styled(DefaultInputStyle)``
export const LoginInputStyle = styled(DefaultInputStyle)`
    margin: 7.5px 0;
`
