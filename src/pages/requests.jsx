import { Helmet } from 'react-helmet-async';

import { RequestsView } from 'src/sections/requests/view';



// ----------------------------------------------------------------------

export default function RequestsPage() {
  return (
    <>
      <Helmet>
        <title> Requests </title>
      </Helmet>

      <RequestsView />
    </>
  );
}
