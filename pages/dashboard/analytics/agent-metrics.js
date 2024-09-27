import ImageHolder from "../../../components/ImageHolder"
import axios from "axios"
import directionDown from '../../../public/icons/direction-down.svg'
import down from '../../../public/icons/down.svg'
import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
import useSWR, { mutate } from "swr"
// import TheCalendar from "../../components/calendar"
import { useState, useEffect, useMemo } from "react"
import DateSelector from "../../../components/DateSelector"
import { testEnv } from "../../../components/Endpoints"
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

export default function AgentMetrics({ setToken, setDateRange, dateRange, week, setActiveDashboard, setActiveState, reformatDate }) {


    return (
        <div className="flex flex-col items-center pt-[60px] w-full">            
        </div>
    )
}

// 

AgentMetrics.Layout = MetricLayoutTemplate