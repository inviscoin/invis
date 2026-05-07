/* ARQUIVO: supabase/migrations/001_auth_updates.sql
 OBJETIVO: IMPLEMENTAÇÃO DE COLUNAS DE SEGURANÇA E SESSÕES
 */
-- Adiciona campos de biometria e LGPD à tabela de usuários
 ALTER TABLE users ADD COLUMN IF NOT EXISTS biometrics_active BOOLEAN DEFAULT false, ADD COLUMN IF NOT EXISTS ip_acceptance TEXT, ADD COLUMN IF NOT EXISTS age_verified BOOLEAN DEFAULT false;
-- Criação da Tabela de Sessões para Controle de JWT (Refresh Tokens)
 CREATE TABLE IF NOT EXISTS sessions ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, refresh_token TEXT UNIQUE NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT now() );
-- Registra a ação no Livro-Razão de Auditoria
 INSERT INTO audit_logs (action, old_value, new_value) VALUES ('MIGRATION_AUTH_V1', 'Initial Schema', 'Auth Columns Added');
