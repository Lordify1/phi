import { colorMap, getData, likeStartup } from '@/components/Tools/Misc'
import { useFetch } from '@/context/FetchContext'
import { convertOffsetToTimes } from 'framer-motion'
import React, { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'

const StartupLike = ({likes, startup_id, user_id, guest, auth}) => {
    const [reload, setReload] = React.useState(false)
    const { store, fetchData } = useFetch();
    const [like, setLike] = React.useState(likes);
    const guestId = localStorage.getItem('like_id')

    useEffect(() => {
        fetchData({
            key: 'startup',
            url: `/startup/get/${startup_id}`,
            formdata: {'guestId': guestId}
        })
        .then((res:any) => {
            setLike(res?.data?.startup?.likes_count);
        })
        .catch((err:any) => console.log(err))
        setReload(false)
    },[reload])

    return(
        <>
            <span>
                <FaHeart 
                className={`inline ${store?.startup?.has_liked === true ? colorMap.text_primary : 'hover:text-gray-500'}`}
                onClick={() => {
                    likeStartup(startup_id, user_id, guest)
                    .then(() => {
                        setReload(prev => !prev)
                    })
                }}
                />
                {' '}
                {store?.startup?.likes_count || like}
                {' '}
                Likes
            </span>
        </>
    )
}

export default StartupLike