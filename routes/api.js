const express = require("express");
const router = express.Router();
const axios = require("axios");

router.route("/repository").post(async (req, res) => {
    try {

        if (!req.body.repo_name) {
            return res.status(400).json({ message: "Repo Name Required." })
        }
        const token = req.headers["x-github-token"];

        const description = req.body.description || "";
        let private = true;
        if (req.body.visibility == false || req.body.visibility == "false") private = false;
        const data = {
            name: req.body.repo_name,
            private,
            description
        }
        console.log(data);


        try {
            const response = await axios.post("https://api.github.com/user/repos",
                data, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/vnd.github.v3+json",
                    Authorization: ` token ${token}`,
                }
            })

            res.json({
                message: "New Repo Create Successfully",
                name: response.data.name,
                owner: response.data.owner.login,
                private: response.data.private,
                link: response.data.html_url
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})

router.route("/repos").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                repo_list.push({
                    name: repo.name,
                    private: repo.private,
                    owner: repo.owner.login
                });
            })

            res.json({
                data: repo_list
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})

router.route("/topics_list").post(async (req, res) => {
    try {
        if (!req.body.repo_name) {
            return res.status(400).json({ message: "Repo name required." })
        }

        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }
        const repo_name = req.body.repo_name;
        const url = `https://api.github.com/repos/${username}/${repo_name}/topics`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })


            res.json({
                repo_name, username,
                topics_list: response.data.names
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }





    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})

router.route("/topics_update").post(async (req, res) => {
    try {
        if (!req.body.repo_name) {
            return res.status(400).json({ message: "Repo name required." })
        }

        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }
        const repo_name = req.body.repo_name;
        const url = `https://api.github.com/repos/${username}/${repo_name}/topics`;
        const data = { names: req.body.topics_list };

        try {
            const response = await axios.put(url, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })


            res.json({
                repo_name, username,
                new_topics_list: response.data.names
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})



router.route("/contributions").post(async (req, res) => {
    try {
        if (!req.body.repo_name) {
            return res.status(400).json({ message: "Repo name required." })
        }

        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }
        const repo_name = req.body.repo_name;
        const url = `https://api.github.com/repos/${username}/${repo_name}/contributors`;
        const url1 = `https://api.github.com/repos/${username}/${repo_name}/stargazers`;


        try {

            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            let contributors = [];
            response.data.map(user => {
                contributors.push({ username: user.login });
            })

            const response1 = await axios.get(url1,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            let stragazers = [];
            response1.data.map(user => {
                stragazers.push({ username: user.login });
            })



            res.json({
                repo_name, username,
                contributors, stragazers
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})

router.route("/starfork5").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                if (repo.forks > 5 && repo.stargazers_count > 5)
                    repo_list.push({
                        name: repo.name,
                        private: repo.private,
                        owner: repo.owner.login,
                        forks: repo.forks,
                        stargazers: repo.stargazers_count
                    });
            })

            res.json({
                repos: repo_list
            });

        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})

router.route("/commit10").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`;


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                repo_list.push({
                    name: repo.name,
                    private: repo.private,
                    owner: repo.owner.login
                });
            })

            let repo_with_commits = [];

            for (let i = 0; i < repo_list.length; i++) {
                const repo = repo_list[i];
                const uri = `https://api.github.com/repos/${username}/${repo.name}/commits`
                const resp = await axios.get(uri,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/vnd.github.v3+json",
                            Authorization: ` token ${token}`,
                        }
                    })
                let commit_count = 0;
                await resp.data.map(commit => {
                    if (commit.author) {
                        // console.log("commit", commit.author.login);
                        let days = Date.now() - Date.parse(commit.commit.author.date);
                        days = days / (24 * 60 * 60 * 1000)

                        if (commit.author && days <= 10) {
                            commit_count += 1;
                        }
                    }
                })
                if (commit_count > 5) {
                    repo_with_commits.push({ ...repo, commits: commit_count });
                }
            }
            res.send({ repos: repo_with_commits });


        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})


router.route("/commitowner10").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`;


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                repo_list.push({
                    name: repo.name,
                    private: repo.private,
                    owner: repo.owner.login
                });
            })

            let repo_with_commits = [];

            for (let i = 0; i < repo_list.length; i++) {
                const repo = repo_list[i];
                const uri = `https://api.github.com/repos/${username}/${repo.name}/commits`
                const resp = await axios.get(uri,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/vnd.github.v3+json",
                            Authorization: ` token ${token}`,
                        }
                    })
                let commit_count = 0;
                await resp.data.map(commit => {
                    if (commit.author) {
                        // console.log("commit", commit.author.login);
                        let days = Date.now() - Date.parse(commit.commit.author.date);
                        days = days / (24 * 60 * 60 * 1000)

                        if (commit.author && commit.author.login == username && days <= 10) {
                            commit_count += 1;
                        }
                    }
                })
                if (commit_count > 5) {
                    repo_with_commits.push({ ...repo, commits: commit_count });
                }
            }
            res.send({ repos: repo_with_commits });


        } catch (error) {
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})


router.route("/stargazersgt2").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`;


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                repo_list.push({
                    name: repo.name,
                    private: repo.private,
                    owner: repo.owner.login
                });
            })

            const star_count = {};

            let users = [];

            for (let i = 0; i < repo_list.length; i++) {
                const repo = repo_list[i];
                const uri = `https://api.github.com/repos/${username}/${repo.name}/stargazers`
                const resp = await axios.get(uri,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/vnd.github.v3+json",
                            Authorization: ` token ${token}`,
                        }
                    })
                await resp.data.map(user => {

                    if (!star_count[user.login]) {
                        star_count[user.login] = 1;
                    } else {
                        star_count[user.login] += 1;

                    }
                })
            }

            Object.keys(star_count).map(user => {
                if (star_count[user] > 2) {
                    users.push(user);
                }
            })
            console.log(users);
            res.send({ users });


        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})


router.route("/stargazerseq2").post(async (req, res) => {
    try {
        const token = req.headers["x-github-token"];
        let username = req.headers["x-username"];
        if (req.body.username) {
            username = req.body.username;
        }

        const url = `https://api.github.com/users/${username}/repos`;


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/vnd.github.v3+json",
                        Authorization: ` token ${token}`,
                    }
                })
            const repo_list = [];
            response.data.map(repo => {
                repo_list.push({
                    name: repo.name,
                    private: repo.private,
                    owner: repo.owner.login
                });
            })

            const star_count = {};

            let users = [];

            for (let i = 0; i < repo_list.length; i++) {
                const repo = repo_list[i];
                const uri = `https://api.github.com/repos/${username}/${repo.name}/stargazers`
                const resp = await axios.get(uri,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/vnd.github.v3+json",
                            Authorization: ` token ${token}`,
                        }
                    })
                await resp.data.map(user => {

                    if (!star_count[user.login]) {
                        star_count[user.login] = 1;
                    } else {
                        star_count[user.login] += 1;

                    }
                })
            }

            Object.keys(star_count).map(user => {
                if (star_count[user] > 2) {
                    users.push(user);
                }
            })
            console.log(users);
            res.send({ users });


        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            res.status(500).json({
                message: error.response.data.message,
                error: error.response.data.errors
            });
        }



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occurered" });
    }
})







module.exports = router;