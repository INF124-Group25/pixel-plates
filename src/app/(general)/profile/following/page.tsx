import styles from "./page.module.css";
import FollowerCard from "./Card";

const FollowingPage = () => {
  // obtain followers from server, use example data for now 
  type TUsers = {
    src:string, 
    name: string,
    bio: string
  };
  const users: TUsers[] = [
    {
      src: "/user6.png",
      name: "TheLink",
      bio: "Hello, I'm frank! I collaborate with small business around the world to introduce new foods to try on your next visit!"
    },
    {
      src: "/user5.png",
      name: "doofdoof",
      bio: "Rating the best places for your doggo to get their grubs"
    },
    {
      src: "/user4.png",
      name: "TheOneAndOnly",
      bio: "Michelin Star Only. DM for collab."
    },
    {
      src: "/user3.png",
      name: "SumoEater",
      bio:"Consumer of the most worthy of foods. Will do a food challenge any day!"
    },
    {
      src: "/user2.png",
      name: "breakfastLover",
      bio: "name the breakfast joint and i'll be there! love me some green eggs and ham"
    },
    {
      src: "/user1.png",
      name: "ExquisiteTaste",
      bio: "I enjoy the finer things in life, including food of high caliber."
    },
    {
      src: "/user4.png",
      name: "TheOneAndOnly",
      bio: "Michelin Star Only. DM for collab."
    },
    {
      src: "/user3.png",
      name: "SumoEater",
      bio:"Consumer of the most worthy of foods. Will do a food challenge any day!"
    },
    {
      src: "/user2.png",
      name: "breakfastLover",
      bio: "name the breakfast joint and i'll be there! love me some green eggs and ham"
    },
    {
      src: "/user1.png",
      name: "ExquisiteTaste",
      bio: "I enjoy the finer things in life, including food of high caliber."
    },
  ]


  return (
    <div className={styles.followingPage}>
      <h1>Following</h1>
      {users && users.length > 0 ? (
        <div className={styles.cardGrid}>
          {users.map((user, index) => (
            <FollowerCard key={`${index}-${user.name}`}src={user.src} name={user.name} bio={user.bio}/>
          ))}
        </div>
      ) : (
        <h2>No Followers 🥺</h2>
      )}
    </div>
  )
}

export default FollowingPage;