set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"totalWins" integer NOT NULL DEFAULT '0',
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."games" (
	"gameId" serial NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL,
	"isActive" BOOLEAN NOT NULL,
	"player1" integer NOT NULL,
	"player2" integer NOT NULL,
	"player1Score" integer NOT NULL,
	"player2Score" integer NOT NULL,
	"gameTime" integer NOT NULL,
	CONSTRAINT "games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."osuCoordinates" (
	"gameId" integer NOT NULL,
	"xAxis" integer NOT NULL,
	"yAxis" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "games" ADD CONSTRAINT "games_fk0" FOREIGN KEY ("player1") REFERENCES "users"("userId");
ALTER TABLE "games" ADD CONSTRAINT "games_fk1" FOREIGN KEY ("player2") REFERENCES "users"("userId");

ALTER TABLE "osuCoordinates" ADD CONSTRAINT "osuCoordinates_fk0" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
