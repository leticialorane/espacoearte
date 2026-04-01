-- Criação do Schema para o Sistema Espaço e Arte
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS db_espaco_e_arte;
USE db_espaco_e_arte;

-- -----------------------------------------------------
-- Tabela ADMINISTRADOR (Gestão de Acesso)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS administrador (
    cpf_adm CHAR(11) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(8) NOT NULL,
    logado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (cpf_adm)
);

-- -----------------------------------------------------
-- Tabela CLIENTE (Entidade Central)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    endereco VARCHAR(200),
    PRIMARY KEY (id_cliente)
);

-- -----------------------------------------------------
-- Especialização: PESSOA_FISICA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pessoa_fisica (
    FK_CLIENTE_id_cliente INT NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    profissao VARCHAR(100),
    estado_civil ENUM('Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'),
    PRIMARY KEY (FK_CLIENTE_id_cliente),
    CONSTRAINT fk_pf_cliente 
        FOREIGN KEY (FK_CLIENTE_id_cliente) 
        REFERENCES cliente (id_cliente) 
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Especialização: PESSOA_JURIDICA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pessoa_juridica (
    FK_CLIENTE_id_cliente INT NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    PRIMARY KEY (FK_CLIENTE_id_cliente),
    CONSTRAINT fk_pj_cliente 
        FOREIGN KEY (FK_CLIENTE_id_cliente) 
        REFERENCES cliente (id_cliente) 
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabela TELEFONE (Atributo Multivalorado)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS telefone (
    FK_CLIENTE_id_cliente INT NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    PRIMARY KEY (FK_CLIENTE_id_cliente, telefone),
    CONSTRAINT fk_telefone_cliente 
        FOREIGN KEY (FK_CLIENTE_id_cliente) 
        REFERENCES cliente (id_cliente) 
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabela DOCUMENTO (Repositório de Arquivos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS documento (
    id_documento INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    caminho VARCHAR(300) NOT NULL,
    PRIMARY KEY (id_documento)
);

-- -----------------------------------------------------
-- Tabela CURRICULO (Gestão de Candidatos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS curriculo (
    id_curriculo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100),
    area_interesse ENUM('Estágio', 'Design', 'Marcenaria'),
    pretensao_salarial DECIMAL(4,2),
    mensagem TEXT,
    como_conheceu ENUM('Google', 'Instagram', 'Indicação', 'Outro'),
    visualizado BOOLEAN DEFAULT FALSE,
    FK_DOCUMENTO_id_documento INT,
    PRIMARY KEY (id_curriculo),
    CONSTRAINT fk_curriculo_documento 
        FOREIGN KEY (FK_DOCUMENTO_id_documento) 
        REFERENCES documento (id_documento)
);

-- -----------------------------------------------------
-- Tabela COMPROMISSO (Agenda de Atendimento)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS compromisso (
    id_compromisso INT NOT NULL AUTO_INCREMENT,
    data_hora DATETIME NOT NULL,
    tipo ENUM('Orçamento', 'Reunião', 'Medidas', 'Entrega'),
    funcionario VARCHAR(100),
    status ENUM('A confirmar', 'Confirmado', 'Realizado', 'Cancelado'),
    FK_CLIENTE_id_cliente INT NOT NULL,
    PRIMARY KEY (id_compromisso),
    CONSTRAINT fk_compromisso_cliente 
        FOREIGN KEY (FK_CLIENTE_id_cliente) 
        REFERENCES cliente (id_cliente)
);

-- -----------------------------------------------------
-- Tabela SERVICO (Gestão de Produção)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS servico (
    id_servico INT NOT NULL AUTO_INCREMENT,
    descricao TEXT,
    endereco_entrega VARCHAR(200),
    valor_base DECIMAL(6,2),
    status ENUM('Em espera', 'Em produção', 'Concluído', 'Cancelado'),
    FK_CLIENTE_id_cliente INT NOT NULL,
    FK_DOCUMENTO_id_documento INT,
    PRIMARY KEY (id_servico),
    CONSTRAINT fk_servico_cliente 
        FOREIGN KEY (FK_CLIENTE_id_cliente) 
        REFERENCES cliente (id_cliente),
    CONSTRAINT fk_servico_documento 
        FOREIGN KEY (FK_DOCUMENTO_id_documento) 
        REFERENCES documento (id_documento)
);

-- -----------------------------------------------------
-- Tabela FORMULARIO (Contatos do Site)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS formulario (
    id_formulario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100),
    mensagem TEXT,
    como_conheceu ENUM('Google', 'Instagram', 'Indicação', 'Outro'),
    visualizado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_formulario)
);