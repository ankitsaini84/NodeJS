const chalk = require('chalk')
const fs = require('fs')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch(e) {
        return []
    }
}

const saveNotes = (_notes) => {
    const jsonData = JSON.stringify(_notes)
    fs.writeFileSync('./notes.json', jsonData)
}

const create = (_title, _body) => {
    const notes = loadNotes()

    // verify if note with provided title title already exists
    // ~ function below will be executed for each item found in the notes array,
    // and will keep on appending matched items to 'duplicatNotes' array.
    //
    // const duplicateNotes = notes.filter(function(_note) {
    //    return _note.title === _title
    // })
    // ------- OR --------
    const duplicateNotes = notes.filter((_note) => _note.title === _title) // default return
    if(duplicateNotes.length === 0) {
        // add new record to notes
        notes.push({
            title: _title,
            body: _body
        })

        // save all records to file
        saveNotes(notes)
        console.log(chalk.green('Note Added.'))
    } else {
        console.log(chalk.red('Note Already Exists!'))
    }
}

const remove = (_title) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((_note) => _note.title !== _title)

    if(filteredNotes.length === notes.length) {
        console.log(chalk.red('Invalid Note Title!'))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.green('Note Deleted.'))
    }
}

const update = (_title, _body) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((_note) => _note.title !== _title)

    if(filteredNotes.length === notes.length) {
        console.log(chalk.red('Invalid Note Title!'))
    } else {
        filteredNotes.push({
            title: _title,
            body: _body
        })
        saveNotes(filteredNotes)
        console.log(chalk.green('Note Edited.'))
    }
}

const list = () => {
    const notes = loadNotes()
    
    console.log(chalk.green('Listing Notes..'))
    notes.forEach((_note) => {
        console.log(chalk.yellow(_note.title) + chalk.black('\t\t| ') + chalk.whiteBright(_note.body))
    })
}

const display = (_title) => {
    const notes = loadNotes()

    const showNote = notes.filter((_note) => _note.title === _title)

    if(showNote.length === 0) {
        console.log(chalk.red("Invalid Note Title!"))
    } else {
        console.log(chalk.green('Showing Note : ') + chalk.yellow(showNote[0].title))
        console.log(chalk.whiteBright(showNote[0].body))
    }
}

module.exports = {
    create: create,
    remove: remove,
    update: update,
    list : list,
    display: display
}