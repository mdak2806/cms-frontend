import {Link, useOutletContext, useParams, useLoaderData} from '@remix-run/react';
import {checkEnvVars,checkStatus} from '../../utils/errorHandling';
import url from '../../utils/url';
import {Layout} from '../../components';
import styles from '../../components/style.css';
import {Outlet} from "@remix-run/react"

export const links = () => [
    { rel: "stylesheet", href: styles },
];

// export const links = () => [
//     ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
//   ];

export async function loader({params}) {
    const {postId} = params;

    checkEnvVars();

     // In order to enable this, you have to install `dotenv`
    // I then put require('dotenv').config(); in to the entry.server file
    const STRAPI_URL_BASE = process.env.STRAPI_URL_BASE;
    const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;


    const response = await fetch(`${STRAPI_URL_BASE}/api/blogs/${postId}?populate=hero`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${STRAPI_API_TOKEN}`,
          "Content-Type":"application/json"
        }
      });
    
      checkStatus(response);
    
      const data = await response.json();
    
      if(data.error){
        throw new Response("Error loading data from strapi",{status:500});
      }
      console.log('young');
      console.log(data.data);
      return data.data;
}

export default function PostId() {
    const blog = useLoaderData();
    const blogData = blog.attributes;
    console.log(blogData);
    return (
         <Layout>
            {/* <h2>A Blog Post titled {params.postId}</h2> */}
      <div className="blog-post">
        {/* Render the individual blog post */}
        <div className="blog-post-hero">
          <img
            src={`${url}${blogData.hero.data.attributes.url}`}
            alt={`${blogData.hero.data.attributes.alternativeText}`}
          />
        </div>
        <div className="blog-post-title">
          <h1>{blogData.title}</h1>
        </div>
        <div className="blog-post-content">
          <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
        </div>
      </div>
    </Layout>
    )
}

