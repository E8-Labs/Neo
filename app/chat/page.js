'use client'
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const Suggestion = {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'none',
  };

  const [message, setMessage] = useState('');
  const [userChat, setUserChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [TestChatHistory, setTestChatHistory] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  //test useeffect

  useEffect(() => {
    console.log("Test history is :", TestChatHistory);
  }, [TestChatHistory])

  useEffect(() => {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const callOpenAIAPI = async (messages) => {
    console.log("Using key ", process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo', // Update to your model
        messages: messages,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return "Sorry, I can't respond right now.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newChat = { role: 'user', content: message };
    const updatedChat = [...userChat, newChat];

    if (activeChat !== null) {
      const updatedHistory = chatHistory.map((chat, index) =>
        index === activeChat ? updatedChat : chat
      );
      setChatHistory(updatedHistory);
    } else {
      const newHistory = [...chatHistory, updatedChat];
      setChatHistory(newHistory);
      setActiveChat(chatHistory.length);
    }

    setUserChat(updatedChat);
    setMessage('');

    // Call OpenAI API
    const botMessage = await callOpenAIAPI(updatedChat);
    const updatedChatWithBot = [...updatedChat, { role: 'assistant', content: botMessage }];

    if (activeChat !== null) {
      const updatedHistory = chatHistory.map((chat, index) =>
        index === activeChat ? updatedChatWithBot : chat
      );
      setChatHistory(updatedHistory);
    } else {
      const newHistory = [...chatHistory.slice(0, -1), updatedChatWithBot];
      setChatHistory(newHistory);
    }

    setUserChat(updatedChatWithBot);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleChatSelect = (index) => {
    setActiveChat(index);
    setUserChat(chatHistory[index]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className='w-2/12' style={{ height: '100vh', padding: 7, borderRight: '1px solid #ffffff30' }}>
        <div>
          <Button
            variant='contained'
            style={{ borderRadius: 10, width: '100%', display: 'flex', justifyContent: 'start', backgroundColor: '#ffffff30' }}
            onClick={() => {
              setUserChat([]);
              setActiveChat(null);
            }}
          >
            <p style={{ textTransform: 'none' }}>
              New Chat
            </p>
          </Button>
        </div>

        <div style={{ height: "60%", border: '2px solid red', marginTop: 15, overflow: 'auto' }}>
          <p>
            History
          </p>
          {chatHistory.map((chat, index) => (
            <Button
              key={index}
              variant='contained'
              style={{ borderRadius: 10, width: '100%', margin: '5px 0', textTransform: 'none' }}
              onClick={() => handleChatSelect(index)}
            >
              {chat[0].content}
            </Button>
          ))}
        </div>

        <div className='w-2/12' style={{ position: 'absolute', bottom: 0, padding: 10 }}>
          <div className='w-11/12' style={{ height: 1, backgroundColor: '#eeeeee50', }}></div>
          <div className='flex mt-4'>
            <img src='' alt='1' />
            <p>Light Mode</p>
          </div>
          <div className='flex mt-3'>
            <img src='' alt='2' />
            <p>Digidop</p>
          </div>
          <div className='flex mt-3'>
            <img src='' alt='3' />
            <p>Digidope Academie</p>
          </div>
          <div className='flex mt-3'>
            <img src='' alt='4' />
            <p>Tiktok</p>
          </div>
        </div>
      </div>

      <div className='w-10/12 flex justify-center' style={{ height: '100vh', padding: 15 }}>
        <div className='w-9/12'>
          <div className='flex justify-center'>
            {userChat.length === 0 ? (
              <div>
                <p style={{ fontSize: 24, fontWeight: 'bolder', textAlign: 'center', marginTop: 50 }}>Webflow GPT</p>
                <div className='flex justify-center' style={{ gap: 10, marginTop: 30 }}>
                  <div className='w-2/6'>
                    <p style={{ textAlign: 'center', fontWeight: '500' }}>Examples</p>
                    <Button variant='contained' className='rounded-lg' style={{ padding: 7, border: '1px solid #ffffff40', marginTop: 10, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Webflow to become expert?"</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Figma to become expert?"</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"What does the French Webflow agency Digidop do?"</p>
                    </Button>
                  </div>
                  <div className='w-2/6'>
                    <p style={{ textAlign: 'center', fontWeight: '500' }}>Capabilities</p>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 10, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>Give answers based on keyword with Webflow CMS</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>Simulate a ChatGPT by Open AI answer</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Webflow to become expert?"</p>
                    </Button>
                  </div>
                  <div className='w-2/6'>
                    <p style={{ textAlign: 'center', fontWeight: '500' }}>Limitations</p>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 10, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Webflow to become expert?"</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Webflow to become expert?"</p>
                    </Button>
                    <Button variant='contained' className='rounded-lg' style={{ fontSize: 14, padding: 7, border: '1px solid #ffffff40', marginTop: 18, backgroundColor: '#ffffff30', textAlign: 'center' }}>
                      <p style={Suggestion}>"How to learn Webflow to become expert?"</p>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <div style={{ overflow: 'auto', height: '80vh' }}>
                  {userChat.map((chat, index) => (
                    <div key={index} style={{ gap: 20 }}>
                      {
                        chat.role === "user" ? (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                              {/*<strong>You:</strong>*/}
                              <div style={{ color: 'white', textAlign: 'end', width: 'fit-content', maxWidth: '60%', borderTopLeftRadius: 25, borderTopRightRadius: 25, MozBorderRadiusBottomleft: 25 }}>
                                <p style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, borderEndStartRadius: 25, padding: 15, backgroundColor: '#be2596' }}>{chat.content}</p>
                              </div>
                            </div>
                          </div>
                        ) :
                          (
                            <div>
                              <div style={{ color: 'white' }}>
                                {/*<strong>Chat GPT:</strong>*/}
                                <p style={{ width: 'fit-content', maxWidth: '60%', padding: 15, borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomRightRadius: 25, backgroundColor: '#ffffff40' }}>{chat.content}</p>
                              </div>
                            </div>
                          )
                      }

                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='flex rounded-xl w-7/12' style={{ position: 'absolute', bottom: 10, padding: 10, borderWidth: 1 }}>
              <input
                type='text'
                placeholder='Enter your message here'
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  setTestChatHistory(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                className='rounded'
                style={{ backgroundColor: 'transparent', color: 'white', paddingLeft: 10, outline: 'none', border: 'none', width: '90%' }}
              />
              <Button onClick={handleSubmit} variant='contained' style={{ width: '20%', height: '50px', backgroundColor: '#800080', borderRadius: 10, textTransform: 'none' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
