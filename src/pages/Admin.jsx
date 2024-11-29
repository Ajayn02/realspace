import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Chart from '../components/Chart'
import Table from 'react-bootstrap/Table';
import { useNavigate, Link } from 'react-router-dom';
import { getReportsApi, deletePostApi, removeReport, getOtherRepApi,delOtherRepApi } from '../services/allapis';
import toast from 'react-hot-toast';

function Admin() {
    const [data, setData] = useState([])
    const [val, setVal] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("admin")) {
            nav('/admin')
        } else {
            nav('/home')
        }
    }, [])

    useEffect(() => {
        displayReports()
        getOtherReports()
    }, [])


    const displayReports = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getReportsApi(header)
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }

    }

    const handleRemoveFromDB = async (postId, id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res1 = await deletePostApi(header, postId)
        // console.log(res1);
        if (res1.status == 200) {
            handleIgnore(id)
        } else {
            console.log(res1);
            toast.error("Something Went Wrong")
        }

    }

    const handleIgnore = async (id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res2 = await removeReport(header, id)
        if (res2.status == 200) {
            toast.success("Removed")
            displayReports()
        } else {
            console.log(res2);
            toast.error("Something Went Wrong")

        }
    }

    const getOtherReports = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getOtherRepApi(header)
        // console.log(res);
        if (res.status == 200) {
            setVal(res.data)
        } else {
            console.log(res);
        }

    }

    const handleOtherDel=async(id)=>{
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res3=await delOtherRepApi(header,id)
        // console.log(res3);
        if(res3.status==200){
            toast.success("Deleted")
            getOtherReports()
        }else{
            console.log(res3);
            toast.error("Something Went Wrong")
        }
        
    }


    const handleHome = async () => {
        sessionStorage.removeItem('admin')
        nav('/home')
    }

    // console.log(data);
    // console.log(val);


    return (
        <>
           

            <div className='container-fluid d-flex justify-content-between mb-3  py-3 align-items-center' style={{ backgroundColor: "#85aae6" }}>
                <div>
                    <h2 className='ms-2'>Admin Dashboard</h2>
                </div>
                <div>
                    <button className='btn btn-success me-2' onClick={handleHome} >
                        <i className="fa-regular fa-share-from-square me-2" style={{ color: "#f0f2f4", }} />
                        Home
                    </button>
                </div>
            </div>


            <div className='container-fluid' style={{ width: "100%" }}>
                <Row className='my-4 d-flex align-items-center' style={{ justifyContent: "space-evenly" }}>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className=' my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ border: "2px solid black", borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem" }}>
                            <div className='d-flex'>
                                <i className="fa-solid fa-users fa-2x   me-2" style={{ color: "#B197FC", }} />
                                <h4>Total Users</h4>
                            </div>
                            <h5>12334</h5>
                        </div>
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className=' my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ border: "2px solid black", borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem" }}>
                            <div className='d-flex'>
                                <i className="fa-solid fa-image fa-2x me-2" style={{ color: "#B197FC", }} />                                <h4>Total Posts</h4>
                            </div>
                            <h5>12334</h5>
                        </div>
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className=' my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ border: "2px solid black", borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem" }}>
                            <div className='d-flex'>
                                <i className="fa-solid fa-users fa-2x   me-2" style={{ color: "#B197FC", }} />
                                <h4>Total Users</h4>
                            </div>
                            <h5>12334</h5>
                        </div>
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className=' my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ border: "2px solid black", borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem" }}>
                            <div className='d-flex'>
                                <i className="fa-solid fa-users fa-2x   me-2" style={{ color: "#B197FC", }} />
                                <h4>Total Users</h4>
                            </div>
                            <h5>12334</h5>
                        </div>
                    </Col>

                    <Col lg={7} md={8} sm={12} className=''>
                        <Chart />
                    </Col>

                </Row>
               
            </div>

            <div className='container-fluid my-3'>
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <div className='container-fluid py-3 mt-3 shadow rounded' style={{ height: "90vh", overflowY: "scroll" }}>
                            <h3>Post Reports
                                <i className="fa-solid fa-triangle-exclamation fa-md ms-2" style={{ color: "#B197FC", }} />
                            </h3>
                            {
                                data?.length > 0 ?
                                    <Table responsive className='table mt-3 table-hover text-center '>
                                        <thead>
                                            <tr>
                                                {/* <th>UserId</th> */}
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.map((item, index) => (
                                                    <tr key={item?._id}>
                                                        <td>{index + 1}</td>
                                                        <th>
                                                            <Link to={`/view/${item?.postId}`} className='btn btn-success' style={{width:"max-content"}} >
                                                                View Post
                                                            </Link>
                                                        </th>
                                                        <th>
                                                            <button className='btn btn-info' onClick={() => { handleIgnore(item?._id) }} style={{width:"max-content"}} >
                                                                Ignore
                                                            </button>
                                                        </th>
                                                        <th>
                                                            <button className='btn btn-danger ' onClick={() => { handleRemoveFromDB(item?.postId, item?._id) }} style={{width:"max-content"}} >
                                                                {/* <i className="fa-solid fa-trash fa-lg" style={{ color: "#cb153a", }} /> */}
                                                                Remove From Database
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </Table>
                                    :
                                    <h4 className='text-center'>No Reports Yet</h4>
                            }

                        </div>
                    </Col>

                    <Col lg={4} md={12} sm={12}>
                        <div className='container-fluid border rounded p-3 mt-3 shadow' style={{ height: "90vh", overflowY: "scroll" }} >
                            <h5>User Reports !</h5>

                            {
                                val?.length > 0 ?
                                    val.map((item) => (
                                        <div key={item?._id} className='container-fluid mt-3 w-100 border rounded p-2'>
                                            <div className='d-flex justify-content-between'>
                                                <h6 className='mt-2'>UseriD : <span style={{color:"blue"}}>{item?.userId}</span> </h6>
                                                <button className='btn  ' onClick={()=>{handleOtherDel(item?._id)}} >
                                                    <i className="fa-solid fa-trash fa-md" style={{ color: "#cb153a", }} />
                                                </button>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>{item?.problem}</p>
                                        </div>
                                    ))
                                :
                                <h4 className='text-center'>No Reports Yet</h4>
                            }



                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Admin