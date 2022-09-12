import styles from './home.module.css'
import timetracker_icon from '../public/timetracker.svg'
import Image from 'next/image'
import { customLoader } from './_app'
import { useState, useEffect } from 'react'
import { getScheduleData } from '../lib/services'
import 'jquery'
import $ from 'jquery'
import gsap from 'gsap'

var filterState = 0

function HomeHead(props){
    return(
        <div className={styles.HomeHead}>
            <div className={styles.HomeHead_logo}>
                <Image src={timetracker_icon} alt="" loader={customLoader} />
            </div>
            <div className={styles.HomeHead_userSpace}>
                <div className={styles.HomeHead_userName}>{props.userName}</div>
                <div className={styles.HomeHead_exitbtn}>Выйти</div>
            </div>
        </div>
    )
}

function fillSchedule(data, detailsFunc){
    var timetracker_schedule = data
    console.log(timetracker_schedule)
    if (typeof window !== 'undefined') {
        var schedule = []
        for(const classEntity of timetracker_schedule.classes){
            var classContainer = []
            var classContent = []
            var scheduleContainer = []
            classContainer.push(
                <div className={styles.HomeClass}>{classEntity.group}</div>  
            )
            for(const scheduleDay in classEntity.timetable){
                if(classEntity.timetable[scheduleDay].length > 0){
                    for(const scheduleEntity of classEntity.timetable[scheduleDay]){
                        scheduleContainer.push(<HomeContentEntity onClick={() => displayHCDetails(detailsFunc, {time: scheduleEntity.time, room: scheduleEntity.room, type: scheduleEntity.type, title: scheduleEntity.title, host: scheduleEntity.host})} time={scheduleEntity.time} room={scheduleEntity.room} type={scheduleEntity.type} classTime={scheduleEntity.note} title={scheduleEntity.title} host={scheduleEntity.host}/>)
                    }
                    var classDay
                    switch(scheduleDay){
                        case "mon": {
                            classDay = "Пн"
                        }; break;
                        case "tue": {
                            classDay = "Вт"
                        }; break;
                        case "wed": {
                            classDay = "Ср"
                        }; break;
                        case "thu": {
                            classDay = "Чт"
                        }; break;
                        case "fri": {
                            classDay = "Пт"
                        }; break;
                        case "sat": {
                            classDay = "Сб"
                        }; break;
                        case "sun": {
                            classDay = "Вс"
                        }; break;
                    }
                    classContent.push(
                        <div className={styles.HomeClassEntity}>
                            <div className={styles.HomeClassDay}>{classDay}</div>
                            <div className={styles.HomeClassDayContent}>
                                {scheduleContainer}
                            </div>
                        </div>
                    )
                    scheduleContainer = []
                }
            }
            classContainer.push(
                <div className={styles.HomeClassContent}>
                    {classContent}
                </div>
            )
            schedule.push(classContainer)

        }
        console.log(schedule)
        return schedule
    }

}

export default function Home(props){
    var [content, setContent] = useState([])
    var [filters, setFilters] = useState([])
    var [contentDetails, setContentDetails] = useState([])
    const fillContent = async () => {
        const data = await getScheduleData()
        setContent(fillSchedule(data, setContentDetails))
        var filterData = []
        for(const filterEntity of data.classes){
            filterData.push(filterEntity)
        }
        setFilters(<HomeFiltersEntity title="Все группы" content={data} />)
        gsap.fromTo('.IndexPlaceholder', {top: '0%', opacity: '1'}, {top: '-2%', opacity: '0', duration: .5})
        setTimeout(function(){
            props.placeholderFunc([])
        }, 500)
    }
    useEffect(() => {
        fillContent()
    }, [])
    return(
        <div id='HomePage' className={styles.Home}>
            <HomeHead userName="Муравьев Дмитрий Александрович" />
            <div id='HomeBar' className={styles.HomeBar}>
                <div style={{"opacity": 1}} id='HomeBar_schedule'>Расписание</div>
                <div id='HomeBar_rooms'></div>
                <div id='HomeBar_absent'></div>
            </div>
            <div id='HomeFilters' className={styles.HomeFilters}>
                {filters}
                <HomeFiltersEntity title="2022/2023" />
                <HomeFiltersEntity title="Курс 1" />
                <HomeFiltersEntity title="Бакалавриат" />
                <HomeFiltersEntity title="Очная" />
            </div>
            <div onScroll={() => hideHead()} id="HomeContent" className={styles.HomeContent}>
                {content}
            </div>
            {contentDetails}
        </div>
    )
}

function hideHead(){
    var headScroll = $("#HomeContent").scrollTop()
    if(headScroll > 200){
        gsap.to("#HomeBar_schedule", {opacity: '0', y: -10, duration: .2})
        gsap.to("#HomeFilters", {opacity: '0', height: '0px', paddingTop: "0vh", y: -10, duration: .2})
        gsap.to("#HomeBar", {height: "0px", paddingTop: "0vh", duration: .2})
        gsap.to("#HomeContent", {height: "90vh", duration: .2})
    } else {
        gsap.to("#HomeBar_schedule", {opacity: '1', y: 0, duration: .2})
        gsap.to("#HomeFilters", {opacity: '1', paddingTop: "3vh", height: 'auto', y: 0, duration: .2})
        gsap.to("#HomeBar", {height: "auto", paddingTop: "4vh", duration: .2})
        gsap.to("#HomeContent", {height: "73vh", duration: .2})
    }

}

function displayHCDetails(detailsFunc, props){
    detailsFunc(<HomeContentDetails onClick={() => detailsFunc([])} title={props.title} type={props.type} time={props.time} room={props.room} host={props.host}/>)
}



function HomeContentDetails(props){
    return(
        <div className={styles.HomeContentDetails}>
            <div className={styles.HCD_Head}>
                <div onClick={props.onClick} className={styles.HCD_backbtn}>
                    к расписанию
                </div>
                <div className={styles.HCD_HeadContent}>
                    <div className={styles.HCD_title}>
                    {props.title} 
                    </div>
                    <div className={styles.HCD_HeadDetails}>
                        <div className={styles.HCD_HD_type}>
                            {props.type}
                        </div>
                        <div className={styles.HCD_HD_time}>{props.time}</div>
                        <div className={styles.HCD_HD_room}>{props.room}</div>
                    </div>
                </div>
                <div className={styles.HCD_Host}>{props.host}</div>
            </div>
        </div>
    )
}

function HomeContentEntity(props){
    return(
        <div onClick={props.onClick} className={styles.HomeContentEntity}>
            <div className={styles.HCE_infoContainer}>
                <div className={styles.HCE_infoContainerEntity}>{props.time}</div>
                <div className={styles.HCE_infoContainerEntity}>{props.room}</div>
            </div>
            <div className={styles.HCE_roomContainer}>
                <div className={styles.HCE_roomHighlight}>{props.type}</div>
                <div className={styles.HCE_roomTime}>{props.classTime}</div>
            </div>
            <div className={styles.HCE_title}>{props.title}</div>
            <div className={styles.HCE_host}>{props.host}</div>
        </div>
    )
}

function HomeFiltersEntity(props) {
    var [filterContent, setFilterContent] = useState([])
    var selector = ["Entry", "Entry", "Entry", "Entry", "Entry"]
    var selectorContent = []
    for(const selectorEntity of selector){
        selectorContent.push(<HomeFiltersSelectorEntity title={selectorEntity} />,)
    }
    var filterCompiled = []
    const displayContents = () => {
        if(filterState == 0){
            filterCompiled.push(<div className={styles.HomeFiltersEntity_selector}>{selectorContent}</div>)
            setFilterContent(filterCompiled)
            filterState = 1
        } else {
            setFilterContent([])
            filterState = 0
        }
    }
    return(
        <div onClick={displayContents} className={styles.HomeFiltersEntity}>
            {props.title}
            {filterContent}
        </div>
    )
}

function HomeFiltersSelectorEntity(props){
    return(
        <div className={styles.HomeFiltersSelectorEntity}>
            {props.title}
        </div>
    )
}