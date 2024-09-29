import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const BlogDetails = ({posts}) =>{
    return (
        <div className=" max-w-[600px] mx-auto
        flex flex-col justify-center gap-2">
            <NavLink to={`/blog/${posts?.id}`}>
                <span className="font-bold text-lg">{posts.title}</span>
            </NavLink>
            <div>
                <p className="text-sm">
                    By <span className=" italic">{posts.author}</span> On {" "}
                    <NavLink to={`/category/${posts?.category?.replaceAll(" ", "-") || ""}`}>
                        <span className=" font-bold underline">{posts?.category}</span>
                    </NavLink>
                </p>
                <p className="text-sm">
                    Posted On <span>{posts?.date}</span>
                </p>
            </div>
            <p className="text-sm">{posts?.content}</p>
            <div className="text-sm text-blue-700 font-medium">
                {
                    posts.tags.map( (tags, index) => (
                        <NavLink key={index} to={`/tag/${tags.replaceAll(" ", "-")}`}>
                            <span>{`#${tags}`}</span>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}

export default BlogDetails;