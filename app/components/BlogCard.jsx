import {Link} from '@remix-run/react';
import url from '../utils/url';

export default function BlogCard({blog}){
    let data = blog.attributes;

    // Keep debugging lines in like this until issues like below are fixed
    console.log(data)

    return(
        <div className='card'>
            <div className='card-img'>
                {/* Same as below, these have to match EXACTLY how they look in the data */}
                <img src={`${url}${blog.attributes.Hero.data.attributes.url}`} alt={blog.attributes.Hero.data.attributes.alternativeText ?? 'a hero image'} />
            </div>
            <div className='card-details'>
                {/* this can remain as blog.id, as the actual data looks like this:
                
                [0: 
                    attributes: {...},
                    id: 1
                ]
                
                */}
                <Link to={`/posts/${blog.id}`} className='card-title'>
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