import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { setActiveItem } from '../../5_entities/Navbar/model/navbarSlice';
import { useUser } from '../../5_entities/user/hooks/userHook';
import { MenuItem, Menu, Image } from 'semantic-ui-react';
import style from './NavBar.module.scss';
import { openUserModal } from '../../5_entities/modal_window/modalSlice';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { logoutHandler } = useUser();
  const { data, status } = useAppSelector((state) => state.user);

  const user = useAppSelector((state) => state.user.myCabinet);
  const activeItem = useAppSelector((state) => state.navbar.activeItem);

  return (
    <div className={style.menu}>
      <Menu fluid vertical tabular color="blue">
        {data && (
          <>
            <MenuItem>
              <div className={style.red} onClick={() => dispatch(openUserModal())}>
                Ред.
              </div>
              <Image
                className={style.avatar}
                src={user?.avatar === null ? '/avatar.png' : `http://localhost:3000/${user.avatar}`}
              />
              <div className={style.textava}>{user?.name ? user.name : 'Гость'}</div>
            </MenuItem>
            <MenuItem
              className={style.textMenu}
              as={Link}
              to="/myList"
              name="Мои вишлисты"
              active={activeItem === 'Мои вишлисты'}
              onClick={() => dispatch(setActiveItem('Мои вишлисты'))}
            />
            <MenuItem
              className={style.textMenu}
              as={Link}
              to="/present"
              name="Подарки друзьям"
              active={activeItem === 'Подарки друзьям'}
              onClick={() => dispatch(setActiveItem('Подарки друзьям'))}
            />
            <MenuItem
              className={style.textMenu}
              as={Link}
              to="/friends"
              name="Друзья"
              active={activeItem === 'Друзья'}
              onClick={() => dispatch(setActiveItem('Друзья'))}
            />
            <MenuItem
              className={style.textMenu}
              as={Link}
              to="/home"
              name="Архив"
              active={activeItem === 'Архив'}
              onClick={() => dispatch(setActiveItem('Архив'))}
            />
            <MenuItem className={style.textMenu} onClick={() => logoutHandler()} name="Выход" />
          </>
        )}
        {status !== 'logged' && (
          <>
            <MenuItem className={style.textMenu} as={Link} to="/register" name="Регистрация" />
            <MenuItem className={style.textMenu} as={Link} to="/login" name="Вход" />
          </>
        )}
      </Menu>
    </div>
  );
}
