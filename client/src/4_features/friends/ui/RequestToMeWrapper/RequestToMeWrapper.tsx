import { useAppSelector } from '../../../../1_app/store/hooks';
import style from './RequestToMeWrapper.module.scss';
import RequestToMeCardComponent from '../RequestToMeCardComponent/RequestToMeCardComponent';

export default function RequestToMeWrapper(): React.JSX.Element {
  const { requestsToMe } = useAppSelector((state) => state.friend);

  return (
    <>
      {requestsToMe.length > 0 && (
        <>
          <h2>Предложили дружбу:</h2>
          <div className={style.list}>
            {requestsToMe.map((requestToMe) => (
              <RequestToMeCardComponent key={requestToMe.id} requestToMe={requestToMe} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
