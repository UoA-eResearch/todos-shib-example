Meteor.methods({
  tuakiriLogin: function() {
    var h = headers.get(this);
    var mail = h.mail;
    var name = h.displayname;
    if (!mail) {
      console.error('Shib headers missing...');
      return;
    }
    var user = Accounts.findUserByEmail(mail);
    var userId;
    if (user) {
      userId = user._id;
      console.log('tuakiri login for ' + mail);
    } else {
      userId = Accounts.createUser({
                        username: mail,
                        email : mail,
                        profile  : {
                          //publicly visible fields like firstname goes here
                          name: name
                        }

      });
      console.log('account created for ' + mail);
    }
    this.setUserId(userId);
    var stampedLoginToken = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(userId, stampedLoginToken);
    return stampedLoginToken.token;
  }
});
