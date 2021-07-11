import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../client.js'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import moment from 'moment'

import './css/SinglePost.css'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

export default function SinglePost() {
  const [postData, setPostData] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          createdAt,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error)
  }, [slug])

  if (!postData) return <div>Loading...</div>

  return (
    // <!-- First Grid -->
    <main className='main__container'>
      <div className='w3-row-padding w3-padding-64 w3-container'>
        <div className='w3-content'>
          <div className='w3-auto'>
            <h1>{postData.title}</h1>
            <div>
              <div>
                <span className='w3-margin-right'>
                  <i className='fa fa-male fa__span'></i> {postData.name}
                </span>
              </div>
              
              <h6>
              
                <span className='span__time'>
                  {' '}
                  <i className='fa fa-book fa__span'></i>{' '}
                  {moment(postData.createdAt).format('MMMM Do YYYY LTS')}
                </span>{' '}
                -{' '}
                <span className='w3-opactiy span__time'>
                  {moment(postData.createdAt).fromNow()}
                </span>
              </h6>
              <img
                    src={urlFor(postData.mainImage).url()}
                    alt={postData.name}
                    className='blog__img_single'
                  />
            </div>

            <h5 className='w3-padding-32'>
              <BlockContent
                blocks={postData.body}
                projectId='z5umnzzh'
                dataset='production'
              />
            </h5>
          </div>
        </div>
      </div>

      <div className='footer w3-container w3-bottom w3-center w3-padding-64'></div>
    </main>
  )
}
