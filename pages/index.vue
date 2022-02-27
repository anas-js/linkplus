<template>
  <div>
    <loading-app></loading-app>
    <div class="backg-main">
      <div id="particles-js">

      </div>
    </div>
    <div class="main">
      <div>
        <div class="main-img">
          <img src="profile.jpg" alt="profile img" />
          <span class="anmite-img"></span>
        </div>
        <h1>راكان سعد</h1>

        <div class="tolinks">
          <i class="ri-arrow-down-line"></i>
          <span class="click-anime"></span>
        </div>
      </div>

                <div class="link">
            <!-- <a href="#" class="twitter" target="_blank"><i class="ri-twitter-line"></i></a>
            <a href="#" class="instagram" target="_blank"><i class="ri-instagram-line"></i></a>
            <a href="#" class="whatsapp" target="_blank"><i class="ri-whatsapp-line"></i></a>
            <a href="#" class="facebook" target="_blank"><i class="ri-facebook-fill"></i></a> -->
          </div>

    <div class="copyr">
        <a href="https://www.instagram.com/dev_none/" target="_blank">
          <span>n</span>
          <span>o</span>
          <span>n</span>
          <span>e</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.min.js';
import axios from 'axios';

// import particlesJS from "particles.js/particles.js";
// import jsonPartcle from "@/assets/particles.json";
export default {
  mounted() {
require("particles.js/particles.js")


 // eslint-disable-next-line no-undef
//  console.log(particlesJS)
//  particlesJS.load()
//  new  ParticlesJS('particles-js', '@/assets/particles.json', function() {
//   console.log('callback - particles-js config loaded');
// })
//   const particlesJS = require("particles.js");
//       //  console.log(particlesJS)
    // eslint-disable-next-line no-undef
    particlesJS.load('particles-js', "/assets/particles.json");

 axios.get('settings.json').then((rel) => {
   $("title").text(rel.data.name)
   $("h1").text(rel.data.name)
      for (let ele = 0; ele < rel.data.links.length; ele++) {
        $('.link').append(
          `<a href="${rel.data.links[ele].link}" class="${rel.data.links[ele].class}" target="_blank"><i class="${rel.data.links[ele].iconClass}"></i></a>`
        )
        if (ele === rel.data.links.length - 1) {
         startPage()
        }
      }

 })

 function startPage() {
 let buttonStatus = true;
    $('.tolinks').on('click', function () {

    const mylength = $('.link a').length - 1;
    let myLengthNow = 0;

      if (buttonStatus === true) {

              const mylink =  $(".link");
      setTimeout(function() {
       mylink.toggleClass("link-active");
      },500)
        $('.tolinks>i').toggleClass('ri-arrow-down-line ri-close-line')
        if ($('.tolinks>i').hasClass('active-icon') === true) {
          $('.tolinks>i').addClass('back-active-icon')
          //  $('.link a').removeClass('active-a')


        //  const myLengthNow = 0

          const myInterval = setInterval(function () {
            $('.link a').eq(myLengthNow).removeClass('active-a')
            if (myLengthNow === mylength) {
              clearInterval(myInterval)
              $('.click-anime').parent().removeClass('active-anmie-span')
              setTimeout(function () {
                              $('.main-img').removeClass('active-img')
              $('h1').removeClass('active-h1')
              },500)
              // buttonStatus = true;
              setTimeout(function () {
                $('.tolinks>i').removeClass('active-icon  back-active-icon')
                buttonStatus = true
              }, 1000)
            }
            myLengthNow++
          }, 100)
        } else {
          $('.click-anime').parent().addClass('active-anmie-span')
          $('.main-img').addClass('active-img')
          $('h1').addClass('active-h1')
          $('.tolinks>i').addClass('active-icon')


          setTimeout(function () {
            const myInterval = setInterval(function () {
              $('.link a').eq(myLengthNow).addClass('active-a')
              if (myLengthNow === mylength) {
                clearInterval(myInterval)
                buttonStatus = true
              }
              myLengthNow++
            }, 100)
          }, 500)
        }

        // setTimeout(function () {
        //   buttonStatus = true
        // }, 1000)
      }
      buttonStatus = false


// $(document).on("click", function () {
//   console.log(buttonStatus)
// })
    })


    setTimeout(function() {
     $(".loading").addClass("load");
     setTimeout(function() {
        $(".loading").remove();
     },500)
    },500)
 }

    // function $(ele) {
    //   return document.querySelector(ele);
    // }

    // document.querySelector("video").play()
    // console.log(document.querySelector("video"))
  },
}

</script>

