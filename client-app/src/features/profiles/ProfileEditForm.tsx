import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import MyTextArea from "../../app/common/form/MyTextArea";
import * as Yup from "yup";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) =>
        updateProfile(values).then(() => {
          setEditMode(false);
        })
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form" autoComplete="off">
          <MyTextInput placeholder="Display name" name="displayName" />
          <MyTextArea placeholder="Bio" name="bio" rows={3} />
          <Button
            loading={isSubmitting}
            positive
            content="Update profile"
            type="submit"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
