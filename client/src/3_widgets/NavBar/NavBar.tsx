import { Menu, MenuItem, MenuMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { setActiveItem } from '../../5_entities/Navbar/model/navbarSlice';
import { useUser } from '../../5_entities/user/hooks/userHook';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { logoutHandler } = useUser();
  const { data } = useAppSelector((state) => state.user);
  const activeItem = useAppSelector((state) => state.navbar.activeItem);

  return (
    <Menu pointing>
      {data && (
        <>
          <MenuItem name={data.name ? `${data.name} 🟢` : 'Гость 🔴'} />
          <MenuItem
            as={Link}
            to="/home"
            name="Home"
            active={activeItem === 'Home'}
            onClick={() => dispatch(setActiveItem('Home'))}
          />
          <MenuItem
            as={Link}
            to="/home"
            name="Добавьте вашу вкладку"
            active={activeItem === 'Добавьте вашу вкладку'}
            onClick={() => dispatch(setActiveItem('Добавьте вашу вкладку'))}
          />
        </>
      )}
      <MenuMenu position="right">
        {!data ? (
          <>
            <MenuItem as={Link} to="/register" name="Регистрация" />
            <MenuItem as={Link} to="/login" name="Вход" />
          </>
        ) : null}

        {data ? (
          <>
            <MenuItem onClick={() => logoutHandler()} name="Выход" />
          </>
        ) : null}
      </MenuMenu>
    </Menu>
  );
}
