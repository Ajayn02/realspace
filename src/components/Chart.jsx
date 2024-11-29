import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS,LineElement, PointElement,LinearScale,CategoryScale,Title,Tooltip,Legend,Filler} from 'chart.js'

ChartJS.register(LineElement,PointElement,LinearScale,Title,Tooltip,CategoryScale,Legend,Filler)

function Chart() {


    const salesData={
        labels:['Jan','Feb','Mar','Apr','May'],
        datasets:[
            {
                label:'Sales Data (2024)',
                data:[3000,4000,7000,4000,9000],
                backgroundColor:'#4bc0c0',
                border:'#4bc0c02e',
                pointBackgroundColor:['red','blue','violet','green','yellow'],
                fill:true

            }
        ]
    }


  return (
    <>
        <h3>Chart</h3>
        <Line data={salesData} type='line' ></Line>
    </>
  )
}

export default Chart