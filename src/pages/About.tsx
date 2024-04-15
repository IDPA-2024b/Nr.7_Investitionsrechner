import { LeaderShip } from "../components/about/LeaderShip";
import { MainAbout } from "../components/about/MainAbout";
import { Team } from "../components/about/Team";

export function AboutPage() {
  const LeaderShipProps = [
    {
      name: 'Sanju Para',
      position: 'Documentation & Marketing',
      description: 'SNJ Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D5603AQH-PHHD5rOCAA/profile-displayphoto-shrink_800_800/0/1693300216426?e=2147483647&v=beta&t=r5xGM9dpzpC_cBYEQVAH1X9RRzOJxucSuBjCEVYMWOc',
    },
    {
      name: 'Léonard Roch',
      position: 'Lead Developer',
      description: 'Leo Text',
      ImageSrc: 'https://avatars.githubusercontent.com/u/113020714?v=4',
    },
    {
      name: 'David Bischof',
      position: 'Developer',
      description: 'Bischof Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D4E03AQHQ6IkpHCiLGw/profile-displayphoto-shrink_800_800/0/1711049197562?e=1718841600&v=beta&t=kjSM8TFycmA08GfXxPhX8GY2EyppCuQXukkd2wJTK2E',
    },
  ]
  const TeamProps = [
    {
      name: 'Sanju Para',
      description: 'SNJ Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D5603AQH-PHHD5rOCAA/profile-displayphoto-shrink_800_800/0/1693300216426?e=2147483647&v=beta&t=r5xGM9dpzpC_cBYEQVAH1X9RRzOJxucSuBjCEVYMWOc',
    },
    {
      name: 'Léonard Roch',
      description: 'wasd as das da sdadnibgaoei bgisdlbg iaugb lawuisdg',
      ImageSrc: 'https://avatars.githubusercontent.com/u/113020714?v=4',
    },
    {
      name: 'David Bischof',
      description: 'Bischof Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D4E03AQHQ6IkpHCiLGw/profile-displayphoto-shrink_800_800/0/1711049197562?e=1718841600&v=beta&t=kjSM8TFycmA08GfXxPhX8GY2EyppCuQXukkd2wJTK2E',
    },    {
      name: 'Sanju Para',
      description: 'SNJ Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D5603AQH-PHHD5rOCAA/profile-displayphoto-shrink_800_800/0/1693300216426?e=2147483647&v=beta&t=r5xGM9dpzpC_cBYEQVAH1X9RRzOJxucSuBjCEVYMWOc',
    },
    {
      name: 'Léonard Roch',
      description: 'wasd as das da sdadnibgaoei bgisdlbg iaugb lawuisdg',
      ImageSrc: 'https://avatars.githubusercontent.com/u/113020714?v=4',
    },
    {
      name: 'David Bischof',
      description: 'Bischof Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D4E03AQHQ6IkpHCiLGw/profile-displayphoto-shrink_800_800/0/1711049197562?e=1718841600&v=beta&t=kjSM8TFycmA08GfXxPhX8GY2EyppCuQXukkd2wJTK2E',
    },    {
      name: 'Sanju Para',
      description: 'SNJ Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D5603AQH-PHHD5rOCAA/profile-displayphoto-shrink_800_800/0/1693300216426?e=2147483647&v=beta&t=r5xGM9dpzpC_cBYEQVAH1X9RRzOJxucSuBjCEVYMWOc',
    },
    {
      name: 'Léonard Roch',
      description: 'wasd as das da sdadnibgaoei bgisdlbg iaugb lawuisdg',
      ImageSrc: 'https://avatars.githubusercontent.com/u/113020714?v=4',
    },
    {
      name: 'David Bischof',
      description: 'Bischof Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D4E03AQHQ6IkpHCiLGw/profile-displayphoto-shrink_800_800/0/1711049197562?e=1718841600&v=beta&t=kjSM8TFycmA08GfXxPhX8GY2EyppCuQXukkd2wJTK2E',
    },    {
      name: 'Sanju Para',
      description: 'SNJ Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D5603AQH-PHHD5rOCAA/profile-displayphoto-shrink_800_800/0/1693300216426?e=2147483647&v=beta&t=r5xGM9dpzpC_cBYEQVAH1X9RRzOJxucSuBjCEVYMWOc',
    },
    {
      name: 'Léonard Roch',
      description: 'wasd as das da sdadnibgaoei bgisdlbg iaugb lawuisdg',
      ImageSrc: 'https://avatars.githubusercontent.com/u/113020714?v=4',
    },
    {
      name: 'David Bischof',
      description: 'Bischof Text',
      ImageSrc: 'https://media.licdn.com/dms/image/D4E03AQHQ6IkpHCiLGw/profile-displayphoto-shrink_800_800/0/1711049197562?e=1718841600&v=beta&t=kjSM8TFycmA08GfXxPhX8GY2EyppCuQXukkd2wJTK2E',
    },
  ]

  return (
    <>
      <MainAbout />
      <LeaderShip LeaderShipProps={LeaderShipProps} />
      <Team TeamProps={TeamProps}/>
    </>
  );
}
