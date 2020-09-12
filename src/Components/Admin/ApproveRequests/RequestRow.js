import React from 'react';

const RequestRow = (props) => {
  const [isApproved, setApproval] = React.useState(false);
  const [isRejected, setReject] = React.useState(false);
  let data = props.request;

  const approve = () => {
    const payload = {
      username: data.Username,
      team: data.Team,
      mascot: data.Nickname,
      teamAbbr: data.Abbr,
      teamId: data.TeamId,
      reqId: data.id,
    };
    return props.approve(payload);
  };

  const reject = () => {
    return props.reject({ reqId: data.TeamId });
  };

  return (
    <tr>
      <td>{data.Team + ' ' + data.Nickname}</td>
      <td>{data.Current_Conference}</td>
      <td>{data.Username}</td>
      <td>
        <button
          className='button is-rounded is-success is-outlined'
          onClick={approve}
        >
          <span className='request-icon'>&#10003;</span>
        </button>
      </td>
      <td>
        <button
          className='button is-rounded request is-danger is-outlined'
          onClick={reject}
        >
          <span className=''>&#215;</span>
        </button>
      </td>
    </tr>
  );
};

export default RequestRow;
