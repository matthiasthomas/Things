var config = require("../config.js");
var _ = require('lodash');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var crypto = require("crypto");

var secrets = require('./secrets');
var User = require('../api/user/user.model.js');
var Token = require('../api/token/token.model.js');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

function createToken(user, callback) {
  crypto.randomBytes(48, function (err, randomKey) {
    var token = new Token({
      expiration: Math.round(+new Date() / 1000) + config.ttlToken,
      _user: user._id,
      key: randomKey.toString('hex')
    });
    token.save(function (err) {
      callback(err, token.key);
    });
  });
}

/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy(secrets.instagram, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      instagram: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      else if (existingUser) {
        return done('There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          user.instagram = profile.id;
          user.tokens.push({
            kind: 'instagram',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.data.profile_picture;
          user.profile.website = user.profile.website || profile._json.data.website;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      instagram: profile.id
    }, function (err, existingUser) {
      if (existingUser) return done(null, existingUser);

      var user = new User();
      user.instagram = profile.id;
      user.tokens.push({
        kind: 'instagram',
        accessToken: accessToken
      });
      user.profile.name = profile.displayName;
      // Similar to Twitter API, assigns a temporary e-mail address
      // to get on with the registration process. It can be changed later
      // to a valid e-mail address in Profile Management.
      user.email = profile.username + "@instagram.com";
      user.profile.website = profile._json.data.website;
      user.profile.picture = profile._json.data.profile_picture;
      createToken(user, function (err, key) {
        user.currentToken = key;
        user.save(function (err) {
          return done(err, user);
        });
      });
    });
  }
}));

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  email = email.toLowerCase();
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) return done(err);
    if (!user) return done('Email ' + email + ' not found');
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        createToken(user, function (err, key) {
          if (err) return done(err);
          user.currentToken = key;
          user.save(function (err) {
            return done(err, user);
          });
        });
      } else {
        return done('Invalid email or password.');
      }
    });
  });
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy(secrets.facebook, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      facebook: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      else if (existingUser) {
        return done('There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          user.facebook = profile.id;
          user.tokens.push({
            kind: 'facebook',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      facebook: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);
      User.findOne({
        email: profile._json.email
      }, function (err, existingEmailUser) {
        if (err) return done(err);
        if (existingEmailUser) {
          return done('There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.');
        } else {
          var user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({
            kind: 'facebook',
            accessToken: accessToken
          });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        }
      });
    });
  }
}));

/**
 * Sign in with GitHub.
 */
passport.use(new GitHubStrategy(secrets.github, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      github: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) {
        return done('There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          if (err) return done(err);
          user.github = profile.id;
          user.tokens.push({
            kind: 'github',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.avatar_url;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.website = user.profile.website || profile._json.blog;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      github: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);
      User.findOne({
        email: profile._json.email
      }, function (err, existingEmailUser) {
        if (err) return done(err);
        if (existingEmailUser) {
          return done('There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.');
        } else {
          var user = new User();
          user.email = profile._json.email;
          user.github = profile.id;
          user.tokens.push({
            kind: 'github',
            accessToken: accessToken
          });
          user.profile.name = profile.displayName;
          user.profile.picture = profile._json.avatar_url;
          user.profile.location = profile._json.location;
          user.profile.website = profile._json.blog;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        }
      });
    });
  }
}));

// Sign in with Twitter.

passport.use(new TwitterStrategy(secrets.twitter, function (req, accessToken, tokenSecret, profile, done) {
  if (req.user) {
    User.findOne({
      twitter: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) {
        return done('There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          if (err) return done(err);
          user.twitter = profile.id;
          user.tokens.push({
            kind: 'twitter',
            accessToken: accessToken,
            tokenSecret: tokenSecret
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      twitter: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);
      var user = new User();
      // Twitter will not provide an email address.  Period.
      // But a person’s twitter username is guaranteed to be unique
      // so we can "fake" a twitter email address as follows:
      user.email = profile.username + "@twitter.com";
      user.twitter = profile.id;
      user.tokens.push({
        kind: 'twitter',
        accessToken: accessToken,
        tokenSecret: tokenSecret
      });
      user.profile.name = profile.displayName;
      user.profile.location = profile._json.location;
      user.profile.picture = profile._json.profile_image_url_https;
      createToken(user, function (err, key) {
        user.currentToken = key;
        user.save(function (err) {
          return done(err, user);
        });
      });
    });
  }
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy(secrets.google, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      google: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) {
        return done('There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          if (err) return done(err);
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      google: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);
      User.findOne({
        email: profile.emails[0].value
      }, function (err, existingEmailUser) {
        if (err) return done(err);
        if (existingEmailUser) {
          if (err) return done('There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.');
        } else {
          var user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken: accessToken
          });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        }
      });
    });
  }
}));

/**
 * Sign in with LinkedIn.
 */
passport.use(new LinkedInStrategy(secrets.linkedin, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      linkedin: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) {
        return done('There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
      } else {
        User.findById(req.user.id, function (err, user) {
          if (err) return done(err);
          user.linkedin = profile.id;
          user.tokens.push({
            kind: 'linkedin',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location.name;
          user.profile.picture = user.profile.picture || profile._json.pictureUrl;
          user.profile.website = user.profile.website || profile._json.publicProfileUrl;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        });
      }
    });
  } else {
    User.findOne({
      linkedin: profile.id
    }, function (err, existingUser) {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);
      User.findOne({
        email: profile._json.emailAddress
      }, function (err, existingEmailUser) {
        if (err) return done(err);
        if (existingEmailUser) {
          return done('There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.');
        } else {
          var user = new User();
          user.linkedin = profile.id;
          user.tokens.push({
            kind: 'linkedin',
            accessToken: accessToken
          });
          user.email = profile._json.emailAddress;
          user.profile.name = profile.displayName;
          user.profile.location = profile._json.location.name;
          user.profile.picture = profile._json.pictureUrl;
          user.profile.website = profile._json.publicProfileUrl;
          createToken(user, function (err, key) {
            user.currentToken = key;
            user.save(function (err) {
              return done(err, user);
            });
          });
        }
      });
    });
  }
}));

/**
 * Tumblr API OAuth.
 */
passport.use('tumblr', new OAuthStrategy({
  requestTokenURL: 'http://www.tumblr.com/oauth/request_token',
  accessTokenURL: 'http://www.tumblr.com/oauth/access_token',
  userAuthorizationURL: 'http://www.tumblr.com/oauth/authorize',
  consumerKey: secrets.tumblr.consumerKey,
  consumerSecret: secrets.tumblr.consumerSecret,
  callbackURL: secrets.tumblr.callbackURL,
  passReqToCallback: true
},
  function (req, token, tokenSecret, profile, done) {
    User.findById(req.user._id, function (err, user) {
      if (err) return done(err);
      user.tokens.push({
        kind: 'tumblr',
        accessToken: token,
        tokenSecret: tokenSecret
      });
      createToken(user, function (err, key) {
        user.currentToken = key;
        user.save(function (err) {
          return done(err, user);
        });
      });
    });
  }
  ));

/**
 * Foursquare API OAuth.
 */
passport.use('foursquare', new OAuth2Strategy({
  authorizationURL: 'https://foursquare.com/oauth2/authorize',
  tokenURL: 'https://foursquare.com/oauth2/access_token',
  clientID: secrets.foursquare.clientId,
  clientSecret: secrets.foursquare.clientSecret,
  callbackURL: secrets.foursquare.redirectUrl,
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    User.findById(req.user._id, function (err, user) {
      if (err) return done(err);
      user.tokens.push({
        kind: 'foursquare',
        accessToken: accessToken
      });
      createToken(user, function (err, key) {
        user.currentToken = key;
        user.save(function (err) {
          return done(err, user);
        });
      });
    });
  }
  ));

/**
 * Venmo API OAuth.
 */
passport.use('venmo', new OAuth2Strategy({
  authorizationURL: 'https://api.venmo.com/v1/oauth/authorize',
  tokenURL: 'https://api.venmo.com/v1/oauth/access_token',
  clientID: secrets.venmo.clientId,
  clientSecret: secrets.venmo.clientSecret,
  callbackURL: secrets.venmo.redirectUrl,
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    User.findById(req.user._id, function (err, user) {
      if (err) return done(err);
      user.tokens.push({
        kind: 'venmo',
        accessToken: accessToken
      });
      createToken(user, function (err, key) {
        user.currentToken = key;
        user.save(function (err) {
          return done(err, user);
        });
      });
    });
  }
  ));

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, {
    kind: provider
  })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};

exports.passport = passport;