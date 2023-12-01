import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileEditForm from "./ProfileEditForm";
import ProfileAbout from "./ProfileAbout";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <Tab.Pane>
          <ProfileAbout />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <ProfilePhotos profile={profile} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Events",
      render: () => <Tab.Pane>Events Content</Tab.Pane>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});