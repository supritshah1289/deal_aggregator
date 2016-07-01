$(document).ready(function() {

  console.log("Connected");
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

    console.log("Query Search List", $place, $pageNo, $perPage)

    $.ajax({
      url: 'http://api.sqoot.com/v2/deals?api_key=nhai72',
      type: 'GET',
      dataType: 'json',
      data: $userInput
    })
    .done(function(data) {
      data.forEach(function(){

        // $div = $('<div class="">')

      })//for each
      console.log(data);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


  })
});
