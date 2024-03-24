import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import ContactList from "../components/ContactList/ContactList";
import ContactForm from "../components/ContactForm/ContactForm";
import SearchBox from "../components/SearchBox/SearchBox";
import Loader from "../components/Loader/Loader";
import { fetchContacts } from "../redux/contacts/operations";
import { selectIsLoading, selectError } from "../redux/contacts/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (
    <>
      <DocumentTitle>Your phonebook</DocumentTitle>
      <div className="row">
        <div className="col s3">
            <ContactForm />
            <SearchBox />
        </div>
        <div className="col s9">
            {isError && <ErrorMessage>{isError}</ErrorMessage>}
            {isLoading && <Loader />}
            <ContactList />
        </div>
      </div>
    </>
  );
}
