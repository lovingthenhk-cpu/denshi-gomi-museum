(()=>{'use strict';
const id=document.body.dataset.work, stage=document.querySelector('#stage');
const set=s=>{stage.innerHTML=s},q=s=>stage.querySelector(s),on=(x,fn,ev='click')=>q('#'+x).addEventListener(ev,fn);
const text=(x,v)=>{q('#'+x).textContent=String(v)},rand=n=>Math.floor(Math.random()*n),pick=a=>a[rand(a.length)];
const head=s=>'<h2>'+s+'</h2>',big=s=>'<div class="big" id="display">'+s+'</div>',note=s=>'<p id="status" role="status">'+s+'</p>';
const btn=(s,k='go',alt=false)=>'<button id="'+k+'" class="action'+(alt?' alt':'')+'">'+s+'</button>';
const field=(s='何かを入力してください')=>'<input class="input" id="entry" type="text" maxlength="200" placeholder="'+s+'" aria-label="入力欄">';
const duo=(a,b)=>'<div class="hstack">'+btn(a,'go')+btn(b,'other',true)+'</div>';
switch(id){
case 'flee-button':{
 let n=0;set(head('捕まえられますか？')+big('↗')+btn('押してください')+note('ボタンはとても臆病です。'));const b=q('#go');
 b.style.position='relative';b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&n<6){b.style.transform='translate('+((rand(3)-1)*100)+'px,'+((rand(3)-1)*45)+'px)';text('status','逃亡 '+(++n)+' 回目')}});b.addEventListener('click',()=>{n++;text('status',n<7?'捕まった！ 次は逃げます。':'逃亡失敗。展示は敗北しました。');b.style.transform='translate('+((rand(3)-1)*70)+'px,0)'});break;}
case 'never-100':{
 let v=0;set(head('アップデートしています')+big('0%')+'<div class="meter"><div class="fill" id="fill"></div></div>'+btn('もう一度進める')+note('100%になるまでお待ちください。'));const tick=()=>{v=Math.min(99,v+Math.max(1,Math.floor((100-v)/8)));q('#fill').style.width=v+'%';text('display',v+'%');if(v===99)text('status','あと1%ですが、あと1%です。')};on('go',()=>{v=0;tick()});setInterval(tick,950);break;}
case 'reverse-counter':{
 let n=0;set(head('減算対応カウンター')+big(0)+duo('− 1','＋ 1')+note('カウンターは独自の計算法を採用。'));on('go',()=>{text('display',++n);text('status','減らすと増えます。')});on('other',()=>{text('display',--n);text('status','増やすと減ります。')});break;}
case 'sorry-printer':{
 let n=0;set(head('お詫びを印刷します')+'<div class="terminal" id="paper">PRINTER READY \n-----------------</div>'+btn('謝罪を印刷')+note('インク不要・紙不要・改善不要'));on('go',()=>{n++;q('#paper').textContent='謝罪書 第'+n+'号\n\nこのたびは誠に申し訳ございません。\n原因：不明\n再発防止策：次の謝罪書を発行\n\n担当：謝罪装置';text('status','印刷完了（紙は出ません）')});break;}
case 'moody-switch':{
 let n=0;set(head('電源 / OFF')+big('◯')+btn('電源を入れる')+note('起動できそうな雰囲気です。'));on('go',()=>{n++;text('display',n%2?'◉':'◯');text('status',pick(['まだ眠いです。','今日は気分ではありません。','その操作は好みではありません。','次回は起動するかもしれません。']));q('#go').textContent=pick(['やっぱり入れる','再試行','気持ちを伝える','電源を入れる'])});break;}
case 'lying-clock':{
 let drift=0;set(head('標準世界いい加減時')+big('00:00:00')+btn('時刻を校正')+note('絶対時刻と関係がありません。'));function update(){drift+=rand(13)-2;text('display',new Date(Date.now()+drift*1000).toLocaleTimeString('ja-JP',{hour12:false}));text('status','誤差：'+drift+'秒（推定）')}update();setInterval(update,1000);on('go',()=>{drift+=rand(360)-180;update()});break;}
case 'pointless-notifier':{
 let n=0;set(head('未読のお知らせ')+big('0')+btn('新しい通知を取得')+note('通知を取得しましたという通知が届きます。'));on('go',()=>{text('display',++n);text('status','新着通知：通知が'+n+'件あります。')});break;}
case 'weather-cube':{
 const opts=[['☁','曇りの概念','温度：概ね17.4文字'],['△','三角形の風','湿度：たぶん多め'],['◇','結晶化した午後','気圧：未定'],['☂','逆さ雨','降水確率：すでに過去'],['☀','人工的な夕方','紫外線：記載なし']];set(head('気象情報を推測中')+big('☁')+btn('明日の予報を捏造')+note('現実の気象情報は一切参照していません。'));on('go',()=>{const x=pick(opts);text('display',x[0]);text('status',x[1]+' / '+x[2])});break;}
case 'click-tax':{
 let money=100,n=0;set(head('残高（架空）')+big('100')+btn('ここをクリック（有料）')+note('1クリック＝7架空円。'));on('go',()=>{money-=7;n++;text('display',money);text('status','課税累計 '+(n*7)+' 架空円。実際の決済はありません。')});break;}
case 'vanishing-note':{
 set(head('忘れることが使命')+'<textarea class="input" id="entry" rows="3" maxlength="200" placeholder="ここに大事なことを書いてください"></textarea>'+btn('保存する')+note('データはこのページ内でしか扱いません。'));on('go',()=>{const e=q('#entry');const n=e.value.length;e.value='';text('status',n+'文字を完全に忘れました。')});break;}
case 'unfinish-todo':{
 let n=1;set(head('終わらない仕事')+'<div id="tasks" style="width:min(420px,100%);text-align:left"></div>'+btn('仕事を完了させる')+note('仕事を終えるほど新しい仕事が生まれます。'));const jobs=q('#tasks');function draw(){jobs.textContent='□ 日常業務 '+n+'件が未完了';}draw();on('go',()=>{n+=2;draw();text('status','完了を確認しました。未完了が2件増えました。')});break;}
case 'hepta-dice':{
 set(head('物理法則に優しい七面体')+big('7')+btn('サイコロを振る')+note('1から7までの数が出ます。'));on('go',()=>{const r=rand(7)+1;text('display',r);text('status',r===7?'大当たり。七面体の顔は見つかりません。':'ただの'+r+'です。')});break;}
case 'support-loop':{
 let n=0;set(head('お困りですか？')+duo('はい、困っています','いいえ、困っていません')+note('最良の支援を提供します。'));on('go',()=>{n++;text('status',pick(['困っている場合は困らないでください。','一度、問題を解決してみてください。','問題がない状態を目指しましょう。'])+'（'+n+'回目）')});on('other',()=>text('status','お役に立てて光栄です。'));break;}
case 'doom-clock':{
 let sec=61;set(head('世界終了まで')+big('01:01')+btn('時刻を早める')+note('終末は定期的に延期されます。'));function tick(){sec--;if(sec<=0){sec=61;text('status','終末延期のお知らせ：再調整中')};text('display',String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0'))}setInterval(tick,1000);on('go',()=>{sec=Math.max(2,sec-10);tick()});break;}
case 'universal-translator':{
 set(head('世界共通翻訳器')+field('どんな言語でも構いません')+btn('高精度に翻訳')+'<div class="terminal" id="result">OUTPUT: WAITING...</div>'+note('機械学習を使用していません。'));on('go',()=>{q('#result').textContent='TRANSLATION: なるほど。';text('status','原文の重要な情報はすべて失われました。')});break;}
case 'silent-keyboard':{
 set(head('静寂の楽器')+'<div class="hstack" id="keys"></div>'+note('音を出す機能は意図的に存在しません。'));for(let i=0;i<8;i++){const b=document.createElement('button');b.className='action alt';b.style.minHeight='130px';b.style.padding='12px';b.textContent='♩';b.setAttribute('aria-label','鍵盤'+(i+1));b.onclick=()=>{text('status','第'+(i+1)+'鍵：美しい沈黙。');b.style.background='var(--accent)';b.style.color='#111';setTimeout(()=>{b.style.background='';b.style.color=''},180)};q('#keys').appendChild(b)}break;}
case 'endless-download':{
 let n=0,loops=0;set(head('ダウンロード中')+big('0%')+'<div class="meter"><div class="fill" id="fill"></div></div>'+btn('再接続')+note('実際の通信は行っていません。'));function tick(){n+=3;if(n>99){n=0;loops++;text('status','再接続しています（'+loops+'回目）')};q('#fill').style.width=n+'%';text('display',n+'%')}setInterval(tick,240);on('go',()=>{n=0;loops++;tick()});break;}
case 'unbalanced-scale':{
 let n=1;set(head('完全公正な天秤')+big('⚖')+btn('公平にする')+note('左：'+n+'kg　右：'+(n+1)+'kg'));on('go',()=>{n++;text('status','左：'+n+'kg　右：'+(n+1)+'kg。常に1kgの差が生じます。');q('#display').style.transform='rotate('+((n%2)?5:-5)+'deg)'});break;}
case 'empty-gacha':{
 let n=0;set(head('希少度 SSR')+big('◌')+btn('無料で10連引く')+note('提供割合：空気 100%'));on('go',()=>{n+=10;text('display',pick(['◌','○','◯','◌']));text('status','累計'+n+'連。10個の空気を獲得しました！')});break;}
case 'absurd-chart':{
 set(head('架空の重要指標')+'<div class="grid-bars" id="chart"></div>'+btn('グラフを再分析')+note('出典：作図者の気分'));for(let i=0;i<9;i++)q('#chart').appendChild(document.createElement('i'));const update=()=>{q('#chart').querySelectorAll('i').forEach(e=>{e.style.height=(10+rand(90))+'%'});text('status',pick(['前年比：測定不能%','各種要因により上昇した可能性','右肩上がりか右肩下がりです','サンプル数：たぶん充分']))};on('go',update);update();break;}
case 'time-thief':{
 let n=0;set(head('無駄にした時間')+big('0s')+btn('無駄を加速する')+note('時間は返却できません。'));setInterval(()=>text('display',++n+'s'),1000);on('go',()=>{n+=10;text('display',n+'s');text('status','10秒分の無意味さを追加しました。')});break;}
case 'portrait-scanner':{
 set(head('あなたに似ている顔')+big('◉_◉')+btn('もう一度鑑定')+note('カメラにはアクセスしません。'));on('go',()=>{text('display',pick(['◉_◉','•_•','◔_◔','◕‿◕','⊙_⊙','°_°']));text('status','類似率 '+(85+rand(16))+'%。入力画像は最初から存在しません。')});break;}
case 'fake-search':{
 set(head('答えを検索中...')+field('知りたいことを入力')+btn('検索開始')+'<div class="terminal" id="result">NO RESULTS YET</div>'+note('検索エンジンには接続しません。'));on('go',()=>{const s=q('#entry').value.trim();q('#result').textContent='検索結果：0件\n'+(s?'「'+s.slice(0,60)+'」に関しては':'その件に関しては')+'、たぶんどこかに情報があります。';text('status','探しましたという事実だけを返します。')});break;}
case 'eternal-sprout':{
 let n=0;set(head('観葉植物（初期状態）')+'<div class="plant">🌱</div>'+btn('水をあげる')+note('成長：0.000%'));on('go',()=>{n++;text('status','累計水やり：'+n+'回　成長：0.000%。よく頑張りました。')});break;}
case 'productivity-box':{
 let n=1;set(head('効率のよい仕事術')+big('1')+btn('業務を効率化')+note('現在の効率化業務：1件'));on('go',()=>{n+=rand(3)+2;text('display',n);text('status','効率化するための追加業務が発生：'+n+'件')});break;}
case 'wrong-elevator':{
 let floor=1;set(head('エレベーター')+big('1F')+'<div class="hstack">'+[1,2,3,4,5].map(i=>'<button class="action alt" data-floor="'+i+'">'+i+'F</button>').join('')+'</div>'+note('行き先階を押してください。'));q('.hstack').addEventListener('click',e=>{if(!e.target.dataset.floor)return;const target=Number(e.target.dataset.floor);floor=target===1?5:target-1;text('display',floor+'F');text('status',''+target+'Fをご指定いただいたため、'+floor+'Fへ到着しました。')});break;}
case 'color-lost':{
 set(head('あなたの理想の色')+'<input type="color" id="color" aria-label="色を選択" value="#ff3355" style="width:150px;height:70px;background:transparent;border:0">'+btn('この色に決定')+'<div id="swatch" style="width:min(300px,90%);height:90px;background:#ff3355;border:1px solid white"></div>'+note('色指定を可能な限り解釈します。'));on('go',()=>{const col='#'+Array.from({length:6},()=>pick('0123456789abcdef'.split(''))).join('');q('#swatch').style.background=col;text('status','指定色：'+q('#color').value+' / 採用色：'+col)});break;}
case 'settings-without-effect':{
 set(head('効果を自由に調整')+'<label for="power">効果の強さ</label><input id="power" type="range" min="0" max="100" value="50" style="width:min(350px,100%);accent-color:var(--accent)">'+big('50')+note('現在の適用効果：なし'));q('#power').oninput=e=>{text('display',e.target.value);text('status','設定は保存されません。見た目にも効果はありません。')};break;}
case 'trailer-forever':{
 let n=1;set(head('COMING SOON')+big('▶')+btn('本編を見る')+note('第1予告編を上映中'));on('go',()=>{n++;text('status','第'+n+'予告編を上映中。本編公開日：未定');q('#display').textContent=n%2?'▶':'▷'});break;}
case 'error-factory':{
 let n=404;set(head('エラーの自家生産')+big('404')+btn('エラーを生産')+note('工場稼働率：100%（架空）'));on('go',()=>{n++;text('display',n);text('status','ERROR '+n+'：原因不明の正常なエラーです。')});break;}
case 'excuse-generator':{
 const reasons=['月の引力が微妙に強かったため','システムが哲学的な迷いに入ったため','ボタンに意志が芽生えたため','未来のメンテナンスがまだ終わらないため','トースターが担当を引き継いだため','昨日の明日が今日ではなかったため'];set(head('責任の所在：未設定')+btn('言い訳を生成')+'<div class="terminal" id="result">言い訳待機中...</div>'+note('言い訳の正当性を保証しません。'));on('go',()=>{q('#result').textContent='実施できなかったのは、'+pick(reasons)+'です。';text('status','言い訳の品質：最高評価（自己申告）')});break;}
case 'bottomless-page':{
 let n=0;set(head('最下部を目指してください')+btn('もっと下へ')+'<div id="depth" class="terminal">深度：0m</div>'+note('ここが最下部に見えるのは錯覚です。'));on('go',()=>{n+=rand(200)+80;q('#depth').textContent='深度：'+n+'m\n底まであと：不明';q('#depth').style.marginTop=Math.min(180,n/10)+'px';text('status','下へ進んだ気になりました。')});break;}
case 'replicating-button':{
 let n=1;set(head('ボタンの生態系')+'<div id="swarm" class="hstack">'+btn('増える')+'</div>'+note('ボタン人口：1'));q('#swarm').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;if(n>=60){text('status','ボタンが過密状態です。');return}const b=document.createElement('button');b.className='action alt';b.textContent='増える';q('#swarm').appendChild(b);n++;text('status','ボタン人口：'+n)});break;}
case 'unlucky-fortune':{
 let n=0;set(head('今日の運勢は...')+big('？')+btn('占ってもらう')+note('当たるとは言っていません。'));on('go',()=>{n++;text('display',pick(['凶','未','？','空','読','中']));text('status',pick(['まだ結果の用意ができていません。','もう一度押してください。','詳細はおみくじにお問い合わせください。','本日は判定対象外です。'])+' 第'+n+'回')});break;}
case 'compression-disaster':{
 set(head('世界最高の逆圧縮率')+field('短い言葉を入れる')+btn('圧縮する')+'<div class="terminal" id="result">結果はここに表示されます。</div>'+note('圧縮後のほうが長くなります。'));on('go',()=>{const v=q('#entry').value.slice(0,60)||'無';q('#result').textContent=('［'+v+'］を安全に保存するための補助情報を追加しました。 ').repeat(5);text('status','元：'+v.length+'字 / 結果：'+q('#result').textContent.length+'字')});break;}
case 'usb-oracle':{
 let n=0;set(head('端子の方向を推定')+big('⇵')+btn('USBを挿す')+note('端子の向き：不確定'));on('go',()=>{n++;text('display',n%3===0?'✓':(n%2?'⇧':'⇩'));text('status',n%3===0?'成功！ 三度目の正直です。':'逆向きです。いったん抜いてください。')});break;}
default:set(head('展示品が見つかりません')+note('有効な展示IDではありません。'));
}
})();
