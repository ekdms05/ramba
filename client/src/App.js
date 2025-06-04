import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [server, setServer] = useState("연");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`/api/character?name=${name}&server=${server}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">람바 캐릭터 조회</h1>
      <input className="border p-2 mb-2 w-full" placeholder="캐릭터명" value={name} onChange={e => setName(e.target.value)} />
      <select className="border p-2 mb-4 w-full" value={server} onChange={e => setServer(e.target.value)}>
        {["연", "무휼", "유리", "하자", "호동", "진"].map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={fetchData}>조회</button>
      {data && !data.error && (
        <div className="mt-4">
          <p><strong>이름:</strong> {data.character_name}</p>
          <p><strong>레벨:</strong> {data.character_level}</p>
          <p><strong>클래스:</strong> {data.character_class_name}</p>
          <p><strong>경험치:</strong> {data.character_exp}</p>
        </div>
      )}
      {data?.error && <p className="text-red-500 mt-2">{data.error}</p>}
    </div>
  );
}

export default App;
