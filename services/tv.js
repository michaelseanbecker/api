import dotenv from 'dotenv'
dotenv.config()
import xml2json from 'xml2json'
import store from '../utils/store.js'

async function run() {
  const tv = await fetch("https://trakt.tv/users/msbfyi/history/episodes/added/asc.atom?slurm=f44d8dce79bf7df065a146292443a94c")
    .then(response => response.text())
    .then(str => xml2json.toJson(str, { object: true }))
    .then(data => {
        return data.feed.entry.slice(0, 3).map(b => {
            return {
                title: b.title,
                link: b.link,
                image: b['media:thumbnail'],
            }
        })
    })

    console.log(tv)

    store.set('tv', tv)
}


run();
