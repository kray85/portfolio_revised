import React, { useState, useEffect } from 'react'
import './css/Post.css'
import { Link } from 'react-router-dom'
import Loader from 'react-spinners/BarLoader'
import sanityClient from '../client.js'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import moment from 'moment'
import Florida_Beach from './img/florida_beach.jpg'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
)

function Post() {
  const [postData, setPost] = useState(null)
  const [authorData, setAuthor] = useState(null)
  const [latestPost, setLatestPost] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'post'] | order(createdAt desc) {
                _id,
                title,
                slug,
                description,
                createdAt,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                "authorName": author->name
                
            }`
      )
      .then((data) => setPost(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'author' ]{
              name,
              bio,
              'authorImage': image.asset->url,
              "posts": *[_type == "post" && author._ref in *[_type=="author" && name == name ]._id ] | order(createdAt desc) {
              createdAt,
              title,
              description,
              mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
              "slug": slug.current,
      }[0...3]
              
    }`
      )
      .then((data) => setAuthor(data))
      .catch(console.error)
  }, [])

  return (
    <div className='w3-content blog__content'>
      <header className='w3-container w3-center w3-padding-72 main__post'>
        <h1 className='main__heading'>My Blog</h1>
        <p>
          Welcome to the Blog of{' '}
          <span className='w3-tag font_style main__p_size '>Kendal Brown</span>
        </p>
        <div className='loader'>{!postData && <Loader />}</div>
      </header>
      <div className='w3-row'>
        <div className='w3-col l8 s12'>
          {postData &&
            postData.map((post, index) => (
              <div className='w3-card-4 w3-margin w3-white' key={index}>
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt}
                  className='blog__img w3-card'
                />
                <div className='w3-container'>
                  <h3 className='post__heading'>
                    <b>{post.title}</b>
                  </h3>
                  <div>
                    <h5><i className='fa fa-male fa__span'></i> {postData.name}{post.authorName}</h5>
                  </div>
                  
                  <h5>
                    
                    <span className='span__time'>
                    <i className='fa fa-book fa__span'></i>{' '}
                      {moment(post.createdAt).format('MMMM Do YYYY LTS')}
                    </span>{' '} -  {' '}
                    <span className='w3-opacity span__time'>
                      {moment(post.createdAt).fromNow()}
                    </span>
                    
                  </h5>
                </div>
                <div className='w3-container'>
                  <p>{post.body}</p>
                  <div className='w3-row'>
                    <div className='w3-col m8 s12'>
                      <p>
                        <Link
                          to={'post/' + post.slug.current}
                          key={post.slug.current}
                        >
                          <button className='w3-button w3-padding-large w3-white w3-border'>
                            <b>READ MORE &gt;&gt;</b>
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <ColoredLine color={'#1b3049'} />
                </div>
              </div>
            ))}
          {/* Intro */}
        </div>
        <div className='w3-col l4'>
          {/* About */}
          {authorData &&
            authorData.map((author, index) => (
              <div className='w3 card w3-margin w3-margin-topk' key={index}>
                <div className='w3-card w3-margin w3-margin-top'>
                  <img
                    src={urlFor(author.authorImage).url()}
                    alt={author.name}
                    className='blog__img'
                  />
                  <div className='w3-container w3-white'>
                    <h4>
                      
                      <b>{author.name}</b>
                    </h4>
                    <BlockContent
                      blocks={author.bio}
                      projectId='z5umnzzh'
                      dataSet='production'
                    />
                  </div>
                </div>
                <div className='w3-card w3-margin'>
                  <div className='w3-container w3-padding '>
                    <h4 className='post__heading'>Latest Post</h4>
                  </div>
                  {author.posts &&
                    author.posts.map((p, index) => {
                      return (
                        <ul className='w3-ul w3-hoverable w3-white' key={index}>
                          <Link to={`/post/${p.slug}`}>
                            <li className='w3-padding-16 '>
                              <div className='flex__container'>
                                <div>
                                  <img
                                    src={urlFor(p.mainImage).url()}
                                    alt=''
                                    className='latestPost__img'
                                  />
                                </div>
                                <div className='latest__post w3-margin-right'>
                                  <span className='w3-large'>{p.title}</span>
                                  <br />
                                  <span className='w3-small'>
                                    {p.description}
                                  </span>
                                </div>
                                <div>
                                  <span className='w3-opacity latest_span__time'>
                                    {moment(p.createdAt).format('MMMM Do YYYY')}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </Link>
                        </ul>
                      )
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Post
