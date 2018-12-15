$(document).on('turbolinks:load', function() {
  $(function() {
    var searchField = $("#user-search-field");
    var searchResult = $("#user-search-result");
    var groupMember = $("#chat-group-users")

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                  </div>`
      searchResult.append(html);
    }

    function appendNoUser(notice) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ notice }</p>
                  </div>`
      searchResult.append(html);
    }

    function appendMember(user_id, user_name) {
      var html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ user_id }">
                    <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                    <p class='chat-group-user__name'>${ user_name }</p>
                    <p class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</p>
                  </div>`
      groupMember.append(html);
    }

    searchField.on("keyup", function() {
     var input = searchField.val();

      if (input.length) {
        $.ajax({
          url: '/users',
          type: "GET",
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function (users) {
          searchResult.empty();
          if (users.length != 0) {
            users.forEach(function (user) {
              appendUser(user);
            });
          } else {
            appendNoUser("一致するユーザーはいません");
          }
        })
        .fail(function () {
          alert('ユーザー検索に失敗しました');
        })
      } else {
        searchResult.empty();
      }
    })

    $(document).on("click", ".user-search-add", function () {
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name");
      $(this).parent().remove();
      appendMember(user_id, user_name);
    })
    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    })
  })
});
