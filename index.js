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

async function startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId, audio) {
  typing.style.width = '0'

  let i = typingContent.textContent.length

  blinkId = await type(typing, typingWidth, quantityToRemoveOfTyping, i, blinkId, audio)
  blinkId = await unType(typing, typingWidth, quantityToRemoveOfTyping, i, blinkId, audio)

  startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId, audio)
}

function type(typing, typingWidth, quantityToRemoveOfTyping, typingContentLength, blinkId, audio) {
  return new Promise((resolve, _) => {
    let i = typingContentLength

    setTimeout(() => {
      audio.play()

      stopBlink(blinkId, typing)

      let id = setInterval(() => {
        typing.style.width = `${typingWidth - (quantityToRemoveOfTyping * i)}px`
    
        i--
    
        if (i == -1) {
          clearInterval(id)
          audio.pause()
          resolve(blink(typing))
        }
      }, 100)
    }, 2000)
  })
}

function unType(typing, typingWidth, quantityToRemoveOfTyping, typingContentLength, blinkId, audio) {
  return new Promise((resolve, _) => {
    let i = 1

    setTimeout(() => {
      audio.play()
      stopBlink(blinkId, typing)

      let id = setInterval(() => {
        typing.style.width = `${typingWidth - (quantityToRemoveOfTyping * i)}px`
    
        i++
    
        if (i > typingContentLength) {
          clearInterval(id)
          audio.pause()
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

const audio = new Audio('typing.mp3')
audio.load()
audio.loop = true
audio.volume = 0.6

let blinkId = blink(typing)
startTyping(typing, typingContent, typingWidth, quantityToRemoveOfTyping, blinkId, audio)
