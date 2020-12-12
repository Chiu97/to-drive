function noop() {}

function debounce (fn, interval) {
    let timeout = null

    return (...args) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(null, args)
            timeout = null
        }, interval)
    }
}

const str_concat = (...strs) => strs.reduce((acc, cv) => acc+cv, '')

var debounce_handleDragover = debounce((ev) => {
    // console.log({ev})
}, 1000)

/**
* @param {DragEvent} ev
*/
function handleDragover (ev) {
    ev.preventDefault()
    debounce_handleDragover(ev)
}

/**
* @param {DragEvent} ev
*/
function handleDrop (ev, isAppendMode=true) {
    const { currentTarget, dataTransfer } = ev
    ev.stopPropagation()
    const drag_id = dataTransfer.getData('node/dragid')
    const node = getElByDataId(drag_id)
    inactiveDropArea(currentTarget)
    isAppendMode ? el_appendChild(currentTarget, node) : el_insertAfter(currentTarget, node)
}

/**
 * @param {Element} el
 * @param {Element} node
 */
function el_appendChild(el, node) {
    if (!el||!node) return
    el.appendChild(node)
}

/**
 * @param {Element} el
 * @param {Element} node
 */
function el_insertAfter(el, node) {
    if (!el||!node) return
    const parent = el.parentNode.insertBefore(node, el.nextSibling)
}

/**
* @param {DragEvent} ev
*/
function handleDragStart (ev) {
    const triggerDragCmp = ev.currentTarget
    const dataTransfer = ev.dataTransfer
    dataTransfer.setData('node/dragid', triggerDragCmp.dataset.id)
}

/**
 * @param {DragEvent} ev
 */
function handleDragEnter (ev) {
    console.log('drag enter')
    console.log({
        desc: 'drag enter',
        ev,
        dataId: ev.currentTarget.dataset.id
    })
    activeDropArea(ev.currentTarget)
}

/**
 * @param {Element} ev
 */
function handleDragLeave (ev) {
    inactiveDropArea(ev.currentTarget)
}

const activeDropArea = (el) => {
    addClsToEl(el, 'drop-area--active')
}

const inactiveDropArea = (el) => {
    removeClsFromEl(el, 'drop-area--active')
}

/**
 * @param {Element} el
 * @param {string} classname
 */
const addClsToEl = (el, classname) => {
    el.classList.add(classname)
}

/**
 * @param {Element} el
 * @param {string} classname
 */
const removeClsFromEl = (el, classname) => {
    el.classList.remove(classname)
}

// get element by attribute
const queryAttr = (key, val) => document.querySelector(`[${key}="${val}"]`)

/**
 * @param {string} dataId
 */
function getElByDataId (data_id) {
    if (!queryAttr('data-id', data_id)) return null
    return queryAttr('data-id', data_id)
}