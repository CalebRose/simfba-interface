import React from 'react';

const jumbotron = () => {
  return (
    <div className=''>
      <div className='hero-body center'>
        <div
          className='has-text-centered is-vcentered'
          style={{ paddingBottom: 33 + 'vh' }}
        >
          <img className='logo' src="./img/sfalogo.png" alt='site logo'></img>
          {/* <h1 className="title is-1 heroText">SIMFBA</h1> */}
          <h3 className='subtitle is-size-2 heroText'>
            Your team. Your players. Your legacy.
          </h3>
        </div>
      </div>
      {/* //   <div class="container">
    //     <a href="/" className="lang-logo">
    //       <img src="/img/sfa1.png" alt="Logo" />
    //     </a>
    //     <h1>Welcome to Simulation Football Association</h1>
    //   </div> */}
    </div>
  );
};

export default jumbotron;
