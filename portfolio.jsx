document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', (e) => {
        const y = window.scrollY
        const wh = window.innerHeight  
        const ww = window.innerWidth
        



// projects appear
        let fsImg = document.getElementById("fs-img");
        if (y >= 330 + wh ) {
            fsImg.classList.add("appear") 
          } else {
            fsImg.classList.remove("appear")
          }    

          let mernImg = document.getElementById("mern-img");
          let windowAdj = 0
            if ( ww > 1050 && ww < 1450 ) { 
               windowAdj = (ww - 1000) * 0.5 
              } else if (ww >= 1450) {
                windowAdj = 225
              }
          if (y  >= 760 + windowAdj + wh) {
            mernImg.classList.add("appear") 
          } else {
            mernImg.classList.remove("appear")
          }  

          let jsImg = document.getElementById("js-img");
          if (y >= 1260 + windowAdj + wh) {
             jsImg .classList.add("appear") 
          } else {
             jsImg .classList.remove("appear")
          }  
    })

// project bullet points appear
    const bulletPoints = [document.getElementById('fs-bullet-points'), document.getElementById('mern-bullet-points'), document.getElementById('js-bullet-points')]
      for (let j = 0; j < bulletPoints.length; j++) {
        let projectInnerHTML = bulletPoints[j].innerHTML.split("<br>")
          .map((text,i) => '<li style="animation-delay:' + (400 * (i+1)) + 'ms">' + text + '</li>')
          .join('')
          bulletPoints[j].innerHTML = projectInnerHTML
      }

})