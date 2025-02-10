import { useParams } from 'react-router-dom';

// todo: figure out how to add a Route and where to make API call
export const HelpRequestPage = () => {
  const { requestId } = useParams();
  return (
    <div>
      <h2>Страница Запроса Помощи</h2>
      <p>RequestId = {requestId}</p>
    </div>
  );
};
