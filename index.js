function blink(typing) {
  return setInterval(() => {
    typing.style.borderRightColor = 'transparent'

    setTimeout(() => {
      typing.style.borderRightColor = 'var(--cursor-color)'
    }, 500)
  }, 1000)
}

function stopBlink(id, typing) {
  clearInterval(id)
  typing.style.borderRightColor = 'var(--cursor-color)'
}

async function startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId) {
  typing.style.width = '0'

  let i = typingContent.textContent.length

  blinkId = await type(typing, typingWidth, quantityToRemoveOfTyping, i, blinkId)
  blinkId = await unType(typing, typingWidth, quantityToRemoveOfTyping, i, blinkId)

  startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId)
}

function type(typing, typingWidth, quantityToRemoveOfTyping, typingContentLength, blinkId) {
  return new Promise((resolve, _) => {
    let i = typingContentLength

    setTimeout(() => {
      stopBlink(blinkId, typing)

      let id = setInterval(() => {
        typing.style.width = `${typingWidth - (quantityToRemoveOfTyping * i)}px`
    
        i--
    
        if (i == -1) {
          clearInterval(id)
          resolve(blink(typing))
        }
      }, 100)
    }, 2000)
  })
}

function unType(typing, typingWidth, quantityToRemoveOfTyping, typingContentLength, blinkId) {
  return new Promise((resolve, _) => {
    let i = 1

    setTimeout(() => {
      stopBlink(blinkId, typing)

      let id = setInterval(() => {
        typing.style.width = `${typingWidth - (quantityToRemoveOfTyping * i)}px`
    
        i++
    
        if (i > typingContentLength) {
          clearInterval(id)
          resolve(blink(typing))
        }
      }, 100)
    }, 5000)
  })
}

const typing = document.querySelector('.typing')
const typingContent = document.querySelector('.typing-content')

const typingCS = getComputedStyle(typing)
const typingContentCS = getComputedStyle(typingContent)

const typingWidth = parseFloat(typingCS.width.replace('px', ''))
const quantityToRemoveOfTyping = parseFloat(typingContentCS.width.replace('px', '') / typingContent.textContent.length)

let blinkId = blink(typing)

startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId)
