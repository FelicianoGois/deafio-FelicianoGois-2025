const animais = [
  { nome: 'Rex', tipo: 'Cao', brinquedos: ['RATO', 'BOLA'] },
  { nome: 'Mimi', tipo: 'Gato', brinquedos: ['BOLA', 'LASER'] },
  { nome: 'Fofo', tipo: 'Gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  { nome: 'Zero', tipo: 'Gato', brinquedos: ['RATO', 'BOLA'] },
  { nome: 'Bola', tipo: 'Cao', brinquedos: ['CAIXA', 'NOVELO'] },
  { nome: 'Bebe', tipo: 'Cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  { nome: 'Loco', tipo: 'Jabuti', brinquedos: ['SKATE', 'RATO'] }
];

function adocao(brinquedosPessoas, animaisDesejados) {
  const resultado = [];
  const adotados = new Set();
  const adocoesPorPessoa = Array(brinquedosPessoas.length).fill(0);
  const candidatos = {};

  // Verifica compatibilidade
  animais.forEach(animal => {
    const compativeis = [];

    brinquedosPessoas.forEach((lista, idx) => {
      const brinquedos = lista.split(',').map(b => b.trim());
      const favoritos = animal.brinquedos;

      const temTodos = animal.nome === 'Loco'
        ? favoritos.every(f => brinquedos.includes(f))
        : favoritos.every((f, i) => brinquedos[i] === f);

      if (temTodos) compativeis.push(idx);
    });

    candidatos[animal.nome] = compativeis;
  });

  // Resolve adoções
  animais.forEach(animal => {
    const nome = animal.nome;
    const tipo = animal.tipo;
    const compativeis = candidatos[nome];

    if (adotados.has(nome)) return;

    if (compativeis.length === 1 && adocoesPorPessoa[compativeis[0]] < 3) {
      resultado.push(`${nome} - pessoa ${compativeis[0] + 1}`);
      adotados.add(nome);
      adocoesPorPessoa[compativeis[0]]++;
    } else if (compativeis.length > 1 && tipo !== 'Gato') {
      resultado.push(`${nome} - abrigo`);
    } else if (tipo === 'Gato' && compativeis.length > 1) {
      resultado.push(`${nome} - abrigo`);
    } else if (compativeis.length === 0) {
      resultado.push(`${nome} - abrigo`);
    }
  });

  // Regra do jabuti Loco
  if (!adotados.has('Loco')) {
    const locoCompativeis = candidatos['Loco'];
    const podeAdotar = locoCompativeis.find(idx => adocoesPorPessoa[idx] < 3);

    if (podeAdotar !== undefined && resultado.some(r => r.includes(`pessoa ${podeAdotar + 1}`))) {
      resultado.push(`Loco - pessoa ${podeAdotar + 1}`);
      adotados.add('Loco');
      adocoesPorPessoa[podeAdotar]++;
    } else {
      resultado.push('Loco - abrigo');
    }
  }

  return { lista: resultado };
}

// 🔎 Exemplo de teste
const brinquedos = ['RATO,BOLA', 'CAIXA,NOVELO', 'LASER,RATO,BOLA'];
const desejados = ['Rex,Fofo,Bola'];

console.log(adocao(brinquedos, desejados));
