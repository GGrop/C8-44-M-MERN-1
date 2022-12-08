import 'react-lazy-load-image-component/src/effects/blur.css';

import { Link, useNavigate } from 'react-router-dom';

import { CiCirclePlus } from 'react-icons/ci';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { User } from '../models';
import { addFriend } from '../redux/features';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../redux/hooks';
import { useLocation } from 'react-router-dom';

const Friend = ({
  email,
  username,
  fullname,
  followers,
  habits,
  avatar,
  _id,
  rol,
  experience,
}: User) => {
  let location = useLocation();
  const lg = window.screen.width > window.screen.height;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFollow = async () => {
    const response = await dispatch(addFriend(_id));
    if (response.payload.message) {
      toast.error(`The user was already added to friends`);
    } else {
      toast.success(`User followed successfully`);
      navigate('/home');
    }
  };

  return (
    <div
      className={`flex justify-between
      items-center
      lg:justify-center
      lg:w-full
      lg:h-44
      lg:border-2
      mt-4
       rounded-md
       lg:bg-secondary-light/30
       dark:border-none
      ${location.pathname !== '/home' && 'md:flex-col-reverse md:w-44 '}
      ${
        location.pathname == '/home' &&
        ' lg:h-fit lg:bg-transparent lg:border-none lg:pt-2'
      }
      `}
    >
      <div
        className={`
        flex items-center
        gap-4 lg:justify-center
        w-full
        ${location.pathname !== '/home' && 'md:gap-0 md:flex-col md:w-44'}
        `}
      >
        <Link to={`/friend/${_id}`}>
          <div className="h-12 w-12 lg:w-14 lg:h-14">
            <LazyLoadImage
              src={avatar}
              alt="Friend picture"
              className="rounded-full h-12 w-12 object-cover cursor-pointer lg:w-14 lg:h-14 border-2"
              effect="blur"
            />
          </div>
        </Link>
        <Link
          to={`/friend/${_id}`}
          className={` w-full ${location.pathname == '/home' && 'lg:hidden'} `}
        >
          <div className="md:flex md:flex-col md:justify-center max-w-127 md:max-w-full md:w-44 md:text-center w-full">
            <p className="text-secondary-dark dark:text-secondary-light ">
              {username}
            </p>
            {email && (
              <p className="text-secondary-regular text-sm dark:text-secondary-light  w-full">
                {email}
              </p>
            )}
          </div>
        </Link>
      </div>
      <CiCirclePlus
        onClick={handleFollow}
        className={`text-3xl text-primary-dark md:self-end cursor-pointer lg:pr-6 lg:w-auto  lg:h-auto ${
          location.pathname == '/home' && 'hidden'
        }`}
      />
    </div>
  );
};

export default Friend;
