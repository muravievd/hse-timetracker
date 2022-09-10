const rp = require('request-promise');
import 'cheerio'
import $ from 'cheerio'
const url = 'https://timetracker.hse.ru/schedule.aspx?organizationId=1';

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

export default function handler(req, res) {
    var pageContent
    rp(url)
        .then(function(html){
            //success!
            pageContent = parsePage(html)
            res.status(200).json(pageContent)
        })
}

function parsePage(content){
    var timetracker_schedule = {
        headers: "tbd",
        classes: [
        ]
    }
    var pageContent = {}
    pageContent['elemsname'] = []
    pageContent['elems'] = []
    let col_schedule_count = 0
    $('.col-schedule', content).each((_,e) => {
        let row = $(e).text()
        if(row.startsWith("\n") == false){
            timetracker_schedule.classes.push(
                {
                    group: row,
                    timetable: {
                        mon: [],
                        tue: [],
                        wed: [],
                        thu: [],
                        fri: [],
                        sat: [],
                        sun: []
                    }
                }
            )
            col_schedule_count ++
        }
    })
    col_schedule_count = 0
    var col_scheduleday
    $('.row', content).each((_,e) => {
        var col_day = $(".col-days", e).text().replace(/\s/g, '')
        var col_time = $(".col-times", e).text()
        var col_counter = 0
        if(col_day != ""){
            switch(col_day){
                case "ПН": {
                    col_scheduleday = "mon"
                }; break;
                case "ВТ": {
                    col_scheduleday = "tue"
                }; break;
                case "СР": {
                    col_scheduleday = "wed"
                }; break;
                case "ЧТ": {
                    col_scheduleday = "thu"
                }; break;
                case "ПТ": {
                    col_scheduleday = "fri"
                }; break;
                case "СБ": {
                    col_scheduleday = "sat"
                }; break;
                case "ВС": {
                    col_scheduleday = "sun"
                }; break;
            }
            $('.col-schedule', e).each((_,e) => {
                if($(e).text() == ""){
                    col_counter ++
                } else {
                    $('.schedule-lesson', e).each((_,i) => {
                        var lesson_title = $('.discipline', i).text().trim()
                        var lesson_type = $('.discipline-sub', i).text()
                        var lesson_room = $('.auditory', i).text()
                        var lesson_user = $('.user', i).text()
                        var lesson_time = col_time
                        timetracker_schedule.classes[[col_counter]].timetable[[col_scheduleday]].push({
                            title: lesson_title,
                            type: lesson_type,
                            room: lesson_room,
                            host: lesson_user,
                            time: lesson_time
                        })
                    })
                    col_counter ++
                }
            })
        } else {
            $('.col-schedule', e).each((_,e) => {
                if($(e).text() == ""){
                    col_counter ++
                } else {
                    $('.schedule-lesson', e).each((_,i) => {
                        var lesson_title = $('.discipline', i).text().trim()
                        var lesson_type = $('.discipline-sub', i).text()
                        var lesson_room = $('.auditory', i).text()
                        var lesson_user = $('.user', i).text()
                        var lesson_time = col_time
                        timetracker_schedule.classes[[col_counter]].timetable[[col_scheduleday]].push({
                            title: lesson_title,
                            type: lesson_type,
                            room: lesson_room,
                            host: lesson_user,
                            time: lesson_time
                        })
                    })
                    col_counter ++
                }
            })
        }
    })
    return timetracker_schedule
}