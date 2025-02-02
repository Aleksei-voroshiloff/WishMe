import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { setActiveItem } from '../../5_entities/Navbar/model/navbarSlice';
import { useUser } from '../../5_entities/user/hooks/userHook';
import { MenuItem, Menu, Image } from 'semantic-ui-react';
import style from './NavBar.module.scss';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { logoutHandler } = useUser();
  const { data } = useAppSelector((state) => state.user);
  const activeItem = useAppSelector((state) => state.navbar.activeItem);

  return (
    <div className={style.menu}>
      <Menu fluid vertical tabular>
        {data && (
          <>
            <div></div>
            <MenuItem name={data.name ? `${data.name} 🟢` : 'Гость 🔴'}>
              <Image src="/images/wireframe/media-paragraph.png" />
            </MenuItem>
            <MenuItem
              as={Link}
              to="/myList"
              name="Мои вишлисты"
              active={activeItem === 'Мои вишлисты'}
              onClick={() => dispatch(setActiveItem('Мои вишлисты'))}
            />
            <MenuItem
              as={Link}
              to="/home"
              name="Подарки друзьям"
              active={activeItem === 'Подарки друзьям'}
              onClick={() => dispatch(setActiveItem('Подарки друзьям'))}
            />
            <MenuItem
              as={Link}
              to="/myFriends"
              name="Друзья"
              active={activeItem === 'Друзья'}
              onClick={() => dispatch(setActiveItem('Друзья'))}
            />
            <MenuItem
              as={Link}
              to="/home"
              name="Архив"
              active={activeItem === 'Архив'}
              onClick={() => dispatch(setActiveItem('Архив'))}
            />
            <MenuItem onClick={() => logoutHandler()} name="Выход" />
          </>
        )}
        {!data ? (
          <>
            <MenuItem as={Link} to="/register" name="Регистрация" />
            <MenuItem as={Link} to="/login" name="Вход" />
          </>
        ) : null}
      </Menu>
    </div>
  );
}
