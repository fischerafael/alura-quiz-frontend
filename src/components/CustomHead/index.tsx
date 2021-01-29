import Head from 'next/head'
import React from 'react'

const CustomHead: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
    return (
        <Head>
            <title>{pageTitle}</title>
        </Head>
    )
}

export default CustomHead
