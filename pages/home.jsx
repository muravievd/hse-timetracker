import styles from './home.module.css'
import timetracker_icon from '../public/timetracker.svg'
import Image from 'next/image'
import { customLoader } from './_app'
import { useState, useEffect } from 'react'
import { getScheduleData } from '../lib/services'

var timetracker_schedule_demodata = {
    headers: "tbd",
    classes: [
        {
            group: "Б22ДЗ01 (Ветров И. В.)",
            timetable: {
                mon: [
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ["11", "10"],
                        stopTime: ["12", "30"],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: "c 5.09 по 23.10"
                    },
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ['13', '00'],
                        stopTime: ['14', '20'],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: ""
                    },
                    {
                        title: "Креативное проектирование (Adobe Illustrator (базовый уровень))",
                        type: "Лекция",
                        startTime: ['14', '40'],
                        stopTime: ['16', '00'],
                        room: "М.П.261",
                        host: "Девяткина Мария Вячеславовна",
                        note: ""
                    },
                    {
                        title: "Креативное проектирование (Adobe Illustrator (базовый уровень))",
                        type: "Лекция",
                        startTime: ['16', '20'],
                        stopTime: ['17', '40'],
                        room: "М.П.261",
                        host: "Девяткина Мария Вячеславовна",
                        note: ""
                    },
                ],
                tue: [
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ["11", "10"],
                        stopTime: ["12", "30"],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: ""
                    },
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ['13', '00'],
                        stopTime: ['14', '20'],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: ""
                    },
                    {
                        title: "Креативное проектирование (Adobe Illustrator (базовый уровень))",
                        type: "Лекция",
                        startTime: ['14', '40'],
                        stopTime: ['16', '00'],
                        room: "М.П.261",
                        host: "Девяткина Мария Вячеславовна",
                        note: ""
                    },
                ],
                wed: [
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ["11", "10"],
                        stopTime: ["12", "30"],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: ""
                    },
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ['13', '00'],
                        stopTime: ['14', '20'],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович",
                        note: ""
                    },

                ],
                
            }
        }
    ]
}

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

function fillSchedule(data){
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
                        scheduleContainer.push(<HomeContentEntity time={scheduleEntity.time} room={scheduleEntity.room} type={scheduleEntity.type} classTime={scheduleEntity.note} title={scheduleEntity.title} host={scheduleEntity.host}/>)
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

export default function Home(){
    var [content, setContent] = useState([])
    const fillContent = async () => {
        const data = await getScheduleData()
        setContent(fillSchedule(data))
    }
    useEffect(() => {
        fillContent()
    }, [])
    return(
        <div id='HomePage' className={styles.Home}>
            <HomeHead userName="Муравьев Дмитрий Александрович" />
            <div className={styles.HomeBar}>
                <div style={{"opacity": 1}} id='HomeBar_schedule'>Расписание</div>
                <div id='HomeBar_rooms'>Свободные аудитории</div>
                <div id='HomeBar_absent'>Отсутствия студентов</div>
            </div>
            <div className={styles.HomeFilters}>
                <HomeFiltersEntity title="Все группы" />
                <HomeFiltersEntity title="2022/2023" />
                <HomeFiltersEntity title="Курс 1" />
                <HomeFiltersEntity title="Бакалавриат" />
                <HomeFiltersEntity title="Очная" />
            </div>
            <div className={styles.HomeContent}>
                {content}
            </div>
        </div>
    )
}

function HomeContentEntity(props){
    return(
        <div className={styles.HomeContentEntity}>
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
    return(
        <div className={styles.HomeFiltersEntity}>
            {props.title}
        </div>
    )
}