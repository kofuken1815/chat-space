$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message">
          <div class="info">
            <div class="owner">
              ${message.user_name}
            </div>
            <div class="date">
              ${message.created_at}
            </div>
          </div>
          <div class="content">
            <p class="content-line">
              ${message.content}
            </p>
            <img class="content-image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message">
        <div class="info">
          <div class="owner">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="content">
          <p class="content-line">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html); 
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});     
      $('form')[0].reset();
      $('.commit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});