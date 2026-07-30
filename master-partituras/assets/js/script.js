document.addEventListener('DOMContentLoaded', function() {
    var abcTextArea = document.getElementById("abc-codigo");
    
    // Evita erro se o script rodar numa página onde o shortcode não existe
    if (!abcTextArea) return; 
    
    var visualContainer = "partitura-visual";
    var historico = [abcTextArea.value];
    var maxHistorico = 30; // 5. Limite do histórico para não estourar a memória

    var synthControl = new ABCJS.synth.SynthController();
    synthControl.load("#audio-player", null, { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true });

    function renderizarPartitura() {
        var partitura = ABCJS.renderAbc(visualContainer, abcTextArea.value, { responsive: "resize", add_classes: true });
        var createSynth = new ABCJS.synth.CreateSynth();
        createSynth.init({ visualObj: partitura[0] }).then(function () {
            synthControl.setTune(partitura[0], false, { chordsOff: false });
        }).catch(console.warn);
    }

    // Função auxiliar para guardar histórico com limite
    function salvarHistorico() {
        historico.push(abcTextArea.value);
        if (historico.length > maxHistorico) {
            historico.shift(); // Remove o estado mais antigo da memória
        }
    }

    // 2. Inserção no local correto do cursor
    function inserirNoCursor(texto) {
        salvarHistorico();
        var inicio = abcTextArea.selectionStart;
        var fim = abcTextArea.selectionEnd;
        var textoAntes = abcTextArea.value.substring(0, inicio);
        var textoDepois = abcTextArea.value.substring(fim, abcTextArea.value.length);
        
        abcTextArea.value = textoAntes + texto + textoDepois;
        
        // Move o cursor para logo após o texto inserido
        abcTextArea.selectionStart = abcTextArea.selectionEnd = inicio + texto.length;
        abcTextArea.focus();
    }

    // --- SELETOR DE TOM ---
    document.getElementById('seletor-tom').addEventListener('change', function() {
        var novoTom = this.value;
        salvarHistorico();
        // 3. Regex seguro sem a flag /g (apenas afeta o primeiro cabeçalho)
        abcTextArea.value = abcTextArea.value.replace(/K:\s*[A-Za-z#b]+/, "K: " + novoTom);
        renderizarPartitura();
    });

    // --- SELETOR DE COMPASSO ---
    document.getElementById('seletor-compasso').addEventListener('change', function() {
        var novoCompasso = this.value;
        salvarHistorico();
        // 3. Regex seguro sem a flag /g
        abcTextArea.value = abcTextArea.value.replace(/M:\s*[^\n]+/, "M: " + novoCompasso);
        renderizarPartitura();
    });

    // --- ESTADOS ---
    var estadoAtual = { duracao: "", acidente: "", oitava: "" };
    function gerenciarModificadores(classeBtn, tipoEstado) {
        document.querySelectorAll(classeBtn).forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll(classeBtn).forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                estadoAtual[tipoEstado] = this.getAttribute('data-val');
            });
        });
    }

    gerenciarModificadores('.btn-duracao', 'duracao');
    gerenciarModificadores('.btn-acidente', 'acidente');
    gerenciarModificadores('.btn-oitava', 'oitava');

    // 4. Resetar a interface visual
    function resetarModificadoresVisuais() {
        estadoAtual = { duracao: "", acidente: "", oitava: "" };
        document.querySelectorAll('.btn-duracao, .btn-acidente, .btn-oitava').forEach(b => b.classList.remove('active'));
        // Reativa os botões padrão
        document.querySelector('.btn-duracao[data-val=""]').classList.add('active');
        document.querySelector('.btn-acidente[data-val=""]').classList.add('active');
        document.querySelector('.btn-oitava[data-val=""]').classList.add('active');
    }

    // --- INSERIR NOTAS ---
    document.querySelectorAll('.btn-nota').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var notaBase = this.getAttribute('data-nota');
            var dinamicaSelect = document.getElementById('seletor-dinamica');
            var dinamicaVal = dinamicaSelect ? dinamicaSelect.value : "";
            
            var stringFinal = "";
            if (notaBase === 'z') {
                stringFinal = notaBase + estadoAtual.duracao;
            } else {
                stringFinal = dinamicaVal + estadoAtual.acidente + notaBase + estadoAtual.oitava + estadoAtual.duracao;
            }

            // Usa a nova função de inserção precisa
            inserirNoCursor(" " + stringFinal);

            if (dinamicaSelect && dinamicaVal !== "") dinamicaSelect.value = "";
            renderizarPartitura();
        });
    });

    // --- BARRAS E QUEBRAS ---
    document.querySelectorAll('.btn-acao').forEach(function(btn) {
        btn.addEventListener('click', function() {
            inserirNoCursor(this.getAttribute('data-acao'));
            renderizarPartitura();
        });
    });

    // --- NOVA PAUTA ---
    document.getElementById('btn-nova-pauta').addEventListener('click', function() {
        salvarHistorico();
        
        // 6. Lógica de Pauta Segura: Encontra a maior voz existente e soma 1
        var matches = abcTextArea.value.match(/V:\s*\d+/g);
        var maiorVoz = 1;
        if (matches) {
            matches.forEach(function(m) {
                var num = parseInt(m.replace("V:", "").trim());
                if (num > maiorVoz) maiorVoz = num;
            });
        }
        var proximaVoz = maiorVoz + 1;
        
        inserirNoCursor("\n\nV: " + proximaVoz + "\n");
        renderizarPartitura();
    });

    // --- DESFAZER ---
    document.getElementById('btn-desfazer').addEventListener('click', function() {
        if(historico.length > 0) {
            abcTextArea.value = historico.pop();
            renderizarPartitura();
        }
    });

    // --- LIMPAR ---
    document.getElementById('btn-limpar').addEventListener('click', function() {
        salvarHistorico();
        var tomAtual = document.getElementById('seletor-tom').value;
        var compassoAtual = document.getElementById('seletor-compasso').value;
        abcTextArea.value = "X: 1\nT: Minha Composição\nM: " + compassoAtual + "\nL: 1/4\nQ: 1/4=100\nK: " + tomAtual + "\nV: 1\n";
        
        // Aciona a correção visual dos botões
        resetarModificadoresVisuais();
        
        renderizarPartitura();
    });

    // 1. O Debounce Corrigido
    var timerRenderizacao;
    abcTextArea.addEventListener("input", function() {
        clearTimeout(timerRenderizacao); // Cancela a renderização anterior se continuar a escrever
        timerRenderizacao = setTimeout(renderizarPartitura, 500); // Aguarda 500ms
    });

    // Primeira renderização ao abrir
    renderizarPartitura();
});
