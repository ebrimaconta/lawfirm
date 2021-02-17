import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
interface Para {
  textFirstPerson: string;
  [key: number]: string;
  summary: string;
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
  const [options, setOption] = useState([{ id: '', number: '' }]);

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
  const onSubmitFn = (e: any) => {
    e.preventDefault();
    let getValue = e.target[2].defaultValue;
    let getTopic = document.getElementsByClassName('topic')[getValue];
    let getName = document.getElementsByClassName('name')[getValue];
    let question = document.getElementsByClassName('question')[getValue];
    let message = e.target[1].innerHTML;
    let data = {
      topic: getTopic.innerHTML,
      name: getName.innerHTML,
      question: question.innerHTML,
      message: message,
    };
    props.dispatchSubmitted(data);
  };
  useEffect(() => {
    fetchMyAPI();
  }, [options, props.submitted]);

  return (
    <div className='App'>
      <div className='flex'>
        <div className='mt-3'>
          {props.submitted.length > 0 ? (
            <div className='bg-green-200 flex flex-col justify-center p-2'>
              {props.submitted.map((submit: any) => {
                return (
                  <div className='my-3'>
                    <div className=''>{submit.topic} </div>
                    <div className=''>{submit.name}</div>
                    <div className=''>{submit.question}</div>
                    <div className=''>{submit.message}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='bg-green-200 flex flex-col justify-center p-2'>
              There no submits
            </div>
          )}
        </div>
        <div className=' '>
          {topics.map((topic: any, index) => {
            const optionFind = options.find((e) => e.id === topic.id);
            return (
              <React.Fragment key={index}>
                <form
                  id='form'
                  action=''
                  className='flex w-full flex-wrap justify-center'
                  onSubmit={onSubmitFn}
                >
                  <div className='bg-blue-700  m-3 p-3 text-white w-3/5'>
                    <div className='topic'>Topic: {topic.id}</div>
                    <div className='name'>Name: {topic.name}</div>
                    <div className='question'>
                      Question Text: {topic.questionText}
                    </div>
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
                        <React.Fragment key={index}>
                          <option value={index}>{para.summary}</option>
                        </React.Fragment>
                      ))}
                    </select>
                    <textarea
                      name=''
                      defaultValue={
                        topic.id === optionFind?.id && optionFind
                          ? paras?.[+optionFind.number]?.textFirstPerson
                          : ''
                      }
                      className='text-black w-11/12 h-40 p-2'
                    ></textarea>
                    <input type='hidden' value={index}></input>
                    <div className=''>
                      <button>Submit</button>
                    </div>
                  </div>
                </form>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    submitted: state.submitted,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    dispatchSubmitted: function (payload: any) {
      dispatch({ type: 'SUBMITTED_FORM', payload });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
