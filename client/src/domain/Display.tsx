import React from 'react';
import { connect } from 'react-redux';
type Props = {
  submitted: any;
};
function Display(props: Props) {
  return (
    <div className=' '>
      {props.submitted ? (
        props.submitted.map((submit: any) => {
          return (
            <div className=''>
              <div className=''>{submit.topic} </div>
              <div className=''>{submit.name}</div>
              <div className=''>{submit.question}</div>
              <div className=''>{submit.message}</div>
            </div>
          );
        })
      ) : (
        <>
          <div className=''>Nothing has been submitted</div>
        </>
      )}
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    submitted: state.submitted,
  };
}

export default connect(mapStateToProps)(Display);
