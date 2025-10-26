document.addEventListener('DOMContentLoaded', function () {
    const adicionar = document.getElementById('adicionar');
    const excluir = document.getElementById('excluir');
    const editar = document.getElementById('editar');
    const modal = document.getElementById('modal');
    const confirmar = document.getElementById('confirmar');
    const cancelar = document.getElementById('cancelar');
    const telaSecundaria = document.getElementById('telaSecundaria');
    const telaPrincipal = document.getElementById('telaPrincipal');
    const voltar = document.getElementById('voltar');
    const botadd = document.getElementById('botadd');
    const quadro = document.getElementById('quadro');
    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idade');
    const cursoInput = document.getElementById('curso');
    const notaInput = document.getElementById('nota');
    const detalhes = document.getElementById('detalhes');
    const telaTer = document.getElementById('telaTer');
    const voltar2 = document.getElementById('voltar2');
    const quadroDetalhes = document.getElementById('quadroDetalhes');
    const ordenar = document.getElementById('ordenar');
    const reverter = document.getElementById('reverter');
    let indiceGlobal = null;
    let modo = 'Adicionar';
    let alunosanteriores=[];
    let ordenado=false;
    let alunoEditando = null;


    class Aluno{
        constructor(nome, idade, curso, nota){
            this.nome = nome;
            this.idade = idade;
            this.curso = curso;
            this.nota = nota;
        };
        get to_string(){
            return `${this.nome}<br>
                    ${this.idade}<br>
                    ${this.curso}<br>
                    ${this.nota}<br>`;
        }
        isAprovado(){
            return this.nota >= 7;
        }
    };
    let alunos = [];
    function mostrartela1() {
        telaPrincipal.style.display = 'block';
        telaSecundaria.style.display = 'none';
        telaTer.style.display = 'none';
    }

    function mostrartela2() {
        telaPrincipal.style.display = 'none';
        telaSecundaria.style.display = 'block';
        telaTer.style.display = 'none';
    }

    function mostrartela3() {
        telaPrincipal.style.display = 'none';
        telaSecundaria.style.display = 'none';
        telaTer.style.display = 'block';
    }

    function atualizarquadro() {
        quadro.innerHTML = '';
        alunos.forEach((aluno,index) => {
            const txt = document.createElement('div');
            txt.className = 'aluno';
            txt.innerHTML = aluno.to_string;
            txt.addEventListener('click', function () {
                txt.classList.toggle('selecionado');
            });
            quadro.appendChild(txt);
        });
    }

    function atualizarquadro_detalhes() {
        quadroDetalhes.innerHTML = '';
        alunos.forEach((aluno,index) => {
            const txt = document.createElement('div');
            txt.className = 'itemDetalhes';
            txt.innerHTML = aluno.to_string;
            if (aluno.isAprovado()){
                quadroDetalhes.appendChild(txt);
            }
        });

        function mostrarmedianota(){
            let soma = 0;
            alunos.forEach(aluno => {
                soma += aluno.nota;
            });
            if (alunos.length === 0) return;
            const media = soma / alunos.length;
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media';
            mediaDiv.innerHTML = `Média de notas: ${media.toFixed(2)}`;
            quadroDetalhes.appendChild(mediaDiv);
        }
        mostrarmedianota();
        function mostrarmediaidade(){
            let soma = 0;
            alunos.forEach(aluno => {
                soma += aluno.idade;
            });
            if(media === 0) return;
            const media = soma / alunos.length;
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media';
            mediaDiv.innerHTML = `Média de idades: ${media.toFixed(2)}`;
            quadroDetalhes.appendChild(mediaDiv);    
        }
        mostrarmediaidade();
        function mostrarqtdalunocurso(){
            const cursos = {};
            alunos.forEach(aluno => {
                if (cursos[aluno.curso]) {
                    cursos[aluno.curso]++;
                } else {
                    cursos[aluno.curso] = 1;
                }
            });
            for (const curso in cursos) {
                const cursoDiv = document.createElement('div');
                cursoDiv.className = 'cursoQtd';
                cursoDiv.innerHTML = `Curso: ${curso} - Quantidade de alunos: ${cursos[curso]}`;
                quadroDetalhes.appendChild(cursoDiv);
            }
        }
        mostrarqtdalunocurso();
    }

    function ordenarAlunosPorNome() {
        alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    adicionar.onclick = function () {
        modo = 'Adicionar';
        nomeInput.value = '';
        idadeInput.value = '';
        cursoInput.value = '';
        notaInput.value = '';
        mostrartela2();
    };

    excluir.onclick = function () {
    const selecionados = document.querySelectorAll('.aluno.selecionado');
    if (selecionados.length > 0) {
        modal.style.display = 'block';
    } else {
        alert('Por favor, selecione pelo menos um item para excluir.');
    }
    };

    confirmar.onclick = function () {
        const selecionados = document.querySelectorAll('.aluno.selecionado');
        if (selecionados.length === 0) {
            modal.style.display = 'none';
            return;
        }

        const textosSelecionados = Array.from(selecionados).map(el => el.innerHTML.trim());

        selecionados.forEach(el => el.remove());

        alunos = alunos.filter(aluno => {
            return !textosSelecionados.includes(aluno.to_string.trim());
        });

        if (ordenado) {
            alunosanteriores = alunosanteriores.filter(aluno => {
                return !textosSelecionados.includes(aluno.to_string.trim());
            });
        }

        atualizarquadro();
        modal.style.display = 'none';
    };

    cancelar.onclick = function () {
        modal.style.display = 'none';
    };

    botadd.onclick = function () {
        const nome = nomeInput.value.trim();
        const idade = parseInt(idadeInput.value, 10);
        const curso = cursoInput.value.trim();
        const nota = parseFloat(notaInput.value);

        if (!nome){
            alert('Por favor, preencha o campo Nome.');
            return;
        }
        if (isNaN(idade) || idade <= 0){
            alert('Por favor, preencha o campo Idade com um número válido.');
            return;
        }
        if(!curso){
            alert('Por favor, preencha o campo Curso.');
            return;
        }
        if (isNaN(nota) || nota < 0 || nota > 10){
            alert('Por favor, preencha o campo Nota com um número entre 0 e 100.');
            return;
        }

        if (modo === 'Adicionar') {
            const txt = document.createElement('div');
            txt.className = 'aluno';
            txt.innerHTML = new Aluno(nome, idade, curso, nota).to_string;
            txt.addEventListener('click', function () {
                txt.classList.toggle('selecionado');
            });
            if(ordenado){
                alunosanteriores.push(new Aluno(nome, idade, curso, nota));
            }
            else{
                quadro.appendChild(txt);
            }
            alunos.push(new Aluno(nome, idade, curso, nota));
        } 
        else if (modo === 'Editar' && alunoEditando !== null) {
            alunoEditando.nome = nome;
            alunoEditando.idade = idade;
            alunoEditando.curso = curso;
            alunoEditando.nota = nota;
            alunoEditando = null;
            modo = 'Adicionar';
        }

        else if (modo === 'Editar' && indiceGlobal !== null) {
            alunos[indiceGlobal]=new Aluno(nome, idade, curso, nota);
            if(ordenado){
                alunosanteriores[indiceGlobal]=new Aluno(nome, idade, curso, nota);
            }
            else{
                alunos[indiceGlobal]=new Aluno(nome, idade, curso, nota);
            }
            indiceGlobal = null;
        }
        atualizarquadro();
        mostrartela1();
    };

    editar.onclick = function () {
    const selecionados = document.querySelectorAll('.aluno.selecionado');
    if (selecionados.length === 1) {
        const pessoa = selecionados[0];
        const indice = Array.from(quadro.children).indexOf(pessoa);
        alunoEditando = alunos[indice]; // salva o objeto real

        nomeInput.value = alunoEditando.nome;
        idadeInput.value = alunoEditando.idade;
        cursoInput.value = alunoEditando.curso;
        notaInput.value = alunoEditando.nota;

        modo = 'Editar';
        mostrartela2();
    } else {
        alert('Selecione exatamente um item para editar.');
    }
    };
    
    ordenar.onclick = function () {
        if (!ordenado){
            alunosanteriores = [...alunos];
            ordenarAlunosPorNome();
            ordenar.textContent = 'mostrar alunos na ordem original';
            ordenado = true;
        }
        else{
            alunos = [...alunosanteriores];
            ordenar.textContent = 'mostrar alunos ordenados';
            ordenado = false;
        }
        atualizarquadro();
    };

    detalhes.onclick = function () {
        mostrartela3();
        atualizarquadro_detalhes();
    };
    voltar2.onclick = mostrartela1;
    voltar.onclick = mostrartela1;
    
    mostrartela1();
});