const PriorityQueue = require('./PriorityQueue')

const { parseFile, getLetterFreq, fillQueue, applyHuffmanAlgorithm, printTree, printTreeToFile } = require('./utils')

const main = async () => {
  const letters = await parseFile('entrada.txt')

  const lettersFreq = getLetterFreq(letters)

  const queue = new PriorityQueue((a, b) => a.freq - b.freq)

  fillQueue(queue, lettersFreq)

  let root = applyHuffmanAlgorithm(queue)

  printTree(root)
  printTreeToFile(root, 'saida.csv')
}

main()
