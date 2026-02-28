import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
export default function Settings(){
        return(
            <>
                <h1 className="text-lg font-semibold text-richblack-5 m-2" >Edit Profile Picture</h1>

                {/*change  profile picture*/}
                <ChangeProfilePicture/>

                {/*edit profile*/}
                <EditProfile/>

                {/*password*/}
                <UpdatePassword/>

                {/*delete account*/}
                <DeleteAccount/>
            </>
        )
}