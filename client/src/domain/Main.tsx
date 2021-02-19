import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Topics from '../components/Topics';

interface Para {
  textFirstPerson: string;
  [key: number]: string;
  summary: string;
  topics: any;
}
interface IMain {
  submitted: any;
}
interface Dispatch {
  dispatchSubmitted: any;
}

type Props = IMain & Dispatch;

function Main(props: Props) {
  const [paras, setPara] = useState<Para[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  const fetchMyAPI = async function () {
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
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
      <div className='grid grid-col-1 lg:flex'>
        <div className='mt-3 w-full lg:w-1/4'>
          {props.submitted.length > 0 ? (
            props.submitted.map((submit: any, index: number) => {
              return (
                <div
                  key={index}
                  className='bg-blue-700 text-white  flex my-2 flex-col justify-center p-2'
                >
                  <div className='my-3'>
                    <div className=''>{submit.topic} </div>
                    <div className=''>{submit.name}</div>
                    <div className=''>{submit.question}</div>
                    <div className=''>Message: {submit.message}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='bg-blue-700 text-white flex flex-col justify-center p-2'>
              There no submits
            </div>
          )}
        </div>
        <>
          <Topics parasData={paras} topicsData={topics} />
        </>
      </div>
    </>
  );
}

function mapStateToProps(state: any) {
  return {
    submitted: state.submitted,
  };
}

export default connect(mapStateToProps)(Main);
