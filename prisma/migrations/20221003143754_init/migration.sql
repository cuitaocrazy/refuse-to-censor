-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seasonId" TEXT NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT,
    "path" TEXT,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("episodeNumber", "id", "path", "seasonId", "title") SELECT "episodeNumber", "id", "path", "seasonId", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "imdbId" TEXT,
    "poster" TEXT,
    "year" TEXT,
    "cast" TEXT,
    "director" TEXT,
    "plot" TEXT,
    "genre" TEXT
);
INSERT INTO "new_Series" ("cast", "director", "genre", "id", "imdbId", "plot", "poster", "title", "year") SELECT "cast", "director", "genre", "id", "imdbId", "plot", "poster", "title", "year" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
CREATE UNIQUE INDEX "Series_imdbId_key" ON "Series"("imdbId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
