const yargs = require('yargs')
const notes = require('./notes')

// Customize yargs version
yargs.version('1.1.0')

yargs.command({
    // defines the commnand - add
    command: 'add',
    describe: 'Add New Note',
    // defines the options - title & body
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
        description: 'Note Body',
        demandOption: true,
        type: 'string'
        }
    },
    // defines the handler function
    handler: function(argv) {
        notes.create(argv.title, argv.body)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.remove(argv.title)
    
})

yargs.command({
    command: 'edit',
    describe: 'Edit Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "New Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.update(argv.title, argv.body)
})

yargs.command({
    command: 'list',
    describe: 'Lists All Notes',
    handler: (argv) => notes.list()
})

yargs.command({
    command: 'read',
    describe: "Read Note",
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.display(argv.title)
})

// makes yargs parse the command-line arguments
const parse = () => yargs.parse()

module.exports = {
    parse : parse
}