/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable no-undef */

// Document Ready
$(function () {
  let jsonExport = {
    name: 'dev_none',
    links: [
      {
        link: 'https://www.instagram.com/dev_none/',
        iconClass: 'ri-instagram-line',
        class: 'instagram',
      },
    ],
  };

  // Set Data To Object For Export Later
  $('.name input').on('input', function () {
    jsonExport.name = $(this).val();
  });

  // Basic Variables
  let searchStatus = false,
    status = false,
    stateInputSearch = false,
    thisInput,
    statusSameElement,
    statusClickCopy = true;

  // Start on load Page and on Add Link
  function start() {
    let paragraphs = document.querySelectorAll('.list-style p');
    let chooseInput = document.querySelectorAll('.class-choose input');

    function check(i, myThis, eleThes) {
      if (myThis.eq(i).hasClass('d-none') !== true) {
        status = true;
      }

      if (searchStatus === true && status === false) {
        eleThes.find('.list-style').addClass('d-none');
      } else {
        eleThes.find('.list-style').removeClass('d-none');
      }

      if (i === myThis.length - 1) {
        status = false;
        searchStatus = false;
      }
    }

    // on Focus List (Input Styles)
    for (let input = 0; input < chooseInput.length; input++) {
      chooseInput[input].onfocus = function () {
        const myThis = $(this).parent().find('.list-style p');

        for (i = 0; i < myThis.length; i++) {
          if (i === myThis.length - 1) {
            searchStatus = true;
          }

          if (myThis.eq(i).text().includes($(this).val()) !== true) {
            myThis.eq(i).addClass('d-none');
            check(i, myThis, $(this).parent());
          } else {
            myThis.eq(i).removeClass('d-none');
            check(i, myThis, $(this).parent());
          }
        }

        stateInputSearch = false;
        $(this).parent().find('.list-style').removeClass('d-noneDefult');

        if ($(this).parents('.class-choose').eq(0).is(thisInput) === true) {
          statusSameElement = true;
        } else {
          statusSameElement = false;
        }
        thisInput = $(this).parents('.class-choose').eq(0);

        if (statusSameElement === false) {
          $('.list-style')
            .not(thisInput.find('.list-style'))
            .addClass('d-noneDefult');
        }
      };

      chooseInput[input].onblur = function () {
        stateInputSearch = true;
      };
    }

    document.onclick = function () {
      if (stateInputSearch === true) {
        $('.list-style').addClass('d-noneDefult');
      }
    };

    // Remove Link Child
    function renoveItem() {
      let removeBtn = document.querySelectorAll('.remove');
      for (let re = 0; re < removeBtn.length; re++) {
        removeBtn[re].onclick = function () {
          $('.preview-item a')
            .eq(re + 1)
            .remove();
          jsonExport.links.splice(re + 1, 1);

          $(this).parents('.links>div').eq(0).remove();
          renoveItem();
        };
      }
    }
    renoveItem();

    // Live Preview Links in Page
    let linksChild = document.querySelectorAll('.links>div');
    for (let links = 0; links < linksChild.length; links++) {
      for (
        let e = 0;
        e < linksChild[links].querySelectorAll('input').length;
        e++
      ) {
        linksChild[links].querySelectorAll('input')[e].oninput = function () {
          if ($(this).attr('name') === 'style-name') {
            const myThis = $(this).parent().find('.list-style p');

            for (i = 0; i < myThis.length; i++) {
              if (i === myThis.length - 1) {
                searchStatus = true;
              }

              if (myThis.eq(i).text().includes($(this).val()) !== true) {
                myThis.eq(i).addClass('d-none');
                check(i, myThis, $(this).parent());
              } else {
                myThis.eq(i).removeClass('d-none');
                check(i, myThis, $(this).parent());
              }
            }
            $('.preview-item a')
              .eq(links)
              .attr('class', `${$(this).val()}`);
            jsonExport.links[links].class = $(this).val();
          }

          if ($(this).attr('name') === 'link') {
            $('.preview-item a')
              .eq(links)
              .attr('href', `${$(this).val()}`);
            jsonExport.links[links].link = $(this).val();
          }

          if ($(this).attr('name') === 'icon-class') {
            $('.preview-item a')
              .eq(links)
              .find('i')
              .attr('class', `${$(this).val()}`);
            jsonExport.links[links].iconClass = $(this).val();
          }
        };
      }

      for (
        let p = 0;
        p < linksChild[links].querySelectorAll('.list-style p').length;
        p++
      ) {
        linksChild[links].querySelectorAll('.list-style p')[p].onclick =
          function () {
            $(this)
              .parents('.class-choose')
              .find('.list-style')
              .addClass('d-noneDefult');
            $(this).parents('.class-choose').find('input').val($(this).text());
            $('.preview-item a')
              .eq(links)
              .attr('class', `${$(this).text()}`);
            jsonExport.links[links].class = $(this).text();
          };
      }
    }
  }

  start();

  if ($('body').hasClass('en') === true) {
    // Add Child Link
    $('.add-link-btn').on('click', function () {
      $('.links').append(`
    <div>
    <h3>Button</h3>
    <div class="child">
    <div class="class-choose">
    <label>Style</label>
    <input name="style-name" type="text" placeholder="ex : instagram" value="instagram">
    <div class="list-style d-noneDefult">
    <p>instagram</p>
    <p>twitter</p>
    <p>whatsapp</p>
    <p>facebook</p>
    </div>
  </div>
  <div>
    <label>Link</label>
    <input name="link" type="text" placeholder="ex : https://xxxx.xxx" value="https://www.instagram.com/dev_none/">
  </div>
  <div>
    <label>Icon</label>
    <input name="icon-class" type="text" placeholder="ex : ri-instagram-line" value="ri-instagram-line">
  </div>
          <div class="remove">
              <span><i class="ri-delete-bin-line"></i> Delete</span>
            </div>
    </div>
  </div>
    `);

      $('.preview-item').append(`
    <a href="https://www.instagram.com/dev_none/" class="instagram" target="_blank"><i class="ri-instagram-line"></i></a>
    `);

      jsonExport.links.push({
        link: 'https://www.instagram.com/dev_none/',
        iconClass: 'ri-instagram-line',
        class: 'instagram',
      });

      paragraphs = document.querySelectorAll('.list-style p');
      chooseInput = document.querySelectorAll('.class-choose input');
      start();
    });
  } else {
    $('.add-link-btn').on('click', function () {
      $('.links').append(`
    <div>
    <h3>زر</h3>
    <div class="child">
    <div class="class-choose">
    <label>ستايل</label>
    <input name="style-name" type="text" placeholder="ex : instagram" value="instagram">
    <div class="list-style d-noneDefult">
    <p>instagram</p>
    <p>twitter</p>
    <p>whatsapp</p>
    <p>facebook</p>
    </div>
  </div>
  <div>
    <label>الرابط</label>
    <input name="link" type="text" placeholder="ex : https://xxxx.xxx" value="https://www.instagram.com/dev_none/">
  </div>
  <div>
    <label>الايقونة</label>
    <input name="icon-class" type="text" placeholder="ex : ri-instagram-line" value="ri-instagram-line">
  </div>
          <div class="remove">
              <span><i class="ri-delete-bin-line"></i> حذف</span>
            </div>
    </div>
  </div>
    `);

      $('.preview-item').append(`
    <a href="https://www.instagram.com/dev_none/" class="instagram" target="_blank"><i class="ri-instagram-line"></i></a>
    `);

      jsonExport.links.push({
        link: 'https://www.instagram.com/dev_none/',
        iconClass: 'ri-instagram-line',
        class: 'instagram',
      });

      paragraphs = document.querySelectorAll('.list-style p');
      chooseInput = document.querySelectorAll('.class-choose input');
      start();
    });
  }

  // Export pop up Show And Set Data in textarea
  $('.export-btn').on('click', function () {
    $('.export-pop > div textarea').text(JSON.stringify(jsonExport));
    $('.export-pop').addClass('export-pop-visblie');
  });

  // Copy Data Export Button
  $('.copy-text').on('click', function () {
    navigator.clipboard.writeText(JSON.stringify(jsonExport));
    if (statusClickCopy === true) {
      if ($('body').hasClass('en') === true) {
        $(this).text('Copied!');
      } else {
        $(this).text('تم النسخ!');
      }

      setTimeout(function () {
        if ($('body').hasClass('en') === true) {
          $('.copy-text').text('Copy');
        } else {
          $('.copy-text').text('نسخ');
        }

        statusClickCopy = true;
      }, 1000);
    }

    statusClickCopy = false;
  });

  // Close Pop Up
  $('.close-pop').on('click', function () {
    $('.export-pop, .import-pop').removeClass('export-pop-visblie');
  });

  // Show Pop Up (Import Buttom)
  $('.import-btn').on('click', function () {
    $('.import-pop').addClass('export-pop-visblie');
  });

  // Button Verify and process the entered data
  $('.fromat-btn').on('click', function () {
    let fromatObject;

    try {
      fromatObject = JSON.parse($('.import-pop textarea').val());
      if (
        fromatObject.name != null &&
        fromatObject.links != null &&
        fromatObject.links[0].link != null &&
        fromatObject.links[0].iconClass != null &&
        fromatObject.links[0].class != null
      ) {
        $('.error').removeClass('d-block');
        jsonExport = fromatObject;
        startFromat();
        $('.import-pop').removeClass('export-pop-visblie');
        $('.import-pop textarea').val('');
      } else {
        if ($('body').hasClass('en') === true) {
          $('.error .err').text(
            "Please check the presence of the basic data such as 'name' and there must be at least one button data."
          );
        } else {
          $('.error .err').text(
            "يرجى التحقق من وجود البيانات الاساسية مثل 'name' ويجب ان توجد بيانات زر واحد على الأقل."
          );
        }
        $('.error').addClass('d-block');
      }
    } catch (err) {
      $('.error .err').text(err);
      $('.error').addClass('d-block');
    }
  });

  // For Processing of recovered data (Import Button)
  function startFromat() {
    $('.links>div').not($('.links>div').eq(0)).remove();
    $('.preview-item a').not($('.preview-item a').eq(0)).remove();

    $('.links>div')
      .eq(0)
      .find('input[name=style-name]')
      .val(jsonExport.links[0].class);
    $('.links>div')
      .eq(0)
      .find('input[name=link]')
      .val(jsonExport.links[0].link);
    $('.links>div')
      .eq(0)
      .find('input[name=icon-class]')
      .val(jsonExport.links[0].iconClass);
    $('.preview-item a').eq(0).attr('class', jsonExport.links[0].class);
    $('.preview-item a').eq(0).attr('href', jsonExport.links[0].link);
    $('.preview-item a')
      .eq(0)
      .find('i')
      .attr('class', jsonExport.links[0].iconClass);

    for (let i = 1; i < jsonExport.links.length; i++) {
      if ($('body').hasClass('en') === true) {
        $('.links').append(`
      <div>
      <h3>Button</h3>
      <div class="child">
      <div class="class-choose">
      <label>Style</label>
      <input name="style-name" type="text" placeholder="ex : instagram" value="${jsonExport.links[i].class}">
      <div class="list-style d-noneDefult">
      <p>instagram</p>
      <p>twitter</p>
      <p>whatsapp</p>
      <p>facebook</p>
      </div>
    </div>
    <div>
      <label>Link</label>
      <input name="link" type="text" placeholder="ex : https://xxxx.xxx" value="${jsonExport.links[i].link}">
    </div>
    <div>
      <label>Icon</label>
      <input name="icon-class" type="text" placeholder="ex : ri-instagram-line" value="${jsonExport.links[i].iconClass}">
    </div>
            <div class="remove">
            <span><i class="ri-delete-bin-line"></i> Delete</span>
              </div>
      </div>
    </div>
      `);
      } else {
        $('.links').append(`
    <div>
    <h3>زر</h3>
    <div class="child">
    <div class="class-choose">
    <label>ستايل</label>
    <input name="style-name" type="text" placeholder="ex : instagram" value="${jsonExport.links[i].class}">
    <div class="list-style d-noneDefult">
    <p>instagram</p>
    <p>twitter</p>
    <p>whatsapp</p>
    <p>facebook</p>
    </div>
  </div>
  <div>
    <label>الرابط</label>
    <input name="link" type="text" placeholder="ex : https://xxxx.xxx" value="${jsonExport.links[i].link}">
  </div>
  <div>
    <label>الايقونة</label>
    <input name="icon-class" type="text" placeholder="ex : ri-instagram-line" value="${jsonExport.links[i].iconClass}">
  </div>
          <div class="remove">
          <span><i class="ri-delete-bin-line"></i> حذف</span>
            </div>
    </div>
  </div>
    `);
      }
      $('.preview-item').append(`
    <a href="${jsonExport.links[i].link}" class="${jsonExport.links[i].class}" target="_blank"><i class="${jsonExport.links[i].iconClass}"></i></a>
    `);
    }

    paragraphs = document.querySelectorAll('.list-style p');
    chooseInput = document.querySelectorAll('.class-choose input');
    start();
  }

  $('.import-pop > div textarea').on('input', function () {
    $('.error').removeClass('d-block');
  });
});

// On Load Page Remove Loading Box
window.onload = function () {
  setTimeout(function () {
    $('.loading').addClass('load');
    setTimeout(function () {
      $('.loading').remove();
    }, 300);
  }, 500);
};
