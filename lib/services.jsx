import React from "react"

export async function getScheduleData() {
    const response = await fetch('/api/scraper')
    return response.json()
}