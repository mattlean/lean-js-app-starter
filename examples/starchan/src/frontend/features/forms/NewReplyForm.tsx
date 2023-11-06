import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
    isAPIErrorRes,
    isFetchBaseQueryError,
    isFieldValidationError,
} from '../../common/util'
import { useCreateReplyMutation } from '../api/apiSlice'
import ReplyInputs from './ReplyInputs'

export default function NewReplyForm() {
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const { threadId } = useParams()
    const [createReply, { error, isLoading }] = useCreateReplyMutation()

    if (error) {
        throw new Error(
            'An error occurred when attempting to create a new reply.'
        )
    }

    if (!show) {
        return (
            <>
                <span className="center">
                    [
                    <a href="#" onClick={() => setShow(true)}>
                        Post a Reply
                    </a>
                    ]
                </span>
                <noscript>
                    <form
                        action={`/api/v1/threads/${threadId}/reply`}
                        method="post"
                        className="center"
                    >
                        <ReplyInputs />
                    </form>
                </noscript>
            </>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrMsg('')

        try {
            await createReply({ threadId, comment }).unwrap()
        } catch (err) {
            console.error(
                'An error was encountered while creating the reply:',
                err
            )

            if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
                if (err.data.errors) {
                    if (typeof err.data.errors[0] === 'string') {
                        setErrMsg(err.data.errors[0])
                    } else if (isFieldValidationError(err.data.errors[0])) {
                        setErrMsg(
                            `${err.data.errors[0].path} has ${err.data.errors[0].msg}`
                        )
                    }
                }
            }
        }

        setShow(false)
        setComment('')
    }

    return (
        <form id="new-form" className="center" onSubmit={handleSubmit}>
            <ReplyInputs
                comment={comment}
                errMsg={errMsg}
                isLoading={isLoading}
                onCommentChange={(e) => setComment(e.target.value)}
            />
        </form>
    )
}

// class NewReplyFormClass extends Component {
//     handleChange = (e, state) => {
//         this.setState({ [state]: e.currentTarget.value })
//     }

//     handleClick = (e) => {
//         e.preventDefault()
//         this.setState({ show: true })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         if (this.props.createReply) {
//             this.props
//                 .createReply(this.props.match.params.id, {
//                     comment: this.state.comment,
//                 })
//                 .then(() => {
//                     this.reset()
//                 })
//                 .catch((err) => {
//                     if (this.props.setErr) {
//                         this.props.setErr('create', err)
//                     }
//                 })
//         }
//     }

//     reset = () => {
//         this.setState({
//             comment: '',
//             show: false,
//         })
//     }

//     render() {
//         if (this.state.show) {
//             let err
//             if (this.props.err) {
//                 let statusTxt
//                 if (this.props.err.res && this.props.err.res.status)
//                     statusTxt = `${this.props.err.res.status} - `

//                 err = (
//                     <tr>
//                         <td colSpan="2">
//                             <b className="center">
//                                 ERROR: {statusTxt}
//                                 {this.props.err.message}
//                             </b>
//                         </td>
//                     </tr>
//                 )
//             }

//             return (
//                 <form
//                     id="new-form"
//                     className="center"
//                     onSubmit={this.handleSubmit}
//                 >
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <th>
//                                     <label htmlFor="comment">Comment</label>
//                                 </th>
//                                 <td>
//                                     <textarea
//                                         id="comment"
//                                         value={this.state.comment}
//                                         onChange={(e) =>
//                                             this.handleChange(e, 'comment')
//                                         }
//                                         required
//                                     />
//                                 </td>
//                             </tr>
//                             {err}
//                             <tr>
//                                 <td colSpan="2">
//                                     <button type="submit">Post</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </form>
//             )
//         }
//         return (
//             <>
//                 <span className="center">
//                     [
//                     <a href="#" onClick={this.handleClick}>
//                         Post a Reply
//                     </a>
//                     ]
//                 </span>
//                 <noscript>
//                     <form
//                         id="new-form"
//                         action={`/api/thread/${this.props.match.params.id}/reply`}
//                         method="post"
//                         className="center"
//                     >
//                         <table>
//                             <tbody>
//                                 <tr>
//                                     <th>
//                                         <label htmlFor="comment">Comment</label>
//                                     </th>
//                                     <td>
//                                         <textarea
//                                             id="comment"
//                                             name="comment"
//                                             required
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="2">
//                                         <button type="submit">Post</button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </form>
//                 </noscript>
//             </>
//         )
//     }
// }
