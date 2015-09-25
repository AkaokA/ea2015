---
---



_500px.init({
  sdk_key: '155b760fafbd5e2a6b66ba90799d820f99cf74ef'
});
// When the user logs in we will pull their favorite photos
_500px.on('authorization_obtained', function () {
  $('#not_logged_in').hide();
  $('#logged_in').show();
  // Get my user id
  _500px.api('/users', function (response) {
    var me = response.data.user;
    // Get my favorites
    _500px.api('/photos', { feature: 'user_favorites', user_id: me.id }, function (response) {
      if (response.data.photos.length == 0) {
        alert('You have no favorite photos.');
      } else {
        $.each(response.data.photos, function () {
          $('#logged_in').append('<img src="' + this.image_url + '" />');
        });
      }
    });
  });
});
_500px.on('logout', function () {
  $('#not_logged_in').show();
  $('#logged_in').hide();
  $('#logged_in').html('');
});
// If the user has already logged in & authorized your application, this will fire an 'authorization_obtained' event
_500px.getAuthorizationStatus();
// If the user clicks the login link, log them in
$('#login').click(_500px.login);