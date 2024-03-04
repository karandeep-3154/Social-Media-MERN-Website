import {Outlet, Navigate, Route, Routes, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
import{Login,Register,ResetPassword,Profile,Home} from './pages'

function Layout(){
  const {user} = useSelector(state => state.user);
  console.log(user);
  const location = useLocation();
  return user?.token
  ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
    /*It passes the current location as state so that the user can be redirected back to this location after successful login. The replace prop is used to replace the current URL in history instead of pushing a new entry.
    The Outlet acts as a placeholder for the child components defined in those nested routes. So, if the User is Authenticated, the inner Routes will be handled else, the user will be Redirected to Login Page*/
  )


}
function App() {
  const {theme} = useSelector(state => state.theme);
  console.log(theme);
  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      {/*The data-theme attribute is used to set the theme of the application. It is set to the value of the theme property from the Redux store. Refer - https://dev.to/ditarahma08/dark-mode-with-css-variable-1p57*/}
      <Routes>
        <Route element={<Layout/>}>
          {/* Each route has an element prop which defines the component to render when the route matches.*/ }
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:id?' element={<Profile/>}/>
          {/*These are Protected Routes i.e. they will be Accessible only if the User is Logged In*/}
        </Route>
    
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>



      </Routes>

    </div>
  );
}

export default App;
