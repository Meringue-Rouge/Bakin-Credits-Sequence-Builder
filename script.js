let blocks = [];

const blockDefaults = {
    header: { text: 'Header Text' },
    title: { text: 'Title Text' },
    cast: { lines: ['Cast Member 1', 'Cast Member 2'] },
    image: { guid: '00000000-0000-0000-0000-000000000000', scale: 25, x: null, y: null, end_y: null, speed: null },
    wait: { time: 1.0 },
    final: { text: 'Thank you for playing!' }
};

const translations = {
    en: {
        'presets-title': 'Presets',
        'save-label': 'Save',
        'load-label': 'Load',
        'delete-preset-label': 'Delete',
        'export-label': 'Export Event',
        'global-settings-title': 'Global Settings',
        'starting-positions-title': 'Starting Positions (XY)',
        'credits-label': 'Credits:',
        'image-label': 'Image:',
        'end-positions-title': 'End Positions (Y)',
        'line-label': 'Line:',
        'image-line-label': 'Image Line:',
        'final-line-label': 'Final Line:',
        'speeds-title': 'Speeds',
        'scroll-label': 'Scroll:',
        'image-scroll-label': 'Image Scroll:',
        'final-scroll-label': 'Final Scroll:',
        'other-title': 'Other',
        'starting-line-id-label': 'Starting Line ID:',
        'clear-all-label': 'Clear All',
        'header-button-label': 'Header',
        'title-button-label': 'Title',
        'cast-button-label': 'Cast',
        'image-button-label': 'Image',
        'wait-button-label': 'Wait',
        'final-button-label': 'Final'
    },
    ja: {
        'presets-title': 'プリセット',
        'save-label': '保存',
        'load-label': '読み込む',
        'delete-preset-label': '削除',
        'export-label': 'イベントをエクスポート',
        'global-settings-title': 'グローバル設定',
        'starting-positions-title': '開始位置（XY）',
        'credits-label': 'クレジット：',
        'image-label': '画像：',
        'end-positions-title': '終了位置（Y）',
        'line-label': 'ライン：',
        'image-line-label': '画像ライン：',
        'final-line-label': '最終ライン：',
        'speeds-title': '速度',
        'scroll-label': 'スクロール：',
        'image-scroll-label': '画像スクロール：',
        'final-scroll-label': '最終スクロール：',
        'other-title': 'その他',
        'starting-line-id-label': '開始ラインID：',
        'clear-all-label': 'すべてクリア',
        'header-button-label': 'ヘッダー',
        'title-button-label': 'タイトル',
        'cast-button-label': 'キャスト',
        'image-button-label': '画像',
        'wait-button-label': '待機',
        'final-button-label': '最終'
    }
};

function updateLanguage() {
    const lang = document.getElementById('language').value;
    Object.keys(translations[lang]).forEach(id => {
        document.getElementById(id).textContent = translations[lang][id];
    });
    document.querySelector('html').lang = lang;
}

function addBlock(type) {
    const data = JSON.parse(JSON.stringify(blockDefaults[type]));
    blocks.push({type, data});
    renderBlocks();
}

function renderBlocks() {
    const list = document.getElementById('block-list');
    list.innerHTML = '';
    blocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.className = 'block';
        div.dataset.index = index;
        let content = generateBlockContent(block, index);
        div.innerHTML = content;
        const del = document.createElement('button');
        del.innerHTML = '🗑️';
        del.className = 'delete-button';
        del.onclick = () => deleteBlock(index);
        div.appendChild(del);
        list.appendChild(div);
        attachListeners(block, index);
    });
    makeSortable();
}

function makeSortable() {
    const list = document.getElementById('block-list');
    let draggedItem = null;

    Array.from(list.children).forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => item.style.display = 'none', 0);
        });
        item.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
        item.addEventListener('dragover', e => {
            e.preventDefault();
            const bounding = item.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            if (e.clientY - offset > 0) {
                item.style.borderBottom = 'solid 4px blue';
                item.style.borderTop = '';
            } else {
                item.style.borderTop = 'solid 4px blue';
                item.style.borderBottom = '';
            }
        });
        item.addEventListener('dragenter', e => {
            e.preventDefault();
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });
        item.addEventListener('dragleave', () => {
            item.style.backgroundColor = '';
            item.style.borderTop = '';
            item.style.borderBottom = '';
        });
        item.addEventListener('drop', e => {
            e.preventDefault();
            const bounding = item.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            item.style.backgroundColor = '';
            item.style.borderTop = '';
            item.style.borderBottom = '';
            if (e.clientY - offset > 0) {
                item.after(draggedItem);
            } else {
                item.before(draggedItem);
            }
            updateBlocksOrder();
        });
    });
}

function updateBlocksOrder() {
    const list = document.getElementById('block-list');
    const newBlocks = [];
    Array.from(list.children).forEach(item => {
        const index = parseInt(item.dataset.index);
        newBlocks.push(blocks[index]);
    });
    blocks = newBlocks;
    renderBlocks();
}

function generateBlockContent(block, index) {
    let content = '';
    switch (block.type) {
        case 'header':
            content = `<input type="text" class="header-text" id="block-text-${index}" value="${block.data.text}">`;
            break;
        case 'title':
            content = `<input type="text" class="title-text" id="block-text-${index}" value="${block.data.text}">`;
            break;
        case 'final':
            content = `<input type="text" class="final-text" id="block-text-${index}" value="${block.data.text}">`;
            break;
        case 'cast':
            content = `<textarea class="cast-text" id="block-lines-${index}">${block.data.lines.join('\n')}</textarea>`;
            break;
        case 'image':
            content = `
                <div class="image-placeholder">
                    [Image]
                    <input type="text" class="small-input" id="block-guid-${index}" value="${block.data.guid}" placeholder="GUID">
                </div>
                <div class="image-params">
                    <span class="param-icon">📏</span>
                    <input type="number" class="small-input" id="block-scale-${index}" value="${block.data.scale}" placeholder="Scale">
                    <span class="param-icon">📍</span>
                    <input type="number" class="small-input" id="block-x-${index}" value="${block.data.x || ''}" placeholder="X">
                    <input type="number" class="small-input" id="block-y-${index}" value="${block.data.y || ''}" placeholder="Y">
                    <span class="param-icon">🏁</span>
                    <input type="number" class="small-input" id="block-end_y-${index}" value="${block.data.end_y || ''}" placeholder="End Y">
                    <span class="param-icon">⚡</span>
                    <input type="number" step="0.1" class="small-input" id="block-speed-${index}" value="${block.data.speed || ''}" placeholder="Speed">
                </div>
            `;
            break;
        case 'wait':
            content = `
                <div class="wait-block">Wait for <input type="number" step="0.1" class="small-input inline-input" id="block-time-${index}" value="${block.data.time}"> seconds</div>
            `;
            break;
    }
    return content;
}

function attachListeners(block, index) {
    switch (block.type) {
        case 'header':
        case 'title':
        case 'final':
            document.getElementById(`block-text-${index}`).addEventListener('input', (e) => {
                block.data.text = e.target.value;
            });
            break;
        case 'cast':
            const textarea = document.getElementById(`block-lines-${index}`);
            textarea.addEventListener('input', (e) => {
                block.data.lines = e.target.value.split('\n').filter(line => line.trim() !== '');
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
            break;
        case 'image':
            document.getElementById(`block-guid-${index}`).addEventListener('input', (e) => block.data.guid = e.target.value);
            document.getElementById(`block-scale-${index}`).addEventListener('input', (e) => block.data.scale = parseInt(e.target.value) || 25);
            document.getElementById(`block-x-${index}`).addEventListener('input', (e) => block.data.x = e.target.value ? parseInt(e.target.value) : null);
            document.getElementById(`block-y-${index}`).addEventListener('input', (e) => block.data.y = e.target.value ? parseInt(e.target.value) : null);
            document.getElementById(`block-end_y-${index}`).addEventListener('input', (e) => block.data.end_y = e.target.value ? parseInt(e.target.value) : null);
            document.getElementById(`block-speed-${index}`).addEventListener('input', (e) => block.data.speed = e.target.value ? parseFloat(e.target.value) : null);
            break;
        case 'wait':
            document.getElementById(`block-time-${index}`).addEventListener('input', (e) => block.data.time = parseFloat(e.target.value) || 1.0);
            break;
    }
}

function deleteBlock(index) {
    blocks.splice(index, 1);
    renderBlocks();
}

function savePreset() {
    const name = document.getElementById('preset_name').value;
    if (!name) return;
    const preset = {globals: getGlobals(), blocks: JSON.parse(JSON.stringify(blocks))};
    localStorage.setItem('credits_preset_' + name, JSON.stringify(preset));
    updatePresetList();
}

function loadPreset() {
    const select = document.getElementById('preset_list');
    const name = select.value;
    if (!name) return;
    const preset = JSON.parse(localStorage.getItem('credits_preset_' + name));
    if (!preset) return;
    setGlobals(preset.globals);
    blocks = JSON.parse(JSON.stringify(preset.blocks || []));
    renderBlocks();
}

function deletePreset() {
    const select = document.getElementById('preset_list');
    const name = select.value;
    if (!name) return;
    if (confirm(`Are you sure you want to delete the preset "${name}"?`)) {
        localStorage.removeItem('credits_preset_' + name);
        updatePresetList();
    }
}

function clearAll() {
    if (confirm('Are you sure you want to clear all credits blocks?')) {
        blocks = [];
        renderBlocks();
    }
}

function updatePresetList() {
    const select = document.getElementById('preset_list');
    select.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('credits_preset_')) {
            const option = document.createElement('option');
            option.value = key.slice(15);
            option.text = option.value;
            select.appendChild(option);
        }
    }
}

function getGlobals() {
    return {
        credits_x: parseInt(document.getElementById('credits_x').value) || 980,
        credits_y: parseInt(document.getElementById('credits_y').value) || 1086,
        image_x: parseInt(document.getElementById('image_x').value) || 480,
        image_y: parseInt(document.getElementById('image_y').value) || 1086,
        end_of_line_y: parseInt(document.getElementById('end_of_line_y').value) || -100,
        end_of_image_line_y: parseInt(document.getElementById('end_of_image_line_y').value) || -600,
        final_end_of_line_y: parseInt(document.getElementById('final_end_of_line_y').value) || 500,
        scroll_speed: parseFloat(document.getElementById('scroll_speed').value) || 3,
        image_scroll_speed: parseFloat(document.getElementById('image_scroll_speed').value) || 2.9,
        final_line_scroll_speed: parseFloat(document.getElementById('final_line_scroll_speed').value) || 1.5,
        starting_line_id: parseInt(document.getElementById('starting_line_id').value) || 32
    };
}

function setGlobals(g) {
    document.getElementById('credits_x').value = g.credits_x;
    document.getElementById('credits_y').value = g.credits_y;
    document.getElementById('image_x').value = g.image_x;
    document.getElementById('image_y').value = g.image_y;
    document.getElementById('end_of_line_y').value = g.end_of_line_y;
    document.getElementById('end_of_image_line_y').value = g.end_of_image_line_y;
    document.getElementById('final_end_of_line_y').value = g.final_end_of_line_y;
    document.getElementById('scroll_speed').value = g.scroll_speed;
    document.getElementById('image_scroll_speed').value = g.image_scroll_speed;
    document.getElementById('final_line_scroll_speed').value = g.final_line_scroll_speed;
    document.getElementById('starting_line_id').value = g.starting_line_id;
}

function exportEvent() {
    const g = getGlobals();
    let content = `Guid\tcecc70c3-a979-4498-a722-275d07774c76
イベント名\tCredits Sequence
シート\tCredits
\tグラフィック\t2bb28954-b3dc-47b4-9d1a-6cb8c1bc16df
\t向き\t-1
\t向き固定\tFalse
\t物理\tFalse
\t衝突判定\tTrue
\tイベントと衝突\tTrue
\t移動速度\t0
\t移動頻度\t0
\t移動タイプ\tNONE
\t押せる\tTrue
\tスクリプト
\t\t開始条件\tTALK
\t\t高さ無視\tFalse
\t\t判定拡張\tFalse
${generateInitialVariables(g)}
${generateBlocks(blocks, g)}
${generateCleanup()}
\tスクリプト終了
シート終了`;

    const blob = new Blob([content], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'credits_sequence.txt';
    a.click();
}

function generateInitialVariables(g) {
    let cmds = [];
    cmds.push(generateVariable('current_line_scale', 100));
    cmds.push(generateVariable('credits_x', g.credits_x));
    cmds.push(generateVariable('credits_y', g.credits_y));
    cmds.push(generateVariable('image_x', g.image_x));
    cmds.push(generateVariable('image_y', g.image_y));
    cmds.push(generateVariable('end_of_image_line_y', g.end_of_image_line_y));
    cmds.push(generateHLVariable('image_scroll_speed', g.image_scroll_speed));
    cmds.push(generateVariable('final_end_of_line_y', g.final_end_of_line_y));
    cmds.push(generateVariable('end_of_line_y', g.end_of_line_y));
    cmds.push(generateVariable('starting_line_id', g.starting_line_id));
    cmds.push(generateVariable('current_line_id', 'starting_line_id', false, true));
    cmds.push(generateHLVariable('scroll_speed', g.scroll_speed));
    cmds.push(generateHLVariable('final_line_scroll_speed', g.final_line_scroll_speed));
    cmds.push(generateComment('---------------------------------------'));
    return cmds.join('\n');
}

function generateBlocks(blocks, g) {
    let cmds = [];
    blocks.forEach(block => {
        let typeUpper = block.type.toUpperCase();
        cmds.push(generateComment('---------------------------------------'));
        cmds.push(generateComment(`${typeUpper} START`));
        switch (block.type) {
            case 'header':
            case 'title':
            case 'final':
                cmds.push(generateWait(blockStyles[block.type].preWait));
                cmds.push(generateAddLineId());
                cmds.push(generateVariable('current_line_scale', blockStyles[block.type].scale));
                cmds.push(generateSPText(block.data.text, blockStyles[block.type]));
                cmds.push(generateSPMove(block.type === 'final', g));
                break;
            case 'cast':
                block.data.lines.forEach((line, idx) => {
                    if (idx > 0) cmds.push(generateWait(blockStyles.cast.additionalWait));
                    if (idx === 0) cmds.push(generateWait(blockStyles.cast.preWait));
                    cmds.push(generateAddLineId());
                    cmds.push(generateVariable('current_line_scale', blockStyles.cast.scale));
                    cmds.push(generateSPText(line, blockStyles.cast));
                    cmds.push(generateSPMove(false, g));
                });
                break;
            case 'image':
                cmds.push(generateWait(blockStyles.image.preWait));
                cmds.push(generateAddLineId());
                cmds.push(generateVariable('current_line_scale', block.data.scale));
                cmds.push(generateVariable('image_x', block.data.x || g.image_x));
                cmds.push(generateVariable('image_y', block.data.y || g.image_y));
                cmds.push(generateVariable('end_of_image_line_y', block.data.end_y || g.end_of_image_line_y));
                cmds.push(generateHLVariable('image_scroll_speed', block.data.speed || g.image_scroll_speed));
                cmds.push(generateSPPicture(block.data.guid, block.data.scale));
                cmds.push(generateSPMoveImage(g));
                break;
            case 'wait':
                cmds.push(generateWait(block.data.time));
                break;
        }
        cmds.push(generateComment(`${typeUpper} END`));
    });
    cmds.push(generateComment('---------------------------------------'));
    cmds.push(generateWait(5));
    cmds.push(generateSPHIDE(true));
    return cmds.join('\n');
}

function generateCleanup() {
    return `
\t\tコマンド\tCOMMENT
\t\t\t文字列\t---------------------------------------
\t\tコマンド終了
\t\tコマンド\tCOMMENT
\t\t\t文字列\tCleanup Process / 清掃プロセス
\t\tコマンド終了
\t\tコマンド\tLOOP
\t\t\t整数\t0
\t\tコマンド終了
\t\tコマンド\tIFVARIABLE
\t\t\tローカル変数\tcurrent_line_id
\t\t\tローカル変数\tstarting_line_id
\t\t\t整数\t5
\t\tコマンド終了
\t\tコマンド\tBREAK
\t\tコマンド終了
\t\tコマンド\tELSE
\t\tコマンド終了
\t\tコマンド\tSPHIDE
\t\t\tローカル変数\tcurrent_line_id
\t\t\t整数\t0
\t\tコマンド終了
\t\tコマンド\tVARIABLE
\t\t\t整数\t0
\t\t\tローカル変数\tcurrent_line_id
\t\t\t整数\t0
\t\t\t整数\t1
\t\t\t整数\t2
\t\tコマンド終了
\t\tコマンド\tENDIF
\t\tコマンド終了
\t\tコマンド\tENDLOOP
\t\tコマンド終了`;
}

function generateVariable(varName, value, isAdd = false, isVar = false) {
    let cmd = '\t\tコマンド\tVARIABLE\n\t\t\t整数\t0\n\t\t\tローカル変数\t' + varName + '\n\t\t\t整数\t0\n';
    if (isVar) {
        cmd += '\t\t\tローカル変数\t' + value + '\n';
    } else {
        cmd += '\t\t\t整数\t' + value + '\n';
    }
    cmd += '\t\t\t整数\t' + (isAdd ? '1' : '0') + '\n\t\tコマンド終了';
    return cmd;
}

function generateHLVariable(varName, value) {
    return '\t\tコマンド\tHLVARIABLE\n\t\t\t整数\t0\n\t\t\tローカル変数\t' + varName + '\n\t\t\t整数\t0\n\t\t\t小数\t' + value + '\n\t\t\t整数\t0\n\t\tコマンド終了';
}

function generateComment(text) {
    return '\t\tコマンド\tCOMMENT\n\t\t\t文字列\t' + text + '\n\t\tコマンド終了';
}

function generateWait(time) {
    return '\t\tコマンド\tWAIT\n\t\t\t小数\t' + time + '\n\t\t\t整数\t1\n\t\tコマンド終了';
}

function generateAddLineId() {
    return generateVariable('current_line_id', 1, true);
}

function generateSPText(text, style) {
    return '\t\tコマンド\tSPTEXT\n\t\t\tローカル変数\tcurrent_line_id\n\t\t\t文字列\t' + text + '\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\t整数\t' + style.color + '\n\t\t\t整数\t1\n\t\t\tローカル変数\tcredits_x\n\t\t\tローカル変数\tcredits_y\n\t\t\t整数\t' + style.param8 + '\n\t\t\t整数\t' + style.param9 + '\n\t\tコマンド終了';
}

function generateSPMove(isFinal, g) {
    let speed = isFinal ? 'final_line_scroll_speed' : 'scroll_speed';
    let endY = isFinal ? 'final_end_of_line_y' : 'end_of_line_y';
    let stop = isFinal ? 1 : 0;
    return '\t\tコマンド\tSPMOVE\n\t\t\tローカル変数\tcurrent_line_id\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\tローカル変数\t' + speed + '\n\t\t\t整数\t1\n\t\t\t整数\t-1\n\t\t\t整数\t1\n\t\t\tローカル変数\tcredits_x\n\t\t\tローカル変数\t' + endY + '\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\t整数\t' + stop + '\n\t\tコマンド終了';
}

function generateSPPicture(guid, scale) {
    return '\t\tコマンド\tSPPICTURE\n\t\t\tローカル変数\tcurrent_line_id\n\t\t\tGuid\t' + guid + '\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\t整数\t-1\n\t\t\t整数\t1\n\t\t\tローカル変数\timage_x\n\t\t\tローカル変数\timage_y\n\t\t\t整数\t-1\n\t\t\t整数\t0\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\t整数\t0\n\t\t\t整数\t0\n\t\tコマンド終了';
}

function generateSPMoveImage(g) {
    return '\t\tコマンド\tSPMOVE\n\t\t\tローカル変数\tcurrent_line_id\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\tローカル変数\timage_scroll_speed\n\t\t\t整数\t1\n\t\t\t整数\t-1\n\t\t\t整数\t1\n\t\t\tローカル変数\timage_x\n\t\t\tローカル変数\tend_of_image_line_y\n\t\t\tローカル変数\tcurrent_line_scale\n\t\t\t整数\t0\n\t\tコマンド終了';
}

function generateSPHIDE(isFinal) {
    return '\t\tコマンド\tSPHIDE\n\t\t\tローカル変数\tcurrent_line_id\n\t\t\t整数\t' + (isFinal ? 1 : 0) + '\n\t\tコマンド終了';
}

const blockStyles = {
    header: {color: -2522751, param8: 1, param9: 1, preWait: 0.4, scale: 200},
    title: {color: -5742, param8: 1, param9: 2, preWait: 0.4, scale: 130},
    cast: {color: -1, param8: 1, param9: 2, preWait: 0.2, additionalWait: 0.1, scale: 100},
    final: {color: -1, param8: 1, param9: 2, preWait: 1, scale: 130},
    image: {preWait: 0.5}
};

document.getElementById('language').addEventListener('change', updateLanguage);
updatePresetList();
updateLanguage();