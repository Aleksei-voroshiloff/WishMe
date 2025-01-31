import React from 'react';

type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: Date;
    avatar: string;
  };
};

export default function FriendCardComponent({ friend }: FriendProp): React.JSX.Element {
  return (
    <div>
      {friend.avatar ? (
        <img src={friend.avatar} alt="foto" />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycpUJ3ZthUXax2SBqN96C4xh1C4tyA7XbPA&s"
          alt="foto"
        />
      )}
      <div>
        <h2>{friend.name}</h2>
        <p>День рождения: {String(friend.birthday)}</p>
      </div>
    </div>
  );
}
