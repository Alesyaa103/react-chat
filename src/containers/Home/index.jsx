import React from 'react'
import Chat from '../Chat';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
  const currentUser = {
    avatar: "https://resizing.flixster.com/PCEX63VBu7wVvdt9Eq-FrTI6d_4=/300x300/v1.cjs0MzYxNjtqOzE4NDk1OzEyMDA7MzQ5OzMxMQ",
    id: "4b003c20-1b8f-11e8-9629-c7eca82aa7bd",
    user: "Helen"
  }
  return (
    <div className="wrapper">
      <Header />
      <Chat currentUser={currentUser}/>
      <Footer />
    </div>
  )
}

export default Home
