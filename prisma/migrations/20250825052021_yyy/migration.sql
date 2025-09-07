-- CreateTable
CREATE TABLE "public"."custom_sections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."custom_section_items" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_section_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "custom_sections_key_key" ON "public"."custom_sections"("key");

-- AddForeignKey
ALTER TABLE "public"."custom_sections" ADD CONSTRAINT "custom_sections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."custom_section_items" ADD CONSTRAINT "custom_section_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."custom_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
