const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const fs = require('fs')

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

inquirer 
    .prompt([
        {
            type: 'maxlength-input',
            maxLength: 3,
            name: 'text',
            message: 'Please enter three letters for your logo: '
        },
        {
            name: 'textColor',
            message: "Please enter the text's color (or it's hexidecimel number): "
        },
        {
            type: 'list',
            choices: ['circle', 'square', 'triangle'],
            name: 'shape',
            message: 'Please select an icon shape: '
        },
        {
            name: 'shapeColor',
            message: "Please enter the icon's color (or it's hexidecimel number): "
        }
    ]) .then((results) => {
        generateSvg(results)
    })

const generateSvg = (userInput) => {
    const {text, textColor, shape, shapeColor} = userInput
    let shapeCode

    //TODO: replace following with classes
    if (shape == 'square') {
        shapeCode = `<rect x="75" y="10" width="150" height="150" stroke='black' stroke-width='3' fill="${shapeColor}" />`
    } else if (shape == 'circle') {
        shapeCode = `<circle cx="150" cy="90" r="80" stroke='black' stroke-width='3' fill="${shapeColor}" />`
    } else if (shape == 'triangle') {
        shapeCode = `<polygon points="150, 10 290, 115 10, 115" stroke='black' stroke-width='3' fill="${shapeColor}" />`
    }
    //

    const svgTemplate = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n\t${shapeCode}\n\t<text x="150" y="100" font-size="60" text-anchor="middle" stroke='black' stroke-width='.5' fill="${textColor}">${text}</text>\n</svg>`

    fs.access('lib', (err) => {
        if (err)
          fs.mkdir('lib', (err) => {
            if (err) {
                return console.log('Unable to create lib folder.')
            }
            else {
                createSvgFile()
            }
        })
        else {
            createSvgFile()
        }
    })

    const createSvgFile = () => {
        fs.writeFile('./lib/logo.svg', svgTemplate, err => {
            if (err) {
                console.error(err)
            } else {
                console.log('Logo created in /lib folder.')
            }
        })
    }
}