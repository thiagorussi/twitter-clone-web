import avatar from '../assets/avatar.svg'
import { HeartIcon } from '@heroicons/react/24/outline'
import {CheckBadgeIcon} from '@heroicons/react/24/solid'

import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useFormik } from 'formik'



function TweetForm({ loggedInUser, onSuccess }) {
    const formik = useFormik({
        onSubmit: async (values, form) => {
            await axios.post(`${import.meta.env.VITE_API_HOST}/tweets`, {
                text: values.text,
            }, {
                headers: {
                    'authorization': `Bearer ${loggedInUser.accessToken}`
                }

            })
            
            form.setFieldValue('text', '')
            onSuccess()
        },
        initialValues: {
            text: ''
        },
        validateOnMount: true,


    })

    const MAX_TWEET_CHAR = 1000

    function changeText(e) {
        setText(e.target.value)
    }

    async function onSubmit(e) {
        e.preventDefault()
        await axios.post(`${import.meta.env.VITE_API_HOST}/tweets`, {
            text
        }, {
            headers: {
                'authorization': `Bearer ${loggedInUser.accessToken}`
            }
        })

    }


    return (
        <div className='border-b border-silver p-4 space-y-6'>
            <div className='flex space-x-5'>
                <img src={avatar} className='w-7'></img>
                <h1 className='font-bold text-xl'>Página Inicial</h1>
            </div>

            <form className='pl-12 text-lg flex flex-col' onSubmit={formik.handleSubmit}>
                <textarea
                    name='text'
                    placeholder='O que está acontecendo?'
                    className='bg-transparent outline-none disabled:opacity-50'
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                //disabled={true}
                />

                <div className='flex justify-end items-center space-x-3'>
                    <span className='text-sm'>
                        <span>{formik.values.text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span>
                    </span>
                    <button
                        type='submit'
                        className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50'
                        disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.values.text.length === 0 || formik.isSubmitting}
                    >
                        Tweet
                    </button>

                </div>

            </form>

        </div>
    )
}

function Tweet({ name, username, avatar, children }) {

    return (
        <div className='flex space-x-3 p-4 border-b border-silver' >

            <div>
                <img src={avatar}></img>
            </div>

            <div className='space-y-2'>

                <span className='flex font-bold text-sm'>{name} <CheckBadgeIcon className='h-6 w-6 ml-1 mr-1'/> <span className='text-sm text-silver'>@{username}</span></span>{' '}
                

                <p>{children}</p>

                <div className='flex space-x-1 text-silver text-sm items-center'>
                    <HeartIcon className="h-6 w-6" />
                    <span>1.2k</span>
                </div>

            </div>

        </div>
    )
}

function Home({ loggedInUser }) {

    const [data, setData] = useState([])
    const loading = true

    async function getData() {
        const response = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
            headers: {
                'authorization': 'Bearer ' + loggedInUser.accessToken
            }
        })
        setData(response.data)
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            <TweetForm loggedInUser={loggedInUser} onSuccess={getData} ></TweetForm>
            <div>
                {data.length && data.map(tweet => (
                    <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar={avatar}>
                        {tweet.text}
                    </Tweet>
                ))}
            </div>

        </>

    )
}


export default Home
