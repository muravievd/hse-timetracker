import Head from 'next/head'
import Home from './home'
import './index.css'
import './HSE_Sans.css'


export const customLoader = ({ src }) => {
    return src
  }

export default function Index() {
  return (
    <div className="IndexContainer">
      <Head>
        <title>HSE Timetracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </div>
  )
}
