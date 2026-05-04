-- 1. TABELA DE USUÁRIOS (Identificação Unificada e Trava de Idade) [6, 11, 12]
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT UNIQUE NOT NULL, -- Nome público (5 a 10 caracteres)
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  birth_date DATE, -- Imutável após o primeiro acesso (Trava de Idade) [11, 13]
  tier TEXT DEFAULT 'FREE', -- FREE, VIP1, VIP2, SUPORTE, ADM [14, 15]
  age_group TEXT, -- Kids, Teen, Adult, Senior (Define o Dashboard) [13, 16]
  is_active BOOLEAN DEFAULT true,
  terms_accepted BOOLEAN DEFAULT false, -- Aceite da LGPD [11, 17]
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CARTEIRA DUAL-WALLET (Moeda de Ouro e Prata) [10, 18, 19]
CREATE TABLE wallet (
  user_id UUID REFERENCES users(id) PRIMARY KEY,
  ic_gold DECIMAL(18, 10) DEFAULT 0, -- Moedas mineradas (sacáveis após R$ 20,00) [18, 20, 21]
  ic_silver DECIMAL(18, 10) DEFAULT 0, -- Moeda de Prata (is_stamped: não sacável) [18, 22]
  last_update TIMESTAMPTZ DEFAULT now()
);

-- 3. PAGAMENTOS PENDENTES (Fluxo de Boleto e Shadow Itens) [23-25]
CREATE TABLE pending_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  item_id INT NOT NULL,
  status TEXT DEFAULT 'PENDING', -- PENDING, CONFIRMED, EXPIRED [25, 26]
  amount_fiat DECIMAL(10,2) NOT NULL, -- Valor em Reais
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);