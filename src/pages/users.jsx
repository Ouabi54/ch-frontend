import { Helmet } from 'react-helmet-async';

import { UsersView } from 'src/sections/users/view';

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> Users </title>
      </Helmet>

      <UsersView />
    </>
  );
}
