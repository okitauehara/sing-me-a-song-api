CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"youtubeLink" TEXT NOT NULL UNIQUE,
	"score" integer NOT NULL DEFAULT '0',
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




