import React from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { SetTheme } from '../redux/theme';
import { TbSocial } from "react-icons/tb";
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
import { BsMoon, BsSunFill } from 'react-icons/bs';
import { LuLogOut } from "react-icons/lu";
import { fetchPosts } from '../Utils';
import { Logout } from '../redux/userSlice';
const TopBar = () => {

  const {theme} = useSelector(state => state.theme);
  const {user} = useSelector(state => state.user);
  const {register, reset, handleSubmit} = useForm();


  const handleSearch = async(data) => {
    await fetchPosts(user.token, dispatch, "", data);
    reset({search: ''})
  }

  const handleTheme = () => {
    const themeValue = theme === 'light' ? 'dark' : 'light';
    dispatch(SetTheme(themeValue))

  }

  const handleLogout = () => {

    dispatch(Logout());

  }

  const dispatch = useDispatch();

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-[#065ad8] rounded text-white'>
                <TbSocial />
            </div>
            <span className='text-xl md:text-2xl text-[#065ad8] font-semibold '>Connectify</span>
        </Link>

        <form className='hidden md:flex items-center justify-center ' onSubmit={handleSubmit(handleSearch)}>
            <TextInput placeholder='Search...' styles='w-[18rem] lg:w-[38rem] rounded-l-full py-3 ' register={register('search')}/>
            <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
        />
        </form>

        <div className=" flex cursor-pointer gap-4 items-center text-ascent-1 text-md md:text-xl">
            <button onClick={()=>handleTheme()}>

              {theme === 'light' ? <BsMoon/> : <BsSunFill/>}</button>

            <div className="hidden lg:flex" onClick={()=>handleLogout()}>
               <LuLogOut />
            </div>

        </div>
    </div>
  )
}

export default TopBar