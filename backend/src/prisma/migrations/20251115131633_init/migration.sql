-- CreateTable
CREATE TABLE "Audio" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);
