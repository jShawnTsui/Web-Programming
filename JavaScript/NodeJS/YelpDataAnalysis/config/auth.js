// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'        : '1941681139396910', //  App ID
        'clientSecret'    : '8e7d340eee547584259af281693f8567', //App Secret
        'callbackURL'     : 'http://localhost:3030/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    }
};
