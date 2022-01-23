export default function (data) {
  const addToWatched = document.querySelector('[data-action="add-to-watched"]')
  const addToQueue = document.querySelector('[data-action="add-to-queue"]')

  let watchedList = JSON.parse(localStorage.getItem(`watchedList`)) || []
  let queueList = JSON.parse(localStorage.getItem(`queueList`)) || []

  let indexOfElWatched = 0
  let indexOfElQueue = 0

  function checkButton() {
    watchedList.forEach((element, i) => {
      if (element.id === data.id) {
        addToWatched.textContent = 'REMOVE FROM WATCHED'
        indexOfElWatched = i
      } 
    })

    queueList.forEach((element, i) => {
      if (element.id === data.id) {
        addToQueue.textContent = 'REMOVE FROM QUEUE'
        indexOfElQueue = i
    } 
    })
  }
  checkButton()
  chekBtnStatus()
  function addToLocalStorageWatched() {
    if (addToWatched.textContent === 'REMOVE FROM WATCHED') {
      watchedList.splice(indexOfElWatched, 1)
      localStorage.setItem(`watchedList`, JSON.stringify(watchedList))
      addToWatched.textContent = 'ADD TO WATCHED'
      checkButton()
      chekBtnStatus()
    } else
      if (addToQueue.textContent === 'ADD TO QUEUE') {
        watchedList.push(data)
        let watchedStr = JSON.stringify(watchedList)
        localStorage.setItem(`watchedList`, watchedStr)

        console.log("addToWatched");

        checkButton()
        chekBtnStatus()
      } else {
        console.log("alreadyInQueued")
      }
      reloadLibraryPage()
     }

  function addToLocalStorageQueue() {
    if (addToQueue.textContent === 'REMOVE FROM QUEUE') {

      queueList.splice(indexOfElQueue, 1)
      localStorage.setItem(`queueList`, JSON.stringify(queueList))
      addToQueue.textContent = 'ADD TO QUEUE'
      console.log("removeFromQueue")
      checkButton()
    chekBtnStatus()
    } else
      if (addToWatched.textContent === 'ADD TO WATCHED') {
        queueList.push(data)
        let queueStr = JSON.stringify(queueList)
        localStorage.setItem(`queueList`, queueStr)
        console.log("addToQueue")
      checkButton()
      chekBtnStatus()
      }
      else {
        console.log("alreadyInWatched");
      }
// смена списка библиотеки добавленых/просмотреных
      reloadLibraryPage()
     }
//Смена статуса кнопок
  function chekBtnStatus() {
    if ((addToQueue.textContent === 'ADD TO QUEUE') && (addToWatched.textContent === 'REMOVE FROM WATCHED')) {
      addToQueue.setAttribute('disabled', true)
      addToQueue.style.cursor = 'not-allowed'
      addToQueue.classList.remove('modal__queue-list')
      addToQueue.classList.add('disabled')
    } else {
      addToQueue.removeAttribute('disabled', false)
      addToQueue.style.cursor = 'pointer'
       addToQueue.classList.remove('disabled')
      addToQueue.classList.add('modal__queue-list')
    }
    if ((addToWatched.textContent === 'ADD TO WATCHED') && (addToQueue.textContent === 'REMOVE FROM QUEUE')) {
      addToWatched.setAttribute('disabled', true)
      addToWatched.style.cursor = 'not-allowed'
       addToWatched.classList.remove('modal__watch-list')
      addToWatched.classList.add('disabled')
    } else {
      addToWatched.removeAttribute('disabled', false)
      addToWatched.style.cursor = 'pointer'
       addToWatched.classList.remove('disabled')
      addToWatched.classList.add('modal__watch-list')
    }
  }
  // добавление в просмотренные ы список 
  addToWatched.addEventListener(`click`, addToLocalStorageWatched)
  addToQueue.addEventListener('click', addToLocalStorageQueue)
  }