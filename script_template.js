(function() {
    const config = {
        organizationName: "サンプル組織",
        assigneeName: "ユーザー1",
        filePrefix: ""  // ファイル名のプレフィックス (例: "期日指定書_")
    };

    // ファイル側のID「fileInput」を狙い撃ち
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("「必須添付ファイル」欄にファイルをアップロードしてください。");
        return;
    }

    const fullFileName = fileInput.files[0].name;

    // ファイル名加工ロジック
    let applicationNum = fullFileName.replace(/\.[^/.]+$/, "");  // 拡張子を除去

    if (config.filePrefix) {
        applicationNum = applicationNum.replace(new RegExp(`^${config.filePrefix}`), "");
    }

    if (!applicationNum) {
        alert("ファイル名から番号を抽出できませんでした。");
        return;
    }

    // 各項目への入力（任意添付ファイル欄には一切触れない）
    const organizationInput = document.getElementById('court');
    if (organizationInput) {
        organizationInput.value = config.organizationName;
    }

    const assigneeSelect = document.getElementById('judge');
    if (assigneeSelect) {
        for (let i = 0; i < assigneeSelect.options.length; i++) {
            if (assigneeSelect.options[i].text === config.assigneeName) {
                assigneeSelect.selectedIndex = i; break;
            }
        }
    }

    const applicationInput = document.getElementById('warrantNumber');
    if (applicationInput) {
        applicationInput.value = applicationNum;
    }

    console.log("ファイルに基づき入力を完了しました。");
})();