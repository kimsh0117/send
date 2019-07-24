import React from 'react';
import './Progress.scss';

const Progress = ({ emailfor }) => (
  <div className="progress">
    <h1 className="progress__title">Сообщение поставлено в очередь на отправку</h1>
    <div className="progress__content">Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «{emailfor}» со скоростью электронов.</div>
  </div>
)

export default Progress;