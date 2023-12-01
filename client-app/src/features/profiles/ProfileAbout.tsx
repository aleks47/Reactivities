import { Button, Grid, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileAbout() {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          icon="user"
          floated="left"
          content={`About ${profile?.displayName}`}
        />
        {isCurrentUser && (
          <Button
            floated="right"
            basic
            content={editMode ? "Cancel" : "Edit Profile"}
            onClick={() => setEditMode(!editMode)}
          />
        )}
      </Grid.Column>
      <Grid.Column width={16}>
        {editMode ? (
          <ProfileEditForm setEditMode={setEditMode} />
        ) : (
          <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
        )}
      </Grid.Column>
    </Grid>
  );
}
