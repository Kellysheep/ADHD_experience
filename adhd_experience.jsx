import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, MessageCircle, BookOpen, User, RefreshCcw, Info, Lightbulb, ArrowRight, Check } from 'lucide-react';

const colors = {
  pink: '#FFB7B2',
  mint: '#B2E2F2',
  purple: '#D9D2E9',
  grey: '#F3F4F6',
  darkGrey: '#4B5563'
};

const BrainNoise = ({ active }) => {
  const noiseText = [
    "好想繼續打遊戲", "他怎麼都不回我訊息", "晚餐吃什麼", 
    "我昨天那場遊戲贏了", "老師的領帶歪了", "窗外的小鳥在叫", 
    "這件衣服好癢", "剛剛那首歌叫什麼名字？", "我作業放哪了？"
  ];
  
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (active) {
      const items = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        text: noiseText[Math.floor(Math.random() * noiseText.length)],
        top: Math.random() * 80 + 10 + "%",
        left: Math.random() * 80 + 5 + "%",
        delay: Math.random() * 5 + "s",
        duration: Math.random() * 10 + 10 + "s"
      }));
      setElements(items);
    } else {
      setElements([]);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(item => (
        <div
          key={item.id}
          className="absolute text-gray-400 opacity-20 text-sm md:text-base font-bold whitespace-nowrap animate-pulse"
          style={{
            top: item.top,
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
            transform: `rotate(${Math.random() * 20 - 10}deg)`
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full text-center text-xs text-gray-600 mt-8 relative z-10">
      @2026 育成高中 特教組  本作品採用CC BY-NC 4.0 創用CC授權。
    </footer>
  );
};

const App = () => {
  // 自動在 HTML <head> 寫入防止搜尋引擎索引的 Meta 標籤
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';
  }, []);

  const [scene, setScene] = useState('start'); // start, level1, level2, level3, ending, deconstruction
  const [modal, setModal] = useState(null); // { title, content }
  const [feedback, setFeedback] = useState(null); // { text }
  
  const [exploredLevel1, setExploredLevel1] = useState([]);
  const [exploredLevel2, setExploredLevel2] = useState([]);
  const [exploredLevel3, setExploredLevel3] = useState([]);

  const resetGame = () => {
    setScene('start');
    setFeedback(null);
    setModal(null);
    setExploredLevel1([]);
    setExploredLevel2([]);
    setExploredLevel3([]);
  };

  const handleLevel1Choice = (choice) => {
    if (choice === 'perfect') {
      setModal({
        title: "大腦的悄悄話",
        content: "好希望自己可以這樣，但太有困難了......"
      });
      return;
    }
    
    let result = "";
    if (choice === 'mirror') result = "後果：又遲到啦！";
    if (choice === 'socks') result = "後果：又遲到啦！";
    if (choice === 'rush') result = "後果：發現沒帶課本、錢包、手機！";
    
    setExploredLevel1(prev => prev.includes(choice) ? prev : [...prev, choice]);
    setFeedback({ text: result });
  };

  const handleLevel2Choice = (choice) => {
    let result = "";
    if (choice === 'sorry') result = "後果：你已經是第 5 次說了！";
    if (choice === 'silent') result = "後果：被老師解讀為態度傲慢！";
    if (choice === 'run') result = "後果：被解讀為逃避責任！";
    
    setExploredLevel2(prev => prev.includes(choice) ? prev : [...prev, choice]);
    setFeedback({ text: result });
  };

  const handleLevel3Choice = (choice) => {
    let result = "";
    if (choice === 'pinch') result = "後果：沒有用，腿好痛......";
    if (choice === 'phone') result = "後果：短暫緩解焦慮，但隨即被沒收！";
    if (choice === 'sleep') result = "後果：進入夢境，但考試考很差！";
    
    setExploredLevel3(prev => prev.includes(choice) ? prev : [...prev, choice]);
    setFeedback({ text: result });
  };

  if (scene === 'start') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-6 text-center transition-all duration-500 relative" style={{ backgroundColor: colors.purple }}>
        <BrainNoise active={true} />
        
        {/* 四周微幅旋轉的干擾字眼 */}
        <div className="absolute top-12 left-8 md:top-16 md:left-20 text-gray-500 opacity-40 text-xs md:text-sm font-black rotate-[-12deg] max-w-[120px] text-left pointer-events-none">
          好想繼續打遊戲...
        </div>
        <div className="absolute top-12 right-8 md:top-16 md:right-20 text-gray-500 opacity-40 text-xs md:text-sm font-black rotate-[8deg] max-w-[120px] text-right pointer-events-none">
          他怎麼都不回我？
        </div>
        <div className="absolute bottom-24 left-8 md:bottom-32 md:left-20 text-gray-500 opacity-40 text-xs md:text-sm font-black rotate-[15deg] max-w-[120px] text-left pointer-events-none">
          等一下晚餐吃什麼？
        </div>
        <div className="absolute bottom-24 right-8 md:bottom-32 md:right-20 text-gray-500 opacity-40 text-xs md:text-sm font-black rotate-[-10deg] max-w-[120px] text-right pointer-events-none">
          老師的領帶歪了...
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gray-500 opacity-30 text-xs md:text-sm font-black rotate-[2deg] pointer-events-none hidden md:block">
          我昨天那場遊戲贏了！
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gray-500 opacity-30 text-xs md:text-sm font-black rotate-[-3deg] pointer-events-none hidden md:block">
          我作業到底放哪了？
        </div>

        <div className="flex-grow flex items-center justify-center w-full max-w-lg z-10">
          <div className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full border-4 border-black relative">
            <div className="absolute -top-6 -left-6 bg-yellow-300 p-3 rounded-xl border-2 border-black rotate-[-5deg]">
              <Clock size={32} />
            </div>
            <h1 className="text-3xl font-black mb-4 tracking-tight">A蒂H弟 的日常體驗</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">這是一個看似平常卻充滿挑戰的一天......</p>
            <button 
              onClick={() => setScene('level1')}
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all border-2 border-black active:translate-y-1"
            >
              開始體驗
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (scene === 'deconstruction') {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 overflow-y-auto flex flex-col justify-between">
        <div className="max-w-4xl mx-auto pb-10 flex-grow">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black mb-6 border-b-8 border-yellow-300 inline-block">🧩 角色解析：你剛才體驗了什麼？</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              哈囉！剛剛體驗還好嗎？也許我們生活中，偶爾都會遇到這些狀況，<br/>
              遲到、忘東忘西、上課神遊......<br/>
              不過短短幾分鐘的體驗，<br/>
              其實是許多 <strong>ADHDer（過動症者）的日常</strong>。<br/>
              這並不是因為他們「不努力」，而是大腦的運作、機制有些差異。
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            <section className="bg-pink-50 p-8 rounded-3xl border-2 border-[#FFB7B2]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="text-[#FFB7B2]" /> 🌅 早晨的混亂（時間盲、執行功能障礙）
              </h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>為什麼會這樣？</strong></p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>時間盲（Time Blindness）：</strong> ADHD 的大腦對時間的流逝感知能力較弱，難以預估完成任務所需的時間。這被稱為「時間盲（Time Blindness）」 。</li>
                  <li><strong>執行功能障礙：</strong> 大腦的「前額葉-指揮官」前額葉（負責組織規劃、決策等）與杏仁核（負責情緒反應）之間的連結較慢，時常出現「想得到卻做不到」 ，因此有時候在執行任務時、安排事務順序會有些困難。</li>
                </ul>
              </div>
            </section>

            <section className="bg-blue-50 p-8 rounded-3xl border-2 border-[#B2E2F2]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="text-[#B2E2F2]" /> 🏫 走廊的審判（工作記憶與回條作業）
              </h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>為什麼會這樣？</strong></p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>工作記憶（Working Memory）能力較不足：</strong> ADHDer 常面臨「工作記憶」能力較不足的挑戰，如同大腦的快速存取記憶體（RAM）容量較小，剛聽到的指令可能一轉身就忘了。</li>
                </ul>
              </div>
            </section>

            <section className="bg-purple-50 p-8 rounded-3xl border-2 border-[#D9D2E9]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-[#D9D2E9]" /> 📝 課堂的雜訊（感官過載與神遊）
              </h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>為什麼會這樣？</strong></p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>選擇性注意力調節困難（Gating mechanism）：</strong> ADHD者並非「不能專心」，而是「難以選擇性過濾」。可能原因是大腦基底核（Basal Ganglia）對訊息的篩選功能較弱，導致所有刺激同時湧入。</li>
                  <li><strong>多巴胺（Dopamine）失調：</strong> 多數ADHD者的大腦前額葉的多巴胺分泌水平較低，因此需要更強烈、更有趣的刺激才能啟動專注力。</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border-4 border-dashed border-gray-300 mb-12">
            <p className="text-center text-xl font-bold text-gray-600 mb-4">這場體驗結束了，但他們的挑戰還在繼續。</p>
            <p className="text-center text-gray-600">了解「隱性需求」就是支持的第一步。</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mb-12">
            <h3 className="text-2xl font-black mb-6 text-gray-800">注意力不足／過動症 (Attention-Deficit/Hyperactivity Disorder, ADHD)</h3>
            
            <div className="text-gray-700 space-y-3 mb-6">
              <p><strong>(1) 定義：</strong>ADHD 因神經發展因素，致在注意力不足、過動、衝動等行為，並造成學業、生活或人際的功能影響，通常在 12 歲前開始出現。</p>
              <p><strong>(2) 核心特質：</strong>可分為「注意力不足型、過動／衝動型、綜合型」</p>
            </div>

            <p className="text-xs text-gray-500 italic mb-8 border-t border-gray-100 pt-4 leading-relaxed">
              * 診斷標準可參考詳《精神疾病診斷與統計手冊》第五版（DSM-5)或至專業醫療單位評估診斷。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">📌 注意力不足（Inattention）</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>容易分心、走神</li>
                  <li>難以維持專注（上課、閱讀、對話）</li>
                  <li>常弄丟東西、忘記作業或指令</li>
                  <li>任務不易開始 or 完成</li>
                  <li>組織與時間管理困難</li>
                </ul>
              </div>
              <div className="bg-[#B2E2F2]/20 p-6 rounded-2xl border border-[#B2E2F2]">
                <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">📌 過動／衝動（Hyperactivity & Impulsivity）</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>坐不住、常搖晃或移動</li>
                  <li>容易打斷別人、輪流困難</li>
                  <li>行為或情緒反應較衝動</li>
                  <li>難以安靜進行活動</li>
                  <li>行為像「被馬達推著走」</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF5E6] p-8 rounded-3xl border-2 border-orange-200 mb-12">
            <h3 className="text-2xl font-black mb-4 text-orange-900">每一位具有 ADHD 診斷的個體差異很大</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">所以體驗的活動無法代表所有 ADHDer 的日常，其中男女性內外在表現也有所不同：</p>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-blue-400">
                <strong className="text-lg mb-2 block">男性的表現類型多為「生理過動與衝動」：</strong> 
                常表現出坐立難安、插嘴、破壞秩序等顯眼行為，這雖容易被貼上不乖的標籤，但也因行為外顯而能及早被師長發現並介入。
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-pink-400">
                <strong className="text-lg mb-2 block">女性的表現類型多「注意力缺失（ADD）」：</strong> 
                上課或開會時看似文靜順從，實則頻繁神遊，所以不容易被發現、常出現延後診斷的狀況。為了符合社會期待，她們常耗費極大心智去進行「社會偽裝（Social Masking）」與「過度補償（Overcompensation）」如反覆強迫性檢查、極度提早出門等，導致長期的慢性疲憊，易先被診斷成焦慮或憂鬱疾患。
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-8 rounded-3xl border-2 border-green-200">
            <h4 className="text-2xl font-black mb-6 flex items-center gap-2 justify-center">
              <Lightbulb className="text-green-500" /> 然而，挑戰也能成為優勢
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="font-black text-red-400 mb-1">分心</div>
                <div className="text-xs text-gray-400 mb-1">➡︎</div>
                <div className="font-bold text-green-600">具好奇心、觀察敏銳</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="font-black text-red-400 mb-1">衝動</div>
                <div className="text-xs text-gray-400 mb-1">➡︎</div>
                <div className="font-bold text-green-600">行動力強、具創意發散思考</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="font-black text-red-400 mb-1">過動</div>
                <div className="text-xs text-gray-400 mb-1">➡︎</div>
                <div className="font-bold text-green-600">精力充沛、反應快速</div>
              </div>
            </div>
            <p className="text-center text-gray-700 leading-relaxed mb-8">
              有許多 ADHDer 發揮自己的優勢、使用適合自己的策略<br className="hidden md:block"/>
              <strong>(如：專注力藥物、後設認知/專注力策略等等)</strong>，<br className="hidden md:block"/>
              也能過上理想的生活喔！
            </p>
            <button 
              onClick={resetGame}
              className="bg-black text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
            >
              <RefreshCcw size={20} /> 再體驗一次
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (scene === 'ending') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-4 md:p-6">
        {/* 注入自定義 keyframe 動畫來實現排山倒海的壓力左右晃動效果 */}
        <style>{`
          @keyframes pressureSway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-4px) rotate(-1deg); }
            75% { transform: translateX(4px) rotate(1deg); }
          }
          .custom-sway {
            animation: pressureSway var(--sway-duration, 4s) ease-in-out infinite;
            animation-delay: var(--sway-delay, 0s);
          }
        `}</style>

        <div className="flex-grow flex items-center justify-center w-full max-w-2xl">
          <div className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] border-4 border-gray-400">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-gray-600">你感覺到了嗎？那些排山倒海的壓力...</h2>
            
            <div className="space-y-3 mb-10 max-h-[50vh] overflow-y-auto pr-2 pb-4">
              {/* 媽媽 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-pink-400 shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.1s', '--sway-duration': '3.2s' }}
              >
                <strong>媽媽：</strong> 我到底要講幾次你才聽得懂？你根本把我的話當耳邊風！
              </div>
              {/* 姊姊 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-[#B2E2F2] shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.2s', '--sway-duration': '4.1s' }}
              >
                <strong>姊姊：</strong> 為什麼爸媽每次都要我包容你？你只是懶惰而已吧！不要再亂丟東西了啦！每次借你東西都用丟......
              </div>
              {/* 老師 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-blue-400 shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.3s', '--sway-duration': '3.6s' }}
              >
                <strong>老師：</strong> 你其實很聰明，不能再努力一點好嗎？
              </div>
              {/* 爸爸 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-yellow-400 shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.4s', '--sway-duration': '3.9s' }}
              >
                <strong>爸爸：</strong> 藉口！你打電動的時候不是很專心嗎？你只是不想讀書而已吧！
              </div>
              {/* 朋友 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-green-400 shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.5s', '--sway-duration': '4.4s' }}
              >
                <strong>朋友：</strong> 吼，你怎麼又遲到了啦！每次都要大家等你一個人。
              </div>
              {/* 同學 */}
              <div 
                className="bg-gray-100 p-3 md:p-4 rounded-2xl border-l-8 border-purple-400 shadow-sm text-sm md:text-base custom-sway" 
                style={{ '--sway-delay': '0.6s', '--sway-duration': '3.5s' }}
              >
                <strong>同學：</strong> 可不可以聽別人把話講完，不要一直插嘴？
              </div>
              {/* 自己 */}
              <div 
                className="bg-red-50 p-3 md:p-4 rounded-2xl border-l-8 border-red-400 shadow-sm text-sm md:text-base custom-sway border-2 border-red-300" 
                style={{ '--sway-delay': '0.7s', '--sway-duration': '3.0s' }}
              >
                <strong>自己：</strong> 我是不是真的很糟糕......為什麼別人能做到的事情，我都做不好？
              </div>
            </div>

            <div className="text-center mt-6">
              <button 
                onClick={() => setScene('deconstruction')}
                className="bg-black text-white px-6 py-4 md:px-10 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black w-full md:w-auto"
              >
                了解A蒂H弟的內在世界！ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-4 transition-colors duration-500"
      style={{ backgroundColor: scene === 'level1' ? colors.pink : scene === 'level2' ? colors.mint : colors.purple }}
    >
      <BrainNoise active={true} />

      {/* 關卡置中卡片區 */}
      <div className="flex-grow flex items-center justify-center w-full max-w-2xl z-10 py-6">
        <div className="w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative">
          
          {/* 關卡 01：早晨的混亂 */}
          {scene === 'level1' && (
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">
                <Clock size={16} /> 關卡 01：早晨的混亂
              </div>
              <h2 className="text-2xl font-black mb-1">鬧鐘響了，你必須在 10 分鐘內出門。</h2>
              <p className="text-xs text-gray-500 mb-4">💡 你可以重複選擇不同選項，探索不同的結果！</p>
              
              <div className="grid grid-cols-1 gap-3 mt-4">
                <button 
                  onClick={() => handleLevel1Choice('mirror')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel1.includes('mirror') ? 'bg-pink-100 text-pink-900' : 'bg-white hover:bg-pink-50'
                  }`}
                >
                  <span>盯著鏡子發現自己長痘痘看 10 分鐘。</span>
                  {exploredLevel1.includes('mirror') && <Check size={18} className="text-pink-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel1Choice('socks')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel1.includes('socks') ? 'bg-pink-100 text-pink-900' : 'bg-white hover:bg-pink-50'
                  }`}
                >
                  <span>開始找成雙的襪子，但找到一半被手機通知吸引，開始回訊息。</span>
                  {exploredLevel1.includes('socks') && <Check size={18} className="text-pink-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel1Choice('rush')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel1.includes('rush') ? 'bg-pink-100 text-pink-900' : 'bg-white hover:bg-pink-50'
                  }`}
                >
                  <span>不管那麼多直接衝出門。</span>
                  {exploredLevel1.includes('rush') && <Check size={18} className="text-pink-600 flex-shrink-0 ml-2" />}
                </button>
                
                <div className="relative">
                  <button className="w-full p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl text-left font-bold text-gray-400 cursor-not-allowed">
                    有效率的穿好衣服、整理好包包，順利出門。
                  </button>
                  <div 
                    onClick={() => handleLevel1Choice('perfect')}
                    className="absolute inset-0 cursor-help opacity-0 hover:opacity-10 bg-black/5 rounded-xl flex items-center justify-center font-bold text-xs"
                  >
                    (解鎖理想自我)
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300 flex justify-end">
                <button 
                  onClick={() => setScene('level2')}
                  className={`px-8 py-3 rounded-full font-bold border-2 border-black flex items-center gap-2 transition-all ${
                    exploredLevel1.length > 0 
                      ? 'bg-black text-white hover:scale-105 active:translate-y-1' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                  disabled={exploredLevel1.length === 0}
                >
                  下一關：走廊的審判 <ArrowRight size={18} />
                </button>
              </div>
              {exploredLevel1.length === 0 && (
                <p className="text-right text-xs text-red-500 mt-2">請至少嘗試一個選項以解鎖下一關</p>
              )}
            </div>
          )}

          {/* 關卡 02：走廊的審判 */}
          {scene === 'level2' && (
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">
                <User size={16} /> 關卡 02：走廊的審判
              </div>
              <h2 className="text-2xl font-black mb-1">班導攔住你：「你的回條呢？作業已經遲交一週了。」</h2>
              <p className="text-xs text-gray-500 mb-4">💡 你可以重複選擇不同選項，探索不同的結果！</p>
              
              <div className="relative py-4 mb-6">
                 <div className="absolute top-0 right-0 animate-bounce opacity-40 italic text-xs">「我有帶嗎？」</div>
                 <div className="absolute bottom-0 left-10 animate-pulse opacity-40 italic text-xs">「放在餐桌上？」</div>
                 <div className="absolute top-10 left-0 animate-pulse opacity-40 italic text-xs">「我忘了拿出來...」</div>
                 <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
                   大腦正試圖從一團混亂的書包記憶中搜尋那張回條，但搜尋結果顯示：404 Not Found。
                 </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleLevel2Choice('sorry')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel2.includes('sorry') ? 'bg-blue-100 text-blue-900' : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  <span>「對不起，我明天一定帶...」</span>
                  {exploredLevel2.includes('sorry') && <Check size={18} className="text-blue-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel2Choice('silent')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel2.includes('silent') ? 'bg-blue-100 text-blue-900' : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  <span>「低頭不語」</span>
                  {exploredLevel2.includes('silent') && <Check size={18} className="text-blue-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel2Choice('run')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel2.includes('run') ? 'bg-blue-100 text-blue-900' : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  <span>「藉口跑掉」</span>
                  {exploredLevel2.includes('run') && <Check size={18} className="text-blue-600 flex-shrink-0 ml-2" />}
                </button>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300 flex justify-end">
                <button 
                  onClick={() => setScene('level3')}
                  className={`px-8 py-3 rounded-full font-bold border-2 border-black flex items-center gap-2 transition-all ${
                    exploredLevel2.length > 0 
                      ? 'bg-black text-white hover:scale-105 active:translate-y-1' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                  disabled={exploredLevel2.length === 0}
                >
                  下一關：課堂的雜訊 <ArrowRight size={18} />
                </button>
              </div>
              {exploredLevel2.length === 0 && (
                <p className="text-right text-xs text-red-500 mt-2">請至少嘗試一個選項以解鎖下一關</p>
              )}
            </div>
          )}

          {/* 關卡 03：課堂的雜訊 */}
          {scene === 'level3' && (
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">
                <BookOpen size={16} /> 關卡 03：課堂的雜訊
              </div>
              <h2 className="text-2xl font-black mb-1">數學課。老師在台上講課。</h2>
              <p className="text-xs text-gray-500 mb-4">💡 你可以重複選擇不同選項，探索不同的結果！</p>
              
              <div className="mb-6 relative overflow-hidden rounded-xl border-2 border-black">
                <div className="bg-gray-200 h-32 w-full flex items-center justify-center blur-sm">
                  <span className="text-gray-400">老師正在講微積分... 嗡嗡嗡...</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                   <div className="bg-yellow-100 p-2 border border-black rounded shadow-sm rotate-6">窗外的小鳥</div>
                   <div className="bg-pink-100 p-2 border border-black rounded shadow-sm -rotate-3">同學的筆尖</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleLevel3Choice('pinch')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel3.includes('pinch') ? 'bg-purple-100 text-purple-900' : 'bg-white hover:bg-purple-50'
                  }`}
                >
                  <span>努力掐自己大腿試圖專心。</span>
                  {exploredLevel3.includes('pinch') && <Check size={18} className="text-purple-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel3Choice('phone')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel3.includes('phone') ? 'bg-purple-100 text-purple-900' : 'bg-white hover:bg-purple-50'
                  }`}
                >
                  <span>拿出手機滑一下。</span>
                  {exploredLevel3.includes('phone') && <Check size={18} className="text-purple-600 flex-shrink-0 ml-2" />}
                </button>
                
                <button 
                  onClick={() => handleLevel3Choice('sleep')} 
                  className={`p-4 border-2 border-black rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                    exploredLevel3.includes('sleep') ? 'bg-purple-100 text-purple-900' : 'bg-white hover:bg-purple-50'
                  }`}
                >
                  <span>趴下睡覺。</span>
                  {exploredLevel3.includes('sleep') && <Check size={18} className="text-purple-600 flex-shrink-0 ml-2" />}
                </button>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300 flex justify-end">
                <button 
                  onClick={() => setScene('ending')}
                  className={`px-8 py-3 rounded-full font-bold border-2 border-black flex items-center gap-2 transition-all ${
                    exploredLevel3.length > 0 
                      ? 'bg-black text-white hover:scale-105 active:translate-y-1' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                  disabled={exploredLevel3.length === 0}
                >
                  進入結局 <ArrowRight size={18} />
                </button>
              </div>
              {exploredLevel3.length === 0 && (
                <p className="text-right text-xs text-red-500 mt-2">請至少嘗試一個選項以解鎖結局</p>
              )}
            </div>
          )}
        </div>
      </div>

      {}
      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl border-4 border-black max-w-sm text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-250">
            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
              <AlertCircle size={32} />
            </div>
            <p className="text-xl font-black mb-6 text-gray-800">{feedback.text}</p>
            <button 
              onClick={() => setFeedback(null)}
              className="w-full bg-black text-white py-3 rounded-full font-bold border-2 border-black hover:bg-gray-800 active:translate-y-0.5"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60">
          <div className="bg-white p-8 rounded-3xl border-4 border-black max-w-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2 text-black">
              <Info className="text-blue-500" /> {modal.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 font-bold">{modal.content}</p>
            <button 
              onClick={() => setModal(null)}
              className="w-full bg-gray-200 text-black py-3 rounded-full font-bold border-2 border-black hover:bg-gray-300"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;