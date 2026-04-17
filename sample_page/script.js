document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 要素の定義 ---
    
    // 必須ファイル (自動化対象)
    const requiredFile = {
        dropZone: document.getElementById('dropZone'),
        fileInput: document.getElementById('fileInput'),
        fileInfo: document.getElementById('fileInfo'),
        fileName: document.getElementById('fileName'),
        removeBtn: document.getElementById('removeFile'),
        isPdfOnly: false
    };

    // 任意ファイル (自動化対象外)
    const optionalFile = {
        dropZone: document.getElementById('dropZoneRef'),
        fileInput: document.getElementById('refFileInput'),
        fileInfo: document.getElementById('refFileInfo'),
        fileName: document.getElementById('refFileName'),
        removeBtn: document.getElementById('refRemoveFile'),
        isPdfOnly: false
    };

    const form = document.getElementById('workflowForm');

    // --- 2. 共通イベント設定関数の定義 ---

    const setupUploader = (elements) => {
        const { dropZone, fileInput, fileInfo, fileName, removeBtn, isPdfOnly } = elements;

        // クリックでファイル選択を開く
        dropZone.addEventListener('click', () => fileInput.click());

        // ファイルが選択された際の処理
        fileInput.addEventListener('change', (e) => {
            updateFileInfo(e.target.files, elements);
        });

        // ドラッグ＆ドロップ関連
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            // 重要: input.filesにドラッグされたファイルを同期
            fileInput.files = e.dataTransfer.files;
            updateFileInfo(fileInput.files, elements);
        });

        // 削除ボタンの処理
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 親のクリックイベント(ファイル選択)を阻止
            fileInput.value = '';
            fileInfo.style.display = 'none';
        });
    };

    // --- 3. 表示更新ロジック ---

    const updateFileInfo = (files, elements) => {
        if (files.length === 0) return;

        const file = files[0];

        elements.fileName.textContent = `選択中: ${file.name}`;
        elements.fileInfo.style.display = 'flex';
    };

    // --- 4. 実行 ---

    // それぞれのアップローダーを初期化
    setupUploader(requiredFile);
    setupUploader(optionalFile);

    // フォーム送信時のバリデーション
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 必須ファイル(requiredFile.fileInput)が必須の場合のチェック
        if (!requiredFile.fileInput.files.length) {
            alert('「必須ファイル」をアップロードしてください。');
            return;
        }

        alert('申請を送信しました。');
        console.log({
            court: document.getElementById('court').value,
            judge: document.getElementById('judge').value,
            warrantNumber: document.getElementById('warrantNumber').value,
            warrantFile: warrant.fileInput.files[0].name,
            refFile: reference.fileInput.files.length ? reference.fileInput.files[0].name : "なし"
        });
    });
});