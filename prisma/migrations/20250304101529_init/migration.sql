-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "ingridents" TEXT[],
    "instruction" TEXT[],
    "prepTime" INTEGER,
    "cookTime" INTEGER NOT NULL,
    "cuisine" TEXT NOT NULL,
    "serves" TEXT NOT NULL,
    "notes" TEXT[],
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceipeTag" (
    "reciepeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ReceipeTag_pkey" PRIMARY KEY ("reciepeId","tagId")
);

-- CreateTable
CREATE TABLE "ReceipeCategory" (
    "reciepeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ReceipeCategory_pkey" PRIMARY KEY ("reciepeId","categoryId")
);

-- CreateTable
CREATE TABLE "contactUs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aboutUs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorInfo" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "websiteInfo" TEXT[],
    "social" TEXT[],

    CONSTRAINT "aboutUs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Receipe_id_key" ON "Receipe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contactUs_id_key" ON "contactUs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "aboutUs_id_key" ON "aboutUs"("id");

-- AddForeignKey
ALTER TABLE "ReceipeTag" ADD CONSTRAINT "ReceipeTag_reciepeId_fkey" FOREIGN KEY ("reciepeId") REFERENCES "Receipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceipeTag" ADD CONSTRAINT "ReceipeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceipeCategory" ADD CONSTRAINT "ReceipeCategory_reciepeId_fkey" FOREIGN KEY ("reciepeId") REFERENCES "Receipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceipeCategory" ADD CONSTRAINT "ReceipeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
