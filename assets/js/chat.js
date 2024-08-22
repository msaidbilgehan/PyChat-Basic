let endpoint_send_message = '/api/send_message';
let endpoint_listen_messages = '/api/listen_messages';
let lastMessageTime = 0;

document.addEventListener('DOMContentLoaded', (event) => {
  username = localStorage.getItem('username');
  if (username) {
    console.log("No username found in local storage");
    console.log("Next time Please enter your name Harry Potter")
    username = "Harry Potter";
    localStorage.setItem('username', username);
  }
  console.log("Username:", username);

  document.getElementById('username').innerHTML = username;
});

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + localStorage.getItem('username') + ': ' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

  setDate();
  $('.message-input').val(null);
  updateScrollbar();
}

// function fakeMessage() {
//   if ($('.message-input').val() != '') {
//     return false;
//   }
//   $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
//   updateScrollbar();

//   setTimeout(function() {
//     $('.message.loading').remove();
//     $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
//     setDate();
//     updateScrollbar();
//     i++;
//   }, 1000 + (Math.random() * 20) * 100);
// }

function sendMessage(message) {
    $.ajax({
        url: endpoint_send_message,
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token_cookie')
        },
        data: JSON.stringify({ message: message }),
        success: function(response) {
            console.log("Message sent:", response);
        },
        error: function(xhr) {
            console.error("Error sending message:", xhr.responseText);
        }
    });
}

$('.message-submit').click(function() {
    var message = $('.message-input').val();
    if (message.trim() !== '') {
        insertMessage();
        sendMessage(message);
    }
});
$(window).on('keydown', function(e) {
    if (e.which == 13) {
        var message = $('.message-input').val();
        if (message.trim() !== '') {
            insertMessage();
            sendMessage(message);
            return false;
        }
    }
});

function fetchMessages() {
    $.ajax({
        url: `/api/listen_messages?last_time=${lastMessageTime}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token_cookie')
        },
        success: function(response) {
            if (response.messages.length > 0) {
                lastMessageTime = response.messages[0].timestamp;
                displayMessages(response.messages);
            }
        },
        error: function(xhr) {
            console.error("Failed to fetch messages:", xhr.responseText);
        }
    });
}

function displayMessages(messages) {
    const messagesContainer = $('.messages-content');
    messages.reverse().forEach(message => {  // Mesaj listesini ters çevir
        const messageElement = `<div class="message new"><p>${message.content}</p></div>`;
        messagesContainer.append(messageElement);
    });

    updateScrollbar();
}

setInterval(fetchMessages, 500);
