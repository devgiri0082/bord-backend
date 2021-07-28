# endpoints

# auth-endpoints

- /auth/signup "POST" => "create a new account"
- /auth/signin "POST" => "signin to an existing account"
- /auth/signout "POST" => "signout of the account"

# user-endpoint

- /profile/:username "GET" => "get the profile"

# follow-endpoint

- action/follow/:username "POST" => "follow a user"
- action/unfollow/:username "POST" => "unfollow a user"
- action/possibleFollow "GET" => "suggestion for follow"

# post-endpoint

- post/ "POST" => "post a new post"
- post/ "GET" => "get posts of the people you follow 20 limit"
- post/:slug "DELETE" => "delete a post"
- post/like/:slug "POST" => "like a post"
- post/dislike/:slug "POST" => "dislike a post"

# refresh-endpoint

- post/ "POST"
