import * as cron from "node-cron";
import * as rp from 'request-promise';
import * as path from 'path'
import * as fs from 'fs'

let pageNumber = 1

cron.schedule("*/1 * * * *", async () => {
    rp.get(`https://reqres.in/api/users?page=${pageNumber}`).then(result => {
        if (result.length === 0) {
            console.log("No more data to retrieve")
        } else {
            let text = ''
            const file = path.join(__dirname, './generated_data', `/users.json`)
            const newData = JSON.parse(result).data
            const removingArrayFromData = JSON.stringify(newData).slice(1,-1)
            try {
                if (fs.existsSync(file)) {
                    const contents = fs.readFileSync(file, 'utf8')
                    text += contents + ", "
                    text += removingArrayFromData
                    fs.writeFileSync(file, text)        
                } else {
                    fs.writeFileSync(file, removingArrayFromData)
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
    pageNumber += 1
})

