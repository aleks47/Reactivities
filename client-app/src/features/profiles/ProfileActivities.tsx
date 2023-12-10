import { Card, Grid, Header, Tab, Image, TabProps } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { UserActivity } from "../../app/models/profile";
import format from "date-fns/format";
import { Link } from "react-router-dom";

export default observer(function ProfileActivities() {
  const { profileStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    profileStore;

  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const panes = [
    {
      menuItem: "Future Events",
      pane: { key: "future" },
    },
    {
      menuItem: "Past Events",
      pane: { key: "past" },
    },
    {
      menuItem: "Hosting",
      pane: { key: "hosting" },
    },
  ];

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header icon="calendar" floated="left" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            onTabChange={handleTabChange}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity: UserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    {<div>{format(activity.date!, "do MMM")}</div>}
                    {<div>{format(activity.date!, "h:mm a")}</div>}
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
