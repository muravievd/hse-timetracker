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
var filtersArray = {
    group: []
}

function HomeHead(props){
    return(
        <div id='HomeHead' className={styles.HomeHead}>
            <div className={styles.HomeHead_logo}>
                <Image src={timetracker_icon} alt="" loader={customLoader} />
            </div>
            <div className={styles.HomeHead_userSpace}>
                <div className={styles.HomeHead_userName}>{props.userName}</div>
                <div className={styles.HomeHead_exitbtn}></div>
            </div>
        </div>
    )
}

function fillSchedule(data, detailsFunc, datasel){
    var timetracker_schedule = data
    console.log(timetracker_schedule)
    if (typeof window !== 'undefined') {
        var schedule = []
        if(!datasel){
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
        } else {
            for(const classEntity of timetracker_schedule.classes){
                var classContainer = []
                var classContent = []
                var scheduleContainer = []
                if(classEntity.group == datasel){
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
            }
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
        var filterData = ["Все группы"]
        for(const filterEntity of data.classes){
            filterData.push(filterEntity.group)
        }
        setFilters(<HomeFiltersEntity title="Все группы" options={filterData} callback={(e) => {setContent(fillSchedule(data, setContentDetails, e))}} />)
        gsap.fromTo('.IndexPlaceholder', {top: '0%', opacity: '1'}, {top: '-2%', opacity: '0', duration: .5})
        gsap.from('#HomeHead', {y: '50', opacity: '0', duration: 1})
        gsap.from('#HomeBar', {y: '50', opacity: '0', duration: 1, delay: .1})
        gsap.from('#HomeSeparator', {y: '50', opacity: '0', duration: 1, delay: .2})
        gsap.from('#HomeFilters', {y: '50', opacity: '0', duration: 1, delay: .3})
        gsap.from('#HomeContent', {y: '50', opacity: '0', duration: 1, delay: .4})
        setTimeout(function(){
            props.placeholderFunc([])
        }, 500)
    }
    useEffect(() => {
        fillContent()
    }, [])
    return(
        <div id='HomePage' className={styles.Home}>
            <div id='HomeBar_container' className={styles.HomeBar_container}>
                <HomeHead userName="" />
                <div id='HomeBar' className={styles.HomeBar}>
                    <div style={{"opacity": 1, "will-change": "transform"}} id='HomeBar_schedule'>Расписание</div>
                    <div id='HomeBar_rooms'></div>
                    <div id='HomeBar_absent'></div>
                </div>
                <div id='HomeSeparator' className={styles.HomeSeparator}></div>
                <div id='HomeFilters' className={styles.HomeFilters}>
                    {filters}
                </div>
            </div>
            <div id="HomeContent" className={styles.HomeContent}>
                {content}
            </div>
            {contentDetails}
        </div>
    )
}

if (typeof window !== "undefined") {
    $(window).on('scroll', function(){
        var headScroll = $(window).scrollTop()
        if(headScroll > 50){
            gsap.to("#HomeBar_schedule", {opacity: '0', y: -10, duration: .2})
            gsap.to("#HomeFilters", {opacity: '0', height: '0px', paddingTop: "0vh", y: -10, duration: .2})
            gsap.to("#HomeBar", {height: "0px", paddingTop: "0vh", duration: .2})
            gsap.to("#HomeSeparator", {height: "0px", duration: .1})
            gsap.to("#HomeBar_container", {paddingTop: "2vh", paddingBottom: "2vh", duration: .1})
        } else {
            gsap.to("#HomeBar_schedule", {opacity: '1', y: 0, duration: .2})
            gsap.to("#HomeFilters", {opacity: '1', paddingTop: "3vh", height: 'auto', y: 0, duration: .2})
            gsap.to("#HomeBar", {height: "auto", paddingTop: "4vh", duration: .2})
            gsap.to("#HomeSeparator", {height: "1px", duration: .1})
            gsap.to("#HomeBar_container", {paddingTop: "4vh", duration: .1})
        }

    })
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
                <div className={styles.HCE_roomHighlight}>{props.type}</div>
                <div className={styles.HCE_infoContainerEntity}>{props.room}</div>
            </div>
            <div className={styles.HCE_titleContainer}>
                <div className={styles.HCE_title}>{props.title}</div>
                <div className={styles.HCE_host}>{props.host}</div>
            </div>
        </div>
    )
}

function HomeFiltersEntity({options, callback}) {
    const [selected, setSelected] = useState(options[0]);
    const [expanded, setExpanded] = useState(false);
    function expand() {
        setExpanded(false)
        console.log("expand")
        setExpanded(true);
        gsap.fromTo('#HomeFiltersEntity_selector', {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: .2})
    }

    function close() {
        console.log("Fired close")
        gsap.to('#HomeFiltersEntity_selector', {y: -20, opacity: 0, duration: .2})
        setTimeout(() => {
            setExpanded(false);
        }, 200);
    }

    function select(event) {
        const value = event.target.textContent;
        console.log("Fired select")
        if(value == "Все группы"){
            callback()
        } else {
            callback(value);
        }
        setSelected(value);
        setExpanded(false)
    }
    return (
        <div className={styles.HomeFiltersEntity} tabIndex={0} onFocus={expand} onBlur={close} >
            <div onClick={expand} className={styles.HomeFiltersButton}>{selected}</div>
            {expanded ? (
                <div id='HomeFiltersEntity_selector' className={styles.HomeFiltersEntity_selector}>
                    {options.map((O) => (
                        <div className={styles.HomeFiltersSelectorEntity} onClick={select}>
                            {O}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

function HomeFiltersSelectorEntity(props){
    return(
        <div className={styles.HomeFiltersSelectorEntity}>
            {props.title}
        </div>
    )
}