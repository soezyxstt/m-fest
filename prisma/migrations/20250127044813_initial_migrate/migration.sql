-- CreateEnum
CREATE TYPE "CompetitionName" AS ENUM ('STEM', 'PDC', 'IPPC', 'BCC');

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identityCardUrl" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "pdDiktiUrl" TEXT NOT NULL,
    "followIGUrl" TEXT NOT NULL,
    "twibbon" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "name" "CompetitionName" NOT NULL,
    "description" TEXT,
    "maxMembers" INTEGER NOT NULL DEFAULT 5,
    "minMembers" INTEGER NOT NULL DEFAULT 3,
    "earlyStart" TIMESTAMP(3) NOT NULL,
    "normalStart" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leaderId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leader" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Leader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "paymentProofUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_googleId_key" ON "profile"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_leaderId_key" ON "Team"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Leader_profileId_key" ON "Leader"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_teamId_key" ON "Registration"("teamId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Leader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leader" ADD CONSTRAINT "Leader_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
