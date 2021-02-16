import React, { useState, useEffect, useRef } from 'react';
import './assets/css/tailwind.css';
interface Para {
  textFirstPerson: string;
  [key: number]: string;
  summary: string;
}
interface Index {
  id: string;
  number: string;
}
function App() {
  const [paras, setPara] = useState<Para[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [options, setOption] = useState([{ id: '', number: '' }]);

  async function fetchMyAPI() {
    try {
      const [getPara, getTopics] = await Promise.all([
        fetch(`http://localhost:3010/paragraphs`, {
          method: 'GET',
          mode: 'cors',
        }),
        fetch(`http://localhost:3010/topics`, {
          method: 'GET',
          mode: 'cors',
        }),
      ]);

      let resolvePara = await getPara.json();
      let resolveTopics = await getTopics.json();

      setTopics(resolveTopics);
      setPara(resolvePara);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchMyAPI();
  }, [options]);

  return (
    <div className='App w-full   '>
      <div className='flex w-full flex-wrap justify-center'>
        {topics.map((topic: any, index) => {
          const optionFind = options.find((e) => e.id === topic.id);

          return (
            <React.Fragment key={index}>
              <div className='bg-blue-700  m-3 p-3 text-white w-3/5'>
                <div className=''>Topic: {topic.id}</div>
                <div className=''>Name: {topic.name}</div>
                <div className=''>Question Text: {topic.questionText}</div>
                <select
                  name=''
                  multiple
                  id=''
                  className='text-black w-11/12 my-3'
                  onChange={(e) => {
                    const optionFindIndex = options.findIndex(
                      (e) => e.id === topic.id
                    );
                    if (optionFindIndex === -1) {
                      setOption((prevState) => [
                        ...prevState,
                        { id: topic.id, number: e.target.value },
                      ]);
                    } else {
                      options[optionFindIndex].number = e.target.value;
                      setOption([...options]);
                    }
                  }}
                >
                  {paras.map((para: any, index) => (
                    <option value={index}>{para.summary}</option>
                  ))}
                </select>
                <textarea
                  name=''
                  defaultValue={
                    topic.id === optionFind?.id && optionFind
                      ? paras?.[+optionFind.number]?.textFirstPerson
                      : ''
                  }
                  className='text-black w-11/12 '
                ></textarea>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
