import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'users',
    path: '/',
    icon: icon('ic_user'),
  },
  {
    title: 'requests',
    path: '/requests',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
