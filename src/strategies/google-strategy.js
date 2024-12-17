const User = require("../mongoose/schemas/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/v1/auth/google/redirect",
      scope: ["profile"],
    },
    async function verify(issuer, profile, done) {
      try {
        // Look for existing federated credentials
        const existingUser = await User.findOne({
          "federatedCredentials.provider": issuer,
          "federatedCredentials.subject": profile.id,
        });

        if (!existingUser) {
          // Create new user if none exists
          const newUser = new User({
            username: profile.displayName.toLowerCase().replace(/\s+/g, "_"), // Convert display name to username format
            displayName: profile.displayName,
            password: hashPassword(Math.random().toString(36).slice(-8)), // Generate random password
            federatedCredentials: [
              {
                provider: issuer,
                subject: profile.id,
              },
            ],
          });

          await newUser.save();
          return done(null, newUser);
        }

        // User found, return it
        return done(null, existingUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
