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
import { Grid } from "@mui/material";

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
      <Grid container spacing={6}>
        <Grid item xs={12} sm={5} md={3}>
            <ContactForm />
            <SearchBox />
        </Grid>
        <Grid item xs={12} sm={7} md={9}>
            {isError && <ErrorMessage>{isError}</ErrorMessage>}
            {isLoading && <Loader />}
            <ContactList />
        </Grid>
      </Grid>
    </>
  );
}
