const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dataChart = require('./utils/dataChart.js')





const app = express()
const port = process.env.PORT || 3000


const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicdirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Covid-19 App',
    })
})



app.get('/main', (req, res) => {
    const location = 'indonesia'
    dataChart(location, (error, data) => {

        
        // if ( data.length > 70 ) {
        //     var fdata = data.slice(data.length - 10, data.length)
        // }


    let empConf = []
    let empDate = []
    let empRec = []
    let empDea = []

    // for (const dataObj of fdata) {
    //     empConf.push(parseInt(dataObj.Confirmed))
    //     empDate.push(dataObj.Date.toString())
    //     empRec.push(parseInt(dataObj.Recovered))
    //     empDea.push(parseInt(dataObj.Deaths))
    // }

        
    empDate = data.map(country => {return country.Date})
    empConf = data.map(country => {return country.Confirmed})
    empRec = data.map(country => {return country.Recovered})
    empDea = data.map(country => {return country.Deaths})
    

    const lastCheckCon = empConf[empConf.length - 1]
    const lastCheckRec = empRec[empRec.length - 1]
    const lastCheckDea = empDea[empDea.length - 1]
    const percentageR = (lastCheckRec / lastCheckCon) * 100


    // const confirmed = data.map(country => ({ confirmed: country.Confirmed}))


    res.render('main', {
        title: 'Covid-19 App',
        tanggal: empDate,
        kasus: empConf,
        lc: lastCheckCon,
        lr: lastCheckRec,
        ld: lastCheckDea,
        pr: percentageR.toFixed(2)

        })
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Covid-19 App',
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' +port)
})


