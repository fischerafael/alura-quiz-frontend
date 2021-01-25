import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string
            secondary: string
            mainBg: string
            contrastText: string
            wrong: string
            success: string
        }
        borderRadius: string
    }
}
