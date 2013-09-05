-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 
-- Versão do Servidor: 5.5.24-log
-- Versão do PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `filmera`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ator`
--

CREATE TABLE IF NOT EXISTS `ator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `ator`
--

INSERT INTO `ator` (`id`, `nome`) VALUES
(1, 'Wesley Snipes'),
(2, 'Antonio Banderas'),
(3, 'Júlia Roberts'),
(4, 'Angelina Jolie');

-- --------------------------------------------------------

--
-- Estrutura da tabela `elenco`
--

CREATE TABLE IF NOT EXISTS `elenco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ator_id` int(11) NOT NULL,
  `filme_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ator_id` (`ator_id`),
  KEY `filme_id` (`filme_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `elenco`
--

INSERT INTO `elenco` (`id`, `ator_id`, `filme_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 1),
(5, 4, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `filme`
--

CREATE TABLE IF NOT EXISTS `filme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(80) NOT NULL,
  `ano` int(11) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `genero_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genero_id` (`genero_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `filme`
--

INSERT INTO `filme` (`id`, `titulo`, `ano`, `imagem`, `genero_id`) VALUES
(1, 'A Máscara do Zorro', 2005, '', 1),
(2, 'Tomb Raider', 2003, '', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `genero`
--

CREATE TABLE IF NOT EXISTS `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `genero`
--

INSERT INTO `genero` (`id`, `descricao`) VALUES
(1, 'Ação e Aventura'),
(2, 'Comédia'),
(3, 'Ficção Científica'),
(4, 'Guerra'),
(5, 'Terror');

--
-- Restrições para as tabelas dumpadas
--

--
-- Restrições para a tabela `elenco`
--
ALTER TABLE `elenco`
  ADD CONSTRAINT `elenco_ibfk_1` FOREIGN KEY (`ator_id`) REFERENCES `ator` (`id`),
  ADD CONSTRAINT `elenco_ibfk_2` FOREIGN KEY (`filme_id`) REFERENCES `filme` (`id`);

--
-- Restrições para a tabela `filme`
--
ALTER TABLE `filme`
  ADD CONSTRAINT `filme_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
