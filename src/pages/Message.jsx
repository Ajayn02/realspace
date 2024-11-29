import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userimg from '../icons/userimg.png'
import Badge from 'react-bootstrap/Badge';
import { getchatsApi, sendChatApi, getOneChatApi } from '../services/allapis';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import './Message.css'
import base_url from '../services/base_url';

// const socket = io.connect("http://localhost:3001")


function Message() {

  const [chatData, setChatData] = useState([])
  const [message, setMessage] = useState({
    send: "", content: ""
  })

  const [userChat, setUserChat] = useState([])
  const [response, setResponse] = useState("")
  const [newMessage, setNewMessage] = useState([])



  // useEffect(() => {

  //   socket.on("receive_msg", (data) => {
  //     if (data.send !== sessionStorage.getItem("username")) {
  //       setNewMessage(data)
  //       console.log(data);
  //     }
  //     //  else {
  //     //   console.log("condition failed in useEffect");
  //     // }
  //   })
  // }, [socket])


  useEffect(() => {
    if (sessionStorage.getItem("chatid")) {
      displaySpecificChat()
      setNewMessage("")
    }
    // },[response])
  }, [response, newMessage])

  useEffect(() => {
    displayChats()
  }, [])

  const displayChats = async () => {
    const header = {
      'Content-Type': "application/json",
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const res = await getchatsApi(header)
    // console.log(res);
    if (res.status == 200) {
      setChatData(res.data)
    }

  }


  const handleChatmsg = async (id) => {
    setUserChat([])
    sessionStorage.setItem("chatid", id)
    displaySpecificChat()
  }


  const displaySpecificChat = async () => {

    const header = {
      'Content-Type': "application/json",
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const id = sessionStorage.getItem("chatid")
    const res5 = await getOneChatApi(header, id)
    // console.log(res5.data.receiveName);
    if (res5.status == 200) {
      setUserChat(res5.data)
      // socket.emit("roomId", id)
      sessionStorage.setItem("receiverName", res5.data.sendName === sessionStorage.getItem("username") ? res5.data.receiveName : res5.data.sendName)
    } else {
      console.log(res5);
    }

  }



  const sendMsg = async (id) => {
    setNewMessage([])
    const header = {
      'Content-Type': "application/json",
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const { content, send } = message
    const emitingData = {
      content: content,
      send: send,
      roomId: sessionStorage.getItem("chatid"),
      receiverName: sessionStorage.getItem("receiverName")
    }

    if (!content || !send) {
      toast.error("Enter Valid Inputs")
    } else {
      // socket.emit("newmsg", emitingData)
      const result = await sendChatApi(header, message, id)
      // console.log(result);
      if (result.status == 200) {
        setResponse(result)
        setMessage({ send: "", content: "" })
      } else {
        console.log(result);
      }
    }

  }




  return (
    <>
      <div className='container-fluid d-flex ' style={{ height: '100vh', backgroundColor: "#edecfb" }}>
        <Row>
          <Col md={4} lg={4} className='border   ' style={{ overflowY: "scroll" }} >
            <div className='container-fluid px-0' style={{ width: "100%" }}>

              {/* my account */}
              <div className='d-flex mt-3 container  align-items-center  py-3 px-2' style={{ cursor: "pointer" ,width:"100%" }}>
              <img src={userimg} alt="" width={"15%"} className='ms-3' style={{ border: "1px solid black", borderRadius: "30px" }} />

                <div className='d-flex justify-content-center ' style={{ flexDirection: "column" }}>
                  <h5 className='ms-3' >{sessionStorage.getItem('username')}</h5>
                  <Link className='ms-3' to={'/acc'}>
                    My Account
                    <i className="fa-solid fa-gear ms-1" style={{ color: "#0c0d0d", }} />
                  </Link>
                </div>
              </div>

              <h6 className='ms-4 py-2'>Messages</h6>

              {
                chatData?.length > 0 ?
                  chatData.map(item => (
                    <div key={item._id} className='d-flex   align-items-center p-2 ' style={{ cursor: "pointer" }} onClick={() => { handleChatmsg(item._id) }} >
                      <img src={item.sendName==sessionStorage.getItem("username")?`${base_url}/uploads/${item.receiveProfile}`: `${base_url}/uploads/${item.sendProfile}`} alt="" width={"13%"} className='ms-3' style={{ border: "1px solid black", borderRadius: "30px" }} />
                      {/* <img src={userimg} alt="" width={"13%"} className='ms-3' style={{ border: "1px solid black", borderRadius: "30px" }} /> */}
                      <div className='d-flex justify-content-center mt-2' style={{ flexDirection: "column" }}>
                        <h5 className='ms-3'>{item.sendName === sessionStorage.getItem("username") ? item.receiveName : item.sendName}</h5>
                      </div>
                      
                        
                        {/* <Badge bg='' className='ms-auto me-3' style={{ backgroundColor: "#796edd" }} >1</Badge> */}

                      

                    </div>
                  ))
                  :
                  <h4>No Messages </h4>
              }


            </div>
          </Col>
          <Col md={8} style={{ padding: "0px", }}  >
            {
              userChat.sendName ?
                <>
                  <div className='container-fluid  p-0' style={{ width: "100%" }}>


                    {/* head */}
                    <div className='d-flex  align-items-center px-2  my-0' style={{ height: "15vh", width: "100%", backgroundColor: "#f0f1fd" }} >
                      <img src={userChat.sendName==sessionStorage.getItem("username")?`${base_url}/uploads/${userChat.receiveProfile}`: `${base_url}/uploads/${userChat.sendProfile}`} alt="" width={"40px"} className='ms-3' style={{ border: "1px solid black", borderRadius: "30px" }} />
                      {/* <img src={userimg} alt="" width={"40px"} className='ms-3' style={{ border: "1px solid black", borderRadius: "30px" }} /> */}
                      <div className='d-flex justify-content-center mt-2' style={{ flexDirection: "column" }}>
                        <h5 className='ms-3'>{userChat?.sendName === sessionStorage.getItem("username") ? userChat.receiveName : userChat.sendName}</h5>
                      </div>
                    </div>

                    {/* chat */}


                    <div className=' m-0 pt-2' style={{ width: "100%", height: "70vh", overflowY: "scroll", backgroundColor: "#f0f1fd" }}>

                      {
                        userChat.message.length > 0 ?

                          userChat.message.map((item) => (

                            <div key={item.send} className={item.send == sessionStorage.getItem('username') ? 'border  my-2 mx-2 ms-auto text-light p-2 text-end me-1' : 'border   me-auto mx-2 my-2 p-2'} style={item.send == sessionStorage.getItem('username') ? { maxWidth: "300px", borderRadius: " 10px 10px 0px 10px", backgroundColor: "#6f5ad1" } : { maxWidth: "300px", borderRadius: " 10px 10px 10px 0px", backgroundColor: "#ced1f7" }}>
                              {item.content}
                            </div>

                          ))
                          :
                          <h4 className='text-center'>No messages</h4>
                      }

                      {
                        newMessage.receiverName===sessionStorage.getItem("username")&&newMessage.send===sessionStorage.getItem("receiverName") &&
                        <div className='border   me-auto mx-2 my-2 p-2' style={{ maxWidth: "300px", borderRadius: " 10px 10px 10px 0px", backgroundColor: "#ced1f7"  }}>
                          {newMessage.content}
                        </div>
                      }
                     

                    </div>

                  </div>

                  {/* inputbox */}
                  <div className='container-fluid  d-flex justify-content-center align-items-center py-3' style={{ width: "100%", height: "15vh", backgroundColor: " #f0f1fd" }}>
                    <input type="text" className='form-control me-3' placeholder='Type Your Message' style={{ height: "45px", maxWidth: "700px" }} onChange={(e) => { setMessage({ ...message, content: e.target.value, send: sessionStorage.getItem("username") }) }} defaultValue={message.content} />
                    <button className='btn   py-2 ' style={{ borderRadius: "50%", border: "2px solid #272145" }} onClick={() => { sendMsg(userChat._id) }} >
                      <i className="fa-regular fa-paper-plane fa-lg" style={{ color: "#272145", }} />
                    </button>
                  </div>
                </>
                :
                <h4 className='mt-5 text-center'>Tap Chats to get Messages</h4>
            }



          </Col>
        </Row>
      </div>

    </>
  )
}

export default Message