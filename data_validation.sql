-- Data Validation Queries
-- Generated with AI assistance using Claude, reviewed and refined by Burcin Fidan

-- -------------------------------------------------------
-- 1. Find users who completed onboarding but have no onboarding event record
-- -------------------------------------------------------
SELECT 
    u.id,
    u.email,
    u.onboarding_status,
    u.created_at
FROM users u
LEFT JOIN onboarding_events oe 
    ON u.id = oe.user_id 
    AND oe.status = 'completed'
WHERE u.onboarding_status = 'completed'
AND oe.user_id IS NULL;

-- -------------------------------------------------------
-- 2. Find duplicate user accounts with the same email
-- -------------------------------------------------------
SELECT 
    email,
    COUNT(*) as account_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY account_count DESC;

-- -------------------------------------------------------
-- 3. Validate billing amounts match expected plan prices
-- -------------------------------------------------------
SELECT 
    u.id,
    u.email,
    s.plan_type,
    s.billed_amount,
    p.expected_price,
    CASE 
        WHEN s.billed_amount != p.expected_price THEN 'MISMATCH'
        ELSE 'OK'
    END as validation_status
FROM users u
JOIN subscriptions s ON u.id = s.user_id
JOIN plan_pricing p ON s.plan_type = p.plan_type
WHERE s.billed_amount != p.expected_price;

-- -------------------------------------------------------
-- 4. Find accounts still active after cancellation
-- -------------------------------------------------------
SELECT 
    u.id,
    u.email,
    s.status,
    s.cancelled_at,
    s.access_expires_at
FROM users u
JOIN subscriptions s ON u.id = s.user_id
WHERE s.status = 'cancelled'
AND s.access_expires_at > NOW();

-- -------------------------------------------------------
-- 5. Validate multi-tenant data isolation
-- Check if any records are missing an org_id (data leak risk)
-- -------------------------------------------------------
SELECT 
    id,
    table_name,
    created_at
FROM (
    SELECT id, 'patient_records' as table_name, created_at FROM patient_records WHERE org_id IS NULL
    UNION ALL
    SELECT id, 'documents' as table_name, created_at FROM documents WHERE org_id IS NULL
    UNION ALL
    SELECT id, 'reports' as table_name, created_at FROM reports WHERE org_id IS NULL
) unscoped_records
ORDER BY created_at DESC;

-- -------------------------------------------------------
-- 6. Find users with locked accounts and check lockout timing
-- -------------------------------------------------------
SELECT 
    u.id,
    u.email,
    al.locked_at,
    al.unlock_at,
    al.failed_attempts,
    CASE 
        WHEN al.unlock_at > NOW() THEN 'STILL LOCKED'
        ELSE 'SHOULD BE UNLOCKED'
    END as lock_status
FROM users u
JOIN account_lockouts al ON u.id = al.user_id
WHERE al.locked_at IS NOT NULL
ORDER BY al.locked_at DESC;
