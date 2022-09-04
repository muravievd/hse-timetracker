import styles from './home.module.css'
import timetracker_icon from '../public/timetracker.svg'
import Image from 'next/image'
import { customLoader } from './_app'
import { useState, useEffect } from 'react'

var timetracker_schedule = {
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
                        host: "Ветров Иван Викторович"
                    },
                    {
                        title: "Креативное проектирование (Основы проектирования. Малый фирменный стиль)",
                        type: "Лекция",
                        startTime: ['13', '00'],
                        stopTime: ['14', '20'],
                        room: "М.П.261",
                        host: "Ветров Иван Викторович"
                    },
                    {
                        title: "Креативное проектирование (Adobe Illustrator (базовый уровень))",
                        type: "Лекция",
                        startTime: ['14', '40'],
                        stopTime: ['16', '00'],
                        room: "М.П.261",
                        host: "Девяткина Мария Вячеславовна"
                    },
                    {
                        title: "Креативное проектирование (Adobe Illustrator (базовый уровень))",
                        type: "Лекция",
                        startTime: ['16', '20'],
                        stopTime: ['17', '40'],
                        room: "М.П.261",
                        host: "Девяткина Мария Вячеславовна"
                    },
                ]
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

function fillSchedule(){
    var schedule = []
    for(const classEntity of timetracker_schedule.classes){
        var classContainer = []
        var scheduleContainer = []
        for(const scheduleEntity in classEntity.timetable){

            scheduleContainer.push(<HomeContentEntity time="11:10 - 12:30" room="М.П. 261" type="Лекция" classTime="2 пара" title="Креативное проектирование (Основы проектирования. Малый фирменный стиль)" host="Ветров Иван Викторович"/>)
        }
        classContainer.push(
            <div className={styles.HomeClass}>{classEntity.group}</div>  
        )
        classContainer.push(
            <div className={styles.HomeClassContent}>
                <div className={styles.HomeClassEntity}>
                    <div className={styles.HomeClassDay}>Пн, сегодня</div>
                    <div className={styles.HomeClassDayContent}>
                        {scheduleContainer}
                    </div>
                </div>
            </div>
        )
        schedule.push(classContainer)

    }
    return schedule
}

export default function Home(){
    var fillContent = fillSchedule()
    var [content, setContent] = useState(fillContent)
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