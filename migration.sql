-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "sex" INT NOT NULL,
    "age" INT NOT NULL,
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

-- CreateTable
CREATE TABLE "Feedback" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "stars" INT,
    "reply" TEXT,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
