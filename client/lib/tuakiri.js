Router.route('tuakiri', {
  action: function() {
    Meteor.call('tuakiriLogin', function(error, token) {
      if (token) {
        //Meteor.connection.setUserId(userId);
        Session.setPersistent('_storedLoginToken', token);
        Meteor.loginWithToken(token, function(err){
          if(err) {
            console.error(err)
            document.location.reload(true);
          } else {
            console.log('loginWithToken ',token);
          }
        });
        Router.go('home');
      } else {
        document.location.reload(true);
      }
    });
  }
})

Tracker.autorun(function () {
  var token = Session.get('_storedLoginToken');
  if(token) {
    Meteor.loginWithToken(token, function(err){
      if(err) {
        console.error(err)
      } else {
        console.log('loginWithToken ',token);
      }
    });
  }
});