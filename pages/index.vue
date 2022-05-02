<template>
  <div>
    <!-- === Loading Page Component === -->
    <loading-app></loading-app>
    <!-- === End Loading Page Component === -->

    <!-- === Background Page === -->
    <div class="backg-main">
      <div id="particles-js"></div>
    </div>
    <!-- === End Background Page === -->

    <!-- === Main === -->
    <div class="main">
      <!-- Center Box -->
      <div>
        <!-- Photo Profile -->
        <div class="main-img">
          <img src="photo/profile.jpg" alt="profile img" />

          <!-- Animation -->
          <span class="anmite-img"></span>
          <!-- End Animation -->
        </div>
        <!-- End Photo Profile -->

        <!-- Headline -->
        <h1>Profile</h1>
        <!-- End Headline -->

        <!-- Button Show Links -->
        <div class="tolinks">
          <i class="ri-arrow-down-line"></i>
          <span class="click-anime"></span>
        </div>
        <!-- End Button Show Links -->
      </div>
      <!-- End Center Box -->

      <!-- Social Media Links -->
      <div class="link"></div>
      <!-- End Social Media Links -->

      <!-- My Rights -->
      <div class="copyr">
        <a href="https://www.instagram.com/dev_none/" target="_blank">
          <span>n</span>
          <span>o</span>
          <span>n</span>
          <span>e</span>
        </a>
      </div>
      <!-- End My Rights -->
    </div>
    <!-- === End Main === -->
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.min.js';
import axios from 'axios';

export default {
  async mounted() {
    // fetch library particles.js
    require('particles.js/particles.js');
    // eslint-disable-next-line no-undef
    particlesJS.load('particles-js', '/assets/particles.json');

    // Get Data Page From settings.json
    await axios.get('settings.json').then((res) => {
      // Set Data In Page
      $('title').text(res.data.name);
      $('h1').text(res.data.name);
      for (let ele = 0; ele < res.data.links.length; ele++) {
        $('.link').append(
          `<a href="${res.data.links[ele].link}" class="${res.data.links[ele].class}" target="_blank"><i class="${res.data.links[ele].iconClass}"></i></a>`
        );
        if (ele === res.data.links.length - 1) {
          startPage();
        }
      }
    });

    // After data is placed on page
    function startPage() {
      let buttonStatus = true;

      // Button Show Links Animation (Go - Back)
      $('.tolinks').on('click', function () {
        const mylength = $('.link a').length - 1;
        let myLengthNow = 0;

        if (buttonStatus === true) {
          const mylink = $('.link');
          setTimeout(function () {
            mylink.toggleClass('link-active');
          }, 500);
          $('.tolinks>i').toggleClass('ri-arrow-down-line ri-close-line');
          if ($('.tolinks>i').hasClass('active-icon') === true) {
            $('.tolinks>i').addClass('back-active-icon');

            const myInterval = setInterval(function () {
              $('.link a').eq(myLengthNow).removeClass('active-a');
              if (myLengthNow === mylength) {
                clearInterval(myInterval);
                $('.click-anime').parent().removeClass('active-anmie-span');
                setTimeout(function () {
                  $('.main-img').removeClass('active-img');
                  $('h1').removeClass('active-h1');
                }, 500);

                setTimeout(function () {
                  $('.tolinks>i').removeClass('active-icon  back-active-icon');
                  buttonStatus = true;
                }, 1000);
              }
              myLengthNow++;
            }, 100);
          } else {
            $('.click-anime').parent().addClass('active-anmie-span');
            $('.main-img').addClass('active-img');
            $('h1').addClass('active-h1');
            $('.tolinks>i').addClass('active-icon');

            setTimeout(function () {
              const myInterval = setInterval(function () {
                $('.link a').eq(myLengthNow).addClass('active-a');
                if (myLengthNow === mylength) {
                  clearInterval(myInterval);
                  buttonStatus = true;
                }
                myLengthNow++;
              }, 100);
            }, 500);
          }
        }
        buttonStatus = false;
      });

      // Remove Loading Box On Load Page
      setTimeout(function () {
        $('.loading').addClass('load');
        setTimeout(function () {
          $('.loading').remove();
        }, 500);
      }, 500);
    }
  },
};
</script>
