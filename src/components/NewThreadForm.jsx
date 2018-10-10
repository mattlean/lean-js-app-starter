// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const NewThreadForm = () => (
  <>
    <form id="new-thread-form" className="center">
      <table>
        <tbody>
          <tr>
            <th>Subject</th>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <th>Comment</th>
            <td><textarea cols="48" rows="4"></textarea></td>
          </tr>
          <tr>
            <td colSpan="2">
              <input type="submit"></input>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <hr />
    <footer>
      [<Link to="/">Return</Link>]
    </footer>
  </>
)

export default NewThreadForm
