This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Readable Front End

To install and start the front end server, run the following commands in this directory:

* `npm install`
* `npm start`

## Guidelines

The scoring rubric can be found here, although you must be a Udacity user to view: [Project Specification](https://review.udacity.com/#!/rubrics/1017/view).

### Some of the main specs include:

* State management with Redux.
* Listed posts are displayed with the following:
  * Title
  * Author
  * Number of comments
  * Current score
  * Voting mechanism to upvote or downvote the post
  * Buttons or links for editing or deleting that post
* The comment count, edit/delete buttons or links, and upvote/downvote features are required on this page in order to enable the user to manage the posts without navigating away.
* The voting mechanism works and correctly displays the new vote score after clicking.
* List posts link to the detail page for that post.
* All posts are listed at the root.
* List pages (root or category) include a mechanism for sorting by date or by score (at a minimum), and the sort works properly.
* List pages include a button to add a new post.
* All available categories are visible in any list view.
* Listed posts are displayed with the following:
  * Title
  * Author
  * Number of comments
  * Current score
  * Voting mechanism to upvote or downvote the post
  * Buttons or links for editing or deleting that post
* Post is displayed with the following:
  * Title
  * Body
  * Author
  * Number of comments
  * Current score
  * Voting mechanism to upvote or downvote the post
  * Buttons or links for editing or deleting that post
* Listed comments are displayed with the following:
  * Author
  * Current score
  * Voting mechanism to upvote or downvote the comment
  * Buttons or links for editing or deleting that comment
* The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.
* All comments for a post are displayed below the post body.
* A mechanism for adding a new comment is visible on the detail page and functional.
* Users can add posts and comments.
* Users can edit posts/comments.
* Users can delete posts/comments.
* Basic navigation.

## Todo

- [ ] Add testing
- [ ] Replace usage of `propTypes` and utilize Flow or Typescript
- [ ] Error handling (mostly for http calls)
- [ ] Authentication (login, can only edit/delete own posts, etc)
- [ ] Replace `window.confirm` usage with modal
