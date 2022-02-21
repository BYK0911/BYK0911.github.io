interface Callback {
  (): void
}

const handleKeydown = (e: KeyboardEvent): void => {
  const keyCode = e.keyCode

  switch (keyCode) {
    case 83:
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        callbacks.onSave.forEach(cb => {
          if (typeof cb === 'function') cb()
        })
      }
      break
  }
}

export const registerHotkey = (): void => {
  window.addEventListener('keydown', handleKeydown)
}

export const cancelHotkey = (): void => {
  window.removeEventListener('keydown', handleKeydown)
}

export const callbacks: {
  onSave: Callback[],
} = {
  onSave: []
}