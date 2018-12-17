$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
      var image = message.image ? `<img src="${ message.image }" class="posts__image" />` : "";
      var html = `<div class ="posts" data-id="${message.id}">
                    <ul class ="posts__lists">
                      <li class ="posts__lists--name">
                        ${ message.user_name }
                      </li>
                      <li class ="posts__lists--time">
                        ${ message.time }
                      </li>
                    <ul>
                    <p class ="posts__message">
                      ${ message.content }
                    </p>
                    ${ image }
                  </div>`
      return html;
    }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-screen').append(html);
        $('.new_message')[0].reset();
        $('.post-form__send-button').prop('disabled', false);
        $('.chat-screen').animate({ scrollTop: $('.chat-screen')[0].scrollHeight }, 1000);
      })
      .fail(function(){
          alert('error');
      })
    })

    var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var id = $('.posts:last').data('id');
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: {id: id},
        dataType: 'json'
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML += buildHTML(message);
        })
        $('.chat-screen').append(insertHTML);
        $('.chat-screen').animate({ scrollTop: $('.chat-screen')[0].scrollHeight }, 1000);
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }} , 5000 );
  })
});
