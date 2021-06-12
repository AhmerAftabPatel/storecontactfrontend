import React from 'react';
import Search from './Search';
import AddContactModal from '../components/AddContactModal';
import ContactsDisplay from '../components/ContactsDisplay';
import { Container, Header, Icon } from 'semantic-ui-react';

/**
* @author
* @function Dashboard
**/

const Dashboard = ({setSearch,search,isDarkMode,setContacts,options,notify,
    contacts,handleOptionAddition,isLoading

}) => {
  return(
    <>  <Container>
            <Search
              setSearch={setSearch}
              search={search}
              isDarkMode={isDarkMode}
            />
            <AddContactModal
              setContacts={setContacts}
              options={options}
              handleOptionAddition={handleOptionAddition}
              notify={notify}
              isDarkMode={isDarkMode}
            />
            </Container>
            <ContactsDisplay
              contacts={contacts}
              setContacts={setContacts}
              search={search}
              options={options}
              handleOptionAddition={handleOptionAddition}
              notify={notify}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
    </>
   )

 }

export default Dashboard