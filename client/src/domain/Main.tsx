import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import logo from '../assets/img/logo.svg';

interface Para {
  textFirstPerson: string;
  [key: number]: string;
  summary: string;
  authorFirstPerson: any;
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
    if (e.target[1].innerHTML) {
      let getTopic = document.getElementsByClassName('topic')[getValue];
      let getName = document.getElementsByClassName('name')[getValue];
      let question = document.getElementsByClassName('question')[getValue];
      let message = e.target[1].innerHTML;
      let getId = getTopic.innerHTML.split(' ')[1];
      let data = {
        id: getId,
        topic: getTopic.innerHTML,
        name: getName.innerHTML,
        question: question.innerHTML,
        message: message,
      };
      let getForm = document.getElementsByClassName('form')[getValue];
      getForm.classList.add('hidden');
      props.dispatchSubmitted(data);
    } else {
      let error = document.getElementsByClassName('error')[getValue];
      error.innerHTML = 'Please choose a option before submitting';
    }
  };
  useEffect(() => {
    fetchMyAPI();
  }, [options]);

  return (
    <>
      <div className='grid grid-col-1 lg:flex'>
        <div className='mt-3 w-full lg:w-1/4'>
          {props.submitted.length > 0 ? (
            props.submitted.map((submit: any, index: number) => {
              return (
                <div
                  key={index}
                  className='bg-green-200 flex my-2 flex-col justify-center p-2'
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
            <div className='bg-green-200 flex flex-col justify-center p-2'>
              There no submits
            </div>
          )}
        </div>
        <div className='w-full lg:w-3/4 '>
          <div className='flex justify-center my-5'>
            <img src={logo} alt='' />
          </div>
          {topics.map((topic: any, index) => {
            const optionFind = options.find((e) => e.id === topic.id);
            return (
              <React.Fragment key={index}>
                <form action='' className='form' onSubmit={onSubmitFn}>
                  <div className=' flex w-full flex-wrap justify-center'>
                    <div className='bg-blue-200  m-3 p-3 text-black w-full lg:w-3/5 '>
                      <div className='text-center'>
                        <div className='topic'>Topic: {topic.id}</div>
                        <div className='name'>Name: {topic.name}</div>
                        <div className='question'>
                          Question Text: {topic.questionText}
                        </div>
                        <div className='error text-red-700 '></div>
                      </div>
                      <div className='ml-10 mb-3 my-2'>
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
                      </div>
                      <div className='flex justify-center'>
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
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
