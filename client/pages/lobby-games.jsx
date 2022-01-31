import React, { useState } from 'react';

export default function LobbyGames(props) {
  // console.log('props: ', props);
  return (
    <>
      <div className='fixed-width'>
        <p className="white test-margin">{props.hostName}</p>
      </div>
      <div className='fixed-width'>
        <p className="white test-margin">1/2</p>
      </div>
    </>
  );
}
