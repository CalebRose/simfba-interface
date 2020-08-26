import React from 'react';

const TeamCard = (props) => {
  const team = { team: props.team, id: props.teamId };
  const [requested, setRequested] = React.useState(false);

  const sendRequest = () => {
    if (props.disable === false) {
      props.request(team);
      setRequested(true);
    }
  };

  return (
    <div className='tile is-parent'>
      <div className='card team'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image imageSize'>
              <img src={props.logo} alt='logo' />
            </figure>
          </div>
          <div className=''>
            <p className='title is-4'>{props.team}</p>
            <p className='subtitle is-6'>{props.mascot}</p>
            <p className='Conference'>{props.conference}</p>
            <p>
              <strong>Head Coach:</strong> <i>None</i>
            </p>
          </div>
        </div>
        <footer
          onClick={sendRequest}
          className={props.disable ? 'card-footer disabled' : 'card-footer'}
        >
          <p
            className={
              props.disable && !requested
                ? 'card-footer-item card-footer-item-disabled'
                : 'card-footer-item card-footer-item-active'
            }
          >
            {!requested ? 'Request' : 'Request Sent!'}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TeamCard;
