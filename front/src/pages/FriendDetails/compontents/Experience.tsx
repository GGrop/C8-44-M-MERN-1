import { ExperienceRing } from '../../../components';
import { User } from '../../../models';

const lg = window.screen.width > window.screen.height;

interface Props {
  user: User;
}

const Experience = ({ user }: Props) => {
  return (
    <>
      <div className="hidden lg:block">
        <div className="flex justify-between items-center">
          <h2 className="home-title">Experience</h2>
        </div>
        <div className="relative h-1 w-full bg-secondary-light rounded-full dark:bg-secondary-regular"></div>
      </div>
      <div className="flex mt-3 justify-center gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xs text-secondary-regular lg:text-sm">
            Education
          </h3>
          <ExperienceRing
            size={!lg ? 90 : 150}
            experience={user.educationExperience}
            color={'#f85f6a'}
            textColor={'primary-dark'}
            fontSize={'text-xs lg:text-sm'}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xs text-secondary-regular lg:text-sm">Health</h3>
          <ExperienceRing
            size={!lg ? 90 : 150}
            experience={user.healthExperience}
            color={'#5f83f8'}
            textColor={'blue'}
            fontSize={'text-xs lg:text-sm'}
          />
        </div>
      </div>
    </>
  );
};

export default Experience;
