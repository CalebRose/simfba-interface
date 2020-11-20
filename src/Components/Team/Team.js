import React, { useEffect } from 'react';
import logos from '../../Constants/logos';
import ImageCard from '../ImageCard/ImageCard';
import routes from '../../Constants/routes';
import { useSelector } from 'react-redux';
import { getLogo } from '../../Constants/getLogo';
import url from '../../Constants/url';

const Team = () => {
  const user = useSelector((state) => state.user.currentUser);
  let initialTeam = user ? user.team : null; // Initial value from redux state
  const [team, setTeam] = React.useState(null); // Redux value as initial value for react hook
  const logo = getLogo(initialTeam);

  useEffect(() => {
    const getTeam = async () => {
      let response = await fetch(url + 'teams/team/' + user.teamId, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      let json;
      if (response.ok) {
        json = await response.json();
      } else {
        alert('HTTP-Error:', response.status);
      }
      setTeam(json[0]);
    };
    if (user) {
      getTeam();
    }
  }, [user]);

  return (
    <div className='hero-body center'>
      <div className='container has-text-centered userInterface'>
        <h2 className='title is-3'>
          {user.team} {user.mascot}
        </h2>
        <div className='columns is-12'>
          <div className='column is-2'>
            <img src={logo} alt='Team Logo' />
          </div>
          <div className='column is-3 text-left'>
            <div className='team-text'>
              <p>
                <strong>Location:</strong> {team ? team.City : ''},{' '}
                {team ? team.State : ''}
              </p>
              <p>
                <strong>Stadium:</strong> N / A
              </p>
              <p>
                <strong>Avg Attendance:</strong> N / A
              </p>
              <p>
                <strong>Conference:</strong>{' '}
                {team ? team.Current_Conference : ''}
              </p>
              <p>
                <strong>Division:</strong> N / A
              </p>
              <p>
                <strong>Rivals:</strong> Washington Huskies, Idaho Vandals
              </p>
              <br></br>
              <p>
                <strong>Coach:</strong> {user.username}
              </p>
              <p>
                <strong>Overall:</strong> N / A
              </p>
              <p>
                <strong>Current Season:</strong> N / A
              </p>
              <p>
                <strong>Division Titles:</strong> N / A
              </p>
              <p>
                <strong>Conference Championships:</strong> N / A
              </p>
              <p>
                <strong>Bowl Record:</strong> N / A
              </p>
            </div>
          </div>
          <div className='column is-7 is-vertical'>
            <div className='tile is-parent'>
              <ImageCard
                image='./img/userpage/roster4.jpg'
                title='ROSTER'
                route={routes.ROSTER}
              />
              <ImageCard
                image='./img/userpage/depthchart2.jpg'
                title='DEPTH CHART'
                route={routes.DEPTHCHART}
              />
            </div>
            <div className='tile is-parent'>
              <ImageCard
                image='./img/userpage/roster5.jpg'
                title='RECRUITING'
                route={routes.RECRUITING}
              />
              <ImageCard
                image='./img/userpage/schedule2.jpg'
                title='SCHEDULING'
                route={routes.SCHEDULING}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Team;
