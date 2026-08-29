import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [playerName, setPlayerName] = useState('')
  const [currentScreen, setCurrentScreen] = useState('start')
  const [selectedCells, setSelectedCells] = useState([])
  const [attemptCount, setAttemptCount] = useState(0)

  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const base = import.meta.env.BASE_URL

  const [records, setRecords] = useState(() => {
    const savedRecords =
      localStorage.getItem('quizRecords')

    return savedRecords
      ? JSON.parse(savedRecords)
      : []
  })

  const [currentElapsedTime, setCurrentElapsedTime] = useState(0)

  const [playerStatus, setPlayerStatus] =
  useState('待機中')

  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const APP_PASSWORD = 'kq2026'

  const login = () => {

  if (password === APP_PASSWORD) {
    setAuthenticated(true)
  } else {
    alert('パスワードが違います')
  }

  }

  useEffect(() => {
  localStorage.setItem(
    'quizRecords',
    JSON.stringify(records)
  )
  }, [records])

  useEffect(() => {

  const timer = setInterval(() => {

    if (startTime) {

      setCurrentElapsedTime(
        (Date.now() - startTime) / 1000
      )

    }

  }, 1000)

  return () => clearInterval(timer)

  }, [startTime])

  const question1 = {
  id: 1,
  title: '神戸大学をすべて選択してください',

  images: [
    `${base}image/01_kobeuniv/01.jpg`,
    `${base}image/01_kobeuniv/02.jpg`,
    `${base}image/01_kobeuniv/03.jpg`,
    `${base}image/01_kobeuniv/04.jpg`,
    `${base}image/01_kobeuniv/05.jpg`,
    `${base}image/01_kobeuniv/06.jpg`,
    `${base}image/01_kobeuniv/07.jpg`,
    `${base}image/01_kobeuniv/08.jpg`,
    `${base}image/01_kobeuniv/09.jpg`
  ],

  correctAnswers: [
    `${base}image/01_kobeuniv/01.jpg`,
    `${base}image/01_kobeuniv/04.jpg`,
    `${base}image/01_kobeuniv/08.jpg`,
    `${base}image/01_kobeuniv/09.jpg`
  ]
  }
  const question2 = {
  id: 2,
  title: '2022年度実施の高等学校学習指導要領で定められている科目をすべて選択してください',

  images: [
    `${base}image/02_curriculum/01.JPG`,
    `${base}image/02_curriculum/02.JPG`,
    `${base}image/02_curriculum/03.JPG`,
    `${base}image/02_curriculum/04.JPG`,
    `${base}image/02_curriculum/05.JPG`,
    `${base}image/02_curriculum/06.JPG`,
    `${base}image/02_curriculum/07.JPG`,
    `${base}image/02_curriculum/08.JPG`,
    `${base}image/02_curriculum/09.JPG`
  ],

  correctAnswers: [
    `${base}image/02_curriculum/03.JPG`,
    `${base}image/02_curriculum/04.JPG`,
    `${base}image/02_curriculum/05.JPG`,
    `${base}image/02_curriculum/08.JPG`
  ]
  }
  const question3 = {
  id: 3,
  title: '紀元前の出来事とされているものをすべて選択してください',

  images: [
    `${base}image/03_history/01.JPG`,
    `${base}image/03_history/02.JPG`,
    `${base}image/03_history/03.JPG`,
    `${base}image/03_history/04.JPG`,
    `${base}image/03_history/05.JPG`,
    `${base}image/03_history/06.JPG`,
    `${base}image/03_history/07.JPG`,
    `${base}image/03_history/08.JPG`,
    `${base}image/03_history/09.JPG`
  ],

  correctAnswers: [
    `${base}image/03_history/02.JPG`,
    `${base}image/03_history/03.JPG`,
    `${base}image/03_history/06.JPG`,
    `${base}image/03_history/07.JPG`,
    `${base}image/03_history/09.JPG`
  ]
  }

  const question4 = {
  id: 4,
  title: '魚類をすべて選択してください',

  images: [
    `${base}image/04_fish/01.JPG`,
    `${base}image/04_fish/02.JPG`,
    `${base}image/04_fish/03.JPG`,
    `${base}image/04_fish/04.JPG`,
    `${base}image/04_fish/05.JPG`,
    `${base}image/04_fish/06.JPG`,
    `${base}image/04_fish/07.JPG`,
    `${base}image/04_fish/08.JPG`,
    `${base}image/04_fish/09.JPG`
  ],

  correctAnswers: [
    `${base}image/04_fish/02.JPG`,
    `${base}image/04_fish/03.JPG`,
    `${base}image/04_fish/04.JPG`,
    `${base}image/04_fish/07.JPG`,
    `${base}image/04_fish/09.JPG`
  ]
  }

  const question5 = {
  id: 5,
  title: 'ラグをすべて選択してください',

  images: [
    `${base}image/05_watch/01.jpg`,
    `${base}image/05_watch/02.jpg`,
    `${base}image/05_watch/03.jpg`,
    `${base}image/05_watch/04.jpg`,
    `${base}image/05_watch/05.jpg`,
    `${base}image/05_watch/06.jpg`,
    `${base}image/05_watch/07.jpg`,
    `${base}image/05_watch/08.jpg`,
    `${base}image/05_watch/09.jpg`
  ],

  correctAnswers: [
    `${base}image/05_watch/02.jpg`,
    `${base}image/05_watch/05.jpg`,
    `${base}image/05_watch/08.jpg`
  ]
  }

  const questions = [
    question1,
    question2,
    question3,
    question4,
    question5
  ]

  const [currentQuestion, setCurrentQuestion] = useState(question1)

  const toggleCell = (cell) => {
    if (selectedCells.includes(cell)) {
      setSelectedCells(
        selectedCells.filter((item) => item !== cell)
      )
    } else {
      setSelectedCells([...selectedCells, cell])
    }
  }

  const checkAnswer = () => {

    setAttemptCount((prev) => prev + 1)

    const sortedSelected = [...selectedCells].sort()
    const sortedCorrect =
      [...currentQuestion.correctAnswers].sort()

    const isCorrect =
      JSON.stringify(sortedSelected) ===
      JSON.stringify(sortedCorrect)

    if (isCorrect) {

      const time =
        (Date.now() - startTime) / 1000

      setElapsedTime(time)

      setRecords((prev) => [
        ...prev,
      {
        name: playerName,
        attempts: attemptCount + 1,
        time: time,
        date: new Date().toLocaleString()
      }
      ])

      sendScore(
        playerName,
        currentQuestion.id,
        attemptCount + 1,
        time
      )

      setPlayerStatus('認証成功')
      setCurrentScreen('correct')

    } else {
      setPlayerStatus('認証失敗')
      setCurrentScreen('incorrect')

    }
  }

  const sendScore = async (
    name,
    questionId,
    attempts,
    time
  ) => {

    const formUrl ='https://docs.google.com/forms/d/e/1FAIpQLSefAaLKn4_-mug8GIEJQuuz8dJdmJ3Bl8_tyQu10ez4i4vOrQ/formResponse'

    const formData = new FormData()

    formData.append(
    'entry.2018360629',
    name
    )

    formData.append(
    'entry.2048509477',
    questionId
    )

    formData.append(
    'entry.237545962',
    attempts
    )

    formData.append(
    'entry.1577961310',
    time.toFixed(1)
    )

    try {

      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })

      alert('スコアを記録しました')

    } catch (error) {

      alert('スコアの記録に失敗しました')

    }
    }

  const sortedRecords = [...records].sort(
  (a, b) => a.time - b.time
  )

  let screenLabel = ''

    if (currentScreen === 'start') {
      screenLabel = '待機中'
    }

    if (currentScreen === 'quiz') {
      screenLabel = '出題中'
    }

    if (currentScreen === 'correct') {
      screenLabel = '認証成功'
    }

    if (currentScreen === 'incorrect') {
      screenLabel = '認証失敗'
    }

    if (currentScreen === 'records') {
      screenLabel = '成績一覧'
    }

    if (currentScreen === 'adminHome') {
      screenLabel = '管理画面'
    }

    if (currentScreen === 'adminStatus') {
      screenLabel = '現状監視'
    }

    if (currentScreen === 'adminRanking') {
      screenLabel = 'ランキング'
    }  

const playerInfo = {
  name: playerName,
  status: playerStatus,
  attempts: attemptCount,
  elapsedTime: currentElapsedTime,
  selectedCount: selectedCells.length
}

const questionInfo = {
  id: currentQuestion.id,
  title: currentQuestion.title,
  imageCount: currentQuestion.images.length,
  correctCount:
    currentQuestion.correctAnswers.length
}

const monitorInfo = {
  player: playerInfo,

  question: {
    ...questionInfo,
    images: currentQuestion.images
  },

  selectedCells,

  startedAt: startTime,
  elapsedTime: currentElapsedTime,

  lastAnswerTime: elapsedTime
}

if (!authenticated) {

  return (

    <div className="password-screen">

      <h1>クイズプレイヤー認証</h1>

      <p>パスワードを入力してください</p>

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        onKeyDown={(e) => {

        if (e.key === 'Enter') {
        login()
    }

  }}
/>

      <button onClick={login}>
        入室
      </button>

    </div>

  )

}

  return (
    <div>
    {currentScreen === 'start' && (
      <>
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="ロゴ"
        className="logo"
        ></img>
        <h1>クイズプレイヤー認証</h1>
        <br />
        <p>プレイヤー名</p>
        <p>2回目以降のプレイ時は、1回目と同じプレイヤー名を入力してください</p>
        <br />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <br />
        <br />

        <button
          onClick={() => {
            setAttemptCount(0)
            setSelectedCells([])
            setElapsedTime(0)
            setCurrentElapsedTime(0)

            setStartTime(Date.now())

          const randomIndex =
            Math.floor(Math.random() * questions.length)

          setCurrentQuestion(
            questions[randomIndex]
          )
            setPlayerStatus('出題中')
            setCurrentScreen('quiz')
          }}
        >
          私はクイズプレイヤーです
        </button>

        <br />
        <br />

        <button
          onClick={() => setCurrentScreen('adminHome')}
        >
          ユーザーデータ
        </button>
      </>
    )}

    {currentScreen === 'quiz' && (
    <>
      <h1>問題</h1>

      <p>ようこそ {playerName} さん</p>

      <p>{currentQuestion.title}</p>
    <div className="grid-wrapper">
      <div className="grid">
        {currentQuestion.images.map((cell) => (
      <div
        key={cell}
        className={`cell ${
          selectedCells.includes(cell) ? 'selected' : ''
        }`}
        onClick={() => toggleCell(cell)}
      >
        <img src = {cell} alt = "image"/>

        {selectedCells.includes(cell) && (
          <div className="check-mark">
            ✓
          </div>
        )}
      </div>
      ))}
      </div>
    </div>

      <br />
      <br />

      <button
        onClick={checkAnswer}
        disabled={selectedCells.length === 0}
      >

      送信
      </button>
      <br />
      <br />
      </>
    )}

    {currentScreen === 'correct' && (
    <div
      className="full-screen"
      onClick={() => {
        setSelectedCells([])
        setPlayerStatus('待機中')
        setCurrentScreen('start')
      }}
    >
    <h1>正解！</h1>

    <p>あなたはクイズプレイヤーです</p>

    <p>挑戦回数: {attemptCount}回</p>

    <p>記録件数: {records.length}</p>

    <p>
      解答時間: {elapsedTime.toFixed(1)} 秒
    </p>

    <p>画面をタップしてトップページへ</p>
  </div>
)}

    {currentScreen === 'incorrect' && (
    <div
      className="full-screen"
      onClick={() => {
        setSelectedCells([])
        setPlayerStatus('出題中')
        setCurrentScreen('quiz')
      }}
    >
    <h1>残念</h1>

    <p>あなたはまだクイズプレイヤーではないようです</p>

    <p>不屈の心で画面をタップ</p>
    </div>
    )}

  {currentScreen === 'records' && (
    <div>
    <h1>成績一覧</h1>

  <table>
  <thead>
    <tr>
      <th>順位</th>
      <th>名前</th>
      <th>回数</th>
      <th>時間</th>
      <th>日時</th>
    </tr>
  </thead>

  <tbody>
    {sortedRecords.map((record, index) => (
      <tr key={index}>
        <td>{index + 1}位</td>
        <td>{record.name}</td>
        <td>{record.attempts}回</td>
        <td>{record.time.toFixed(1)}秒</td>
        <td>{record.date}</td>
        </tr>
    ))}
  </tbody>
  </table>

    <button
      onClick={() => setCurrentScreen('start')}
    >
      戻る
    </button>

    <br />

    <button
      onClick={() => {
        setRecords([])
        localStorage.removeItem('quizRecords')
      }}
    >
      成績を全削除
    </button>

    </div>
    )}

{currentScreen === 'adminHome' && (
  <div>

    <h1>ユーザーデータ</h1>

    <p>
      登録記録数: {records.length}件
    </p>


      <br />
      <br />
      <button
        onClick={() => setCurrentScreen('adminStatus')}
      >
        現在の状態
      </button>

      <br />
      <br />
      <button
        onClick={() => setCurrentScreen('adminRanking')}
      >
        成績
      </button>

      <br />
      <br />

      <button
        onClick={() => setCurrentScreen('start')}
      >
        戻る
      </button>

    </div>
  )}

  {currentScreen === 'adminStatus' && (
  <div>

  <div className="status-card">

    <h3>プレイヤー情報</h3>

    <p>
    プレイヤー名:{monitorInfo.player.name}
    </p>

    <p>
    現在の状態: {monitorInfo.player.status}
    </p>

    <p>
    経過時間:{monitorInfo.elapsedTime.toFixed(0)}秒
    </p>

    <p>
    選択枚数: {monitorInfo.player.selectedCount}
    </p>

    <p>
    挑戦回数: {monitorInfo.player.attempts}
    </p>

    <p>
    最終解答時間:{monitorInfo.lastAnswerTime.toFixed(1)}秒
    </p>

  </div>

  
  <div className="question-card">
    <h3>現在の問題</h3>

    <p>
    問題番号:{monitorInfo.question.id}
    </p>
    <p>{monitorInfo.question.title}</p>

    <p>
    画像数: {monitorInfo.question.imageCount}
    </p>

    <p>
    正解数: {monitorInfo.question.correctCount}
    </p>
  </div>

  <h3>現在の選択状態</h3>

  <div className="grid">
    {monitorInfo.question.images.map((cell) => (
      <div
        key={cell}
        className={`cell ${
          monitorInfo.selectedCells.includes(cell) ? 'selected' : ''
        }`}
      >
        <img src = {cell} alt = "image"/>

        {monitorInfo.selectedCells.includes(cell) && (
          <div className="check-mark">
            ✓
          </div>
        )}
      </div>
    ))}
  </div>

    <br />

    <button
      onClick={() => setCurrentScreen('adminHome')}
    >
      戻る
    </button>

  </div>
  )}

  {currentScreen === 'adminRanking' && (
    <div>
<br />
<br />
<h2>ランキング</h2>

  <table>
  <thead>
    <tr>
      <th>順位</th>
      <th>名前</th>
      <th>回数</th>
      <th>時間</th>
      <th>日時</th>
    </tr>
  </thead>

  <tbody>
    {sortedRecords.map((record, index) => (
      <tr key={index}>
      <td>{index + 1}位</td>
      <td>{record.name}</td>
      <td>{record.attempts}回</td>
      <td>{record.time.toFixed(1)}秒</td>
      <td>{record.date}</td>
      </tr>
    ))}
  </tbody>
  </table>

  <button
    onClick={() => {
    setRecords([])
      localStorage.removeItem('quizRecords')
    }}
    >
      成績を全削除
  </button>

  <br />
  <br />

  <button
    onClick={() => setCurrentScreen('adminHome')}
  >
    戻る
  </button>

  <br />
  <br />
  </div>
  )}

<footer className="copyright">
  © shotaronSHIMOMU2026
</footer>


</div>
  )
}

export default App

// https://m365.cloud.microsoft/chat/entity1-d870f6cd-4aa5-4d42-9626-ab690c041429/eyJpZCI6IlZYTmxjbFl4ZkdoMGRIQnpPaTh2YzNWaWMzUnlZWFJsTFdsdWRDNXZabVpwWTJVdVkyOXRMM3hQU1VRNlltSXpORE0yTm1VdE5UaGtaaTAwTnpkakxUZ3labUl0TXpabE5tRmtOelkwWmpCamZEZ3hNR0kxTTJJd0xURXdNV0V0TkRnNE9TMDVZalU0TFdOa05USTRaR1kzWXpBME0zd3lNREkyTFRBNExURTJWREV6T2pBeE9qSTFMamd5TVRBd05UWmEiLCJzY2VuYXJpbyI6InNoYXJlTGlua1ZpYVBvcG92ZXIiLCJwcm9wZXJ0aWVzIjp7InByb21wdFNvdXJjZSI6InVzZXIiLCJjbGlja1RpbWVzdGFtcCI6IjIwMjYtMDgtMTZUMTM6MDE6MjcuNDgwWiJ9LCJjaGF0VHlwZSI6IndlYiIsInZlcnNpb24iOjEuMX0