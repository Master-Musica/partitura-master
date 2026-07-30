<div id="master-partituras-app" style="background: #f9f9f9; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        
    <h3 style="margin-top: 0; color: #1d2327; font-size: 20px;">🎵 Estúdio de Composição Visual</h3>
    
    <div style="background: #fff; padding: 12px; border: 1px solid #c3c4c7; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; flex-wrap: wrap; gap: 15px;">
        
        <div style="display: flex; align-items: center; gap: 8px; flex: 1 1 240px;">
            <span style="font-weight: 600; font-size: 13px; color: #3c434a; white-space: nowrap;">TOM:</span>
            <select id="seletor-tom" style="padding: 6px 10px; border-radius: 4px; border: 1px solid #8c8f94; font-size: 14px; cursor: pointer; width: 100%;">
                <option value="C" selected>Dó Maior / Lá Menor</option>
                <option value="G">Sol Maior (1 Sustenido)</option>
                <option value="D">Ré Maior (2 Sustenidos)</option>
                <option value="A">Lá Maior (3 Sustenidos)</option>
                <option value="E">Mi Maior (4 Sustenidos)</option>
                <option value="F">Fá Maior (1 Bemol)</option>
                <option value="Bb">Si♭ Maior (2 Bemóis)</option>
                <option value="Eb">Mi♭ Maior (3 Bemóis)</option>
                <option value="Ab">Lá♭ Maior (4 Bemóis)</option>
            </select>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex: 1 1 200px;">
            <span style="font-weight: 600; font-size: 13px; color: #3c434a; white-space: nowrap;">COMPASSO:</span>
            <select id="seletor-compasso" style="padding: 6px 10px; border-radius: 4px; border: 1px solid #8c8f94; font-size: 14px; cursor: pointer; width: 100%;">
                <optgroup label="Simples">
                    <option value="4/4" selected>4/4 (Quaternário)</option>
                    <option value="3/4">3/4 (Ternário)</option>
                    <option value="2/4">2/4 (Binário)</option>
                    <option value="2/2">2/2 (Alla Breve)</option>
                    <option value="C">C (Tempo Comum)</option>
                </optgroup>
                <optgroup label="Compostos">
                    <option value="6/8">6/8 (Binário Composto)</option>
                    <option value="9/8">9/8 (Ternário Composto)</option>
                    <option value="12/8">12/8 (Quat. Composto)</option>
                </optgroup>
            </select>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex: 1 1 200px;">
            <span style="font-weight: 600; font-size: 13px; color: #3c434a; white-space: nowrap;">DINÂMICA:</span>
            <select id="seletor-dinamica" style="padding: 6px 10px; border-radius: 4px; border: 1px solid #8c8f94; font-size: 14px; cursor: pointer; width: 100%;">
                <option value="" selected>Nenhuma</option>
                <option value="!pp!">Pianíssimo (pp)</option>
                <option value="!p!">Piano (p)</option>
                <option value="!mp!">Mezzo-piano (mp)</option>
                <option value="!mf!">Mezzo-forte (mf)</option>
                <option value="!f!">Forte (f)</option>
                <option value="!ff!">Fortíssimo (ff)</option>
            </select>
        </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px;">
        
        <div style="background: #fff; padding: 12px; border: 1px solid #c3c4c7; border-radius: 8px;">
            <span style="display: block; font-weight: 600; font-size: 12px; color: #3c434a; margin-bottom: 8px;">DURAÇÃO DA NOTA</span>
            <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                <button class="btn-mod btn-duracao" data-val="8" title="Breve">𝅜</button>
                <button class="btn-mod btn-duracao" data-val="4" title="Semibreve">𝅝</button>
                <button class="btn-mod btn-duracao" data-val="2" title="Mínima">𝅗𝅥</button>
                <button class="btn-mod btn-duracao active" data-val="" title="Semínima (Padrão)">♩</button>
                <button class="btn-mod btn-duracao" data-val="/" title="Colcheia">♪</button>
                <button class="btn-mod btn-duracao" data-val="/4" title="Semicolcheia">𝅘𝅥𝅯</button>
                <button class="btn-mod btn-duracao" data-val="/8" title="Fusa">𝅘𝅥𝅰</button>
                <button class="btn-mod btn-duracao" data-val="/16" title="Semifusa">𝅘𝅥𝅱</button>
            </div>
        </div>

        <div style="background: #fff; padding: 12px; border: 1px solid #c3c4c7; border-radius: 8px;">
            <span style="display: block; font-weight: 600; font-size: 12px; color: #3c434a; margin-bottom: 8px;">ACIDENTES / OITAVAS</span>
            <div style="display: flex; gap: 5px; margin-bottom: 5px;">
                <button class="btn-mod btn-acidente" data-val="_" title="Bemol">♭</button>
                <button class="btn-mod btn-acidente active" data-val="" title="Padrão">Padrão</button>
                <button class="btn-mod btn-acidente" data-val="^" title="Sustenido">♯</button>
                <button class="btn-mod btn-acidente" data-val="=" title="Bequadro">♮</button>
            </div>
            <div style="display: flex; gap: 5px;">
                <button class="btn-mod btn-oitava" data-val="," title="Grave">⬇ Grave</button>
                <button class="btn-mod btn-oitava active" data-val="" title="Central">⏺ Central</button>
                <button class="btn-mod btn-oitava" data-val="'" title="Aguda">⬆ Aguda</button>
            </div>
        </div>
    </div>

    <div style="background: #fff; padding: 15px; border: 1px solid #c3c4c7; border-radius: 8px; margin-bottom: 15px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <span style="font-weight: 600; font-size: 13px; color: #3c434a; margin-right: 5px;">Inserir:</span>
        
        <button class="btn-nota" data-nota="C">Dó</button>
        <button class="btn-nota" data-nota="D">Ré</button>
        <button class="btn-nota" data-nota="E">Mi</button>
        <button class="btn-nota" data-nota="F">Fá</button>
        <button class="btn-nota" data-nota="G">Sol</button>
        <button class="btn-nota" data-nota="A">Lá</button>
        <button class="btn-nota" data-nota="B">Si</button>
        <button class="btn-nota" data-nota="z" style="background: #f6f7f7; color: #d63638; border-color: #d63638;">Pausa</button>

        <span style="border-left: 1px solid #c3c4c7; height: 24px; margin: 0 5px;"></span>

        <button class="btn-acao" data-acao=" | " style="background: #e7f5fe; border: 1px solid #007cba; color: #007cba; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Barra (|)</button>
        <button class="btn-acao" data-acao=" \n" style="background: #e7f5fe; border: 1px solid #1d2327; padding: 6px 12px; border-radius: 4px; cursor: pointer;">↵ Pular Linha</button>
        <button id="btn-nova-pauta" style="background: #d4edda; border: 1px solid #28a745; color: #155724; padding: 6px 12px; border-radius: 4px; cursor: pointer;">➕ Nova Pauta</button>

        <button id="btn-desfazer" style="background: #fcf0f1; border: 1px solid #8c8f94; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-left: auto;">⤺ Desfazer</button>
        <button id="btn-limpar" style="background: #fcf0f1; border: 1px solid #d63638; color: #d63638; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Limpar</button>
    </div>

    <details style="margin-bottom: 15px;">
        <summary style="cursor: pointer; color: #2271b1; font-size: 13px; font-weight: 500;">Ver/Editar Código ABC (Avançado)</summary>
        <textarea id="abc-codigo" rows="8" style="width: 100%; font-family: monospace; border: 1px solid #c3c4c7; padding: 10px; border-radius: 4px; margin-top: 8px; background: #fff;">X: 1
T: Minha Composição
M: 4/4
L: 1/4
Q: 1/4=100
K: C
V: 1
</textarea>
    </details>

    <div id="audio-player" style="background: #fff; padding: 10px; border: 1px solid #c3c4c7; border-radius: 8px; margin-bottom: 20px;"></div>
    <div id="partitura-visual" style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 8px; overflow-x: auto; min-height: 150px;"></div>

</div>
