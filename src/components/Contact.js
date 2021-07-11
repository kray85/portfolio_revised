import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import emailjs from 'emailjs-com'


import '../components/css/Contact.css'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
})


function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function SendEmail(object) {
    emailjs
      .send(
        'service_2kra7vh',
        'template_dm4l25e',
        object,
        'user_XQLG6ivNnJKRwINGMRrKL'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          SendEmail(values)
          actions.setSubmitting(false)
          actions.resetForm()
          setSubmitted(true)
        }, 2000)
        if (submitted) {
          return 
        }
      }}
    >
      {({ isSubmitting }) => (
        <section className="section-form">
          <h1 className="form-heading font_style">Get In Touch!</h1>
          <Form>
          {submitted && <Redirect push to="/thankyou" />}
            <div className="form-control font_style">
              <label htmlFor="name"> First Name:</label> <br />
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
              />{' '}
              <br />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control font_style">
              <label htmlFor="email">Email:</label> <br />
              <Field
                type="email"
                name="email"
                id="email"
                placeholder=" Your Email"
              />{' '}
              <br />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-control font_style">
              <label htmlFor="subject">Subject:</label> <br />
              <Field
                type="text"
                name="subject"
                id="subject"
                placeholder="Your Subject"
              />{' '}
              <br />
              <ErrorMessage name="subject" component={TextError} />
            </div>
            <div className="form-control font_style">
              <label htmlFor="message">Message:</label> <br />
              <Field
                as="textarea"
                name="message"
                rows="5"
                col="20"
                id="message"
                placeholder="Your Message"
              ></Field>{' '}
              <br />
              <ErrorMessage name="message" component={TextError} />
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              <span className='spanLoader'>{isSubmitting ? 'Please wait....' : 'Get In Touch'}</span>
            </button>
          </Form>
         
        </section>
      )}
    </Formik>
  )
}

export default Contact
