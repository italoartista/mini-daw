// Dados de exemplo
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 5, 4, 5];

// Função para calcular a média de um array
function mean(array) {
  // Soma todos os elementos do array e divide pelo número de elementos
  return array.reduce((acc, val) => acc + val, 0) / array.length;
}

// Função para calcular a correlação entre dois arrays
function correlation(x, y) {
  const xMean = mean(x); // Calcula a média de x
  const yMean = mean(y); // Calcula a média de y

  // Calcula a correlação utilizando a fórmula de Pearson
  const numerator = x.reduce(
    (acc, val, index) => acc + (val - xMean) * (y[index] - yMean),
    0
  );
  const denominatorX = Math.sqrt(
    x.reduce((acc, val) => acc + Math.pow(val - xMean, 2), 0)
  );
  const denominatorY = Math.sqrt(
    y.reduce((acc, val) => acc + Math.pow(val - yMean, 2), 0)
  );

  return numerator / (denominatorX * denominatorY); // Retorna o coeficiente de correlação
}

// Função para calcular os coeficientes da regressão linear
function linearRegression(x, y) {
  const correlationXY = correlation(x, y); // Calcula o coeficiente de correlação
  const xMean = mean(x); // Calcula a média de x
  const yMean = mean(y); // Calcula a média de y

  // Calcula o coeficiente angular (slope) e o coeficiente linear (intercept)
  const slope =
    correlationXY *
    (Math.sqrt(mean(y.map((val) => Math.pow(val - yMean, 2)))) /
      Math.sqrt(mean(x.map((val) => Math.pow(val - xMean, 2)))));
  const intercept = yMean - slope * xMean;
  return [slope, intercept]; // Retorna os coeficientes da regressão linear
}

// Calculando os coeficientes da regressão linear
const [slope, intercept] = linearRegression(x, y);

// Imprimindo os coeficientes
console.log(`Coeficiente angular (slope): ${slope}`);
console.log(`Coeficiente linear (intercept): ${intercept}`);

// Função para prever um valor de y dado um valor de x
function predict(xValue, slope, intercept) {
  return slope * xValue + intercept; // Retorna o valor previsto de y para um dado valor de x
}

// Prevendo um valor de y para um novo valor de x
const newX = 6;
const predictedY = predict(newX, slope, intercept);
console.log(`Valor de y previsto para x=${newX}: ${predictedY}`);
