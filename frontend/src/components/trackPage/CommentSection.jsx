import React from 'react';
import {useForm} from "react-hook-form";
import {instance} from "../../utils/axios/AxiosConfig";
import {useParams} from "react-router-dom";
import CommentCard from "./CommentCard";

const CommentSection = (props) => {

    const {track, trackId} = props
    // const params = useParams()
    //
    // const trackId = params.id

    const {register,
        handleSubmit,
        formState:{errors}} = useForm({

    })

    const mySubmitForm = async (data) =>  {
        console.log("comment:  ",data)
        try {
            const response = await instance.post("/postComment", {"comment": data.comment, "trackId" : trackId})
            console.log( await response.data)
        } catch (error) {
            console.log("error")
        }
    }

    return (
        // <div className="w-full dark:bg-gray-900 pt-20 flex">
        //     <div className="bg-sky-950 w-3/4 mx-auto rounded-2xl">
        //         <div className="flex-col">
        //             <div>
        //                 <div className="text-white py-4 text-2xl float-left">Your Comment</div>
        //                 <div>
        //                     <form onSubmit={mySubmitForm}>
        //                         <div className="flex-col">
        //                             <div>
        //                                 <textarea className="bg-gray-50 border-none focus:outline-black w-1/2 h-20" placeholder="Write a comment"/>
        //                             </div>
        //                             <div className="border-2 border-white inline-block rounded-xl text-white text-xl" >
        //                                 <button type="submit" className="px-8 py-2">Comment</button>
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <section className="bg-bg-main-color">
            <div className="float-left text-lg lg:text-4xl font-bold text-gray-900 dark:text-black p-10">Discussion</div>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-black">Your comment</h2>
                </div>
                <form className="mb-6" onSubmit={handleSubmit(mySubmitForm)} noValidate>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="10"
                                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 resize-none"
                                  placeholder="Write a comment..." required
                                  {...register("comment",{required: true})}
                        >
                        </textarea>
                    </div>
                    <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xl font-medium text-center text-black bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </form>
            </div>
            <div>
                {track.trackComments?.map(
                    comment => {
                        return (
                            <CommentCard key = {comment.id} text = {comment.commentText}/>
                        )
                    }
                )}
            </div>
        </section>
    );
};

export default CommentSection;