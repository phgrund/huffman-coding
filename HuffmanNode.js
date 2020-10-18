/** Classe representando um Nó de Huffman */
class HuffmanNode {
  /**
   * Cria um Nó
   * @param {number} freq   Frequência em que a letra aparece no texto
   * @param {string} letter Letra do texto
   */
  constructor (freq, letter) {
    this._freq = freq
    this._letter = letter || ''
    // Nó filho à esquerda
    this._left = null
    // Nó filho à direita
    this._right = null
  }

  get letter () {
    return this._letter
  }

  set letter (letter) {
    this._letter = letter
  }

  get freq () {
    return this._freq
  }

  set freq (freq) {
    this._freq = freq
  }

  get left () {
    return this._left
  }

  set left (left) {
    this._left = left
  }

  get right () {
    return this._right
  }

  set right (right) {
    this._right = right
  }
}

module.exports = HuffmanNode
