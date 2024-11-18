import store from '../store';

export default function auth({ next }) {
    if(!store.state.auth.authenticated){        
        return next({name: 'login'});
    }else{
        return next();
    }
  }