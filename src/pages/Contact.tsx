import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

export function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID , form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
            .then(
                (result) => {
                    console.log(result.text + "123");
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };
    return (
        <>
            <form ref={form} onSubmit={sendEmail} className="form-container">
                <h3 className='FooterSubtitle'>Contact</h3>

                <label className="label">Name</label>
                <input type="text" name="from_name" required placeholder="John Doe" className="input-field" />
                <label className="label">Email</label>
                <input type="email" name="from_email" required placeholder="John@Doe.com" className="input-field" />
                <label className="label" htmlFor="topic">Topic</label>
                <input type="text" name="topic" required placeholder="Collaboration" className="input-field" />
                <label className="label">Message</label>
                <textarea name="message" required placeholder="I would like to..." className="input-field" />
                <input type="submit" value="Send" className="submit-button" />

            </form>
        </>
    )
}