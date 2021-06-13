import sanityClient from '@sanity/client'

sanityClient({
    projectId: 'z5umnzzh',
    dataset: 'production'
})

export default sanityClient