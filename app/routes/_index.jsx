import { Link, useLoaderData } from '@remix-run/react';
import { checkEnvVars, checkStatus } from '../utils/errorHandling';
import {Layout, BlogCard} from '../components';
// import {BlogCard} from '../components/BlogCard'
import styles from '../components/style.css';
import {index} from '../routes/blog/index';
import {$blogId} from '../routes/blog/$blogId'
// Import $postId loader function
// import { loader as postIdLoader } from './routes/posts/$postId.jsx'; //


export const links = () => [
    {rel: "stylesheet", href: styles},
]

// I've left it in the env.example

export async function loader(){

    // loader () => import('./posts/$postId'), 
    // route() => '/posts/:postId'

    checkEnvVars();

    // In order to enable this, you have to install `dotenv`
    // I then put require('dotenv').config(); in to the entry.server file
    const STRAPI_URL_BASE = process.env.STRAPI_URL_BASE;
    const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

    const response = await fetch(`${STRAPI_URL_BASE}/api/blogs?populate=*`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json"
        }
    }); // get the blogs

    checkStatus(response); // check the status

    const data = await response.json(); // get the json response

    if(data.error){  // error check
        throw new Response("Error Loading data from strapi", {status:500});
    }

    console.log('data :', data);
    console.log('data.data :', data.data)
    return data.data; // return data
}


export default function Index(){
    const blogs = useLoaderData();

    return (
        <Layout>
            {/* This is a Test Link */}
            <Link to={`/posts`}> Yass</Link>
            {/* <Link to={"/blogs"}> Yass</Link> */}


            {/* this controls the index page, mapping over the BlogCard to display individually */}
            {
                blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))

                    
                ) : (
                    <p>No blog posts found!</p>
                )
            }

        </Layout>
    )
}


