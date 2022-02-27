/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable no-undef */
$(function () {
  let objectJson = {
    name: 'محمد خالد',
    links: [
      {
        link: 'https://www.instagram.com/dev_none/',
        iconClass: 'ri-instagram-line',
        class: 'instagram',
      },
    ],
  };

  $('.name input').on('input', function () {
    objectJson.name = $(this).val();
  });
  let statusSerch = false,
    status2 = false;

  let statusinputbutton = false;

  let thisInput;
  let statusSameEle = false;
  function start() {
    let pElement = document.querySelectorAll('.list-style p');
    let chooseInput = document.querySelectorAll('.class-choose input');

    function checkif(i, myThis, eleThes) {
      if (myThis.eq(i).hasClass('d-none') !== true) {
        status2 = true;
      }

      if (statusSerch === true && status2 === false) {
        eleThes.find('.list-style').addClass('d-none');
      } else {
        eleThes.find('.list-style').removeClass('d-none');
      }

      if (i === myThis.length - 1) {
        status2 = false;
        statusSerch = false;
      }
    }

    for (let input = 0; input < chooseInput.length; input++) {
      chooseInput[input].onfocus = function () {
        const myThis = $(this).parent().find('.list-style p');

        for (i = 0; i < myThis.length; i++) {
          if (i === myThis.length - 1) {
            statusSerch = true;
          }

          if (myThis.eq(i).text().includes($(this).val()) !== true) {
            myThis.eq(i).addClass('d-none');
            checkif(i, myThis, $(this).parent());
          } else {
            myThis.eq(i).removeClass('d-none');
            checkif(i, myThis, $(this).parent());
          }
        }

        statusinputbutton = false;
        $(this).parent().find('.list-style').removeClass('d-noneDefult');

        if ($(this).parents('.class-choose').eq(0).is(thisInput) === true) {
          statusSameEle = true;
        } else {
          statusSameEle = false;
        }
        thisInput = $(this).parents('.class-choose').eq(0);

        if (statusSameEle === false) {
          $('.list-style')
            .not(thisInput.find('.list-style'))
            .addClass('d-noneDefult');
        }
      };

      chooseInput[input].onblur = function () {
        statusinputbutton = true;
      };
    }

    document.onclick = function () {
      if (statusinputbutton === true) {
        $('.list-style').addClass('d-noneDefult');
      }
    };

    function renoveItem() {
      let removeBtn = document.querySelectorAll('.remove');
      for (let re = 0; re < removeBtn.length; re++) {
        removeBtn[re].onclick = function () {
          $('.preview-item a')
            .eq(re + 1)
            .remove();
          objectJson.links.splice(re + 1, 1);

          $(this).parents('.links>div').eq(0).remove();
          renoveItem();
        };
      }
    }
    renoveItem();

    let linksDivs = document.querySelectorAll('.links>div');
    for (let links = 0; links < linksDivs.length; links++) {
      // linksDivs[links].oninput = function () {
      for (
        let e = 0;
        e < linksDivs[links].querySelectorAll('input').length;
        e++
      ) {
        linksDivs[links].querySelectorAll('input')[e].oninput = function () {
          if ($(this).attr('name') === 'style-name') {
            const myThis = $(this).parent().find('.list-style p');

            for (i = 0; i < myThis.length; i++) {
              if (i === myThis.length - 1) {
                statusSerch = true;
              }

              if (myThis.eq(i).text().includes($(this).val()) !== true) {
                myThis.eq(i).addClass('d-none');
                checkif(i, myThis, $(this).parent());
              } else {
                myThis.eq(i).removeClass('d-none');
                checkif(i, myThis, $(this).parent());
              }
            }
            $('.preview-item a')
              .eq(links)
              .attr('class', `${$(this).val()}`);
            objectJson.links[links].class = $(this).val();
          }

          if ($(this).attr('name') === 'link') {
            $('.preview-item a')
              .eq(links)
              .attr('href', `${$(this).val()}`);
            objectJson.links[links].link = $(this).val();
          }

          if ($(this).attr('name') === 'icon-class') {
            $('.preview-item a')
              .eq(links)
              .find('i')
              .attr('class', `${$(this).val()}`);
            objectJson.links[links].iconClass = $(this).val();
          }
        };
      }

      for (
        let p = 0;
        p < linksDivs[links].querySelectorAll('.list-style p').length;
        p++
      ) {
        linksDivs[links].querySelectorAll('.list-style p')[p].onclick =
          function () {
            $(this)
              .parents('.class-choose')
              .find('.list-style')
              .addClass('d-noneDefult');
            $(this).parents('.class-choose').find('input').val($(this).text());
            $('.preview-item a')
              .eq(links)
              .attr('class', `${$(this).text()}`);
            objectJson.links[links].class = $(this).text();
          };
      }
    }
  }

  start();

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

    objectJson.links.push({
      link: 'https://www.instagram.com/dev_none/',
      iconClass: 'ri-instagram-line',
      class: 'instagram',
    });

    pElement = document.querySelectorAll('.list-style p');
    chooseInput = document.querySelectorAll('.class-choose input');
    start();
  });

  $('.export-btn').on('click', function () {
    $('.export-pop > div textarea').text(JSON.stringify(objectJson));
    $('.export-pop').addClass('export-pop-visblie');
  });

  let statusClickCopy = true;
  $('.copy-text').on('click', function () {
    navigator.clipboard.writeText(JSON.stringify(objectJson));
    if (statusClickCopy === true) {
      $(this).text('تم النسخ!');

      setTimeout(function () {
        $('.copy-text').text('نسخ');
        statusClickCopy = true;
      }, 1000);
    }

    statusClickCopy = false;
  });

  $('.close-pop').on('click', function () {
    $('.export-pop, .import-pop').removeClass('export-pop-visblie');
  });

  $('.import-btn').on('click', function () {
    $('.import-pop').addClass('export-pop-visblie');
  });

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
        objectJson = fromatObject;
        startFromat();
        $('.import-pop').removeClass('export-pop-visblie');
        $('.import-pop textarea').val('');
      } else {
        $('.error .err').text(
          "يرجى التحقق من وجود البيانات الاساسية مثل 'name' ويجب ان توجد بيانات زر واحد على الأقل."
        );
        $('.error').addClass('d-block');
      }
    } catch (err) {
      $('.error .err').text(err);
      $('.error').addClass('d-block');
    }
  });

  function startFromat() {
    $('.links>div').not($('.links>div').eq(0)).remove();
    $('.preview-item a').not($('.preview-item a').eq(0)).remove();

    $('.links>div')
      .eq(0)
      .find('input[name=style-name]')
      .val(objectJson.links[0].class);
    $('.links>div')
      .eq(0)
      .find('input[name=link]')
      .val(objectJson.links[0].link);
    $('.links>div')
      .eq(0)
      .find('input[name=icon-class]')
      .val(objectJson.links[0].iconClass);
    $('.preview-item a').eq(0).attr('class', objectJson.links[0].class);
    $('.preview-item a').eq(0).attr('href', objectJson.links[0].link);
    $('.preview-item a')
      .eq(0)
      .find('i')
      .attr('class', objectJson.links[0].iconClass);

    for (let f = 1; f < objectJson.links.length; f++) {
      $('.links').append(`
    <div>
    <h3>زر</h3>
    <div class="child">
    <div class="class-choose">
    <label>ستايل</label>
    <input name="style-name" type="text" placeholder="ex : instagram" value="${objectJson.links[f].class}">
    <div class="list-style d-noneDefult">
    <p>instagram</p>
    <p>twitter</p>
    <p>whatsapp</p>
    <p>facebook</p>
    </div>
  </div>
  <div>
    <label>الرابط</label>
    <input name="link" type="text" placeholder="ex : https://xxxx.xxx" value="${objectJson.links[f].link}">
  </div>
  <div>
    <label>الايقونة</label>
    <input name="icon-class" type="text" placeholder="ex : ri-instagram-line" value="${objectJson.links[f].iconClass}">
  </div>
          <div class="remove">
          <span><i class="ri-delete-bin-line"></i> حذف</span>
            </div>
    </div>
  </div>
    `);
      $('.preview-item').append(`
    <a href="${objectJson.links[f].link}" class="${objectJson.links[f].class}" target="_blank"><i class="${objectJson.links[f].iconClass}"></i></a>
    `);
    }

    pElement = document.querySelectorAll('.list-style p');
    chooseInput = document.querySelectorAll('.class-choose input');
    start();
  }

  $('.import-pop > div textarea').on('input', function () {
    $('.error').removeClass('d-block');
  });
});

window.onload = function () {
  setTimeout(function () {
    $('.loading').addClass('load');
    setTimeout(function () {
      $('.loading').remove();
    }, 300);
  }, 500);
};
