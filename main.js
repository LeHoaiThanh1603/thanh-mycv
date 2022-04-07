const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $$('.sidebar-item')
const panes = $$('.tab-pane')



  tabs.forEach((tab, index) =>{
    const pane = panes[index]
    tab.onclick = function () {

      $('.sidebar-item.active').classList.remove('active')
      $('.tab-pane.active').classList.remove('active')

      this.classList.add('active');
      pane.classList.add('active');
      console.log(pane)
    }
  })

// Music



const heading = $('.music-name-song')
const title = $('.music-name-singer')
const audio = $('#audio ')
const playbtn = $('.togger-play')
const progress = $('.input-btn')
const iconHidden = $('.icon-hiden')
const music = $('.music')

const progressBar = $('.progress__bar')

const updateProgress = ()=>{
    const windowHeight = window.innerHeight;
    const documentFullHeight = document.body.clientHeight;
    const scroll = window.scrollY;
    const pecentsScrolled = (scroll / (documentFullHeight - windowHeight)) * 100;
progressBar.style = `width : ${pecentsScrolled}%`
}

window.addEventListener('scroll', updateProgress)

// hidden 
iconHidden.addEventListener('click', ()=>{
  music.classList.toggle('hidden')
})




playbtn.addEventListener('click', ()=>{
  playbtn.classList.toggle('playing')
})

  const app = {
    currentIndex : 0,
    isPlaying: false,
    songs : [
      {
        name: 'Tay To',
        singer: 'Mck',
        path: './audio/Tay-To-Rapital-MCK-RPT-Phongkhin.mp3',
        image: './img-song/sontung.jpg'
    
      }, 
      
      {
        name: 'Phi Hành Gia',
        singer: 'Sơn Tùng M-TP',
        path: './audio/Phi-Hanh-Gia-Renja-Slow-T-Lil-Wuyn-Kain-Sugar-Cane.mp3',
        image: './img-song/sontung.jpg'
    
      }, 
    
      {
        name: 'Tay',
        singer: 'Sơn Tùng M-TP',
        path: './audio/Tay-To-Rapital-MCK-RPT-Phongkhin.mp3',
        image: './img-song/sontung.jpg'
    
      }
    ],
  
    // render list bai hat
    /* render : function () {
      const htmls = this.songs.map(song => {
        return `
          <div class="music-name-song">${song.name}</div>
          <div class="music-name-singer">${song.Singer}</div>`
          
      })
      $('.play-music').innerHTML = htmls.join('')
    },*/
    defineProperties: function() {
      Object.defineProperty(this, 'currentSong',{
        get : function() {
          return this.songs[this.currentIndex]
        }
      })
    },

    handleEvent : function(){
      const _this = this
      // document.onscroll = function(){

      //xử lí khi onclick play
      playbtn.onclick = function(){

        if (_this.isPlaying) {
          audio.pause()
        } else {
          audio.play()
        }

        // khi song play 
        audio.onplay = function(){
          _this.isPlaying = true
          
        }

        // khi song pause 
        audio.onpause = function(){
          
          _this.isPlaying = false
        }

        // khi song thay đổi
        audio.ontimeupdate = function(){
          if (audio.duration){
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
          }
        }

        // khi tua song 
        progress.onchange = function(e){
          const seektime = audio.duration / 100 * e.target.value
          audio.currentTime = seektime
        }

        }
    },

    loadcurrentSong : function(){

      heading.textContent = this.currentSong.name
      title.textContent = this.currentSong.singer
      audio.src = this.currentSong.path
    },
    
    star : function() {
      // định nghãi các thuộc tính cho object
      this.defineProperties()

      this.handleEvent()
      
      // tải thông tin bài hát đầu tiên  UI khi chạy ứng dụng
      this.loadcurrentSong()

      // this.render()
    }
  }

  app.star()