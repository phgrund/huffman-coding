/** Classe representando uma fila de prioridade */
class PriorityQueue {
  /**
   * Cria uma Lista de Prioridade
   * @param {Function} comparator Função de comparação para a funcao Array.prototype.sort
   */
  constructor (comparator) {
    this._queue = []
    this._comparator = comparator
  }

  /**
   * Lista todos os nós da Lista
   */
  print () {
    console.log(this._queue)
  }

  /**
   * Retorna o tamanho da lista
   * @return {number}
   */
  size () {
    return this._queue.length
  }

  /**
   * Ordena a lista de Prioridade
   */
  sort () {
    this._queue.sort(this._comparator)
  }

  /**
   * Adiciona um elemento à Lista de Prioridade
   * @param {any} el Elemento a ser Adicionado
   */
  add (el) {
    this._queue.push(el)
    this.sort()
  }

  /**
   * Remove o primeiro elemento da Lista, e retorna-o
   * @return {any} Primeiro elemento
   */
  poll () {
    const el = this._queue.shift()
    this.sort()
    return el
  }
}

module.exports = PriorityQueue
