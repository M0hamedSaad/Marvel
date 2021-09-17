import i18n from 'i18n-js';
import en from './en.json';
import ar from './ar.json';
import { store } from '../redux/store';

i18n.translations = { en, ar };


store.subscribe(() => {
  const state = store.getState();
  const { locale } = state.langState;
  i18n.locale = locale;
});
