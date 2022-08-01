import Livro from "../model/livrosModels.js";
import { criaLivro } from "../services/validacoesLivro.js";

const modelLivros = new Livro();

const livroController = {
  cadastroNovoLivro: async (req, res) => {
    const body = req.body;

    try {
      const novoLivro = criaLivro(
        body.idLivro,
        body.titulo,
        body.autor,
        body.genero,
        body.formato,
        body.valor,
        body.idioma,
        body.numeroPaginas
      );

      await modelLivros.cadastroLivro(novoLivro);

      res.json({
        msg: "Cadastro do livro realizado com sucesso",
        livro: novoLivro,
        erro: false,
      });

    } catch (error) {
      res.json({ 
        msg: error.message, 
        erro: true 
      });
    }
  },

  listarLivros: async (req, res) => {
    const todosLivros = await modelLivros.listaDeLivros();

    res.json({
      livros: todosLivros,
      erro: false,
    });
  },

  buscaLivro: async (req, res) => {
    const titulo = req.params.titulo;
    const resultadoBusca = await modelLivros.buscarTituloLivro(titulo);

    res.json({
      titulo: resultadoBusca,
      erro: false,
    });
  },

  buscaGenero: async (req, res) => {
    const genero = req.params.cpf;
    const resultadoBusca = await modelLivros.buscarGenero(genero);

    res.json({
      genero: resultadoBusca,
      erro: false,
    });
  },

  buscaAutor: async (req, res) => {
    const autor = req.params.email;
    const resultadoBusca = await modelLivros.buscarAutorLivro(autor);

    res.json({
      autor: resultadoBusca,
      erro: false,
    });
  },

  buscaIdioma: async (req, res) => {
    const idioma = req.params.idioma;
    const resultadoBusca = await modelLivros.buscarIdiomaLivro(idioma);

    res.json({
      idioma: resultadoBusca,
      erro: false,
    });
  },

  deletaLivro: async (req, res) => {
    const livro = req.params.livro;
    try {
      await modelLivros.removerLivro(livro);

      res.json({
        msg: "Livro deletado com sucesso",
        erro: false,
      });
    } catch (error) {
      res.json({
        msg: error.message,
        erro: true,
      });
    }
  },

  atualizarValorLivro: async (req, res) => {
    const idLivro = req.params.idLivro;
    const body = req.body;
    try {
      const valorAtualizado = atualizarValorLivro(body.idLivro, body.valor);
      await modelLivros.atualizaValorLivro(idLivro, valorAtualizado);
      res.json({
        msg: "Valor do livro atualizado com sucesso",
        valor: valorAtualizado,
        erro: false,
      });
    } catch (error) {
      res.json({
        msg: error.message,
        erro: true,
      });
    }
  },

};

export default livroController;
