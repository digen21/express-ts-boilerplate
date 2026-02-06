import { Express } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

import { env } from "@config";
import { findOrCreateGoogleUser } from "@controllers";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = env;

export default (app: Express) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done,
      ) => {
        try {
          const user = await findOrCreateGoogleUser(profile);
          return done(null, user);
        } catch (error) {
          return done(error as Error, false);
        }
      },
    ),
  );

  app.use(passport.initialize());
};
