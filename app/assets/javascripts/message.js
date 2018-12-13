$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src="${ message.image }" class="posts__image" />` : "";
    var html = `<div class ="posts">
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
      $('.post-form__message-form').val('')
      $('.post-form__send-button').prop('disabled', false);
      $('.chat-screen').animate({ scrollTop: $('.chat-screen')[0].scrollHeight }, 1000);
    })
    .fail(function(){
        alert('error');
    })
  })
});
