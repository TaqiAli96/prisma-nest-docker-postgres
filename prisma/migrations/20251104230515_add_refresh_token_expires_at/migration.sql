-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMP(3);

-- Update existing records:
-- 1. If token was created more than 3 days ago, set it as expired (1 day before current time)
-- 2. If token was created less than 3 days ago, set expiry to 3 days from createdAt
UPDATE "RefreshToken" 
SET "expiresAt" = CASE
  WHEN "createdAt" < NOW() - INTERVAL '3 days' THEN NOW() - INTERVAL '1 day'  -- Expire old tokens
  ELSE "createdAt" + INTERVAL '3 days'  -- Set expiry for recent tokens
END
WHERE "expiresAt" IS NULL;