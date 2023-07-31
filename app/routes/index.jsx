import { useLoaderData } from '@remix-run/react';
import { checkEnvVars, checkStatus } from '../utils/errorHandling';
import {Layout, BlogCard} from '../components';
import styles from '../components/style.css';

export const links = () => [
    {rel: "stylesheet", href: styles},
]

export async function loader(){
    checkEnvVars(); // check env variables

    const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/blogs?populate=hero`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
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