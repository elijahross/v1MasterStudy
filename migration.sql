-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "sex" INT NOT NULL,
    "age" INT NOT NULL,
    "education" TEXt,
    "country" TEXT,
    "qa1" INT,
    "qa2" INT,
    "qa3" INT,
    "qa4" INT,
    "qa5" INT,
    "qa6" INT,
    "qa7" INT,
    "qa8" INT,
    "qa9" INT,
    "qa10" INT,
    "qa11" INT,
    "qa12" INT,
    "qa13" INT,
    "qa14" INT,
    "qa15" INT,
    "qa16" INT,
    "qa17" INT,
    "qa18" INT,
    "qa19" INT,
    "qa20" INT,
    "qa21" INT,
    "qa22" INT,
    "qa23" INT,
    "qa24" INT,
    "qa25" INT,
    "qa26" INT,
    "qa27" INT,
    "qa28" INT,
    "qa29" INT,
    "qa30" INT,
    "qa31" INT,
    "qa32" INT,
    "qa33" INT,
    "qa34" INT,
    "qa35" INT,
    "qa36" INT,
    "qa37" INT,
    "qa38" INT,
    "qa39" INT,
    "qa40" INT,
    "qa41" INT,
    "qa42" INT,
    "qa43" INT,
    "qa44" INT,
    "qa45" INT,
    "qa46" INT,
    "qa47" INT,
    "qa48" INT,
    "qa49" INT,
    "qa50" INT,
    "qa51" INT,
    "qa52" INT,
    "qa53" INT,
    "qa54" INT,
    "qa55" INT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "sessionsLeft" INT,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Options" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "followup" BOOLEAN,
    "information" BOOLEAN,
    "history" BOOLEAN,
    "contacts" BOOLEAN,
    CONSTRAINT "Options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "date" DATETIME NOT NULL,
    "verified" BOOLEAN
);
-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateTable
CREATE TABLE "Feedback" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "stars" INT,
    "reply" TEXT,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);