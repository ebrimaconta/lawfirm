import * as React from 'react';
import { connect } from 'react-redux';
import logo from '../assets/img/logo.svg';
export interface ITopic {
  topicsData: any;
  parasData: any;
  dispatchSubmitted: any;
}

interface Target {
  index: any;
  value: any;
}

function Topic(props: ITopic) {
  const [options, setOption] = React.useState([
    { id: '', number: '', text: '' },
  ]);
  const onSubmitFn = (e: any) => {
    e.preventDefault();
    let getValue = e.target[2].defaultValue;
    let getOptionsValue = Object.values(options[1]);

    if (getOptionsValue[2].trim().length > 1) {
      let getTopic = document.getElementsByClassName('topic')[getValue];
      let getName = document.getElementsByClassName('name')[getValue];
      let question = document.getElementsByClassName('question')[getValue];

      let getId = getTopic.innerHTML.split(' ')[1];
      let data = {
        id: getId,
        topic: getTopic.innerHTML,
        name: getName.innerHTML,
        question: question.innerHTML,
        message: options[1].text,
      };
      let getForm = document.getElementsByClassName('form')[getValue];
      getForm.classList.add('hidden');
      props.dispatchSubmitted(data);
    } else {
      let error = document.getElementsByClassName('error')[getValue];
      error.innerHTML = 'Please choose a option before submitting';
    }
  };

  return (
    <>
      <div className='w-full lg:w-3/4 '>
        <div className='flex justify-center my-5'>
          <img src={logo} alt='' />
        </div>
        {props.topicsData.map((topic: any, index: number) => {
          const optionFind = options.find((e) => e.id === topic.id);
          const optionFindIndex = options.findIndex((e) => e.id === topic.id);
          const onClickFn = (e: any, selectIndex: any) => {
            let selectInput = (document.getElementById(
              `select-${selectIndex}`
            ) as HTMLSelectElement).value;

            const target = e.target as Target;
            let getOption = optionFind
              ? props.parasData?.[+optionFind.number]?.textFirstPerson
              : props.parasData?.[selectInput]?.textFirstPerson;

            if (optionFindIndex === -1) {
              setOption((prevState) => [
                ...prevState,
                { id: topic.id, number: target.index, text: getOption },
              ]);
            } else {
              options[optionFindIndex].number = target.index;
              options[optionFindIndex].text = getOption;
              setOption([...options]);
            }
          };
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
                        id={`select-${index}`}
                        className='select text-black w-11/12 my-3'
                        onClick={(e) => onClickFn(e, index)}
                      >
                        {props.parasData.map((para: any, index: any) => (
                          <React.Fragment key={index}>
                            <option value={index}>{para.summary}</option>
                          </React.Fragment>
                        ))}
                      </select>

                      <textarea
                        value={optionFind ? optionFind.text : ''}
                        className='textarea text-black w-11/12 h-40 p-2'
                        onChange={(e) => {
                          if (optionFindIndex > 0) {
                            options[optionFindIndex].text = e.target.value;
                            setOption([...options]);
                          } else {
                            let error = document.getElementsByClassName(
                              'error'
                            )[index];
                            error.innerHTML = 'Please choose select option';
                          }
                        }}
                      />

                      <div className=''>
                        Topic:{' '}
                        {topic.id === optionFind?.id && optionFind
                          ? props.parasData?.[+optionFind.number]?.topics.map(
                              (topic: any) => {
                                return `${topic} `;
                              }
                            )
                          : ''}
                      </div>
                      <input type='hidden' value={index} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
