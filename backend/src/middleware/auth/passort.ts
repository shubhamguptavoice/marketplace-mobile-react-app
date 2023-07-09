var { User } = require("../../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "770429167654-o1pph9ng4bgsvr8ihstgshuq4p85ne87.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "your id";
const GITHUB_CLIENT_SECRET = "your id";

const FACEBOOK_APP_ID = "615290210039351";
const FACEBOOK_APP_SECRET = "793ca4ed110a7d49e9d5652878303cf6";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/google/callback",
      rofileFields: ["id", "displayName", "photos", "email"],
    },
   async function (accessToken: any, refreshToken: any, profile: any, done: any) {
      const newUser = {
        
        google_id: profile.id,
        fname: profile.displayName,
        lname: profile.name.givenName,
        email: profile.email,
        photo: profile.photos[0].value,
      };
      console.log(newUser);
      var conflic= await  User.find({ google_id:profile.id })
     console.log("email already exits",conflic!=0);
     if (conflic[0]) {
      console.log("email already exitsl",!conflic);
      done(null, profile);
     
     }else{
      var userdta = new User(newUser);
      userdta.save();
      done(null, profile);
     }
     
    }
  )
);

passport.use(
  new AppleStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",

    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/api/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },

   async function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log(profile.id, profile.displayName, profile.email, accessToken);

      const newUser = {
        
        fb_id: profile.id,
        fname: profile.displayName,
        lname: profile.displayName,
        email: profile.email,
        photo: profile.photos[0].value,
      };
     // console.log(newUser);
     var conflic= await  User.find({ fb_id:profile.id })
     console.log("email already exits",conflic!=0);
     if (conflic[0]) {
      console.log("email already exitsl",!conflic);
      done(null, profile);
     
     }else{
      var userdta = new User(newUser);
      userdta.save();
      done(null, profile);
     }
      
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});
