import React, { useEffect, useState } from "react";
import service from "../appwrite/database_service";
import PostCard from '../Components/Header/Postcard'  

import Container from "../Components/Container/Container";
//import { useSelector } from "react-redux";

export default function Home(){
    //const userData= useSelector((state)=>(state.auth.data))
    const[posts,setPosts]= useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
    if (posts.length === 0 ) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}