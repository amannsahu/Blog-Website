import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { baseUrl } from "../baseUrl";

const BlogPage = () =>{

    const [blog, setBlog] = useState(null);
    const [relatedblogs, setRelatedblogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const [loading, setLoading] = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${baseUrl}?blogId=${blogId}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedblogs(data.relatedblogs);
        }
        catch(error){
            console.log("Error in calling Blog Id");
            setBlog(null);
            setRelatedblogs([]);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(blogId){
            fetchRelatedBlogs();
        }
    }, [location.pathname] )

    return (
        <div>
            <Header/>
            <div>
                <button onClick={ () => navigation(-1)}>
                    Back
                </button>
            </div>
            {
                loading ? <p>Loading</p> : 
                blog ? (
                    <div>
                        <BlogDetails post={blog}/>
                        <h2>Related Blogs</h2>
                        {
                            relatedblogs.map( (post) => (
                                <div key={post.id}>
                                    <BlogDetails post={post}/>
                                </div>
                            ))
                        }
                    </div>
                ) : 
                (<div>
                    <p>No Blogs Found</p>
                </div>)
            }
        </div>
    );
}

export default BlogPage;