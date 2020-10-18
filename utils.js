const { readFile, writeFile } = require('fs').promises
const HuffmanNode = require('./HuffmanNode')

/**
 * Lê um arquivo com um texto qualquer
 * @param {string} path    Caminho do arquivo a ser lido
 * @return {string}     O texto do 
 */
const parseFile = async path => {
  const file = await readFile(path, 'utf-8')

  if (!file || typeof file !== 'string') throw new Error('Arquivo inválido')

  const letters = file/*.replace(/\r?\n|\r/g, '')*/.split('')

  return letters
}

/**
 * Conta a frequência que as letras aparecem na Array de letras
 * @param {Array<string>} letters Array contendo as letras do texto
 * @return {object}               Objeto contendo como chave a letra, e como valor a frequência
 */
const getLetterFreq = letters => {
  const obj = {}

  letters.forEach(letter => {
    if (Object.prototype.hasOwnProperty.call(obj, letter)) {
      obj[letter] += 1
    } else {
      obj[letter] = 1
    }
  })

  return obj
}

/**
 * Preenche as letras e suas frequẽncias na fila de prioridade
 * @param {object} queue       Uma fila de prioridade
 * @param {object} lettersFreq Objeto contendo como chave a letra, e como valor a frequência
 */
const fillQueue = (queue, lettersFreq) => {
  for (const [key, value] of Object.entries(lettersFreq)) {
    newNode = new HuffmanNode(value, key)

    newNode.left = null
    newNode.right = null

    queue.add(newNode)
  }
}

/**
 * Aplica o Algoritmo de Huffman a uma Lista de Prioridade
 * @param {typeof PriorityQueue} queue Lista de Prioridade
 * @return {object}                    Raíz da Árvore de Huffman
 */
const applyHuffmanAlgorithm = (queue) => {
  let root = null
  while (queue.size() > 1) {
    const x = queue.poll()
    const y = queue.poll()

    const f = new HuffmanNode(x.freq + y.freq)

    f.left = x
    f.right = y

    root = f

    queue.add(f)
  }

  return root
}

/**
 * Retorna um texto formatado para visualização mais fácil
 * ' ' quando é um espaço
 * \n  quando é uma quebra de linha
 * \t  quando é um tab
 * @param {letter} letter Letra a ser formatada
 * @return {string}       Letra formatada
 */
const getFormattedLetter = letter => {
  switch (letter) {
    case ' ':
      return '\' \''
    case '\n':
      return '\\n'
    case '\t':
      return '\\t'
    default:
      return letter
  }
}

/**
 * Recursivamente retorna a codificação de Huffman das letras na Árvore
 * @param {Array}              arr  Referência de uma Array para armazenar os objetos dos nós gerados
 * @param {typeof HuffmanNode} root Raíz da Árvore de Huffman
 * @param {string}             acc  String acumuladora dos textos recursivamente
 */
const recursiveTreeParse = (arr, root, acc = '') => {
  if (typeof root === 'object' && root.left === null && root.right === null && root.letter !== '-') {
    return arr.push({
      letter: getFormattedLetter(root.letter),
      code: acc,
      freq: root.freq
    })
  }

  if (root instanceof HuffmanNode) {
    recursiveTreeParse(arr, root.left, acc + '0')
    recursiveTreeParse(arr, root.right, acc + '1')
  }
}

/**
 * Lista a letra, sua frequência e sua codificação
 * @param {typeof HuffmanNode} root Raíz da Árvore de Huffman
 */
const printTree = root => {
  const lines = []

  recursiveTreeParse(lines, root)

  lines.sort((a, b) => a.letter.localeCompare(b.letter))

  lines.forEach(line => {
    console.log(`${line.letter}(${line.freq}):   \t${line.code}`)
  })
}

/**
 * Salva em um arquivo .csv a letra, sua frequência e sua codificação
 * @param {typeof HuffmanNode} root Raíz da Árvore de Huffman
 * @param {path}               path Caminho .csv a ser salvo a árvore de Huffman
 */
const printTreeToFile = async (root, path) => {
  let lines = []

  recursiveTreeParse(lines, root)

  lines.sort((a, b) => a.letter.localeCompare(b.letter))

  lines = lines.map(line => `${line.letter},${line.freq},${line.code}`)
  lines.unshift('Letra,Frequência,Codificação')

  await writeFile(path, lines.join('\n'))
}

module.exports = {
  parseFile,
  getLetterFreq,
  fillQueue,
  applyHuffmanAlgorithm,
  printTree,
  printTreeToFile
}
