$(document).ready(function() {

  $('#mySearch').on('click', function(){
    let $userInput = {}

    let $place = $('#place').val()
    let $pageNo = $('#pageNo').val()
    let $perPage = $('#perPage').val()


    if($place.length > 0 && $place === 'online'){
      $userInput['online'] = true
    }else{
      $userInput['online'] = false
    }

    if($pageNo.length > 0){
      $userInput['page'] = $pageNo
    }

    if($perPage.length > 0){
      $userInput['per_page'] = $perPage
    }

    $.ajax({
      url: 'http://api.sqoot.com/v2/deals?api_key=nhai72',
      type: 'GET',
      dataType: 'json',
      data: $userInput
    })
    .done(function(data) {
      let item = data.deals
      $('#user-search-deals').empty();
      item.forEach(function(d,index){
        let $dealDiv    = $('<div class="deal">')
        let $colDiv     = $('<div class="col s12 m8">')
        let $cardDiv    = $('<div class="card">')
        let $cardImg    = $('<div class="card-image">')
        let $img        = $('<img>').attr({
          'src' : d.deal['image_url'],
          'class' : 'responsive-img',
          'id' : 'fav-img'+index,
        }) //img attr

        let $contentDiv = $('<div class="card-content">')
        let $pTitle     = $('<p>').attr({
          'id': 'fav-title-price'+index
        }).text(d.deal['short_title'] +": $"+ d.deal['price'])

        let $cardActionDiv  = $('<div class="card-action">')
        let $pUrl       = $('<p>');
        let $aUrl       = $('<a>').attr({
          'id': 'fav-url' + index,
          'href': d.deal['untracked_url'],
          'target': '_blank'
        }).text('Buy Me!');
        let $button     = $('<button>').attr({
          'id': index
        }).text('Add to Favorite')


        $pUrl.append($aUrl)
        $cardImg.append($img)
        $contentDiv.append($pTitle)
        $cardActionDiv.append($aUrl)

        $cardDiv.append($cardImg)
        $cardDiv.append($contentDiv)
        $cardDiv.append($cardActionDiv)
        $cardDiv.append($button)

        $colDiv.append($cardDiv)
        $dealDiv.append($colDiv)

        $('#user-search-deals').append($dealDiv)
      })//for each

    })
    .complete(function(){
      $(':button').on('click', function(){
        var favArr = []
        var fav = {} // get data, and store key value and console log
        var buttonId = $(this).attr('id')

          let $imgId = '#fav-img'+buttonId
          let $imgUrl = $($imgId).attr('src')

          let $urlId = '#fav-url' +buttonId
          let $dealUrl = $($urlId).attr('href')

          let $titleId = '#fav-title-price'+buttonId
          let $title = $($titleId).text()

          if($imgUrl.length > 0 && $dealUrl.length > 0 && $title.length >0){
            fav['img'] = $imgUrl
            fav['link'] = $dealUrl
            fav['title-price'] = $title
          }
          else{
            alert("Sorry, Selected item cannot be added to Favorite")
          }

          //make an ajax call and pass this object to route
          favArr.push(fav)

          console.log(fav)
          console.log(favArr)

      })
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


  })

});


