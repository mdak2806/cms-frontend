import {Link, Outlet} from '@remix-run/react';
import url from '../utils/url';

export default function BlogCard({blog}){
    let data = blog.attributes;
    // let dataId = data.Hero.id;

    // Keep debugging lines in like this until issues like below are fixed
    console.log('hello');
    console.log('data :', data);
    console.log('dataId :', blog.attributes.Hero.data.id);


    // blog.id extracts the id for each blog correctly
    // console.log('data.id :', blog.id);


    return(
        <div className='card'>
            {/* <h1>Dashboard</h1> */}
            {/* <Outlet /> */}
            <div className='card-img'>
                {/* Same as below, these have to match EXACTLY how they look in the data */}
                <img src={`${url}${blog.attributes.Hero.data.attributes.url}`} alt={blog.attributes.Hero.data.attributes.alternativeText ?? 'a hero image'} />
            </div>
            <div className='card-details'>
                {/* Changed the lonk below from blog.id to below just to ensure correct ID is taken */}
                <Link to={`/posts/${blog.attributes.Hero.data.id}`} className='card-title'>
                    {/* But this has to match the exact field in the data e.g.
                    
                    [0:
                        attributes: {
                            Title: 'xyz',
                            Excerpt: 'abc'
                        },
                        id: 1
                    ]

                    */}
                    {data.Title}
                </Link>
                <p className='card-excerpt'>{data.Excerpt}</p>
            </div>
        </div>
    )
}