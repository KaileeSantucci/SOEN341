import React from 'react';
import {useState} from 'react';
import '../src/HomeApp.css';
import '../styles/FAQ.css';

const faqs = [
  {
    question: "How can I share my course notes?",
    answer: (
      <>
        <p>Feel free to share course notes with your friends on the text channels created for that course.</p>        
      </>
    )
  },
  {
    question: "How do I change my background?",
    answer: <p>Navigate to the "Customize Background" tab displayed on the sidebar. You can choose to select a background from the those provided or chose to upload your own.</p>
  },
  {
    question: "Is my data safe?",
    answer: <p>Yes! We use Firebase Authentication and Firestore security rules to protect your data.</p>
  },
  {
    question: "How can I create a new server?",
    answer: <p>Only admins can create servers. </p>
  }, 
  {
    question:"How can I become an Admin?",
    answer: <p>In order to become an Admin, a request must be sent to StudySpaces. If the request is accepted and the admin violates user policies then admin abilities will be revoked. </p>
  },
  {
    question: "How do I report bugs or send feedback?",
    answer: <p>Feel free to send us an email at StudySpaces@gmail.com with any feedback or bugs you encounter. </p>
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index)); // toggle on click
  };

  return (
    <div className="FAQcontainer">
      {faqs.map((faq, index) => (
        <div className={`faq-item ${openIndex === index ? "open" : ""}`} key={index}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h2>{faq.question}</h2>
            <span className="toggle">{openIndex === index ? "-" : "+"}</span>
          </div>
          {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;