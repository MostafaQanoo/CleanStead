import connection from '../../database/connection';

const getContactsQuery = () => connection.query('SELECT * FROM contacts WHERE archived = false ORDER BY id ASC');
export default getContactsQuery;
