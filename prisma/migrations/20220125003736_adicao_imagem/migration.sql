-- CreateTable
CREATE TABLE "term" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    CONSTRAINT "related_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "term_term_key" ON "term"("term");

-- AddForeignKey
ALTER TABLE "related" ADD CONSTRAINT "related_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
