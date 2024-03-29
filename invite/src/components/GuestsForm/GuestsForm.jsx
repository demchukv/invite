import { useDispatch, useSelector } from "react-redux";
import { selectInvites } from "../../redux/invites/selectors";


const GuestsForm = ({ inviteId }) => {
  return (
    <div>GuestsForm {inviteId}</div>
  )
}

export default GuestsForm