/**
 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" API keys and passwords so
 * that all features could work out of the box.
 *
 * Use config vars (environment variables) below for production API keys
 * and passwords. Each PaaS (e.g. Heroku, Nodejitsu, OpenShift, Azure) has a way
 * for you to set it up from the dashboard.
 *
 * Another added benefit of this approach is that you can use two different
 * sets of keys for local development and production mode without making any
 * changes to the code.
 
 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 */

module.exports = {

  db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  // MailGun
  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },

  // ManDrill
  mandrill: {
    user: process.env.MANDRILL_USER || 'hackathonstarterdemo',
    password: process.env.MANDRILL_PASSWORD || 'E1K950_ydLR4mHw12a0ldA'
  },

  // SendGrid
  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },

  // NYT
  nyt: {
    key: process.env.NYT_KEY || '9548be6f3a64163d23e1539f067fcabd:5:68537648'
  },

  // LastFM
  lastfm: {
    api_key: process.env.LASTFM_KEY || 'c8c0ea1c4a6b199b3429722512fbd17f',
    secret: process.env.LASTFM_SECRET || 'is cb7857b8fba83f819ea46ca13681fe71'
  },

  // Facebook
  facebook: {
    clientID: process.env.FACEBOOK_ID || '718430748292626',
    clientSecret: process.env.FACEBOOK_SECRET || 'a0799427bf154a5a38e2d159f7ffbe4c',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  // Instagram
  instagram: {
    clientID: process.env.INSTAGRAM_ID || '9f5c39ab236a48e0aec354acb77eee9b',
    clientSecret: process.env.INSTAGRAM_SECRET || '5920619aafe842128673e793a1c40028',
    callbackURL: '/auth/instagram/callback',
    passReqToCallback: true
  },

  // Github
  github: {
    clientID: process.env.GITHUB_ID || 'cb448b1d4f0c743a1e36',
    clientSecret: process.env.GITHUB_SECRET || '815aa4606f476444691c5f1c16b9c70da6714dc6',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  },

  // Twitter
  twitter: {
    consumerKey: process.env.TWITTER_KEY || '5HEjTbfjasIfxPZkjQEWgx2mw',
    consumerSecret: process.env.TWITTER_SECRET || 'eFvuDgUthIbUYPX5Xz649f55HmRHvbA4MB50zyCt0oNkIKH5Vo',
    callbackURL: 'http://localhost:8080/auth/twitter/callback',
    passReqToCallback: true
  },

  // Google
  google: {
    clientID: process.env.GOOGLE_ID || '692138578031-avhpmuvu7g92kkrdl8pav3katk3n9asa.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'w3mv2HIeIpFVu6MImZB_oUr6',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },

  // LinkedIn
  linkedin: {
    clientID: process.env.LINKEDIN_ID || '77chexmowru601',
    clientSecret: process.env.LINKEDIN_SECRET || 'szdC8lN2s2SuMSy8',
    callbackURL: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3000/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  },

  // Steam
  steam: {
    apiKey: process.env.STEAM_KEY || 'D1240DEF4D41D416FD291D0075B6ED3F'
  },

  // Twilio
  twilio: {
    sid: process.env.TWILIO_SID || 'AC6f0edc4c47becc6d0a952536fc9a6025',
    token: process.env.TWILIO_TOKEN || 'a67170ff7afa2df3f4c7d97cd240d0f3'
  },

  // Clockwork
  clockwork: {
    apiKey: process.env.CLOCKWORK_KEY || '9ffb267f88df55762f74ba2f517a66dc8bedac5a'
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SKEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2',
    publishableKey: process.env.STRIPE_PKEY || 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
  },

  // Tumblr
  tumblr: {
    consumerKey: process.env.TUMBLR_KEY || 'FaXbGf5gkhswzDqSMYI42QCPYoHsu5MIDciAhTyYjehotQpJvM',
    consumerSecret: process.env.TUMBLR_SECRET || 'QpCTs5IMMCsCImwdvFiqyGtIZwowF5o3UXonjPoNp4HVtJAL4o',
    callbackURL: '/auth/tumblr/callback'
  },

  // Foursquare
  foursquare: {
    clientId: process.env.FOURSQUARE_ID || '2STROLSFBMZLAHG3IBA141EM2HGRF0IRIBB4KXMOGA2EH3JG',
    clientSecret: process.env.FOURSQUARE_SECRET || 'UAABFAWTIHIUFBL0PDC3TDMSXJF2GTGWLD3BES1QHXKAIYQB',
    redirectUrl: process.env.FOURSQUARE_REDIRECT_URL || 'http://localhost:3000/auth/foursquare/callback'
  },

  // Venmo
  venmo: {
    clientId: process.env.VENMO_ID || '1688',
    clientSecret: process.env.VENMO_SECRET || 'uQXtNBa6KVphDLAEx8suEush3scX8grs',
    redirectUrl: process.env.VENMO_REDIRECT_URL || 'http://localhost:3000/auth/venmo/callback'
  },

  // PayPal
  paypal: {
    host: 'api.sandbox.paypal.com',
    client_id: process.env.PAYPAL_ID || 'AdGE8hDyixVoHmbhASqAThfbBcrbcgiJPBwlAM7u7Kfq3YU-iPGc6BXaTppt',
    client_secret: process.env.PAYPAL_SECRET || 'EPN0WxB5PaRaumTB1ZpCuuTqLqIlF6_EWUcAbZV99Eu86YeNBVm9KVsw_Ez5',
    returnUrl: process.env.PAYPAL_RETURN_URL || 'http://localhost:3000/api/paypal/success',
    cancelUrl: process.env.PAYPAL_CANCEL_URL || 'http://localhost:3000/api/paypal/cancel'
  },

  // LOB
  lob: {
    apiKey: process.env.LOB_KEY || 'test_814e892b199d65ef6dbb3e4ad24689559ca'
  },

  // BitGo
  bitgo: {
    accessToken: process.env.BITGO_ACCESS_TOKEN || '4fca3ed3c2839be45b03bbd330e5ab1f9b3989ddd949bf6b8765518bc6a0e709'
  }
};