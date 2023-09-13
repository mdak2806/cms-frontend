import { Link, useLoaderData, useParams } from '@remix-run/react';
import { checkEnvVars, checkStatus } from '../utils/errorHandling';
import url from '../utils/url';
import { Layout } from '../components';
import styles from '../components/style.css';
import { Outlet } from '@remix-run/react';


export async function loader({ params }) {
  const { postId } = params;

  checkEnvVars();

  const STRAPI_URL_BASE = process.env.STRAPI_URL_BASE;
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const response = await fetch(`${STRAPI_URL_BASE}/api/blogs/${postId}?populate=*`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  checkStatus(response);

  const data = await response.json();

  if (data.error) {
    throw new Response('Error loading data from strapi', { status: 500 });
  }

  // console.log('data: ')


  // console.log('Data:', data.data);
  console.log('Hero Data :', data.data.attributes.Hero)
  return data.data;
}

export default function Post() {
  const blog = useLoaderData();
  const blogData = blog.attributes;

  return (
    <Layout>
      <div className="blog-post">
        <div className="blog-post-hero">
          <img
            src={`${url}${blogData.Hero.data.attributes.url}`}
            alt={blogData.alternativeText}
          />
        </div>
        <div className="blog-post-title">
          <h1>{blogData.Title}</h1>
        </div>
        <div className="blog-post-content">
          <div dangerouslySetInnerHTML={{ __html: blogData.Content }} />
        </div>
      </div>
    </Layout>
  );
}