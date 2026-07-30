document.addEventListener('DOMContentLoaded', function() {
    var abcTextArea = document.getElementById("abc-codigo");
    
    // Evita erro se o script rodar numa página onde o shortcode não existe
    if (!abcTextArea) return; 
    
    var visualContainer = "partitura-visual";
    var historico = [abcTextArea.value];

    var synthControl = new ABCJS.synth.SynthController();
    synthControl.load("#audio-player", null, { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true });

    function renderizarPartitura() {
        var partitura = ABCJS.renderAbc(visualContainer, abcTextArea.value, { responsive: "resize", add_classes: true });
        var createSynth = new ABCJS.synth.CreateSynth();
        createSynth.init({ visualObj: partitura[0] }).then(function () {
            synthControl.setTune(partitura[0], false, { chordsOff: false });
        }).catch(console.warn);
    }

    // --- SELETOR DE TOM ---
    document.getElementById('seletor-tom').addEventListener('change', function() {
        var novoTom = this.value;
        historico.push(abcTextArea.value);
        abcTextArea.value = abcTextArea.value.replace(/K:\s*[A-Za-z#b]+/g, "K: " + novoTom);
        renderizarPartitura();
    });

    // --- SELETOR DE COMPASSO ---
    document.getElementById('seletor-compasso').addEventListener('change', function() {
        var novoCompasso = this.value;
        historico.push(abcTextArea.value);
        abcTextArea.value = abcTextArea.value.replace(/M:\s*[^\n]+/g, "M: " + novoCompasso);
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

            historico.push(abcTextArea.value);
            abcTextArea.value += " " + stringFinal;

            if (dinamicaSelect && dinamicaVal !== "") dinamicaSelect.value = "";
            renderizarPartitura();
        });
    });

    // --- BARRAS E QUEBRAS ---
    document.querySelectorAll('.btn-acao').forEach(function(btn) {
        btn.addEventListener('click', function() {
            historico.push(abcTextArea.value);
            abcTextArea.value += this.getAttribute('data-acao');
            renderizarPartitura();
        });
    });

    // --- NOVA PAUTA ---
    document.getElementById('btn-nova-pauta').addEventListener('click', function() {
        historico.push(abcTextArea.value);
        var matches = abcTextArea.value.match(/V:\s*\d+/g);
        var proximaVoz = matches ? matches.length + 1 : 2;
        abcTextArea.value += "\n\nV: " + proximaVoz + "\n";
        renderizarPartitura();
    });

    // --- DESFAZER ---
    document.getElementById('btn-desfazer').addEventListener('click', function() {
        if(historico.length > 1) {
            abcTextArea.value = historico.pop();
            renderizarPartitura();
        }
    });

    // --- LIMPAR ---
    document.getElementById('btn-limpar').addEventListener('click', function() {
        historico.push(abcTextArea.value);
        var tomAtual = document.getElementById('seletor-tom').value;
        var compassoAtual = document.getElementById('seletor-compasso').value;
        abcTextArea.value = "X: 1\nT: Minha Composição\nM: " + compassoAtual + "\nL: 1/4\nQ: 1/4=100\nK: " + tomAtual + "\nV: 1\n";
        renderizarPartitura();
    });

    abcTextArea.addEventListener("input", function() {
        setTimeout(renderizarPartitura, 500);
    });

    renderizarPartitura();
});