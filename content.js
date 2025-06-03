// --- 入力項目設定フォームをページ内に表示 ---
function showSettingsForm() {
  if (document.getElementById('raku-autofill-settings')) return;

  const div = document.createElement('div');
  div.id = 'raku-autofill-settings';
  div.style.position = 'fixed';
  div.style.top = '100px';
  div.style.right = '5vw';
  div.style.width = '90vw';
  div.style.maxWidth = '380px';
  div.style.background = '#fff';
  div.style.border = '2px solid #888';
  div.style.borderRadius = '12px';
  div.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
  div.style.padding = '20px';
  div.style.zIndex = 10001;
  div.style.maxHeight = '80vh';
  div.style.overflowY = 'auto';
  div.style.boxSizing = 'border-box';

  div.innerHTML = `
    <form id="autofillForm">
      <h2>自動入力設定</h2>
      <h3>希望選択</h3>
      <label>席種:
        <select name="stockType-0-label">
          <option>指定席</option>
          <option>親子・女性ｴﾘｱ</option>
        </select>
      </label><br>
      <label>枚数:
        <select name="product-quantity-0-0">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </label><br>
      <h3>お支払い・お引取方法の指定</h3>
      <label>支払方法:
        <select name="payment_delivery_method_pair_id-label">
          <option>クレジットカード決済(抽選)</option>
          <option>コンビニ決済(セブン-イレブン・抽選)</option>
        </select>
      </label><br>
      <h3>購入者情報</h3>
      <label>姓(全角): <input name="last_name"></label><br>
      <label>名(全角): <input name="first_name"></label><br>
      <label>姓(全角カナ): <input name="last_name_kana"></label><br>
      <label>名(全角カナ): <input name="first_name_kana"></label><br>
      <label>メール: <input name="email_1"></label><br>
      <label>メール(確認): <input name="email_1_confirm"></label><br>
      <label>郵便番号: <input name="zip"></label><br>
      <label>都道府県: <input name="prefecture"></label><br>
      <label>市区町村: <input name="city"></label><br>
      <label>町名番地: <input name="address_1"></label><br>
      <label>建物名等: <input name="address_2"></label><br>
      <label>電話番号: <input name="tel_1"></label><br>
      <label>生年: <input name="birthday.year"></label><br>
      <label>生月: <input name="birthday.month"></label><br>
      <label>生日: <input name="birthday.day"></label><br>
      <label>性別(1:男,2:女): <input name="sex"></label><br>
      <h3>購入者情報</h3>
      <label>申込時の注意事項等: <input type="checkbox" name="extra.申込時の注意事項等" value="確認・了承しました"></label><br>
      <label>申込者名・姓(来場代表者苗字): <input name="extra.申込者名・姓(来場代表者苗字)"></label><br>
      <label>申込者名・名: <input name="extra.申込者名・名"></label><br>
      <label>申込者電話番号(半角・ハイフン不要): <input name="extra.申込者電話番号(半角・ハイフン不要)"></label><br>
      <label>同行者・姓: <input name="extra.同行者・姓"></label><br>
      <label>同行者名・名: <input name="extra.同行者名・名"></label><br>
      <label>同行者電話番号(半角・ハイフン不要): <input name="extra.同行者電話番号(半角・ハイフン不要)"></label><br>
      <label>同行者住所: <input name="extra.同行者住所"></label><br>
      <label>同行者メールアドレス: <input name="extra.同行者メールアドレス"></label><br>
      <label>親子席申込者の方への確認(親子である): <input type="checkbox" name="extra.親子席申込者の方への確認" value="親子である"></label><br>
      <label>親子席申込者の方への確認(お子様は12歳以下): <input type="checkbox" name="extra.親子席申込者の方への確認" value="お子様は公演日時点で12歳以下(小学生)である"></label><br>
      <label>最終確認: <input type="checkbox" name="extra.最終確認" value="確認・了承しました"></label><br>
      <h3>受付確認用パスワード</h3>
      <label>受付確認用パスワード: <input name="review_password"></label><br>
      <button type="submit" style="margin-right:10px;">保存</button>
      <button type="button" id="raku-autofill-settings-close">閉じる</button>
      <p style="color:gray;">
        ※第1希望公演名及び公演日・会場名は自動入力されません。手動で入力してください。<br>
      </p>
    </form>
  `;

  // 保存ロジック
  div.querySelector('#autofillForm').onsubmit = function(e) {
    e.preventDefault();
    const data = {};
    // まずFormDataで通常の値を取得
    new FormData(e.target).forEach((v, k) => {
      if (data[k]) {
        if (!Array.isArray(data[k])) data[k] = [data[k]];
        data[k].push(v);
      } else {
        data[k] = v;
      }
    });
    // チェックボックスの配列対応
    e.target.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (!data[cb.name]) data[cb.name] = [];
      if (cb.checked && !data[cb.name].includes(cb.value)) {
        data[cb.name].push(cb.value);
      }
    });
    // 配列で1つだけなら値を単一に
    Object.keys(data).forEach(k => {
      if (Array.isArray(data[k]) && data[k].length === 1) data[k] = data[k][0];
    });
    chrome.storage.sync.set({ autofillData: data }, () => {
      alert('保存しました');
      div.remove();
    });
  };

  // 復元ロジック
  chrome.storage.sync.get('autofillData', (res) => {
    if (res.autofillData) {
      Object.entries(res.autofillData).forEach(([k, v]) => {
        const els = div.querySelectorAll(`[name="${k}"]`);
        if (!els.length) return;
        els.forEach(el => {
          if (el.type === "checkbox") {
            if (Array.isArray(v)) {
              el.checked = v.includes(el.value);
            } else {
              el.checked = (el.value === v);
            }
          } else {
            el.value = v;
          }
        });
      });
    }
  });

  // 閉じるボタン
  div.querySelector('#raku-autofill-settings-close').onclick = () => div.remove();

  document.body.appendChild(div);
}

// --- ボタンを横並びで配置するラッパーを追加 ---
function getButtonWrapper() {
  let wrapper = document.getElementById('raku-btn-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'raku-btn-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '30px';
    wrapper.style.right = '30px';
    wrapper.style.zIndex = 9999;
    wrapper.style.display = 'flex';
    wrapper.style.gap = '12px';
    document.body.appendChild(wrapper);
  }
  return wrapper;
}

// --- ページ内に「入力項目設定」ボタンを追加 ---
function addSettingsButton() {
  if (document.getElementById('raku-settings-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'raku-settings-btn';
  btn.textContent = '入力項目設定';
  btn.style.padding = '10px 16px';
  btn.style.background = 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)';
  btn.style.color = '#fff';
  btn.style.border = '2px solid #fff';
  btn.style.borderRadius = '8px';
  btn.style.fontSize = '15px';
  btn.style.fontWeight = 'bold';
  btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
  btn.style.cursor = 'pointer';
  btn.style.whiteSpace = 'nowrap';
  getButtonWrapper().appendChild(btn);
  btn.onclick = showSettingsForm;
}

// --- ページ内に「自動入力実行」ボタンを追加 ---
function addAutofillButton() {
  if (document.getElementById('raku-autofill-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'raku-autofill-btn';
  btn.textContent = '自動入力実行';
  btn.style.padding = '10px 16px';
  btn.style.background = 'linear-gradient(90deg, #e60021 60%, #ff7f50 100%)';
  btn.style.color = '#fff';
  btn.style.border = '2px solid #fff';
  btn.style.borderRadius = '8px';
  btn.style.fontSize = '15px';
  btn.style.fontWeight = 'bold';
  btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
  btn.style.cursor = 'pointer';
  btn.style.whiteSpace = 'nowrap';
  getButtonWrapper().appendChild(btn);
  btn.addEventListener('click', autofillForm);
}

// --- 自動入力処理本体 ---
function autofillForm() {
  chrome.storage.sync.get('autofillData', (res) => {
    const data = res.autofillData || {};
    if (!Object.keys(data).length) {
      alert("自動入力データが未設定です。設定ボタンから入力してください。");
      return;
    }

    // 席種（optionの文字列に基づいて選択）
    if (data["stockType-0-label"]) {
      const select = document.querySelector('select[name="stockType-0"]');
      if (select) {
        for (const option of select.options) {
          if (option.text.trim() === data["stockType-0-label"].trim()) {
            select.value = option.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            break;
          }
        }
      }
    }

    // 50ms遅延して他の項目を入力
    setTimeout(() => {
      for (const [name, value] of Object.entries(data)) {
        if (name === "stockType-0-label") continue;

        // 支払方法
        if (name === "payment_delivery_method_pair_id-label") {
          document.querySelectorAll('input[type="radio"][name="payment_delivery_method_pair_id"]').forEach(radio => {
            
            // スマホ版: <label for="radioXXXX">...</label> 内の文字列に基づいて選択
            let label = document.querySelector(`label[for="${radio.id}"]`);
            let labelText = label ? label.textContent.trim() : "";

            // PC版: 隣のtd要素中の文字列に基づいて選択
            if (!labelText) {
              const td = radio.closest('td');
              const labelTd = td?.nextElementSibling;
              const dt = labelTd?.querySelector('dt');
              labelText = dt?.textContent.trim() || "";
            }

            if (labelText && labelText.includes(value.trim())) {
              radio.checked = true;
              radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
          });
          continue;
        }

        // その他のフォーム要素
        let el = document.querySelector(`[name="${name}"]`);
        if (el) {
          if (el.type === "checkbox" || el.type === "radio") {
            document.querySelectorAll(`[name="${name}"]`).forEach(e => {
              if (Array.isArray(value)) {
                e.checked = value.includes(e.value);
              } else {
                e.checked = (e.value == value);
              }
            });
          } else {
            el.value = value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }
    }, 50);
  });
}

// --- ページ読み込み時にボタンを追加 ---
addSettingsButton();
addAutofillButton();