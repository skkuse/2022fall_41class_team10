import React, { useState } from 'react';
import {Background, LoadingText} from './Style';
import Spinner from './icon/Spinner.gif';

export default function Loading(props) {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
};
