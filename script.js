/**
 * @description Bootcamp - Week 3 - Day 4 - Mini Project #1 - Coloring Game
 * Select a color on the left panel and draw it on the right panel
 * 
 * @author Yao Kan KOUASSI
 * @date 2023-01-10
 */

// Selectable colors
const colors = [
    '#ff0000', '#ff4500', '#ffa500',
    '#ffff00', '#9acd32', '#90ee90',
    '#008000', '#40e0d0', '#00ffff',
    '#87cefa', '#1e90ff', '#0000ff',
    '#00008b', '#4b0082', '#8b008b',
    '#ee82ee', '#ffb6c1', '#d3d3d3',
    '#808080', '#000000', '#ffffff'
]
// Left panel - color
const colorPadsContainer = document.querySelector('.color-pads-container')
const clearBtn = document.querySelector('.btn')
// Right panel - drawing zone
const drawingPanel = document.querySelector('.grid-panel')

let selectedColor = null
let isMouseDown = false

// Create the color pads - Grid 7 x 3
for (let i = 0; i < 21; i++) {
    let color = colors[i]
    let colorPad = document.createElement('div')
    colorPad.classList.add('color-pad')
    colorPad.style.backgroundColor = color
    colorPadsContainer.appendChild(colorPad)
    colorPad.addEventListener('click', (e) => {
        selectedColor = color
        clearBtn.style.backgroundColor = color
        clearBtn.style.textShadow = '1px 1px 1px #fff'
    })
}

// Create the drawing zone - Grid 24 x 60
for (let i = 0; i < 24*60; i++) {
    let zone = document.createElement('div')
    zone.classList.add('draw')
    drawingPanel.appendChild(zone)    
}

/**
 * Draw the selected color on the clicked or hovered zone with mouse down
 * @param {Event} e Mouse click or mouse move event 
 */
const drawColor = (e) => {
    if ((e.type == 'click' || isMouseDown) && null !== selectedColor) {
        document.elementFromPoint(e.pageX, e.pageY).style.backgroundColor = selectedColor
    }
}

// Reset the isMouseDown global variable to stop drawing
document.body.addEventListener('mouseup', () => isMouseDown = false)
document.body.addEventListener('dragend', () => isMouseDown = false)

// Clear the selected color and the drawing zone
clearBtn.addEventListener('click', () => {
    selectedColor = null
    clearBtn.style.backgroundColor = ''
    clearBtn.style.textShadow = 'none';
    if(confirm("Do you also want to clear the drawing panel?")) {
        drawingPanel.querySelectorAll('.draw').forEach(d => d.style.backgroundColor = '#fff')
    }
})

drawingPanel.addEventListener('mousedown', (e) => isMouseDown = true)
drawingPanel.addEventListener('mousemove', drawColor)
drawingPanel.addEventListener('click', drawColor)