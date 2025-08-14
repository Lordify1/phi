import { classMap, NotAuth } from "@/components/Tools/Misc"
import SendRequest from "@/components/Tools/SendRequest"
import { useAuth } from "@/context/AuthContext"
import { useFetch } from "@/context/FetchContext"
import { useEffect, useState } from "react"

export const StartupCommentForm = ({startup_id, auth}) => {
    const [reload, setReload] = useState(false)
    const {store, fetchData} = useFetch();

    console.log(auth)

    const [data, setData] =  useState({
      startup_id: startup_id,
      comment: ''
    })

    useEffect(() => {
      fetchData({
        key: 'comments',
        url: `/startup/comment/fetch/${startup_id}`,
        method: 'get'
      })
      .then(() => {setReload(false)})
      .catch((err:any) => {console.log(err)})
    },[reload])

    return(
        auth !== null ? (
          <div className={classMap.pageSection()}>
            {/* Replace with <CommentList /> and <CommentForm /> later */}
            <textarea
              className={classMap.input()}
              rows={3}
              placeholder="Drop a comment..."
              value={data.comment}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  comment: e.target.value
                })),
                console.log(data)
              }}
            ></textarea>
            <SendRequest
              url={'/advisor/startup/comment/save'}
              method="post"
              data={data}
              className="w-full"
              onResponse={() => {setReload(true)}}
              text="Comment"
            />
          </div>
        ) : (
          <NotAuth
          action="Comment"
          /> 
        )
    )
}



export const StartupCommentDiv = (startup_id) => {

    const [reload, setReload] = useState(false)
    const {store, fetchData} = useFetch();

    const auth = useAuth();

    console.log(auth)

    const [data, setData] =  useState({
      startup_id: startup_id,
      comment: ''
    })

    useEffect(() => {
      fetchData({
        key: 'comments',
        url: `/startup/comment/fetch/${startup_id}`,
        method: 'get'
      })
      .then(() => {setReload(false)})
      .catch((err:any) => {console.log(err)})
    },[reload])

    return(
      <div className={`${classMap.pageSection()}`}>
       <h3 className={`${classMap.pageHeader()}`}>Comments</h3>
       <div>
         {
           store?.comments && store.comments.length > 0 ? (
             store?.comments?.map((item:any, index:any) => {
               return(
                 <section className={`${classMap.commentBox()}`}>
                   {item}
                 </section>
               )
             })
           ) : (
             <p>No comments yet</p>
           )
         }
       </div>
      </div>
    )
}