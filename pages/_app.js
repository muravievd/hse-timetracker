import Head from 'next/head'
import Home from './home'
import './index.css'
import './HSE_Sans.css'
import { Player } from '@lottiefiles/react-lottie-player'
import hseanim from '../public/hseanim.json'
import { useEffect, useState } from 'react'
import gsap from 'gsap'


export const customLoader = ({ src }) => {
    return src
  }

export default function Index() {
  var [IndexPlaceholder, setIndexPlaceholder] = useState(
    <div className="IndexPlaceholder">
      <Player src={hseanim} className="IndexPlayer" loop autoplay/>
      <svg className='IndexLogo' width="262" height="28" viewBox="0 0 262 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9378 5.7073V27H7.18915V5.7073H0.0411613V0.601594H20.0858V5.7073H12.9378ZM22.8496 27V22.4238H26.2534V5.17782H22.8496V0.601594H35.4059V5.17782H32.0021V22.4238H35.4059V27H22.8496ZM59.9375 9.67841H59.824L57.8952 13.5361L52.7517 22.8776L47.7216 13.5739L45.7172 9.41367H45.6037V27H40.1954V0.601594H46.2845L52.7517 12.9688H52.8273L59.2189 0.601594H65.3458V27H59.9375V9.67841ZM71.1828 27V0.601594H89.1473V5.7073H76.9314V11.1156H87.4076V16.1835H76.9314V21.8943H89.1473V27H71.1828ZM105.161 5.7073V27H99.4125V5.7073H92.2645V0.601594H112.309V5.7073H105.161ZM121.99 27H116.242V0.601594H128.76C129.971 0.601594 131.067 0.803301 132.051 1.20671C133.034 1.61013 133.866 2.19004 134.547 2.94644C135.253 3.67763 135.795 4.56009 136.173 5.59384C136.551 6.62759 136.74 7.7748 136.74 9.03547C136.74 10.8256 136.337 12.3888 135.53 13.7252C134.748 15.0615 133.551 16.0322 131.937 16.6373L137.119 27H130.727L126.113 17.3181H121.99V27ZM128.042 12.4771C128.899 12.4771 129.567 12.2628 130.046 11.8342C130.55 11.3803 130.803 10.7248 130.803 9.86751V8.20343C130.803 7.34617 130.55 6.70323 130.046 6.2746C129.567 5.82076 128.899 5.59384 128.042 5.59384H121.99V12.4771H128.042ZM157.989 27L156.098 20.7219H147.286L145.395 27H139.57L148.269 0.601594H155.379L163.964 27H157.989ZM151.748 5.82076H151.559L148.647 15.8431H154.698L151.748 5.82076ZM177.137 27.4538C175.347 27.4538 173.733 27.1765 172.296 26.6218C170.859 26.0419 169.636 25.1972 168.627 24.0879C167.619 22.9533 166.837 21.5539 166.283 19.8898C165.728 18.2005 165.45 16.2339 165.45 13.9899C165.45 11.7711 165.728 9.80448 166.283 8.08997C166.837 6.35024 167.619 4.90048 168.627 3.74066C169.636 2.55563 170.859 1.66055 172.296 1.05543C173.733 0.450313 175.347 0.147753 177.137 0.147753C179.583 0.147753 181.6 0.652021 183.188 1.66056C184.777 2.64388 186.05 4.20711 187.008 6.35024L182.053 8.92201C181.7 7.81262 181.146 6.93015 180.389 6.2746C179.658 5.59384 178.574 5.25346 177.137 5.25346C175.448 5.25346 174.086 5.80816 173.052 6.91755C172.044 8.00172 171.539 9.59016 171.539 11.6829V15.9187C171.539 18.0114 172.044 19.6125 173.052 20.7219C174.086 21.806 175.448 22.3481 177.137 22.3481C178.549 22.3481 179.671 21.9699 180.503 21.2135C181.36 20.4319 181.99 19.499 182.394 18.4148L187.084 21.1379C186.1 23.155 184.802 24.7182 183.188 25.8276C181.6 26.9118 179.583 27.4538 177.137 27.4538ZM200.297 15.5027L196.855 19.6629V27H191.106V0.601594H196.855V13.1579H197.082L200.826 8.05215L206.764 0.601594H213.269L204.381 11.456L214.063 27H207.293L200.297 15.5027ZM217.44 27V0.601594H235.405V5.7073H223.189V11.1156H233.665V16.1835H223.189V21.8943H235.405V27H217.44ZM246.161 27H240.413V0.601594H252.931C254.141 0.601594 255.238 0.803301 256.222 1.20671C257.205 1.61013 258.037 2.19004 258.718 2.94644C259.424 3.67763 259.966 4.56009 260.344 5.59384C260.722 6.62759 260.911 7.7748 260.911 9.03547C260.911 10.8256 260.508 12.3888 259.701 13.7252C258.919 15.0615 257.722 16.0322 256.108 16.6373L261.289 27H254.898L250.284 17.3181H246.161V27ZM252.213 12.4771C253.07 12.4771 253.738 12.2628 254.217 11.8342C254.721 11.3803 254.974 10.7248 254.974 9.86751V8.20343C254.974 7.34617 254.721 6.70323 254.217 6.2746C253.738 5.82076 253.07 5.59384 252.213 5.59384H246.161V12.4771H252.213Z" fill="#102D69"/>
      </svg>
    </div>
  )
  return (
    <div className="IndexContainer">
      <Head>
        <title>Timetracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/timetracker-192x192.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      {IndexPlaceholder}
      <main>
        <Home placeholderFunc={setIndexPlaceholder} />
      </main>
    </div>
  )
}
