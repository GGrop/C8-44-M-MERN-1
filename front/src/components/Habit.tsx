import { AiOutlineCheckCircle } from 'react-icons/ai';
import Confetti from 'react-confetti';
import ExperienceRing from './ExperienceRing';
import { Habit as HabitType } from '../models';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import { checkHabit } from '../redux/features';
import { tempColorAssing } from '../utils/changeColor';
import { useAppDispatch } from '../redux/hooks';
import { useState } from 'react';

interface Props {
  habit: HabitType;
  showCheck: boolean;
  sizeExperience: number | undefined;
}

const Habit = ({ habit, showCheck, sizeExperience }: Props) => {
  const [party, setParty] = useState(false);
  const dispatch = useAppDispatch();
  const handleCheck = async () => {
    setParty(true);
    await dispatch(checkHabit(habit._id));
  };

  return (
    <div
      className={`flex items-center
      justify-between
      rounded-md bg-secondary-light/30
      w-full my-3 px-4
      ${location.pathname == '/habits' && 'lg:flex-col'}
      `}
    >
      <Link to={`/habit-detail/${habit._id}`}>
        <h3
          className={`text-sm pl-5 p-3 text-secondary-dark dark:text-secondary-light lg:pt-4 lg:pb-2 lg:px-0 ${
            location.pathname == '/home' && 'lg:pt-4 lg:pb-4'
          } `}
        >
          {habit.name}
        </h3>
      </Link>
      <div
        className={`pr-5 flex items-center gap-6 lg:pr-0 lg:pb-2 ${
          location.pathname === '/home' && ' lg:pb-0'
        }`}
      >
        <span
          className={`flex text-xs font-bold text-${tempColorAssing(
            Math.ceil(habit.experience / 100),
            'class'
          )} `}
        >
          {!sizeExperience ? (
            `lvl ${Math.ceil(habit.experience / 100)}`
          ) : (
            <ExperienceRing
              size={sizeExperience}
              experience={habit.experience}
              level={Math.ceil(habit.experience / 100)}
              color={'#f85f6a'}
              textColor={'scale1'}
              fontSize={'text-10 lg:text-sm'}
            />
          )}
        </span>

        <div>
          {showCheck &&
            (habit.isDone ? (
              <MdCheckCircle color={'#5ED55E'} size={'35px'} />
            ) : (
              <AiOutlineCheckCircle
                className="cursor-pointer"
                color={'#8492a6'}
                size={'35px'}
                onClick={handleCheck}
              />
            ))}
        </div>
      </div>
      <Confetti
        numberOfPieces={party ? 300 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setParty(false);
          confetti?.reset();
        }}
      />
    </div>
  );
};

export default Habit;
