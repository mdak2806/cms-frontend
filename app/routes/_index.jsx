import { useLoaderData } from '@remix-run/react';
import { checkEnvVars, checkStatus } from '../utils/errorHandling';
import {Layout, BlogCard} from '../components';
import styles from '../components/style.css';

export const links = () => [
    {rel: "stylesheet", href: styles},
]

// Did you set up an API key, too? Just checking!
// Here is what my .ENV file looked like:

// STRAPI_URL_BASE=http://localhost:1337/
// STRAPI_API_TOKEN=47f78171e6e22752937213087e88dae774c08501bba5affab3faf10f285b77efdd931015104cd239c376f544137ea64d6ac0951fc60123aea32f5981ff7c28058204e74e03000b41d83b5e78d531ce291cc0bac64ad3ffe08a5df4f6af9026bd72752075340241ce128bc56be462220cbc68b59b63b5791db67496e42dbce090

// I've left it in the env.example

export async function loader(){

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
    return data.data; // return data
}

export default function Index(){
    const blogs = useLoaderData();

    return (
        <Layout>
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